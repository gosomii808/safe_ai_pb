from __future__ import annotations

import csv
import re
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "data" / "raw"
DOCS_DIR = PROJECT_ROOT / "docs"

ENCODINGS = ("utf-8-sig", "cp949", "euc-kr")
DELIMITERS = [",", "\t", ";", "|"]
NULL_TOKENS = {"", "-", "nan", "na", "n/a", "null", "none"}


@dataclass
class ColumnProfile:
    name: str
    samples: list[str]
    inferred_type: str
    missing_count: int


@dataclass
class FileInventory:
    path: Path
    encoding: str
    delimiter: str
    row_count: int
    column_count: int
    columns: list[ColumnProfile]


@dataclass
class FailedFile:
    path: Path
    reason: str


def rel(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def md_escape(value: object) -> str:
    text = "" if value is None else str(value)
    return text.replace("\\", "\\\\").replace("|", "\\|").replace("\n", "<br>")


def normalize_null(value: object) -> bool:
    if value is None:
        return True
    return str(value).strip().lower() in NULL_TOKENS


def cleaned_number(value: str) -> str:
    return value.strip().replace(",", "").replace("%", "")


def looks_like_int(value: str) -> bool:
    return bool(re.fullmatch(r"[-+]?\d+", cleaned_number(value)))


def looks_like_float(value: str) -> bool:
    return bool(re.fullmatch(r"[-+]?(\d+(\.\d*)?|\.\d+)", cleaned_number(value)))


def looks_like_date(value: str) -> bool:
    text = value.strip()
    patterns = ("%Y-%m-%d", "%Y.%m.%d", "%Y/%m/%d", "%Y%m%d")
    return any(_can_parse_date(text, pattern) for pattern in patterns)


def _can_parse_date(value: str, pattern: str) -> bool:
    try:
        datetime.strptime(value, pattern)
        return True
    except ValueError:
        return False


def infer_type(values: Iterable[str]) -> str:
    observed = [str(value).strip() for value in values if not normalize_null(value)]
    if not observed:
        return "string"

    sample = observed[:1000]
    if all(looks_like_date(value) for value in sample):
        return "date"
    if all(looks_like_int(value) for value in sample):
        return "integer"
    if all(looks_like_float(value) for value in sample):
        return "number"
    if all(value.lower() in {"true", "false", "0", "1", "y", "n"} for value in sample):
        return "boolean"
    return "string"


def detect_encoding(path: Path) -> tuple[str, str]:
    last_error = ""
    for encoding in ENCODINGS:
        try:
            text = path.read_text(encoding=encoding)
            return encoding, text
        except UnicodeDecodeError as exc:
            last_error = str(exc)
    raise UnicodeDecodeError("csv", b"", 0, 1, f"supported encodings failed: {last_error}")


def detect_dialect(sample: str) -> csv.Dialect:
    try:
        return csv.Sniffer().sniff(sample, delimiters=DELIMITERS)
    except csv.Error:
        return csv.excel


def inspect_file(path: Path) -> FileInventory:
    encoding, text = detect_encoding(path)
    sample_text = text[:8192]

    try:
        dialect = csv.excel
        rows = _read_rows(text, dialect)
        if rows and len(rows[0]) > 1:
            delimiter = ","
        else:
            sniffed = detect_dialect(sample_text)
            rows = _read_rows(text, sniffed)
            delimiter = getattr(sniffed, "delimiter", ",")
    except csv.Error:
        sniffed = detect_dialect(sample_text)
        rows = _read_rows(text, sniffed)
        delimiter = getattr(sniffed, "delimiter", ",")

    if not rows:
        return FileInventory(path, encoding, delimiter, 0, 0, [])

    headers = [header.strip() for header in rows[0]]
    data_rows = rows[1:]
    column_values: dict[str, list[str]] = {name: [] for name in headers}

    for row in data_rows:
        padded = row + [""] * max(0, len(headers) - len(row))
        for idx, header in enumerate(headers):
            column_values[header].append(padded[idx].strip() if idx < len(padded) else "")

    columns = []
    for header in headers:
        values = column_values[header]
        samples = values[:3]
        columns.append(
            ColumnProfile(
                name=header,
                samples=samples,
                inferred_type=infer_type(values),
                missing_count=sum(1 for value in values if normalize_null(value)),
            )
        )

    return FileInventory(path, encoding, delimiter, len(data_rows), len(headers), columns)


def _read_rows(text: str, dialect: csv.Dialect) -> list[list[str]]:
    return list(csv.reader(text.splitlines(), dialect))


def summarize_by_pattern(files: list[FileInventory]) -> list[FileInventory]:
    return sorted(files, key=lambda item: rel(item.path).lower())


def dataset_name_for_path(path: Path) -> str:
    file_name = path.name.lower()
    path_text = rel(path).lower()
    if "base_rates" in path_text and "ecos" in path_text:
        return "한국 기준금리"
    if "fred_dff" in file_name:
        return "미국 기준금리"
    if "market_rates_daily" in path_text:
        return "국내 시장금리"
    if "krx_all_stocks" in file_name:
        return "전종목 시세"
    if any(token in file_name for token in ("kospi_index", "kosdaq_index", "krx_index")):
        return "KOSPI/KOSDAQ/KRX 지수 시세"
    if "foreign_ownership" in file_name:
        return "외국인 보유량"
    if "investor_trading" in file_name or "investing_trade" in file_name:
        return "투자자별 거래실적"
    if "krx_per_pbr" in file_name:
        return "PER/PBR/배당수익률"
    if "yahoo_usd_krw" in file_name:
        return "환율"
    if "yahoo_us_etf" in file_name:
        return "미국 ETF"
    if "yahoo_sp500" in file_name:
        return "S&P500"
    if "yahoo_nasdaq" in file_name:
        return "나스닥"
    if "overseas_stock" in file_name:
        return "해외주식"
    if "events" in path_text:
        return "경제 이벤트"
    return "기타"


def write_raw_data_inventory(files: list[FileInventory], failures: list[FailedFile]) -> None:
    lines: list[str] = [
        "# Raw Data Inventory",
        "",
        "이 문서는 `scripts/inspect_raw_data.py`로 `data/raw/` 하위 CSV를 읽어 자동 생성한 원본 데이터 명세입니다.",
        "원본 CSV는 수정하지 않으며, 향후 전처리 완료 CSV는 `data/processed/` 하위에 저장합니다.",
        "",
        f"- scanned_at: {datetime.now().isoformat(timespec='seconds')}",
        f"- raw_path: `data/raw/`",
        f"- expected_processed_path: `data/processed/`",
        f"- file_count: {len(files)}",
        f"- failed_file_count: {len(failures)}",
        "",
        "## File Summary",
        "",
        "| dataset | file_path | file_name | rows | columns | encoding | delimiter |",
        "|---|---|---|---:|---:|---|---|",
    ]

    for item in summarize_by_pattern(files):
        delimiter = "\\t" if item.delimiter == "\t" else item.delimiter
        lines.append(
            "| {dataset} | `{path}` | `{file}` | {rows} | {cols} | {encoding} | `{delimiter}` |".format(
                dataset=md_escape(dataset_name_for_path(item.path)),
                path=md_escape(rel(item.path)),
                file=md_escape(item.path.name),
                rows=item.row_count,
                cols=item.column_count,
                encoding=md_escape(item.encoding),
                delimiter=md_escape(delimiter),
            )
        )

    lines.extend(["", "## Column Profiles", ""])
    for item in summarize_by_pattern(files):
        lines.extend(
            [
                f"### {rel(item.path)}",
                "",
                f"- dataset: {dataset_name_for_path(item.path)}",
                f"- file_name: `{item.path.name}`",
                f"- row_count: {item.row_count}",
                f"- column_count: {item.column_count}",
                f"- encoding: `{item.encoding}`",
                f"- delimiter: `{'\\t' if item.delimiter == chr(9) else item.delimiter}`",
                "",
                "| original_column | sample_values_first_3 | inferred_type | missing_count |",
                "|---|---|---|---:|",
            ]
        )
        for column in item.columns:
            samples = ", ".join(column.samples)
            lines.append(
                f"| {md_escape(column.name)} | {md_escape(samples)} | {column.inferred_type} | {column.missing_count} |"
            )
        lines.append("")

    lines.extend(["## Read Failures", ""])
    if failures:
        lines.extend(["| file_path | reason |", "|---|---|"])
        for failure in failures:
            lines.append(f"| `{md_escape(rel(failure.path))}` | {md_escape(failure.reason)} |")
    else:
        lines.append("읽기 실패한 CSV 파일은 없습니다.")
    lines.append("")

    (DOCS_DIR / "raw_data_inventory.md").write_text("\n".join(lines), encoding="utf-8")


def build_column_mapping(files: list[FileInventory]) -> list[dict[str, str]]:
    mapping_rules = [
        (r"^(날짜|일자|기준일자|date)$", "date", "date", "false", "분석 기준 일자"),
        (r"^(종목코드|단축코드|티커|ticker|symbol)$", "ticker", "string", "false", "종목 식별 코드"),
        (r"^(종목명|한글 종목명|name|stock_name|stockName)$", "stockName", "string", "true", "종목명"),
        (r"^(시장구분|시장|market)$", "market", "string", "true", "시장 구분"),
        (r"^(종가|close|adj close|adj_close|수정종가)$", "closePrice", "number", "true", "종가 또는 수정 종가"),
        (r"^(시가|open)$", "openPrice", "number", "true", "시가"),
        (r"^(고가|high)$", "highPrice", "number", "true", "고가"),
        (r"^(저가|low)$", "lowPrice", "number", "true", "저가"),
        (r"^(거래량|volume)$", "volume", "number", "true", "거래량"),
        (r"^(거래대금|trading_value|tradingValue)$", "tradingValue", "number", "true", "거래대금"),
        (r"^(시가총액|market_cap|marketCap)$", "marketCap", "number", "true", "시가총액"),
        (r"^(지수명|index name|index_name|indexName)$", "indexName", "string", "true", "지수명"),
        (r"^(지수종가|index close|index_close|close_value|closeValue)$", "closeValue", "number", "true", "지수 종가"),
        (r"^(PER)$", "per", "number", "true", "주가수익비율"),
        (r"^(PBR)$", "pbr", "number", "true", "주가순자산비율"),
        (r"^(배당수익률|dividend_yield|dividendYield)$", "dividendYield", "number", "true", "배당수익률"),
        (r"^(외국인보유비율|foreign_ownership_ratio|foreignOwnershipRatio)$", "foreignOwnershipRatio", "number", "true", "외국인 보유 비율"),
        (r"^(외국인보유수량|foreign_ownership_quantity|foreignOwnershipQuantity)$", "foreignOwnershipQuantity", "number", "true", "외국인 보유 수량"),
        (r"^(기준금리|금리|value|rate_value|rateValue)$", "rateValue", "number", "true", "금리 값"),
        (r"^(환율|exchange_rate|exchangeRate)$", "exchangeRate", "number", "true", "환율"),
        (r"^(발표일|공시일|release_date|releaseDate)$", "releaseDate", "date", "true", "발표 또는 공시 일자"),
        (r"^(적용일|변경일|effective_date|effectiveDate)$", "effectiveDate", "date", "true", "적용 또는 변경 일자"),
        (r"^(이벤트일|event_date|eventDate)$", "eventDate", "date", "false", "경제 이벤트 발생 일자"),
        (r"^(대상월|target_month|targetMonth)$", "targetMonth", "string", "true", "지표 대상 월"),
        (r"^(실제치|actual_value|actualValue)$", "actualValue", "number", "true", "경제지표 실제치"),
        (r"^(예상치|forecast_value|forecastValue)$", "forecastValue", "number", "true", "경제지표 예상치"),
        (r"^(이전치|previous_value|previousValue)$", "previousValue", "number", "true", "경제지표 이전치"),
    ]

    rows: list[dict[str, str]] = []
    seen: set[tuple[str, str, str, str]] = set()
    for item in summarize_by_pattern(files):
        dataset = dataset_name_for_path(item.path)
        source_file_pattern = pattern_for_path(item.path)
        for column in item.columns:
            standard_column = ""
            column_type = column.inferred_type
            nullable = "true" if column.missing_count else "false"
            description = "원본 컬럼"
            for pattern, standard, expected_type, expected_nullable, desc in mapping_rules:
                if re.search(pattern, column.name, flags=re.IGNORECASE):
                    standard_column = standard
                    column_type = expected_type
                    nullable = expected_nullable
                    description = desc
                    break
            if dataset == "KOSPI/KOSDAQ/KRX 지수 시세" and column.name.lower() == "close":
                standard_column = "closeValue"
                column_type = "number"
                nullable = "true"
                description = "지수 종가"
            key = (dataset, source_file_pattern, column.name, standard_column)
            if key in seen:
                continue
            seen.add(key)
            rows.append(
                {
                    "dataset": dataset,
                    "source_file_pattern": source_file_pattern,
                    "original_column": column.name,
                    "standard_column": standard_column or "TBD",
                    "type": column_type,
                    "nullable": nullable,
                    "description": description,
                }
            )
    return rows


def pattern_for_path(path: Path) -> str:
    text = rel(path)
    name = path.name
    replacements = [
        (r"\d{6,8}", "*"),
        (r"_(24|25|26)(?=\.csv$)", "_YY"),
        (r"_(240[1-9]|241[0-2]|250[1-9]|251[0-2]|260[1-4])(?=\.csv$)", "_YYMM"),
        (r"_(4m|6m)_\d{4}", r"_\1_*"),
    ]
    pattern_name = name
    for pattern, replacement in replacements:
        pattern_name = re.sub(pattern, replacement, pattern_name)
    return str(path.parent.relative_to(PROJECT_ROOT).as_posix() + "/" + pattern_name)


def write_column_mapping(files: list[FileInventory]) -> None:
    rows = build_column_mapping(files)
    lines = [
        "# Column Mapping Draft",
        "",
        "MVP DB 적재를 위한 표준 컬럼명 매핑 초안입니다. `TBD`는 다음 전처리 단계에서 도메인 의미를 확인해야 합니다.",
        "향후 전처리 산출물은 `data/processed/` 하위에 저장합니다.",
        "",
        "| dataset | source_file_pattern | original_column | standard_column | type | nullable | description |",
        "|---|---|---|---|---|---|---|",
    ]
    for row in rows:
        lines.append(
            "| {dataset} | `{pattern}` | {original} | {standard} | {type} | {nullable} | {description} |".format(
                dataset=md_escape(row["dataset"]),
                pattern=md_escape(row["source_file_pattern"]),
                original=md_escape(row["original_column"]),
                standard=md_escape(row["standard_column"]),
                type=md_escape(row["type"]),
                nullable=md_escape(row["nullable"]),
                description=md_escape(row["description"]),
            )
        )
    lines.append("")
    (DOCS_DIR / "column_mapping.md").write_text("\n".join(lines), encoding="utf-8")


def write_data_cleaning_rules() -> None:
    rules = [
        "원본 데이터는 `data/raw/`에 보관한다.",
        "전처리 완료 데이터는 향후 `data/processed/`에 저장한다.",
        "샘플 데이터는 `data/sample/`에 저장한다.",
        "이번 작업에서는 processed 파일을 실제 생성하지 않는다.",
        "날짜는 `YYYY-MM-DD`로 통일한다.",
        "숫자 컬럼의 쉼표를 제거한다.",
        "`%` 기호는 제거한 뒤 number로 변환한다.",
        "`-`와 빈 문자열은 null 처리한다.",
        "종목코드는 숫자가 아니라 문자열로 유지한다.",
        "가격, 금리, 환율, 지수는 number로 변환한다.",
        "기준금리와 시장금리는 `effectiveDate` 또는 `releaseDate` 이후부터 forward fill 가능하다.",
        "`data/raw/ecos/base_rates/`의 한국 기준금리 데이터는 향후 `releaseDate`/`effectiveDate` 컬럼을 추가할 예정이다.",
        "`data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv`의 미국 기준금리 데이터는 향후 `releaseDate`/`effectiveDate` 컬럼을 추가할 예정이다.",
        "주말/공휴일로 인해 비어 있는 금리, 환율, 지수 값은 향후 전처리 단계에서 forward fill 방식으로 채울 예정이다.",
        "경제 이벤트는 forward fill하지 않고 `eventDate` 또는 `releaseDate` 기준 이벤트 마커로 저장한다.",
        "월별 거시지표는 `targetMonth`가 아니라 `releaseDate` 기준으로 조인한다.",
        "모든 분석 API는 `analysisDate` 기준으로 `date <= analysisDate` 데이터만 사용한다.",
        "미래 데이터가 과거 분석에 섞이지 않도록 look-ahead bias를 방지한다.",
        "데이터가 부족한 경우 미래 데이터를 보완용으로 사용하지 않고 null 또는 `insufficient_data` 상태로 처리한다.",
    ]
    lines = [
        "# Data Cleaning Rules",
        "",
        "이 문서는 raw 데이터 명세화 이후 전처리 및 DB 적재 단계에서 적용할 정제 원칙입니다.",
        "",
    ]
    lines.extend(f"{idx}. {rule}" for idx, rule in enumerate(rules, start=1))
    lines.append("")
    (DOCS_DIR / "data_cleaning_rules.md").write_text("\n".join(lines), encoding="utf-8")


def write_dataset_inventory(files: list[FileInventory]) -> None:
    present = Counter(dataset_name_for_path(item.path) for item in files)
    rows = [
        ("전종목 시세", "KRX", "data/raw/krx_stat/krx_all_stocks_*.csv", "daily", "data/processed/market_prices/", "high", "포트폴리오 평가 및 수익률 분석"),
        ("KOSPI/KOSDAQ/KRX 지수 시세", "KRX", "data/raw/krx/*_index_*.csv", "daily", "data/processed/market_indices/", "high", "시장 벤치마크 및 국면 분석"),
        ("외국인 보유량", "KRX", "data/raw/krx_stat/foreign_ownership_*.csv", "daily/monthly snapshot", "data/processed/foreign_ownership/", "high", "수급 및 외국인 보유 분석"),
        ("해외주식", "Yahoo", "data/raw/yahoo/overseas_stocks/", "daily", "data/processed/overseas_prices/", "high", "글로벌 종목 가격 분석"),
        ("미국 ETF", "Yahoo", "data/raw/yahoo/etfs/", "daily", "data/processed/overseas_prices/", "high", "ETF 벤치마크 분석"),
        ("S&P500", "Yahoo", "data/raw/yahoo/indices/yahoo_sp500_index_*.csv", "daily", "data/processed/market_indices/", "high", "미국 대형주 시장 분석"),
        ("나스닥", "Yahoo", "data/raw/yahoo/indices/yahoo_nasdaq_index_*.csv", "daily", "data/processed/market_indices/", "high", "미국 성장주 시장 분석"),
        ("환율", "Yahoo", "data/raw/yahoo/fx/", "daily", "data/processed/fx_rates/", "high", "원화 환산 및 환율 환경 분석"),
        ("한국 기준금리", "ECOS", "data/raw/ecos/base_rates/", "event/stepwise", "data/processed/interest_rates/", "high", "금리 환경 분석"),
        ("미국 기준금리", "FRED", "data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv", "event/stepwise", "data/processed/interest_rates/", "high", "글로벌 금리 분석"),
        ("국내 시장금리", "ECOS", "data/raw/ecos/market_rates_daily/", "daily", "data/processed/interest_rates/", "medium", "채권 및 시장금리 환경 분석"),
        ("PER/PBR/배당수익률", "KRX", "data/raw/krx_stat/krx_per_pbr_*.csv", "daily/monthly snapshot", "data/processed/fundamentals/", "high", "밸류에이션 분석"),
        ("투자자별 거래실적", "KRX", "data/raw/krx_stat/investor_trading_*.csv; data/raw/krx_stat/investing_trade_*.csv", "daily", "data/processed/investor_flows/", "high", "투자자 수급 분석"),
        ("경제 이벤트", "manual/excel/csv", "data/raw/events/", "event", "data/processed/economic_events/", "high", "이벤트 영향 분석"),
    ]
    lines = [
        "# Dataset Inventory",
        "",
        "MVP 우선순위 데이터셋과 raw/processed 저장 구조입니다. `observed_raw_file_count`는 현재 `data/raw/` 자동 탐색 결과 기준입니다.",
        "",
        "| dataset | source | raw_path | frequency | expected_processed_path | mvp_priority | usage | observed_raw_file_count |",
        "|---|---|---|---|---|---|---|---:|",
    ]
    for dataset, source, raw_path, frequency, processed_path, priority, usage in rows:
        lines.append(
            f"| {md_escape(dataset)} | {md_escape(source)} | `{md_escape(raw_path)}` | {md_escape(frequency)} | `{md_escape(processed_path)}` | {priority} | {md_escape(usage)} | {present.get(dataset, 0)} |"
        )
    lines.append("")
    (DOCS_DIR / "dataset_inventory.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    csv_files = sorted(RAW_DIR.rglob("*.csv"))
    inventories: list[FileInventory] = []
    failures: list[FailedFile] = []

    for csv_file in csv_files:
        try:
            inventories.append(inspect_file(csv_file))
        except Exception as exc:  # Keep inventory generation moving across raw data issues.
            failures.append(FailedFile(csv_file, f"{type(exc).__name__}: {exc}"))

    write_raw_data_inventory(inventories, failures)
    write_column_mapping(inventories)
    write_data_cleaning_rules()
    write_dataset_inventory(inventories)

    print(f"scanned_csv_files={len(csv_files)}")
    print(f"successful_files={len(inventories)}")
    print(f"failed_files={len(failures)}")
    print(f"raw_data_inventory={rel(DOCS_DIR / 'raw_data_inventory.md')}")
    print(f"column_mapping={rel(DOCS_DIR / 'column_mapping.md')}")
    print(f"data_cleaning_rules={rel(DOCS_DIR / 'data_cleaning_rules.md')}")
    print(f"dataset_inventory={rel(DOCS_DIR / 'dataset_inventory.md')}")


if __name__ == "__main__":
    main()
