import os
import time
from io import BytesIO
from pathlib import Path
from datetime import datetime, timedelta

import requests
import pandas as pd
from dotenv import load_dotenv


# =========================
# 1. 기본 설정
# =========================

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "raw" / "krx_stat"
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

KRX_COOKIE = os.getenv("KRX_COOKIE")

if KRX_COOKIE:
    KRX_COOKIE = KRX_COOKIE.strip()


OTP_URL = "https://data.krx.co.kr/comm/fileDn/GenerateOTP/generate.cmd"
DOWNLOAD_URL = "https://data.krx.co.kr/comm/fileDn/download_csv/download.cmd"

REFERER = "https://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101"


# =========================
# 2. 날짜 범위 생성
# =========================

def date_range(start_date: str, end_date: str):
    start = datetime.strptime(start_date, "%Y%m%d")
    end = datetime.strptime(end_date, "%Y%m%d")

    current = start
    while current <= end:
        yield current.strftime("%Y%m%d")
        current += timedelta(days=1)


# =========================
# 3. 하루치 전종목 시세 다운로드
# =========================

def fetch_krx_all_stocks_one_day(bas_date: str, market: str = "ALL") -> pd.DataFrame:
    """
    KRX 전종목 시세를 특정 날짜 기준으로 CSV 다운로드한다.

    market:
    - ALL: 전체
    - STK: KOSPI
    - KSQ: KOSDAQ
    - KNX: KONEX
    """

    if not KRX_COOKIE:
        raise ValueError(
            "KRX_COOKIE가 없습니다. .env 파일에 브라우저에서 복사한 Cookie 값을 넣어주세요."
        )

    session = requests.Session()

    common_headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/148.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Origin": "https://data.krx.co.kr",
        "Referer": REFERER,
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": KRX_COOKIE,
    }

    # 개발자도구에서 확인한 Form Data 그대로 사용
    otp_params = {
        "locale": "ko_KR",
        "mktId": market,
        "trdDd": bas_date,
        "share": "1",
        "money": "1",
        "csvxls_isNo": "false",
        "name": "fileDown",
        "url": "dbms/MDC/STAT/standard/MDCSTAT01501",
    }

    otp_headers = common_headers.copy()
    otp_headers.update({
        "Accept": "text/plain, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    })

    # 1. OTP 생성
    otp_response = session.post(
        OTP_URL,
        data=otp_params,
        headers=otp_headers,
        timeout=(10, 60),
    )
    otp_response.raise_for_status()

    otp_code = otp_response.text.strip()

    if not otp_code:
        raise RuntimeError(f"{bas_date}: OTP 코드가 비어 있습니다.")

    if otp_code == "LOGOUT" or "LOGOUT" in otp_code[:50]:
        raise RuntimeError(
            f"{bas_date}: OTP 응답이 LOGOUT입니다. "
            "KRX_COOKIE가 만료되었거나 잘못 복사되었을 수 있습니다."
        )

    if "<html" in otp_code.lower():
        raise RuntimeError(f"{bas_date}: OTP 대신 HTML이 반환되었습니다.")

    # 2. OTP로 CSV 다운로드
    download_headers = common_headers.copy()
    download_headers.update({
        "Accept": "text/csv,application/vnd.ms-excel,application/octet-stream,*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    })

    csv_response = session.post(
        DOWNLOAD_URL,
        data={"code": otp_code},
        headers=download_headers,
        timeout=10,
    )
    csv_response.raise_for_status()

    content = csv_response.content

    if len(content) == 0:
        raise RuntimeError(f"{bas_date}: 다운로드된 CSV가 비어 있습니다.")

    # 3. CSV 읽기
    try:
        df = pd.read_csv(BytesIO(content), encoding="euc-kr")
    except UnicodeDecodeError:
        df = pd.read_csv(BytesIO(content), encoding="cp949")

    if df.empty:
        return pd.DataFrame()

    df["기준일자"] = bas_date

    return df


# =========================
# 4. 컬럼 정리
# =========================

def clean_krx_all_stocks(df: pd.DataFrame) -> pd.DataFrame:
    column_map = {
        "기준일자": "date",
        "종목코드": "ticker",
        "종목명": "stock_name",
        "시장구분": "market",
        "소속부": "division",
        "종가": "close",
        "대비": "change",
        "등락률": "change_rate",
        "시가": "open",
        "고가": "high",
        "저가": "low",
        "거래량": "volume",
        "거래대금": "trading_value",
        "시가총액": "market_cap",
        "상장주식수": "listed_shares",
    }

    df = df.rename(columns={k: v for k, v in column_map.items() if k in df.columns})

    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], format="%Y%m%d", errors="coerce")

    numeric_cols = [
        "open",
        "high",
        "low",
        "close",
        "change",
        "change_rate",
        "volume",
        "trading_value",
        "market_cap",
        "listed_shares",
    ]

    for col in numeric_cols:
        if col in df.columns:
            df[col] = (
                df[col]
                .astype(str)
                .str.replace(",", "", regex=False)
                .str.replace("%", "", regex=False)
                .replace("-", pd.NA)
            )
            df[col] = pd.to_numeric(df[col], errors="coerce")

    preferred_cols = [
        "date",
        "ticker",
        "stock_name",
        "market",
        "division",
        "open",
        "high",
        "low",
        "close",
        "change",
        "change_rate",
        "volume",
        "trading_value",
        "market_cap",
        "listed_shares",
    ]

    existing_cols = [col for col in preferred_cols if col in df.columns]
    other_cols = [col for col in df.columns if col not in existing_cols]

    return df[existing_cols + other_cols]


# =========================
# 5. 기간별 수집
# =========================

def collect_krx_all_stocks_period(
    start_date: str,
    end_date: str,
    output_filename: str,
    market: str = "ALL",
):
    all_data = []

    for bas_date in date_range(start_date, end_date):
        try:
            df = fetch_krx_all_stocks_one_day(bas_date, market=market)

            if df.empty:
                print(f"{bas_date}: 데이터 없음")
            else:
                all_data.append(df)
                print(f"{bas_date}: {len(df)}건 수집")

            time.sleep(0.7)

        except Exception as e:
            print(f"{bas_date} 수집 실패: {e}")

    if not all_data:
        print("수집된 데이터가 없습니다.")
        return None

    result = pd.concat(all_data, ignore_index=True)
    result = clean_krx_all_stocks(result)
    result = result.drop_duplicates()

    if "ticker" in result.columns and "date" in result.columns:
        result = result.sort_values(["ticker", "date"])

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    output_path = DATA_DIR / output_filename

    result.to_csv(output_path, index=False, encoding="utf-8-sig")

    print(f"\nCSV 저장 완료: {output_path}")
    print(result.head())

    return result


# =========================
# 6. 실행부
# =========================

if __name__ == "__main__":
    # 기간 설정
    collect_krx_all_stocks_period(
        start_date="20260401",
        end_date="20260430",
        output_filename="krx_all_stocks_2604.csv",
        market="ALL",
    )