# dataset/fetch_yahoo_finance_separate.py

import os
import time
from datetime import datetime, timedelta

import pandas as pd
import yfinance as yf


# =========================
# 1. 저장 경로 설정
# =========================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 데이터 종류별로 폴더를 나눠 저장
OVERSEAS_STOCK_DIR = os.path.join(BASE_DIR, "data", "raw", "yahoo", "overseas_stocks")
ETF_DIR = os.path.join(BASE_DIR, "data", "raw", "yahoo", "etfs")
INDEX_DIR = os.path.join(BASE_DIR, "data", "raw", "yahoo", "indices")
FX_DIR = os.path.join(BASE_DIR, "data", "raw", "yahoo", "fx")

LOG_DIR = os.path.join(BASE_DIR, "data", "processed", "yahoo")

for directory in [OVERSEAS_STOCK_DIR, ETF_DIR, INDEX_DIR, FX_DIR, LOG_DIR]:
    os.makedirs(directory, exist_ok=True)


# =========================
# 1-1. 수집 기간 설정
# =========================
# yfinance의 end는 보통 해당 날짜를 포함하지 않는 방식으로 동작한다.
START_DATE = "2024-01-01"
END_DATE = "2026-05-01"

# 파일명에 넣을 기간 라벨
END_DATE_LABEL = (
    datetime.strptime(END_DATE, "%Y-%m-%d") - timedelta(days=1)
).strftime("%Y%m%d")

DATE_LABEL = f"{START_DATE.replace('-', '')}_{END_DATE_LABEL}"


# =========================
# 2. 해외주식 티커 목록
# =========================
# 지금은 대표 종목들을 예시로 넣어둠.
# 나중에 팀에서 기준을 정해서 이 목록만 수정하면 됨.
#
# 예:
# - 사용자가 관심 종목으로 등록한 해외주식
# - 시가총액 상위 종목
# - 기술주/금융주/소비재 등 섹터별 대표 종목
# - 포트폴리오 더미 데이터에 포함된 해외주식

OVERSEAS_STOCK_TICKERS = [
    {"ticker": "NVDA", "stock_name": "NVIDIA Corporation", "sector": "Semiconductor"},
    {"ticker": "GOOG", "stock_name": "Alphabet Inc. Class C", "sector": "Communication Services"},
    {"ticker": "AAPL", "stock_name": "Apple Inc.", "sector": "Technology"},
    {"ticker": "MSFT", "stock_name": "Microsoft Corporation", "sector": "Technology"},
    {"ticker": "AMZN", "stock_name": "Amazon.com, Inc.", "sector": "Consumer Discretionary"},
    {"ticker": "AVGO", "stock_name": "Broadcom Inc.", "sector": "Semiconductor"},
    {"ticker": "TSLA", "stock_name": "Tesla, Inc.", "sector": "Consumer Discretionary"},
    {"ticker": "META", "stock_name": "Meta Platforms Inc Class A", "sector": "Communication Services"},
    {"ticker": "BRK-A", "stock_name": "Berkshire Hathaway Inc. Class A", "sector": "Financials"},
    {"ticker": "LLY", "stock_name": "Eli Lilly and Company", "sector": "Healthcare"},

    {"ticker": "WMT", "stock_name": "Walmart Inc.", "sector": "Consumer Staples"},
    {"ticker": "MU", "stock_name": "Micron Technology, Inc.", "sector": "Semiconductor"},
    {"ticker": "JPM", "stock_name": "JPMorgan Chase & Co.", "sector": "Financials"},
    {"ticker": "AMD", "stock_name": "Advanced Micro Devices, Inc.", "sector": "Semiconductor"},
    {"ticker": "XOM", "stock_name": "Exxon Mobil Corporation", "sector": "Energy"},
    {"ticker": "V", "stock_name": "Visa Inc. Class A", "sector": "Financials"},
    {"ticker": "INTC", "stock_name": "Intel Corporation", "sector": "Semiconductor"},
    {"ticker": "JNJ", "stock_name": "Johnson & Johnson", "sector": "Healthcare"},
    {"ticker": "ORCL", "stock_name": "Oracle Corporation", "sector": "Technology"},
    {"ticker": "CSCO", "stock_name": "Cisco Systems, Inc.", "sector": "Technology"},

    {"ticker": "COST", "stock_name": "Costco Wholesale Corporation", "sector": "Consumer Staples"},
    {"ticker": "MA", "stock_name": "Mastercard Incorporated Class A", "sector": "Financials"},
    {"ticker": "CAT", "stock_name": "Caterpillar Inc.", "sector": "Industrials"},
    {"ticker": "LRCX", "stock_name": "Lam Research Corporation", "sector": "Semiconductor"},
    {"ticker": "CVX", "stock_name": "Chevron Corporation", "sector": "Energy"},
    {"ticker": "ABBV", "stock_name": "AbbVie, Inc.", "sector": "Healthcare"},
    {"ticker": "NFLX", "stock_name": "Netflix, Inc.", "sector": "Communication Services"},
    {"ticker": "BAC", "stock_name": "Bank of America Corp", "sector": "Financials"},
    {"ticker": "UNH", "stock_name": "UnitedHealth Group Incorporated", "sector": "Healthcare"},
    {"ticker": "KO", "stock_name": "Coca-Cola Company", "sector": "Consumer Staples"},

    {"ticker": "AMAT", "stock_name": "Applied Materials, Inc.", "sector": "Semiconductor"},
    {"ticker": "PG", "stock_name": "Procter & Gamble Company", "sector": "Consumer Staples"},
    {"ticker": "PLTR", "stock_name": "Palantir Technologies Inc. Class A", "sector": "Technology"},
    {"ticker": "MS", "stock_name": "Morgan Stanley", "sector": "Financials"},
    {"ticker": "GE", "stock_name": "GE Aerospace", "sector": "Industrials"},
    {"ticker": "HD", "stock_name": "Home Depot, Inc.", "sector": "Consumer Discretionary"},
    {"ticker": "MRK", "stock_name": "Merck & Co., Inc.", "sector": "Healthcare"},
    {"ticker": "PM", "stock_name": "Philip Morris International Inc.", "sector": "Consumer Staples"},
    {"ticker": "GS", "stock_name": "Goldman Sachs Group, Inc.", "sector": "Financials"},
    {"ticker": "TXN", "stock_name": "Texas Instruments Incorporated", "sector": "Semiconductor"},

    {"ticker": "GEV", "stock_name": "GE Vernova Inc.", "sector": "Industrials"},
    {"ticker": "QCOM", "stock_name": "QUALCOMM Incorporated", "sector": "Semiconductor"},
    {"ticker": "KLAC", "stock_name": "KLA Corporation", "sector": "Semiconductor"},
    {"ticker": "LIN", "stock_name": "Linde plc", "sector": "Materials"},
    {"ticker": "IBM", "stock_name": "International Business Machines Corporation", "sector": "Technology"},
    {"ticker": "RTX", "stock_name": "RTX Corporation", "sector": "Industrials"},
    {"ticker": "WFC", "stock_name": "Wells Fargo & Company", "sector": "Financials"},
    {"ticker": "SNDK", "stock_name": "Sandisk Corporation", "sector": "Technology"},
    {"ticker": "C", "stock_name": "Citigroup Inc.", "sector": "Financials"},
    {"ticker": "AXP", "stock_name": "American Express Company", "sector": "Financials"},
]


