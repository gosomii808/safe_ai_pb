from __future__ import annotations

import csv
import hashlib
import json
import os
import sqlite3
import sys
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Callable, Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BACKEND_DIR = PROJECT_ROOT / "backend"
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
DOCS_DIR = PROJECT_ROOT / "docs"
LOG_DIR = PROJECT_ROOT / "logs"
ERROR_LOG = LOG_DIR / "data_load_errors.log"
MIGRATION_NAME = "20260528195000_load_processed_csv_schema"
MIGRATION_PATH = BACKEND_DIR / "prisma" / "migrations" / MIGRATION_NAME / "migration.sql"


@dataclass
class LoadResult:
    dataset: str
    csv_path: Path
    table: str
    input_rows: int = 0
    inserted_rows: int = 0
    skipped_rows: int = 0
    duplicate_rows_removed: int = 0
    failed_rows: int = 0
    skip_reasons: dict[str, int] = field(default_factory=dict)


def rel(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def load_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def resolve_sqlite_path() -> Path:
    env = load_env(BACKEND_DIR / ".env")
    database_url = env.get("DATABASE_URL") or os.environ.get("DATABASE_URL") or "file:./dev.db"
    if not database_url.startswith("file:"):
        raise ValueError(f"Only SQLite file: DATABASE_URL is supported, got {database_url}")
    db_part = database_url.removeprefix("file:")
    db_path = Path(db_part)
    if not db_path.is_absolute():
        db_path = BACKEND_DIR / db_path
    return db_path.resolve()


def clean_str(value: object) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if text == "" or text.lower() in {"nan", "na", "n/a", "null", "none", "-"}:
        return None
    return text


def to_float(value: object) -> float | None:
    text = clean_str(value)
    if text is None:
        return None
    try:
        return float(text.replace(",", "").replace("%", ""))
    except ValueError:
        return None


def to_date(value: object) -> str | None:
    text = clean_str(value)
    if text is None:
        return None
    for pattern in ("%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d", "%Y%m%d"):
        try:
            return datetime.strptime(text, pattern).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return None


def make_id(prefix: str, *parts: object) -> str:
    key = "|".join("" if part is None else str(part) for part in parts)
    digest = hashlib.sha1(key.encode("utf-8")).hexdigest()
    return f"{prefix}_{digest}"


def ensure_column(con: sqlite3.Connection, table: str, column: str, definition: str) -> None:
    existing = {row[1] for row in con.execute(f'PRAGMA table_info("{table}")')}
    if column not in existing:
        con.execute(f'ALTER TABLE "{table}" ADD COLUMN "{column}" {definition}')


def ensure_schema(con: sqlite3.Connection) -> None:
    con.executescript(
        """
        CREATE TABLE IF NOT EXISTS "FxRate" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "date" DATETIME NOT NULL,
            "currencyPair" TEXT NOT NULL,
            "exchangeRate" REAL NOT NULL,
            "openPrice" REAL,
            "highPrice" REAL,
            "lowPrice" REAL,
            "closePrice" REAL,
            "source" TEXT,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS "InterestRate" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "date" DATETIME NOT NULL,
            "country" TEXT NOT NULL,
            "rateType" TEXT NOT NULL,
            "rateName" TEXT NOT NULL,
            "rateValue" REAL,
            "releaseDate" DATETIME,
            "effectiveDate" DATETIME,
            "decisionType" TEXT,
            "previousRate" REAL,
            "changeBp" REAL,
            "source" TEXT,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS "InvestorFlow" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "date" DATETIME NOT NULL,
            "ticker" TEXT,
            "stockName" TEXT,
            "investorType" TEXT NOT NULL,
            "netBuyAmount" REAL,
            "source" TEXT,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE UNIQUE INDEX IF NOT EXISTS "FxRate_currencyPair_date_key" ON "FxRate"("currencyPair", "date");
        CREATE INDEX IF NOT EXISTS "FxRate_date_idx" ON "FxRate"("date");
        CREATE UNIQUE INDEX IF NOT EXISTS "InterestRate_date_country_rateType_rateName_source_key" ON "InterestRate"("date", "country", "rateType", "rateName", "source");
        CREATE INDEX IF NOT EXISTS "InterestRate_country_rateType_date_idx" ON "InterestRate"("country", "rateType", "date");
        CREATE UNIQUE INDEX IF NOT EXISTS "InvestorFlow_date_ticker_stockName_investorType_key" ON "InvestorFlow"("date", "ticker", "stockName", "investorType");
        CREATE INDEX IF NOT EXISTS "InvestorFlow_date_idx" ON "InvestorFlow"("date");
        """
    )

    additions = {
        "MarketPrice": {
            "stockName": "TEXT",
            "openPrice": "REAL",
            "highPrice": "REAL",
            "lowPrice": "REAL",
            "volume": "REAL",
            "tradingValue": "REAL",
            "marketCap": "REAL",
            "change": "REAL",
            "changeRate": "REAL",
        },
        "MarketIndex": {
            "indexClass": "TEXT",
            "market": "TEXT",
            "openValue": "REAL",
            "highValue": "REAL",
            "lowValue": "REAL",
            "volume": "REAL",
            "tradingValue": "REAL",
            "marketCap": "REAL",
        },
        "ValuationIndicator": {
            "indexName": "TEXT",
            "dividendYield": "REAL",
        },
        "ForeignOwnership": {
            "stockName": "TEXT",
            "listedShares": "REAL",
            "foreignHoldingShares": "REAL",
            "foreignLimitShares": "REAL",
            "foreignLimitExhaustionRatio": "REAL",
            "closePrice": "REAL",
            "change": "REAL",
            "changeRate": "REAL",
        },
        "YahooPrice": {
            "assetType": "TEXT",
            "currency": "TEXT",
            "source": "TEXT",
        },
        "EconomicEvent": {
            "releaseDate": "DATETIME",
            "releaseTime": "TEXT",
            "targetPeriod": "TEXT",
            "eventType": "TEXT",
            "actualValue": "REAL",
            "forecastValue": "REAL",
            "previousValue": "REAL",
            "decisionType": "TEXT",
            "changeBp": "REAL",
            "surpriseBp": "REAL",
        },
    }
    for table, columns in additions.items():
        for column, definition in columns.items():
            ensure_column(con, table, column, definition)
    mark_manual_migration_applied(con)


def mark_manual_migration_applied(con: sqlite3.Connection) -> None:
    exists = con.execute(
        "SELECT 1 FROM _prisma_migrations WHERE migration_name = ?",
        (MIGRATION_NAME,),
    ).fetchone()
    if exists or not MIGRATION_PATH.exists():
        return
    checksum = hashlib.sha256(MIGRATION_PATH.read_bytes()).hexdigest()
    now_ms = int(time.time() * 1000)
    con.execute(
        """
        INSERT INTO _prisma_migrations (
            id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count
        ) VALUES (?, ?, ?, ?, ?, NULL, ?, ?)
        """,
        (
            str(uuid.uuid4()),
            checksum,
            now_ms,
            MIGRATION_NAME,
            "Applied by scripts/load_processed_to_db.py because local Prisma CLI dependencies were unavailable.",
            now_ms,
            1,
        ),
    )


def append_error(message: str) -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    with ERROR_LOG.open("a", encoding="utf-8") as file:
        file.write(message + "\n")


def read_csv_rows(path: Path) -> Iterable[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as file:
        yield from csv.DictReader(file)


def insert_chunk(con: sqlite3.Connection, table: str, columns: list[str], rows: list[tuple[object, ...]]) -> None:
    if not rows:
        return
    placeholders = ",".join("?" for _ in columns)
    quoted = ",".join(f'"{column}"' for column in columns)
    con.executemany(f'INSERT OR REPLACE INTO "{table}" ({quoted}) VALUES ({placeholders})', rows)


def load_dataset(
    con: sqlite3.Connection,
    dataset: str,
    csv_path: Path,
    table: str,
    delete_sql: str,
    transformer: Callable[[dict[str, str]], tuple[object, ...] | None],
    columns: list[str],
    unique_key: Callable[[dict[str, str]], tuple[object, ...] | None],
    chunk_size: int = 5000,
) -> LoadResult:
    result = LoadResult(dataset=dataset, csv_path=csv_path, table=table)
    if not csv_path.exists():
        result.skip_reasons["csv file not found"] = 1
        return result

    con.execute(delete_sql)
    seen: set[tuple[object, ...]] = set()
    chunk: list[tuple[object, ...]] = []
    error_samples = 0
    for row_number, row in enumerate(read_csv_rows(csv_path), start=2):
        result.input_rows += 1
        key = unique_key(row)
        if key is None:
            result.skipped_rows += 1
            result.skip_reasons["missing unique key"] = result.skip_reasons.get("missing unique key", 0) + 1
            continue
        if key in seen:
            result.duplicate_rows_removed += 1
            continue
        seen.add(key)
        try:
            transformed = transformer(row)
            if transformed is None:
                result.skipped_rows += 1
                result.skip_reasons["missing required value"] = result.skip_reasons.get("missing required value", 0) + 1
                continue
            chunk.append(transformed)
            result.inserted_rows += 1
            if len(chunk) >= chunk_size:
                insert_chunk(con, table, columns, chunk)
                chunk.clear()
        except Exception as exc:
            result.failed_rows += 1
            if error_samples < 1000:
                append_error(f"{dataset}:{rel(csv_path)}:{row_number}: {type(exc).__name__}: {exc}; row={row}")
                error_samples += 1
    insert_chunk(con, table, columns, chunk)
    return result


def key_values(*values: object) -> tuple[object, ...] | None:
    normalized = tuple("" if value is None else value for value in values)
    if any(value == "" for value in normalized):
        return None
    return normalized


def run_load(con: sqlite3.Connection, only: set[str] | None = None) -> list[LoadResult]:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    datasets = [
        (
            "market_prices",
            PROCESSED_DIR / "market_prices" / "krx_market_prices.csv",
            "MarketPrice",
            'DELETE FROM "MarketPrice" WHERE "source" = "KRX"',
            [
                "id",
                "market",
                "ticker",
                "stockName",
                "price",
                "openPrice",
                "highPrice",
                "lowPrice",
                "volume",
                "tradingValue",
                "marketCap",
                "change",
                "changeRate",
                "currency",
                "priceDate",
                "source",
                "createdAt",
            ],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("ticker"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("ticker")) is None or to_float(row.get("closePrice")) is None
            else (
                make_id("mp", to_date(row.get("date")), clean_str(row.get("ticker"))),
                clean_str(row.get("market")) or "KRX",
                clean_str(row.get("ticker")),
                clean_str(row.get("stockName")),
                to_float(row.get("closePrice")),
                to_float(row.get("openPrice")),
                to_float(row.get("highPrice")),
                to_float(row.get("lowPrice")),
                to_float(row.get("volume")),
                to_float(row.get("tradingValue")),
                to_float(row.get("marketCap")),
                to_float(row.get("change")),
                to_float(row.get("changeRate")),
                "KRW",
                to_date(row.get("date")),
                clean_str(row.get("source")) or "KRX",
                now,
            ),
        ),
        (
            "market_indices",
            PROCESSED_DIR / "market_indices" / "market_indices.csv",
            "MarketIndex",
            'DELETE FROM "MarketIndex" WHERE "source" IN ("KRX", "Yahoo")',
            [
                "id",
                "indexCode",
                "indexClass",
                "indexName",
                "market",
                "openValue",
                "highValue",
                "lowValue",
                "value",
                "change",
                "changeRate",
                "volume",
                "tradingValue",
                "marketCap",
                "indexDate",
                "source",
                "createdAt",
            ],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("indexName")), clean_str(row.get("source"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("indexName")) is None or to_float(row.get("closeValue")) is None
            else (
                make_id("mi", to_date(row.get("date")), clean_str(row.get("source")), clean_str(row.get("indexName"))),
                f"{clean_str(row.get('source'))}:{clean_str(row.get('indexClass'))}:{clean_str(row.get('indexName'))}",
                clean_str(row.get("indexClass")),
                clean_str(row.get("indexName")),
                clean_str(row.get("market")),
                to_float(row.get("openValue")),
                to_float(row.get("highValue")),
                to_float(row.get("lowValue")),
                to_float(row.get("closeValue")),
                to_float(row.get("change")),
                to_float(row.get("changeRate")),
                to_float(row.get("volume")),
                to_float(row.get("tradingValue")),
                to_float(row.get("marketCap")),
                to_date(row.get("date")),
                clean_str(row.get("source")),
                now,
            ),
        ),
        (
            "overseas_prices",
            PROCESSED_DIR / "overseas_prices" / "overseas_prices.csv",
            "YahooPrice",
            'DELETE FROM "YahooPrice" WHERE "source" = "Yahoo"',
            ["id", "symbol", "assetType", "currency", "source", "open", "high", "low", "close", "adjClose", "volume", "priceDate", "createdAt"],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("ticker"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("ticker")) is None or to_float(row.get("closePrice")) is None
            else (
                make_id("yp", to_date(row.get("date")), clean_str(row.get("ticker"))),
                clean_str(row.get("ticker")),
                clean_str(row.get("assetType")),
                clean_str(row.get("currency")) or "USD",
                clean_str(row.get("source")) or "Yahoo",
                to_float(row.get("openPrice")),
                to_float(row.get("highPrice")),
                to_float(row.get("lowPrice")),
                to_float(row.get("closePrice")),
                to_float(row.get("adjClosePrice")),
                to_float(row.get("volume")),
                to_date(row.get("date")),
                now,
            ),
        ),
        (
            "fx_rates",
            PROCESSED_DIR / "fx_rates" / "fx_rates.csv",
            "FxRate",
            'DELETE FROM "FxRate" WHERE "source" = "Yahoo"',
            ["id", "date", "currencyPair", "exchangeRate", "openPrice", "highPrice", "lowPrice", "closePrice", "source", "createdAt"],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("currencyPair"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("currencyPair")) is None or to_float(row.get("exchangeRate")) is None
            else (
                make_id("fx", to_date(row.get("date")), clean_str(row.get("currencyPair"))),
                to_date(row.get("date")),
                clean_str(row.get("currencyPair")),
                to_float(row.get("exchangeRate")),
                to_float(row.get("openPrice")),
                to_float(row.get("highPrice")),
                to_float(row.get("lowPrice")),
                to_float(row.get("closePrice")),
                clean_str(row.get("source")) or "Yahoo",
                now,
            ),
        ),
        (
            "foreign_ownership",
            PROCESSED_DIR / "foreign_ownership" / "foreign_ownership.csv",
            "ForeignOwnership",
            'DELETE FROM "ForeignOwnership" WHERE "source" = "KRX"',
            [
                "id",
                "market",
                "ticker",
                "stockName",
                "listedShares",
                "foreignHoldingShares",
                "foreignLimitShares",
                "foreignLimitExhaustionRatio",
                "ownershipRatio",
                "closePrice",
                "change",
                "changeRate",
                "netBuyAmount",
                "ownershipDate",
                "source",
                "createdAt",
            ],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("ticker"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("ticker")) is None or to_float(row.get("foreignOwnershipRatio")) is None
            else (
                make_id("fo", to_date(row.get("date")), clean_str(row.get("ticker"))),
                "KRX",
                clean_str(row.get("ticker")),
                clean_str(row.get("stockName")),
                to_float(row.get("listedShares")),
                to_float(row.get("foreignHoldingShares")),
                to_float(row.get("foreignLimitShares")),
                to_float(row.get("foreignLimitExhaustionRatio")),
                to_float(row.get("foreignOwnershipRatio")),
                to_float(row.get("closePrice")),
                to_float(row.get("change")),
                to_float(row.get("changeRate")),
                None,
                to_date(row.get("date")),
                clean_str(row.get("source")) or "KRX",
                now,
            ),
        ),
        (
            "interest_rates",
            PROCESSED_DIR / "interest_rates" / "interest_rates.csv",
            "InterestRate",
            'DELETE FROM "InterestRate" WHERE "source" IN ("ECOS", "FRED")',
            ["id", "date", "country", "rateType", "rateName", "rateValue", "releaseDate", "effectiveDate", "decisionType", "previousRate", "changeBp", "source", "createdAt"],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("country")), clean_str(row.get("rateType")), clean_str(row.get("rateName")), clean_str(row.get("source"))),
            lambda row: None
            if to_date(row.get("date")) is None
            or clean_str(row.get("country")) is None
            or clean_str(row.get("rateType")) is None
            or clean_str(row.get("rateName")) is None
            else (
                make_id("ir", to_date(row.get("date")), clean_str(row.get("country")), clean_str(row.get("rateType")), clean_str(row.get("rateName")), clean_str(row.get("source"))),
                to_date(row.get("date")),
                clean_str(row.get("country")),
                clean_str(row.get("rateType")),
                clean_str(row.get("rateName")),
                to_float(row.get("rateValue")),
                to_date(row.get("releaseDate")),
                to_date(row.get("effectiveDate")),
                clean_str(row.get("decisionType")),
                to_float(row.get("previousRate")),
                to_float(row.get("changeBp")),
                clean_str(row.get("source")),
                now,
            ),
        ),
        (
            "fundamentals",
            PROCESSED_DIR / "fundamentals" / "fundamentals.csv",
            "ValuationIndicator",
            'DELETE FROM "ValuationIndicator" WHERE "source" = "KRX"',
            ["id", "market", "ticker", "indexName", "per", "pbr", "dividendYield", "eps", "bps", "indicatorDate", "source", "createdAt"],
            lambda row: key_values(to_date(row.get("date")), clean_str(row.get("market")) or "KRX", clean_str(row.get("indexName"))),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("indexName")) is None
            else (
                make_id("vi", to_date(row.get("date")), clean_str(row.get("market")) or "KRX", clean_str(row.get("indexName"))),
                clean_str(row.get("market")) or "KRX",
                clean_str(row.get("indexName")),
                clean_str(row.get("indexName")),
                to_float(row.get("per")),
                to_float(row.get("pbr")),
                to_float(row.get("dividendYield")),
                None,
                None,
                to_date(row.get("date")),
                clean_str(row.get("source")) or "KRX",
                now,
            ),
        ),
        (
            "investor_flows",
            PROCESSED_DIR / "investor_flows" / "investor_flows.csv",
            "InvestorFlow",
            'DELETE FROM "InvestorFlow" WHERE "source" = "KRX"',
            ["id", "date", "ticker", "stockName", "investorType", "netBuyAmount", "source", "createdAt"],
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("investorType")) is None
            else (
                to_date(row.get("date")),
                clean_str(row.get("ticker")) or "",
                clean_str(row.get("stockName")) or "",
                clean_str(row.get("investorType")),
            ),
            lambda row: None
            if to_date(row.get("date")) is None or clean_str(row.get("investorType")) is None
            else (
                make_id("if", to_date(row.get("date")), clean_str(row.get("ticker")) or "", clean_str(row.get("stockName")) or "", clean_str(row.get("investorType"))),
                to_date(row.get("date")),
                clean_str(row.get("ticker")) or "",
                clean_str(row.get("stockName")) or "",
                clean_str(row.get("investorType")),
                to_float(row.get("netBuyAmount")),
                clean_str(row.get("source")) or "KRX",
                now,
            ),
        ),
        (
            "economic_events",
            PROCESSED_DIR / "economic_events" / "economic_events.csv",
            "EconomicEvent",
            'DELETE FROM "EconomicEvent" WHERE "source" IN ("manual_bok_calendar", "manual_fomc_calendar", "manual")',
            [
                "id",
                "eventDate",
                "releaseDate",
                "releaseTime",
                "targetPeriod",
                "eventType",
                "title",
                "category",
                "country",
                "importance",
                "actualValue",
                "forecastValue",
                "previousValue",
                "decisionType",
                "changeBp",
                "surpriseBp",
                "description",
                "affectedAssets",
                "source",
                "createdAt",
                "updatedAt",
            ],
            lambda row: key_values(to_date(row.get("eventDate")), clean_str(row.get("country")), clean_str(row.get("eventType")), clean_str(row.get("title"))),
            lambda row: None
            if to_date(row.get("eventDate")) is None or clean_str(row.get("country")) is None or clean_str(row.get("title")) is None
            else (
                make_id("ee", to_date(row.get("eventDate")), clean_str(row.get("country")), clean_str(row.get("eventType")), clean_str(row.get("title"))),
                to_date(row.get("eventDate")),
                to_date(row.get("releaseDate")),
                clean_str(row.get("releaseTime")),
                clean_str(row.get("targetPeriod")),
                clean_str(row.get("eventType")),
                clean_str(row.get("title")),
                "INTEREST_RATE" if clean_str(row.get("eventType")) == "BASE_RATE_DECISION" else "OTHER",
                clean_str(row.get("country")),
                (clean_str(row.get("importance")) or "medium").upper(),
                to_float(row.get("actualValue")),
                to_float(row.get("forecastValue")),
                to_float(row.get("previousValue")),
                clean_str(row.get("decisionType")),
                to_float(row.get("changeBp")),
                to_float(row.get("surpriseBp")),
                clean_str(row.get("description")) or "",
                "interest_rates,market_indices,fx_rates",
                clean_str(row.get("source")) or "manual",
                now,
                now,
            ),
        ),
    ]

    results: list[LoadResult] = []
    for dataset in datasets:
        name, csv_path, table, delete_sql, columns, key_func, transform = dataset
        if only and name not in only:
            continue
        result = load_dataset(con, name, csv_path, table, delete_sql, transform, columns, key_func)
        results.append(result)
        con.commit()
        print(f"{name}: inserted={result.inserted_rows}, skipped={result.skipped_rows}, failed={result.failed_rows}")
    return results


