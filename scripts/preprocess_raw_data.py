from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
DOCS_DIR = PROJECT_ROOT / "docs"

ENCODINGS = ("utf-8-sig", "cp949", "euc-kr")
NULL_TOKENS = {"", "-", "nan", "na", "n/a", "null", "none"}


SCHEMAS = {
    "market_prices": [
        "date",
        "ticker",
        "stockName",
        "market",
        "closePrice",
        "openPrice",
        "highPrice",
        "lowPrice",
        "volume",
        "tradingValue",
        "marketCap",
        "change",
        "changeRate",
        "source",
    ],
    "market_indices": [
        "date",
        "indexClass",
        "indexName",
        "market",
        "openValue",
        "highValue",
        "lowValue",
        "closeValue",
        "change",
        "changeRate",
        "volume",
        "tradingValue",
        "marketCap",
        "source",
    ],
    "overseas_prices": [
        "date",
        "ticker",
        "assetType",
        "openPrice",
        "highPrice",
        "lowPrice",
        "closePrice",
        "adjClosePrice",
        "volume",
        "currency",
        "source",
    ],
    "fx_rates": [
        "date",
        "currencyPair",
        "exchangeRate",
        "openPrice",
        "highPrice",
        "lowPrice",
        "closePrice",
        "source",
    ],
    "foreign_ownership": [
        "date",
        "ticker",
        "stockName",
        "listedShares",
        "foreignHoldingShares",
        "foreignLimitShares",
        "foreignLimitExhaustionRatio",
        "foreignOwnershipRatio",
        "closePrice",
        "change",
        "changeRate",
        "source",
    ],
    "interest_rates": [
        "date",
        "country",
        "rateType",
        "rateName",
        "rateValue",
        "releaseDate",
        "effectiveDate",
        "decisionType",
        "previousRate",
        "changeBp",
        "source",
    ],
    "fundamentals": [
        "date",
        "market",
        "indexName",
        "per",
        "pbr",
        "dividendYield",
        "source",
    ],
    "investor_flows": [
        "date",
        "ticker",
        "stockName",
        "investorType",
        "netBuyAmount",
        "source",
    ],
    "economic_events": [
        "eventDate",
        "releaseDate",
        "releaseTime",
        "targetPeriod",
        "country",
        "eventType",
        "title",
        "importance",
        "actualValue",
        "forecastValue",
        "previousValue",
        "decisionType",
        "changeBp",
        "surpriseBp",
        "description",
        "source",
    ],
}


OUTPUTS = {
    "market_prices": PROCESSED_DIR / "market_prices" / "krx_market_prices.csv",
    "market_indices": PROCESSED_DIR / "market_indices" / "market_indices.csv",
    "overseas_prices": PROCESSED_DIR / "overseas_prices" / "overseas_prices.csv",
    "fx_rates": PROCESSED_DIR / "fx_rates" / "fx_rates.csv",
    "foreign_ownership": PROCESSED_DIR / "foreign_ownership" / "foreign_ownership.csv",
    "interest_rates": PROCESSED_DIR / "interest_rates" / "interest_rates.csv",
    "fundamentals": PROCESSED_DIR / "fundamentals" / "fundamentals.csv",
    "investor_flows": PROCESSED_DIR / "investor_flows" / "investor_flows.csv",
    "economic_events": PROCESSED_DIR / "economic_events" / "economic_events.csv",
}


@dataclass
class ProcessedDataset:
    name: str
    output_path: Path
    input_files: int = 0
    input_rows: int = 0
    output_rows: int = 0
    duplicate_rows_removed: int = 0
    null_counts: dict[str, int] = field(default_factory=dict)
    rows: list[dict[str, object]] = field(default_factory=list)
    seen_keys: set[tuple[str, ...]] = field(default_factory=set)


@dataclass
class SkippedFile:
    path: Path
    dataset: str
    reason: str