# =========================
# 3. ETF / 지수 / 환율 데이터
# =========================

OTHER_TARGETS = [
    {
        "data_name": "미국ETF_SPY",
        "ticker": "SPY",
        "asset_type": "us_etf",
        "stock_name": "SPDR S&P 500 ETF Trust",
        "sector": None,
        "save_dir": ETF_DIR,
        "file_name": f"yahoo_us_etf_spy_{DATE_LABEL}.csv",
        "source_url": "https://finance.yahoo.com/quote/SPY",
        "description": "S&P500 지수를 추종하는 대표 미국 ETF",
    },
    {
        "data_name": "SP500_지수",
        "ticker": "^GSPC",
        "asset_type": "us_index",
        "stock_name": "S&P 500 Index",
        "sector": None,
        "save_dir": INDEX_DIR,
        "file_name": f"yahoo_sp500_index_{DATE_LABEL}.csv",
        "source_url": "https://finance.yahoo.com/quote/%5EGSPC",
        "description": "미국 대형주 500개 기업 흐름을 보여주는 S&P500 지수",
    },
    {
        "data_name": "나스닥_지수",
        "ticker": "^IXIC",
        "asset_type": "us_index",
        "stock_name": "NASDAQ Composite Index",
        "sector": None,
        "save_dir": INDEX_DIR,
        "file_name": f"yahoo_nasdaq_index_{DATE_LABEL}.csv",
        "source_url": "https://finance.yahoo.com/quote/%5EIXIC",
        "description": "기술주 중심의 미국 나스닥 종합지수",
    },
    {
        "data_name": "원달러_환율",
        "ticker": "KRW=X",
        "asset_type": "fx",
        "stock_name": "USD/KRW",
        "sector": None,
        "save_dir": FX_DIR,
        "file_name": f"yahoo_usd_krw_fx_{DATE_LABEL}.csv",
        "source_url": "https://finance.yahoo.com/quote/KRW%3DX",
        "description": "미국 달러 대비 원화 환율",
    },
]


# =========================
# 4. 파일명 안전 처리
# =========================

def safe_filename(text: str) -> str:
    """
    파일명에 사용하기 어려운 문자를 안전하게 바꾼다.
    예:
    ^GSPC -> GSPC
    KRW=X -> KRW_X
    BRK-B -> BRK-B
    """
    return (
        text.replace("^", "")
            .replace("=", "_")
            .replace("/", "_")
            .replace("\\", "_")
            .replace(":", "_")
            .replace("*", "_")
            .replace("?", "_")
            .replace('"', "_")
            .replace("<", "_")
            .replace(">", "_")
            .replace("|", "_")
    )


# =========================
# 5. Yahoo Finance 공통 수집 함수
# =========================