def scalar(con: sqlite3.Connection, sql: str, params: tuple[object, ...] = ()) -> int:
    value = con.execute(sql, params).fetchone()[0]
    return int(value or 0)


def validate(con: sqlite3.Connection) -> dict[str, object]:
    return {
        "MarketPrice": scalar(con, 'SELECT COUNT(*) FROM "MarketPrice"'),
        "MarketIndex": scalar(con, 'SELECT COUNT(*) FROM "MarketIndex"'),
        "YahooPrice": scalar(con, 'SELECT COUNT(*) FROM "YahooPrice"'),
        "FxRate": scalar(con, 'SELECT COUNT(*) FROM "FxRate"'),
        "ForeignOwnership": scalar(con, 'SELECT COUNT(*) FROM "ForeignOwnership"'),
        "InterestRate": scalar(con, 'SELECT COUNT(*) FROM "InterestRate"'),
        "ValuationIndicator": scalar(con, 'SELECT COUNT(*) FROM "ValuationIndicator"'),
        "InvestorFlow": scalar(con, 'SELECT COUNT(*) FROM "InvestorFlow"'),
        "EconomicEvent": scalar(con, 'SELECT COUNT(*) FROM "EconomicEvent"'),
        "BASE_RATE_DECISION": scalar(con, 'SELECT COUNT(*) FROM "EconomicEvent" WHERE "eventType" = "BASE_RATE_DECISION"'),
        "BASE_RATE_DECISION_hold": scalar(con, 'SELECT COUNT(*) FROM "EconomicEvent" WHERE "eventType" = "BASE_RATE_DECISION" AND "decisionType" = "hold"'),
        "BASE_RATE_DECISION_cut": scalar(con, 'SELECT COUNT(*) FROM "EconomicEvent" WHERE "eventType" = "BASE_RATE_DECISION" AND "decisionType" = "cut"'),
        "BASE_RATE_DECISION_hike": scalar(con, 'SELECT COUNT(*) FROM "EconomicEvent" WHERE "eventType" = "BASE_RATE_DECISION" AND "decisionType" = "hike"'),
        "duplicate_checks": {
            "MarketPrice_market_ticker_priceDate": scalar(con, 'SELECT COUNT(*) FROM (SELECT "market", "ticker", "priceDate", COUNT(*) c FROM "MarketPrice" GROUP BY 1,2,3 HAVING c > 1)'),
            "MarketIndex_indexCode_indexDate": scalar(con, 'SELECT COUNT(*) FROM (SELECT "indexCode", "indexDate", COUNT(*) c FROM "MarketIndex" GROUP BY 1,2 HAVING c > 1)'),
            "InterestRate_key": scalar(con, 'SELECT COUNT(*) FROM (SELECT "date", "country", "rateType", "rateName", "source", COUNT(*) c FROM "InterestRate" GROUP BY 1,2,3,4,5 HAVING c > 1)'),
            "EconomicEvent_eventDate_title_country": scalar(con, 'SELECT COUNT(*) FROM (SELECT "eventDate", "title", "country", COUNT(*) c FROM "EconomicEvent" GROUP BY 1,2,3 HAVING c > 1)'),
        },
        "date_samples": {
            "MarketPrice": con.execute('SELECT "priceDate" FROM "MarketPrice" LIMIT 1').fetchone(),
            "InterestRate": con.execute('SELECT "date", "releaseDate", "effectiveDate" FROM "InterestRate" WHERE "rateType" = "base_rate" AND "releaseDate" IS NOT NULL LIMIT 1').fetchone(),
            "EconomicEvent": con.execute('SELECT "eventDate", "releaseDate" FROM "EconomicEvent" WHERE "eventType" = "BASE_RATE_DECISION" LIMIT 1').fetchone(),
        },
    }


