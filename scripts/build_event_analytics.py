"""
Build event analytics tables without changing the existing SafePB event model.

The script reads the current `data/processed` CSV files, writes a daily market
macro time series, then attaches market reaction and sector sensitivity rows to
events that already exist in the Prisma SQLite database.
"""

from __future__ import annotations

import argparse
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB = ROOT / "backend" / "dev.db"
DEFAULT_DATA = ROOT / "data" / "processed"
START_DATE = "2024-01-01"
END_DATE = "2026-04-30"

SECTOR_INDEX_CANDIDATES = {
    "IT/반도체": ["반도체", "정보기술", "전기전자"],
    "금융": ["금융", "보험", "증권"],
    "자동차": ["자동차", "운송장비·부품", "운수장비"],
    "바이오": ["바이오", "제약", "헬스케어", "의료·정밀기기"],
    "에너지": ["에너지", "화학", "전기가스"],
}

EVENT_COLUMNS = {
    "금리": {"INTEREST_RATE", "POLICY"},
    "물가": {"INFLATION"},
    "고용": {"EMPLOYMENT"},
    "실적": {"EARNINGS"},
}


def read_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        return pd.DataFrame()
    return pd.read_csv(path, encoding="utf-8-sig")


def series_from_frame(
    df: pd.DataFrame,
    date_col: str,
    value_col: str,
    out_col: str,
    filters: dict[str, str] | None = None,
) -> pd.DataFrame:
    if df.empty:
        return pd.DataFrame(columns=["date", out_col])

    work = df.copy()
    for col, expected in (filters or {}).items():
        if col in work.columns:
            work = work[work[col] == expected]

    if work.empty or date_col not in work or value_col not in work:
        return pd.DataFrame(columns=["date", out_col])

    work[date_col] = pd.to_datetime(work[date_col], errors="coerce")
    work[value_col] = pd.to_numeric(work[value_col], errors="coerce")
    return (
        work[[date_col, value_col]]
        .dropna()
        .rename(columns={date_col: "date", value_col: out_col})
        .drop_duplicates("date", keep="last")
        .sort_values("date")
    )


def build_daily_macro(data_dir: Path) -> pd.DataFrame:
    calendar = pd.DataFrame({"date": pd.date_range(START_DATE, END_DATE, freq="D")})

    market_indices = read_csv(data_dir / "market_indices" / "market_indices.csv")
    overseas = read_csv(data_dir / "overseas_prices" / "overseas_prices.csv")
    fx = read_csv(data_dir / "fx_rates" / "fx_rates.csv")
    rates = read_csv(data_dir / "interest_rates" / "interest_rates.csv")
    sp500 = read_csv(ROOT / "data" / "raw" / "yahoo" / "indices" / "yahoo_sp500_index_20240101_20260430.csv")
    nasdaq = read_csv(ROOT / "data" / "raw" / "yahoo" / "indices" / "yahoo_nasdaq_index_20240101_20260430.csv")

    sources = [
        series_from_frame(
            market_indices,
            "date",
            "closeValue",
            "kospi_index",
            {"indexClass": "KOSPI", "indexName": "코스피"},
        ),
        series_from_frame(sp500, "date", "close", "sp500_index"),
        series_from_frame(nasdaq, "date", "close", "nasdaq_index"),
        series_from_frame(fx, "date", "closePrice", "usd_krw", {"currencyPair": "USD_KRW"}),
        series_from_frame(overseas, "date", "closePrice", "spy_etf_close", {"ticker": "SPY"}),
        series_from_frame(rates, "date", "rateValue", "kr_base_rate", {"country": "KR", "rateType": "base_rate"}),
        series_from_frame(rates, "date", "rateValue", "us_base_rate", {"country": "US", "rateType": "base_rate"}),
        series_from_frame(rates, "date", "rateValue", "us_bond_10y", {"country": "US", "rateType": "treasury_10y"}),
        rates[
            (rates.get("country") == "KR")
            & (rates.get("rateType") == "market_rate")
            & (rates.get("rateName") == "국고채(3년)")
        ]
        .pipe(lambda df: series_from_frame(df, "date", "rateValue", "kr_bond_3y")),
    ]

    merged = calendar
    for src in sources:
        if not src.empty:
            src["date"] = pd.to_datetime(src["date"]).dt.normalize()
            merged = merged.merge(src, on="date", how="left")

    value_cols = [c for c in merged.columns if c != "date"]
    merged[value_cols] = merged[value_cols].ffill().bfill()
    return merged