def rel(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def is_null(value: object) -> bool:
    if value is None:
        return True
    return str(value).strip().lower() in NULL_TOKENS


def clean_string(value: object) -> str:
    if is_null(value):
        return ""
    return str(value).strip()


def clean_number(value: object) -> str:
    text = clean_string(value)
    if not text:
        return ""
    text = text.replace(",", "").replace("%", "").strip()
    if is_null(text):
        return ""
    try:
        number = float(text)
    except ValueError:
        return ""
    if number.is_integer():
        return str(int(number))
    return format(number, ".12g")


def number_or_none(value: object) -> float | None:
    text = clean_number(value)
    if not text:
        return None
    return float(text)


def clean_date(value: object) -> str:
    text = clean_string(value)
    if not text:
        return ""
    for pattern in ("%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d", "%Y%m%d"):
        try:
            return datetime.strptime(text, pattern).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return ""


def get(row: dict[str, str], *names: str) -> str:
    for name in names:
        if name in row:
            return row[name]
    lower_lookup = {key.lower(): value for key, value in row.items()}
    for name in names:
        if name.lower() in lower_lookup:
            return lower_lookup[name.lower()]
    return ""


def read_csv(path: Path) -> tuple[list[dict[str, str]], str]:
    last_error = ""
    for encoding in ENCODINGS:
        try:
            text = path.read_text(encoding=encoding)
            rows = list(csv.DictReader(text.splitlines()))
            return rows, encoding
        except UnicodeDecodeError as exc:
            last_error = str(exc)
        except csv.Error as exc:
            last_error = str(exc)
    raise ValueError(f"could not read CSV with supported encodings: {last_error}")


def load_base_rate_decision_events() -> dict[tuple[str, str], dict[str, str]]:
    path = RAW_DIR / "events" / "base_rate_decisions_manual.csv"
    if not path.exists():
        return {}
    rows, _ = read_csv(path)
    events: dict[tuple[str, str], dict[str, str]] = {}
    for row in rows:
        country = clean_string(get(row, "country"))
        event_date = clean_date(get(row, "eventDate", "event_date"))
        event_type = clean_string(get(row, "eventType", "event_type"))
        if country and event_date and event_type == "BASE_RATE_DECISION":
            events[(country, event_date)] = row
    return events


def add_rows(
    dataset: ProcessedDataset,
    rows: Iterable[dict[str, object]],
    key_fields: list[str],
) -> None:
    for row in rows:
        normalized = {field: row.get(field, "") for field in SCHEMAS[dataset.name]}
        key = tuple(str(normalized.get(field, "")) for field in key_fields)
        if key in dataset.seen_keys:
            dataset.duplicate_rows_removed += 1
            continue
        dataset.seen_keys.add(key)
        dataset.rows.append(normalized)


def write_dataset(dataset: ProcessedDataset) -> None:
    dataset.output_path.parent.mkdir(parents=True, exist_ok=True)
    schema = SCHEMAS[dataset.name]
    dataset.rows.sort(key=lambda row: tuple(str(row.get(field, "")) for field in sort_fields(dataset.name)))
    dataset.output_rows = len(dataset.rows)
    dataset.null_counts = {
        field: sum(1 for row in dataset.rows if is_null(row.get(field, ""))) for field in schema
    }
    with dataset.output_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=schema)
        writer.writeheader()
        writer.writerows(dataset.rows)


def sort_fields(dataset_name: str) -> list[str]:
    if dataset_name == "economic_events":
        return ["releaseDate", "eventDate", "country", "eventType"]
    if dataset_name == "fundamentals":
        return ["date", "market", "indexName"]
    if dataset_name == "interest_rates":
        return ["date", "country", "rateType", "rateName"]
    if dataset_name == "investor_flows":
        return ["date", "stockName", "investorType"]
    if dataset_name == "market_indices":
        return ["date", "source", "indexClass", "indexName"]
    if dataset_name == "fx_rates":
        return ["date", "currencyPair"]
    return ["date", "ticker"]