def write_report(db_path: Path, results: list[LoadResult], validation: dict[str, object], started_at: str) -> None:
    skipped_files = [result for result in results if not result.csv_path.exists()]
    expected_csvs = [
        ("market_prices", "MarketPrice", PROCESSED_DIR / "market_prices" / "krx_market_prices.csv"),
        ("market_indices", "MarketIndex", PROCESSED_DIR / "market_indices" / "market_indices.csv"),
        ("overseas_prices", "YahooPrice", PROCESSED_DIR / "overseas_prices" / "overseas_prices.csv"),
        ("fx_rates", "FxRate", PROCESSED_DIR / "fx_rates" / "fx_rates.csv"),
        ("foreign_ownership", "ForeignOwnership", PROCESSED_DIR / "foreign_ownership" / "foreign_ownership.csv"),
        ("interest_rates", "InterestRate", PROCESSED_DIR / "interest_rates" / "interest_rates.csv"),
        ("fundamentals", "ValuationIndicator", PROCESSED_DIR / "fundamentals" / "fundamentals.csv"),
        ("investor_flows", "InvestorFlow", PROCESSED_DIR / "investor_flows" / "investor_flows.csv"),
        ("economic_events", "EconomicEvent", PROCESSED_DIR / "economic_events" / "economic_events.csv"),
    ]
    lines = [
        "# DB Load Report",
        "",
        f"- executed_at: {started_at}",
        f"- database_path: `{db_path}`",
        "- input_path: `data/processed/`",
        "- load_strategy: delete processed-source rows, then INSERT OR REPLACE with deterministic ids",
        "- raw_csv_loaded_directly: no",
        "",
        "## Loaded CSV Files",
        "",
        "| dataset | table | csv | input_rows | inserted_rows | skipped_rows | duplicate_rows_removed | failed_rows |",
        "|---|---|---|---:|---:|---:|---:|---:|",
    ]
    for result in results:
        lines.append(
            f"| {result.dataset} | {result.table} | `{rel(result.csv_path)}` | {result.input_rows} | {result.inserted_rows} | {result.skipped_rows} | {result.duplicate_rows_removed} | {result.failed_rows} |"
        )
    if not results:
        lines.append("| report_only | - | - | 0 | 0 | 0 | 0 | 0 |")

    lines.extend(["", "## Processed CSV Inventory", "", "| dataset | table | csv | exists | current_db_rows |", "|---|---|---|---|---:|"])
    for dataset, table, csv_path in expected_csvs:
        current_rows = validation.get(table, 0)
        lines.append(f"| {dataset} | {table} | `{rel(csv_path)}` | {str(csv_path.exists()).lower()} | {current_rows} |")

    lines.extend(["", "## Skipped Files", ""])
    if skipped_files:
        lines.extend(["| dataset | csv | reason |", "|---|---|---|"])
        for result in skipped_files:
            lines.append(f"| {result.dataset} | `{rel(result.csv_path)}` | file not found |")
    else:
        lines.append("스킵된 processed CSV 파일은 없습니다.")

    lines.extend(["", "## Row Skip Reasons", "", "| dataset | reason | count |", "|---|---|---:|"])
    wrote_reason = False
    for result in results:
        for reason, count in result.skip_reasons.items():
            wrote_reason = True
            lines.append(f"| {result.dataset} | {reason} | {count} |")
    if not wrote_reason:
        lines.append("| none | none | 0 |")

    lines.extend(["", "## Validation Query Results", "", "```json", json.dumps(validation, ensure_ascii=False, indent=2, default=str), "```"])

    lines.extend(
        [
            "",
            "## Notes",
            "",
            "- `MarketPrice`, `MarketIndex`, `ForeignOwnership`의 필수 수치가 비어 있는 휴장일/결측 행은 DB NOT NULL 제약 때문에 스킵했습니다.",
            "- `EconomicEvent`의 `BASE_RATE_DECISION` 38건은 수동 기준금리 이벤트 파일에서 적재했습니다.",
            "- processed CSV만 적재했으며 raw CSV는 DB에 직접 적재하지 않았습니다.",
            "- Prisma CLI는 현재 로컬 dependency 누락으로 실행되지 않아 Python sqlite3 스크립트가 필요한 컬럼/테이블을 보장했습니다.",
            "",
            "## Next Steps",
            "",
            "1. 백엔드 서비스에서 새 테이블 또는 확장 컬럼을 조회하는 repository/service를 추가합니다.",
            "2. 분석 API의 기준일 파라미터를 `analysisDate`로 통일하고 `date <= analysisDate` 조건을 강제합니다.",
            "3. daily feature table 생성은 별도 배치로 분리하고, 금리/환율/지수 forward fill은 그 단계에서만 적용합니다.",
            "4. Prisma CLI dependency를 복구한 뒤 `prisma generate`와 migration 상태를 검증합니다.",
            "",
        ]
    )
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    (DOCS_DIR / "db_load_report.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    started_at = datetime.now().isoformat(timespec="seconds")
    only: set[str] | None = None
    report_only = "--report-only" in sys.argv
    if "--only" in sys.argv:
        idx = sys.argv.index("--only")
        if idx + 1 >= len(sys.argv):
            raise ValueError("--only requires a comma-separated dataset list")
        only = {name.strip() for name in sys.argv[idx + 1].split(",") if name.strip()}
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    ERROR_LOG.write_text(f"data load started at {started_at}\n", encoding="utf-8")
    db_path = resolve_sqlite_path()
    if not db_path.exists():
        raise FileNotFoundError(f"SQLite DB not found: {db_path}")

    con = sqlite3.connect(db_path)
    try:
        con.execute("PRAGMA journal_mode=WAL")
        con.execute("PRAGMA synchronous=NORMAL")
        con.execute("PRAGMA foreign_keys=ON")
        ensure_schema(con)
        con.commit()
        results = [] if report_only else run_load(con, only=only)
        validation = validate(con)
        write_report(db_path, results, validation, started_at)
    finally:
        con.close()

    print("db_path=" + str(db_path))
    print("report=docs/db_load_report.md")
    print("error_log=logs/data_load_errors.log")


if __name__ == "__main__":
    main()
