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

# 투자자별 거래실적 페이지의 Referer로 바꾸는 것이 가장 좋음.
# 우선 네가 앞에서 쓰던 KRX 화면 구조에 맞춰 기본값을 둠.
REFERER = "https://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd"

# 개발자도구 Form Data 기준
# 주의: 네가 준 값은 PER/PBR/배당수익률과 동일함.
INTERNAL_URL = "dbms/MDC/STAT/standard/MDCSTAT00701"


# =========================
# 2. 날짜 유틸
# =========================

def date_range(start_date: str, end_date: str):
    """
    start_date, end_date 형식: YYYYMMDD
    """
    start = datetime.strptime(start_date, "%Y%m%d")
    end = datetime.strptime(end_date, "%Y%m%d")

    current = start
    while current <= end:
        yield current.strftime("%Y%m%d")
        current += timedelta(days=1)


def get_ref_start_date(bas_date: str, days_before: int = 7) -> str:
    """
    Form Data에 필요한 strtDd 생성.
    예: trdDd=20260521, strtDd=20260514
    """
    base = datetime.strptime(bas_date, "%Y%m%d")
    start = base - timedelta(days=days_before)
    return start.strftime("%Y%m%d")


# =========================
# 3. 하루치 투자자별 거래실적 다운로드
# =========================

def fetch_investor_trading_one_day(bas_date: str) -> pd.DataFrame:
    """
    KRX 투자자별 거래실적 데이터를 특정 날짜 기준으로 다운로드한다.
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

    start_ref_date = get_ref_start_date(bas_date, days_before=7)

    # 개발자도구에서 확인한 Form Data 반영
    otp_params = {
        "locale": "ko_KR",
        "searchType": "A",
        "idxIndMidclssCd": "01",
        "trdDd": bas_date,

        "tboxindTpCd_finder_equidx0_0": "",
        "indTpCd": "",
        "indTpCd2": "",
        "codeNmindTpCd_finder_equidx0_0": "",
        "param1indTpCd_finder_equidx0_0": "",

        "strtDd": start_ref_date,
        "endDd": bas_date,

        "csvxls_isNo": "false",
        "name": "fileDown",
        "url": INTERNAL_URL,
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

    # 2. CSV 다운로드
    download_headers = common_headers.copy()
    download_headers.update({
        "Accept": "text/csv,application/vnd.ms-excel,application/octet-stream,*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    })

    csv_response = session.post(
        DOWNLOAD_URL,
        data={"code": otp_code},
        headers=download_headers,
        timeout=(10, 60),
    )
    csv_response.raise_for_status()

    content = csv_response.content

    if len(content) == 0:
        raise RuntimeError(
            f"{bas_date}: 다운로드된 CSV가 비어 있습니다. "
            "Form Data, url 값, Cookie를 다시 확인하세요."
        )

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

def clean_investor_trading(df: pd.DataFrame) -> pd.DataFrame:
    """
    투자자별 거래실적 데이터를 프로젝트용 영문 컬럼명으로 정리한다.
    실제 다운로드 컬럼명이 다를 수 있으므로,
    실행 후 df.columns를 확인하고 column_map을 보완하면 된다.
    """

    column_map = {
        "기준일자": "date",

        # 지수/시장 관련
        "지수명": "index_name",
        "시장구분": "market",
        "계열구분": "index_class",

        # 투자자 관련
        "투자자구분": "investor_type",
        "투자자": "investor_type",

        # 거래실적 관련
        "매도거래량": "sell_volume",
        "매수거래량": "buy_volume",
        "순매수거래량": "net_buy_volume",

        "매도거래대금": "sell_value",
        "매수거래대금": "buy_value",
        "순매수거래대금": "net_buy_value",

        # 화면/CSV에 따라 짧은 컬럼명으로 나올 경우 대비
        "매도": "sell_value",
        "매수": "buy_value",
        "순매수": "net_buy_value",
    }

    df = df.rename(columns={k: v for k, v in column_map.items() if k in df.columns})

    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], format="%Y%m%d", errors="coerce")

    numeric_cols = [
        "sell_volume",
        "buy_volume",
        "net_buy_volume",
        "sell_value",
        "buy_value",
        "net_buy_value",
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
        "market",
        "index_class",
        "index_name",
        "investor_type",
        "sell_volume",
        "buy_volume",
        "net_buy_volume",
        "sell_value",
        "buy_value",
        "net_buy_value",
    ]

    existing_cols = [col for col in preferred_cols if col in df.columns]
    other_cols = [col for col in df.columns if col not in existing_cols]

    return df[existing_cols + other_cols]


# =========================
# 5. 기간별 수집
# =========================

def collect_investor_trading_period(
    start_date: str,
    end_date: str,
    output_filename: str,
):
    all_data = []

    for bas_date in date_range(start_date, end_date):
        try:
            df = fetch_investor_trading_one_day(bas_date)

            if df.empty:
                print(f"{bas_date}: 데이터 없음")
            else:
                all_data.append(df)
                print(f"{bas_date}: {len(df)}건 수집")

            time.sleep(0.4)

        except Exception as e:
            print(f"{bas_date} 수집 실패: {e}")

    if not all_data:
        print("수집된 데이터가 없습니다.")
        return None

    result = pd.concat(all_data, ignore_index=True)
    result = clean_investor_trading(result)
    result = result.drop_duplicates()

    sort_cols = [col for col in ["investor_type", "index_name", "date"] if col in result.columns]
    if sort_cols:
        result = result.sort_values(sort_cols)

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
    collect_investor_trading_period(
        start_date="20260101",
        end_date="20260430",
        output_filename="investor_trading_4m_2601.csv",
    )