def ensure_tables(conn: sqlite3.Connection) -> None:
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS daily_market_macro_prices (
          date DATETIME NOT NULL PRIMARY KEY,
          kospi_index REAL,
          sp500_index REAL,
          nasdaq_index REAL,
          usd_krw REAL,
          kr_bond_3y REAL,
          us_bond_10y REAL,
          kr_base_rate REAL,
          us_base_rate REAL,
          spy_etf_close REAL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS event_market_reactions (
          id TEXT NOT NULL PRIMARY KEY,
          economic_event_id TEXT NOT NULL UNIQUE,
          kospi_t_minus_5 REAL,
          kospi_t_minus_4 REAL,
          kospi_t_minus_3 REAL,
          kospi_t_minus_2 REAL,
          kospi_t_minus_1 REAL,
          kospi_t_0 REAL,
          kospi_t_plus_1 REAL,
          kospi_t_plus_2 REAL,
          kospi_t_plus_3 REAL,
          kospi_t_plus_4 REAL,
          kospi_t_plus_5 REAL,
          kospi_return_d1_pct REAL,
          kospi_return_d5_pct REAL,
          usd_krw_return_d1_pct REAL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (economic_event_id) REFERENCES EconomicEvent(id) ON DELETE CASCADE
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS sector_event_sensitivity (
          sector TEXT NOT NULL,
          event_column TEXT NOT NULL,
          avg_abs_pct REAL,
          event_count INTEGER NOT NULL,
          score INTEGER NOT NULL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (sector, event_column)
        )
        """
    )
    conn.commit()


def write_daily_macro(conn: sqlite3.Connection, macro: pd.DataFrame) -> None:
    out = macro.copy()
    out["date"] = out["date"].dt.strftime("%Y-%m-%dT00:00:00.000Z")
    out["updated_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    cols = list(out.columns)
    placeholders = ",".join(["?"] * len(cols))
    conn.executemany(
        f"INSERT OR REPLACE INTO daily_market_macro_prices ({','.join(cols)}) VALUES ({placeholders})",
        out.itertuples(index=False, name=None),
    )
    conn.commit()


def pct_change(new: float | None, old: float | None) -> float | None:
    if new is None or old in (None, 0):
        return None
    return round((new - old) / old * 100, 3)


def lookup(series: pd.Series, target: pd.Timestamp) -> float | None:
    if series.empty:
        return None
    date = target.normalize()
    if date < series.index.min() or date > series.index.max():
        return None
    resolved = series.index.asof(date)
    value = series.loc[resolved]
    return float(value) if pd.notna(value) else None


def write_event_reactions(conn: sqlite3.Connection, macro: pd.DataFrame) -> list[dict]:
    events = pd.read_sql("SELECT id, eventDate, title, category FROM EconomicEvent", conn)
    if events.empty:
        return []

    prices = macro.copy().set_index("date").sort_index()
    kospi = prices["kospi_index"].dropna()
    usd_krw = prices["usd_krw"].dropna()
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    rows = []

    for event in events.to_dict("records"):
        event_date = pd.to_datetime(event["eventDate"], errors="coerce")
        if pd.isna(event_date):
            continue

        window = {offset: lookup(kospi, event_date + pd.Timedelta(days=offset)) for offset in range(-5, 6)}
        usd_t0 = lookup(usd_krw, event_date)
        usd_t1 = lookup(usd_krw, event_date + pd.Timedelta(days=1))
        rows.append(
            (
                uuid.uuid4().hex,
                event["id"],
                window[-5],
                window[-4],
                window[-3],
                window[-2],
                window[-1],
                window[0],
                window[1],
                window[2],
                window[3],
                window[4],
                window[5],
                pct_change(window[1], window[0]),
                pct_change(window[5], window[0]),
                pct_change(usd_t1, usd_t0),
                now,
            )
        )

    conn.executemany(
        """
        INSERT OR REPLACE INTO event_market_reactions
        (id, economic_event_id, kospi_t_minus_5, kospi_t_minus_4, kospi_t_minus_3,
         kospi_t_minus_2, kospi_t_minus_1, kospi_t_0, kospi_t_plus_1,
         kospi_t_plus_2, kospi_t_plus_3, kospi_t_plus_4, kospi_t_plus_5,
         kospi_return_d1_pct, kospi_return_d5_pct, usd_krw_return_d1_pct, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        rows,
    )
    conn.commit()
    return events.to_dict("records")


def write_sector_sensitivity(conn: sqlite3.Connection, data_dir: Path, events: list[dict]) -> None:
    indices = read_csv(data_dir / "market_indices" / "market_indices.csv")
    if indices.empty or not events:
        return

    indices["date"] = pd.to_datetime(indices["date"], errors="coerce")
    indices["closeValue"] = pd.to_numeric(indices["closeValue"], errors="coerce")
    pivot = indices.pivot_table(index="date", columns="indexName", values="closeValue", aggfunc="last").sort_index().ffill()
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    rows = []

    def d1(index_name: str, event_date: pd.Timestamp) -> float | None:
        if index_name not in pivot:
            return None
        col = pivot[index_name].dropna()
        if col.empty:
            return None
        start = col.index.asof(event_date.normalize())
        after = col.index[col.index > start]
        if pd.isna(start) or after.empty:
            return None
        return pct_change(float(col.loc[after[0]]), float(col.loc[start]))

    for sector, candidates in SECTOR_INDEX_CANDIDATES.items():
        matched = [name for name in candidates if name in pivot.columns]
        for event_column, categories in EVENT_COLUMNS.items():
            values = []
            for event in events:
                if event["category"] not in categories:
                    continue
                event_date = pd.to_datetime(event["eventDate"], errors="coerce")
                per_event = [d1(name, event_date) for name in matched]
                per_event = [v for v in per_event if v is not None]
                if per_event:
                    values.append(sum(abs(v) for v in per_event) / len(per_event))

            avg_abs = round(sum(values) / len(values), 3) if values else None
            score = 3 if avg_abs is not None and avg_abs >= 1.5 else 2 if avg_abs is not None and avg_abs >= 0.7 else 1
            rows.append((sector, event_column, avg_abs, len(values), score, now))

    conn.executemany(
        """
        INSERT OR REPLACE INTO sector_event_sensitivity
        (sector, event_column, avg_abs_pct, event_count, score, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        rows,
    )
    conn.commit()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--data-dir", type=Path, default=DEFAULT_DATA)
    args = parser.parse_args()

    macro = build_daily_macro(args.data_dir)
    with sqlite3.connect(args.db) as conn:
        ensure_tables(conn)
        write_daily_macro(conn, macro)
        events = write_event_reactions(conn, macro)
        write_sector_sensitivity(conn, args.data_dir, events)

    print(
        f"Built analytics: {len(macro)} daily macro rows, "
        f"{len(events)} event reaction candidates."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