def fetch_yahoo_history(
    target: dict,
    start_date: str,
    end_date: str | None = None,
    interval: str = "1d"
) -> pd.DataFrame:
    """
    Yahoo Finance에서 특정 티커의 과거 가격 데이터를 가져온다.

    start_date:
    - 수집 시작일
    - 예: "2023-01-01"

    end_date:
    - 수집 종료일
    - yfinance에서는 보통 end 날짜가 포함되지 않는다.
    - 예: 2024-12-31까지 받고 싶으면 "2025-01-01" 입력

    interval:
    - "1d": 일별 데이터
    """

    ticker = target["ticker"]

    print(f"\n[INFO] 수집 시작: {target['data_name']} ({ticker})")
    print(f"[INFO] 수집 기간: {start_date} ~ {end_date}")

    df = yf.Ticker(ticker).history(
        start=start_date,
        end=end_date,
        interval=interval,
        auto_adjust=False
    )

    if df.empty:
        raise ValueError(f"{ticker} 데이터가 비어 있습니다.")

    df = df.reset_index()

    df = df.rename(columns={
        "Date": "date",
        "Open": "open",
        "High": "high",
        "Low": "low",
        "Close": "close",
        "Adj Close": "adj_close",
        "Volume": "volume",
        "Dividends": "dividends",
        "Stock Splits": "stock_splits",
    })

    df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")

    # 분석/DB 적재용 메타데이터
    df["ticker"] = ticker
    df["data_name"] = target["data_name"]
    df["asset_type"] = target["asset_type"]
    df["stock_name"] = target.get("stock_name")
    df["sector"] = target.get("sector")
    df["source_url"] = target.get("source_url")
    df["description"] = target.get("description")
    df["collected_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    column_order = [
        "date",
        "ticker",
        "data_name",
        "asset_type",
        "stock_name",
        "sector",
        "open",
        "high",
        "low",
        "close",
        "adj_close",
        "volume",
        "dividends",
        "stock_splits",
        "source_url",
        "description",
        "collected_at",
    ]

    existing_columns = [col for col in column_order if col in df.columns]
    df = df[existing_columns]

    return df


# =========================
# 6. 해외주식 target 생성
# =========================

def build_overseas_stock_targets() -> list[dict]:
    """
    해외주식 티커 목록을 Yahoo Finance 수집 target 형식으로 변환한다.
    """

    targets = []

    for item in OVERSEAS_STOCK_TICKERS:
        ticker = item["ticker"]
        file_ticker = safe_filename(ticker).lower()

        targets.append({
            "data_name": f"해외주식_{item['stock_name']}",
            "ticker": ticker,
            "asset_type": "overseas_stock",
            "stock_name": item["stock_name"],
            "sector": item.get("sector"),
            "save_dir": OVERSEAS_STOCK_DIR,
            "file_name": f"yahoo_overseas_stock_{file_ticker}_2y.csv",
            "source_url": f"https://finance.yahoo.com/quote/{ticker}",
            "description": f"{item['stock_name']} 해외 개별주 가격 데이터",
        })

    return targets


# =========================
# 7. 전체 실행
# =========================

def main():
    failed_logs = []

    # 해외주식 여러 개 + ETF/지수/환율
    all_targets = build_overseas_stock_targets() + OTHER_TARGETS

    print(f"[INFO] 전체 수집 대상 개수: {len(all_targets)}개")
    print(f"[INFO] 해외주식 수집 대상: {len(OVERSEAS_STOCK_TICKERS)}개")
    print(f"[INFO] 기타 데이터 수집 대상: {len(OTHER_TARGETS)}개")

    for target in all_targets:
        try:
            df = fetch_yahoo_history(
                target,
                start_date=START_DATE,
                end_date=END_DATE,
                interval="1d"
            )

            save_path = os.path.join(target["save_dir"], target["file_name"])
            df.to_csv(save_path, index=False, encoding="utf-8-sig")

            print(f"[SUCCESS] 저장 완료: {save_path}")
            print(f"[INFO] 행 수: {len(df)}")

            time.sleep(1)

        except Exception as e:
            print(f"[ERROR] 수집 실패: {target['data_name']} ({target['ticker']})")
            print(f"[ERROR] 사유: {e}")

            failed_logs.append({
                "data_name": target.get("data_name"),
                "ticker": target.get("ticker"),
                "asset_type": target.get("asset_type"),
                "stock_name": target.get("stock_name"),
                "sector": target.get("sector"),
                "file_name": target.get("file_name"),
                "error_message": str(e),
                "failed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            })

    if failed_logs:
        failed_df = pd.DataFrame(failed_logs)
        failed_log_path = os.path.join(LOG_DIR, "yahoo_finance_failed_logs.csv")
        failed_df.to_csv(failed_log_path, index=False, encoding="utf-8-sig")

        print(f"\n[WARNING] 실패 로그 저장 완료: {failed_log_path}")

    print("\n[DONE] Yahoo Finance 개별 CSV 저장 작업 완료")


if __name__ == "__main__":
    main()