def process_market_prices(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    for path in sorted((RAW_DIR / "krx_stat").glob("krx_all_stocks_*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows or not {"date", "ticker"}.issubset(raw_rows[0].keys()):
                skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, ticker"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date", "일자", "날짜"))
                ticker = clean_string(get(row, "ticker", "종목코드", "단축코드")).zfill(6)
                if not date or not ticker:
                    continue
                transformed.append(
                    {
                        "date": date,
                        "ticker": ticker,
                        "stockName": clean_string(get(row, "stock_name", "stockName", "종목명")),
                        "market": clean_string(get(row, "market", "시장구분")),
                        "closePrice": clean_number(get(row, "close", "종가")),
                        "openPrice": clean_number(get(row, "open", "시가")),
                        "highPrice": clean_number(get(row, "high", "고가")),
                        "lowPrice": clean_number(get(row, "low", "저가")),
                        "volume": clean_number(get(row, "volume", "거래량")),
                        "tradingValue": clean_number(get(row, "trading_value", "거래대금")),
                        "marketCap": clean_number(get(row, "market_cap", "시가총액")),
                        "change": clean_number(get(row, "change", "대비")),
                        "changeRate": clean_number(get(row, "change_rate", "등락률")),
                        "source": "KRX",
                    }
                )
            add_rows(dataset, transformed, ["date", "ticker"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def process_market_indices(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    krx_patterns = ["kospi_index_*.csv", "kosdaq_index_*.csv", "krx_index_*.csv"]
    for pattern in krx_patterns:
        for path in sorted((RAW_DIR / "krx").glob(pattern)):
            try:
                raw_rows, _ = read_csv(path)
                dataset.input_files += 1
                dataset.input_rows += len(raw_rows)
                if not raw_rows or not {"date", "index_name", "close"}.issubset(raw_rows[0].keys()):
                    skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, index_name, close"))
                    continue
                transformed = []
                for row in raw_rows:
                    date = clean_date(get(row, "date"))
                    if not date:
                        continue
                    index_class = clean_string(get(row, "index_class"))
                    transformed.append(
                        {
                            "date": date,
                            "indexClass": index_class,
                            "indexName": clean_string(get(row, "index_name")),
                            "market": index_class,
                            "openValue": clean_number(get(row, "open")),
                            "highValue": clean_number(get(row, "high")),
                            "lowValue": clean_number(get(row, "low")),
                            "closeValue": clean_number(get(row, "close")),
                            "change": clean_number(get(row, "change")),
                            "changeRate": clean_number(get(row, "change_rate")),
                            "volume": clean_number(get(row, "volume")),
                            "tradingValue": clean_number(get(row, "trading_value")),
                            "marketCap": clean_number(get(row, "market_cap")),
                            "source": "KRX",
                        }
                    )
                add_rows(dataset, transformed, ["date", "source", "indexClass", "indexName"])
            except Exception as exc:
                skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))

    for path in sorted((RAW_DIR / "yahoo" / "indices").glob("*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows or not {"date", "close"}.issubset(raw_rows[0].keys()):
                skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, close"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date"))
                if not date:
                    continue
                index_name = clean_string(get(row, "stock_name", "data_name", "ticker"))
                transformed.append(
                    {
                        "date": date,
                        "indexClass": "US",
                        "indexName": index_name,
                        "market": "US",
                        "openValue": clean_number(get(row, "open")),
                        "highValue": clean_number(get(row, "high")),
                        "lowValue": clean_number(get(row, "low")),
                        "closeValue": clean_number(get(row, "close", "Close")),
                        "change": "",
                        "changeRate": "",
                        "volume": clean_number(get(row, "volume")),
                        "tradingValue": "",
                        "marketCap": "",
                        "source": "Yahoo",
                    }
                )
            add_rows(dataset, transformed, ["date", "source", "indexName"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def process_overseas_prices(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    inputs = [
        (RAW_DIR / "yahoo" / "overseas_stocks", "overseas_stock"),
        (RAW_DIR / "yahoo" / "etfs", "etf"),
    ]
    for directory, asset_type in inputs:
        for path in sorted(directory.glob("*.csv")):
            try:
                raw_rows, _ = read_csv(path)
                dataset.input_files += 1
                dataset.input_rows += len(raw_rows)
                if not raw_rows or not {"date", "close"}.issubset(raw_rows[0].keys()):
                    skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, close"))
                    continue
                transformed = []
                fallback_ticker = ticker_from_yahoo_filename(path.name)
                for row in raw_rows:
                    date = clean_date(get(row, "date"))
                    ticker = clean_string(get(row, "ticker")) or fallback_ticker
                    ticker = normalize_yahoo_ticker(ticker)
                    if not date or not ticker:
                        continue
                    transformed.append(
                        {
                            "date": date,
                            "ticker": ticker,
                            "assetType": asset_type,
                            "openPrice": clean_number(get(row, "open")),
                            "highPrice": clean_number(get(row, "high")),
                            "lowPrice": clean_number(get(row, "low")),
                            "closePrice": clean_number(get(row, "close")),
                            "adjClosePrice": clean_number(get(row, "adj_close", "Adj Close")),
                            "volume": clean_number(get(row, "volume")),
                            "currency": "USD",
                            "source": "Yahoo",
                        }
                    )
                add_rows(dataset, transformed, ["date", "ticker"])
            except Exception as exc:
                skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def ticker_from_yahoo_filename(name: str) -> str:
    match = re.search(r"yahoo_(?:overseas_stock|us_etf)_([^_]+)_", name, re.IGNORECASE)
    return match.group(1).upper() if match else ""


def normalize_yahoo_ticker(ticker: str) -> str:
    return ticker.replace(".US", "").upper()


def process_fx_rates(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    for path in sorted((RAW_DIR / "yahoo" / "fx").glob("*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows or not {"date", "close"}.issubset(raw_rows[0].keys()):
                skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, close"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date"))
                if not date:
                    continue
                close_price = clean_number(get(row, "close"))
                transformed.append(
                    {
                        "date": date,
                        "currencyPair": "USD_KRW",
                        "exchangeRate": close_price,
                        "openPrice": clean_number(get(row, "open")),
                        "highPrice": clean_number(get(row, "high")),
                        "lowPrice": clean_number(get(row, "low")),
                        "closePrice": close_price,
                        "source": "Yahoo",
                    }
                )
            add_rows(dataset, transformed, ["date", "currencyPair"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def process_foreign_ownership(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    for path in sorted((RAW_DIR / "krx_stat").glob("foreign_ownership_*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows or not {"date", "ticker"}.issubset(raw_rows[0].keys()):
                skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, ticker"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date"))
                ticker = clean_string(get(row, "ticker", "종목코드")).zfill(6)
                if not date or not ticker:
                    continue
                transformed.append(
                    {
                        "date": date,
                        "ticker": ticker,
                        "stockName": clean_string(get(row, "stock_name", "stockName", "종목명")),
                        "listedShares": clean_number(get(row, "listed_shares", "상장주식수")),
                        "foreignHoldingShares": clean_number(get(row, "foreign_holding_shares", "외국인보유수량")),
                        "foreignLimitShares": clean_number(get(row, "foreign_limit_shares", "외국인한도수량")),
                        "foreignLimitExhaustionRatio": clean_number(get(row, "foreign_limit_exhaustion_ratio", "외국인한도소진율")),
                        "foreignOwnershipRatio": clean_number(get(row, "foreign_ownership_ratio", "외국인 지분율", "외국인지분율")),
                        "closePrice": clean_number(get(row, "close", "종가")),
                        "change": clean_number(get(row, "change", "대비")),
                        "changeRate": clean_number(get(row, "change_rate", "등락률")),
                        "source": "KRX",
                    }
                )
            add_rows(dataset, transformed, ["date", "ticker"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def process_interest_rates(
    dataset: ProcessedDataset,
    skipped: list[SkippedFile],
    warnings: list[str],
    base_rate_events: dict[tuple[str, str], dict[str, str]],
) -> None:
    base_inputs = [
        (RAW_DIR / "ecos" / "base_rates", "*.csv", "KR", "base_rate", "한국은행 기준금리", "ECOS"),
        (RAW_DIR / "fred" / "rates", "fred_dff_us_federal_funds_rate.csv", "US", "base_rate", "Federal Funds Effective Rate", "FRED"),
    ]
    for directory, pattern, country, rate_type, rate_name, source in base_inputs:
        for path in sorted(directory.glob(pattern)):
            try:
                raw_rows, _ = read_csv(path)
                dataset.input_files += 1
                dataset.input_rows += len(raw_rows)
                if not raw_rows or not {"date", "rate_value"}.issubset(raw_rows[0].keys()):
                    skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, rate_value"))
                    continue
                transformed = []
                previous_rate: float | None = None
                for row in sorted(raw_rows, key=lambda item: clean_date(get(item, "date"))):
                    date = clean_date(get(row, "date"))
                    rate_value = number_or_none(get(row, "rate_value", "value"))
                    if not date or rate_value is None:
                        continue
                    manual_event = base_rate_events.get((country, date))
                    decision_type = ""
                    change_bp = ""
                    previous_rate_text = ""
                    release_date = ""
                    effective_date = date
                    if manual_event:
                        release_date = clean_date(get(manual_event, "releaseDate", "release_date")) or date
                        effective_date = clean_date(get(manual_event, "eventDate", "event_date")) or date
                        decision_type = clean_string(get(manual_event, "decisionType", "decision_type"))
                        previous_rate_text = clean_number(get(manual_event, "previousRate", "previous_rate"))
                        change_bp = clean_number(get(manual_event, "changeBp", "change_bp"))
                    elif previous_rate is not None:
                        diff = rate_value - previous_rate
                        previous_rate_text = format(previous_rate, ".12g")
                        if diff > 0:
                            decision_type = "hike"
                        elif diff < 0:
                            decision_type = "cut"
                        if diff != 0:
                            change_bp = format(diff * 100, ".12g")
                    transformed.append(
                        {
                            "date": date,
                            "country": country,
                            "rateType": rate_type,
                            "rateName": rate_name,
                            "rateValue": format(rate_value, ".12g"),
                            "releaseDate": release_date,
                            "effectiveDate": effective_date,
                            "decisionType": decision_type,
                            "previousRate": previous_rate_text,
                            "changeBp": change_bp,
                            "source": source,
                        }
                    )
                    previous_rate = rate_value
                add_rows(dataset, transformed, ["date", "country", "rateType", "rateName"])
                matched = sum(1 for row in transformed if row.get("releaseDate"))
                warnings.append(
                    f"{rel(path)}: releaseDate/effectiveDate 원본 부재. 수동 기준금리 이벤트로 {matched}개 발표일을 보완했으며 공식 출처 검증 필요."
                )
            except Exception as exc:
                skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))

    market_inputs = [
        (RAW_DIR / "ecos" / "market_rates_daily", "*.csv", "KR", "market_rate", "ECOS"),
        (RAW_DIR / "fred" / "rates", "fred_dgs10_us_10y_treasury_rate.csv", "US", "treasury_10y", "FRED"),
    ]
    for directory, pattern, country, rate_type, source in market_inputs:
        for path in sorted(directory.glob(pattern)):
            if "base_rates" in rel(path):
                continue
            try:
                raw_rows, _ = read_csv(path)
                dataset.input_files += 1
                dataset.input_rows += len(raw_rows)
                if not raw_rows or not {"date", "rate_value"}.issubset(raw_rows[0].keys()):
                    skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, rate_value"))
                    continue
                transformed = []
                for row in raw_rows:
                    date = clean_date(get(row, "date"))
                    rate_value = clean_number(get(row, "rate_value", "value"))
                    rate_name = clean_string(get(row, "item_name", "korean_name", "data_name"))
                    if not date or not rate_name:
                        continue
                    transformed.append(
                        {
                            "date": date,
                            "country": country,
                            "rateType": rate_type,
                            "rateName": rate_name,
                            "rateValue": rate_value,
                            "releaseDate": "",
                            "effectiveDate": date,
                            "decisionType": "",
                            "previousRate": "",
                            "changeBp": "",
                            "source": source,
                        }
                    )
                add_rows(dataset, transformed, ["date", "country", "rateType", "rateName"])
            except Exception as exc:
                skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def process_fundamentals(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    for path in sorted((RAW_DIR / "krx_stat").glob("krx_per_pbr_*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows or not {"date", "index_name"}.issubset(raw_rows[0].keys()):
                skipped.append(SkippedFile(path, dataset.name, "missing required columns: date, index_name"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date"))
                index_name = clean_string(get(row, "index_name", "지수명"))
                if not date or not index_name:
                    continue
                market = infer_market_from_index(index_name)
                transformed.append(
                    {
                        "date": date,
                        "market": market,
                        "indexName": index_name,
                        "per": clean_number(get(row, "per", "PER")),
                        "pbr": clean_number(get(row, "pbr", "PBR")),
                        "dividendYield": clean_number(get(row, "dividend_yield", "배당수익률")),
                        "source": "KRX",
                    }
                )
            add_rows(dataset, transformed, ["date", "market", "indexName"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def infer_market_from_index(index_name: str) -> str:
    upper = index_name.upper()
    if "KOSDAQ" in upper:
        return "KOSDAQ"
    if "KOSPI" in upper:
        return "KOSPI"
    if "KRX" in upper:
        return "KRX"
    return ""


def process_investor_flows(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    investor_map = {
        "기관 합계": "institution",
        "기관합계": "institution",
        "개인": "individual",
        "외국인 합계": "foreign",
        "외국인합계": "foreign",
        "기타법인": "other_corporation",
        "전체": "total",
    }

    for path in sorted((RAW_DIR / "krx_stat").glob("investor_trading_*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            headers = set(raw_rows[0].keys()) if raw_rows else set()
            if not headers.intersection(investor_map):
                skipped.append(SkippedFile(path, dataset.name, "wide investor flow columns not found"))
                continue
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date", "일자"))
                if not date:
                    continue
                for source_col, investor_type in investor_map.items():
                    if source_col in row:
                        transformed.append(
                            {
                                "date": date,
                                "ticker": "",
                                "stockName": "",
                                "investorType": investor_type,
                                "netBuyAmount": clean_number(row[source_col]),
                                "source": "KRX",
                            }
                        )
            add_rows(dataset, transformed, ["date", "stockName", "investorType"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))

    for path in sorted((RAW_DIR / "krx_stat").glob("investing_trade_*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            headers = set(raw_rows[0].keys()) if raw_rows else set()
            if "일자" not in headers or not headers.intersection(investor_map):
                skipped.append(SkippedFile(path, dataset.name, "missing required wide columns: 일자 and investor columns"))
                continue
            stock_name = stock_name_from_investing_file(path.name)
            transformed = []
            for row in raw_rows:
                date = clean_date(get(row, "date", "일자"))
                if not date:
                    continue
                for source_col, investor_type in investor_map.items():
                    if source_col in row:
                        transformed.append(
                            {
                                "date": date,
                                "ticker": "",
                                "stockName": stock_name,
                                "investorType": investor_type,
                                "netBuyAmount": clean_number(row[source_col]),
                                "source": "KRX",
                            }
                        )
            add_rows(dataset, transformed, ["date", "stockName", "investorType"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def stock_name_from_investing_file(name: str) -> str:
    match = re.match(r"investing_trade_(.+)_\d{2}\.csv$", name)
    return match.group(1) if match else ""


def process_economic_events(dataset: ProcessedDataset, skipped: list[SkippedFile]) -> None:
    events_dir = RAW_DIR / "events"
    if not events_dir.exists():
        return
    for path in sorted(events_dir.glob("*.csv")):
        try:
            raw_rows, _ = read_csv(path)
            dataset.input_files += 1
            dataset.input_rows += len(raw_rows)
            if not raw_rows:
                continue
            transformed = []
            for row in raw_rows:
                release_date = clean_date(get(row, "releaseDate", "release_date", "발표일", "공시일"))
                event_date = clean_date(get(row, "eventDate", "event_date", "이벤트일")) or release_date
                transformed.append(
                    {
                        "eventDate": event_date,
                        "releaseDate": release_date,
                        "releaseTime": clean_string(get(row, "releaseTime", "release_time", "발표시간")),
                        "targetPeriod": clean_string(get(row, "targetPeriod", "target_period", "targetMonth", "대상월")),
                        "country": clean_string(get(row, "country", "국가")),
                        "eventType": clean_string(get(row, "eventType", "event_type", "이벤트유형")),
                        "title": clean_string(get(row, "title", "제목")),
                        "importance": clean_string(get(row, "importance", "중요도")),
                        "actualValue": clean_number(get(row, "actualValue", "actual_value", "actualRate", "actual_rate", "실제치")),
                        "forecastValue": clean_number(get(row, "forecastValue", "forecast_value", "forecastRate", "forecast_rate", "예상치")),
                        "previousValue": clean_number(get(row, "previousValue", "previous_value", "previousRate", "previous_rate", "이전치")),
                        "decisionType": clean_string(get(row, "decisionType", "decision_type")),
                        "changeBp": clean_number(get(row, "changeBp", "change_bp")),
                        "surpriseBp": clean_number(get(row, "surpriseBp", "surprise_bp")),
                        "description": clean_string(get(row, "description", "설명")),
                        "source": clean_string(get(row, "source", "출처")) or "manual",
                    }
                )
            add_rows(dataset, transformed, ["releaseDate", "eventDate", "country", "eventType", "title"])
        except Exception as exc:
            skipped.append(SkippedFile(path, dataset.name, f"{type(exc).__name__}: {exc}"))


def validate_outputs(datasets: dict[str, ProcessedDataset], warnings: list[str]) -> None:
    date_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")
    for dataset in datasets.values():
        date_fields = [field for field in ("date", "releaseDate", "effectiveDate", "eventDate") if field in SCHEMAS[dataset.name]]
        for field in date_fields:
            invalid = sum(
                1
                for row in dataset.rows
                if clean_string(row.get(field, "")) and not date_re.fullmatch(str(row.get(field, "")))
            )
            if invalid:
                warnings.append(f"{rel(dataset.output_path)}: {field} YYYY-MM-DD 형식 위반 {invalid}건")
        if dataset.name in {"market_prices", "foreign_ownership", "overseas_prices"}:
            short_ticker = sum(1 for row in dataset.rows if row.get("ticker") and not isinstance(row.get("ticker"), str))
            if short_ticker:
                warnings.append(f"{rel(dataset.output_path)}: ticker 문자열 유지 위반 가능 {short_ticker}건")


def write_report(
    datasets: dict[str, ProcessedDataset],
    skipped: list[SkippedFile],
    warnings: list[str],
    processed_at: str,
) -> None:
    lines = [
        "# Preprocessing Report",
        "",
        f"- executed_at: {processed_at}",
        f"- input_raw_path: `data/raw/`",
        f"- output_processed_path: `data/processed/`",
        f"- processed_raw_file_count: {sum(dataset.input_files for dataset in datasets.values())}",
        f"- skipped_file_count: {len(skipped)}",
        "",
        "## Generated Processed Files",
        "",
        "| dataset | path | rows | columns | input_files | input_rows | duplicate_rows_removed |",
        "|---|---|---:|---:|---:|---:|---:|",
    ]
    for name, dataset in datasets.items():
        lines.append(
            f"| {name} | `{rel(dataset.output_path)}` | {dataset.output_rows} | {len(SCHEMAS[name])} | {dataset.input_files} | {dataset.input_rows} | {dataset.duplicate_rows_removed} |"
        )

    lines.extend(["", "## Missing Values", "", "| dataset | major_null_counts |", "|---|---|"])
    for name, dataset in datasets.items():
        major_nulls = {
            key: value
            for key, value in dataset.null_counts.items()
            if value and key not in {"decisionType", "previousRate", "changeBp", "releaseDate", "effectiveDate"}
        }
        compact = ", ".join(f"{key}={value}" for key, value in major_nulls.items()) or "none"
        lines.append(f"| {name} | {compact} |")

    lines.extend(["", "## Skipped Files", ""])
    if skipped:
        lines.extend(["| dataset | file_path | reason |", "|---|---|---|"])
        for item in skipped:
            lines.append(f"| {item.dataset} | `{rel(item.path)}` | {item.reason} |")
    else:
        lines.append("스킵한 파일은 없습니다.")

    manual_checks = [warning for warning in warnings if "수동 검증 필요" in warning]
    lines.extend(["", "## ReleaseDate / EffectiveDate Manual Checks", ""])
    if manual_checks:
        for warning in manual_checks:
            lines.append(f"- {warning}")
    else:
        lines.append("- 수동 검증 필요 항목 없음")

    lines.extend(
        [
            "",
            "## Forward Fill Status",
            "",
            "- 실제 forward fill 적용 데이터: 없음",
            "- 미적용 데이터: 기준금리, 시장금리, 환율, 지수",
            "- 이번 단계에서는 원본 관측일 기준 CSV만 생성했습니다.",
            "- 향후 daily calendar feature table 생성 단계에서 `date <= analysisDate` 조건으로 forward fill을 적용해야 합니다.",
            "- 경제 이벤트는 forward fill하지 않고 `eventDate` 또는 `releaseDate` 기준 이벤트 마커로 사용합니다.",
            "",
            "## Look-Ahead Bias Controls",
            "",
            "- 원본 `date`, `releaseDate`, `effectiveDate` 의미를 분리해 보존했습니다.",
            "- 기준금리 수준 데이터는 `effectiveDate`/`releaseDate` 이후부터만 유효한 것으로 해석해야 합니다.",
            "- CPI, FOMC, 금통위, 고용지표 등 발표성 데이터는 `targetPeriod`가 아니라 `releaseDate` 기준으로 분석에 사용해야 합니다.",
            "- 이번 작업에서는 미래 값을 과거 행에 붙이는 daily feature table을 생성하지 않았습니다.",
            "",
            "## Warnings",
            "",
        ]
    )
    if warnings:
        for warning in warnings:
            lines.append(f"- {warning}")
    else:
        lines.append("- 경고 없음")

    lines.extend(
        [
            "",
            "## Next Steps",
            "",
            "1. `data/processed/`를 `.gitignore`에 포함할지 결정합니다.",
            "2. processed CSV 스키마를 DB 테이블 DDL과 1:1로 확정합니다.",
            "3. 경제 이벤트 수동 CSV를 추가하고 `releaseDate` 기준 조인 규칙을 검증합니다.",
            "4. 영업일 캘린더를 만든 뒤 금리/환율/지수의 forward fill feature table을 별도 생성합니다.",
            "5. DB 적재 전 unique key와 nullable 정책을 마이그레이션에 반영합니다.",
            "",
        ]
    )

    (DOCS_DIR / "preprocessing_report.md").write_text("\n".join(lines), encoding="utf-8")


def write_summary(
    datasets: dict[str, ProcessedDataset],
    skipped: list[SkippedFile],
    warnings: list[str],
    processed_at: str,
) -> None:
    summary_path = PROCESSED_DIR / "metadata" / "preprocessing_summary.json"
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "processed_at": processed_at,
        "input_raw_path": "data/raw/",
        "output_processed_path": "data/processed/",
        "processed_datasets": [
            {
                "dataset": name,
                "path": rel(dataset.output_path),
                "rows": dataset.output_rows,
                "columns": len(SCHEMAS[name]),
            }
            for name, dataset in datasets.items()
        ],
        "file_counts": {name: dataset.input_files for name, dataset in datasets.items()},
        "row_counts": {name: dataset.output_rows for name, dataset in datasets.items()},
        "skipped_files": [
            {"dataset": item.dataset, "path": rel(item.path), "reason": item.reason} for item in skipped
        ],
        "warnings": warnings,
    }
    summary_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    processed_at = datetime.now().isoformat(timespec="seconds")
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    datasets = {name: ProcessedDataset(name=name, output_path=path) for name, path in OUTPUTS.items()}
    skipped: list[SkippedFile] = []
    warnings: list[str] = []
    base_rate_events = load_base_rate_decision_events()
    if base_rate_events:
        warnings.append(
            f"data/raw/events/base_rate_decisions_manual.csv: 기준금리 발표 이벤트 {len(base_rate_events)}건을 수동 입력 데이터로 사용했습니다. 추후 BOK/FOMC 공식 출처 검증 필요."
        )

    process_market_prices(datasets["market_prices"], skipped)
    process_market_indices(datasets["market_indices"], skipped)
    process_overseas_prices(datasets["overseas_prices"], skipped)
    process_fx_rates(datasets["fx_rates"], skipped)
    process_foreign_ownership(datasets["foreign_ownership"], skipped)
    process_interest_rates(datasets["interest_rates"], skipped, warnings, base_rate_events)
    process_fundamentals(datasets["fundamentals"], skipped)
    process_investor_flows(datasets["investor_flows"], skipped)
    process_economic_events(datasets["economic_events"], skipped)

    for dataset in datasets.values():
        write_dataset(dataset)

    validate_outputs(datasets, warnings)
    write_report(datasets, skipped, warnings, processed_at)
    write_summary(datasets, skipped, warnings, processed_at)

    print(f"processed_at={processed_at}")
    for name, dataset in datasets.items():
        print(f"{name}: rows={dataset.output_rows}, path={rel(dataset.output_path)}")
    print(f"skipped_files={len(skipped)}")
    print("report=docs/preprocessing_report.md")
    print("summary=data/processed/metadata/preprocessing_summary.json")


if __name__ == "__main__":
    main()
