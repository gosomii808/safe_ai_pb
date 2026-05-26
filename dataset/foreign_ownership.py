import os
import time
from io import BytesIO
from pathlib import Path
from datetime import datetime, timedelta

import requests
import pandas as pd
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "raw" / "krx_stat"
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

KRX_COOKIE = os.getenv("KRX_COOKIE")
if KRX_COOKIE:
    KRX_COOKIE = KRX_COOKIE.strip()

OTP_URL = "https://data.krx.co.kr/comm/fileDn/GenerateOTP/generate.cmd"
DOWNLOAD_URL = "https://data.krx.co.kr/comm/fileDn/download_csv/download.cmd"
REFERER = "https://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd"
INTERNAL_URL = "dbms/MDC/STAT/standard/MDCSTAT03701"


def date_range(start_date: str, end_date: str):
    start = datetime.strptime(start_date, "%Y%m%d")
    end = datetime.strptime(end_date, "%Y%m%d")

    current = start
    while current <= end:
        yield current.strftime("%Y%m%d")
        current += timedelta(days=1)


def fetch_foreign_ownership_one_day(
    bas_date: str,
    stock_short_code: str = "079160",
    stock_name: str = "CJ CGV",
    isu_cd: str = "KR7079160008",
    isu_cd2: str = "KR7005930003",
    market: str = "ALL",
) -> pd.DataFrame:
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

    # 하루치 요청이므로 trdDd, strtDd, endDd를 모두 같은 날짜로 설정
    otp_params = {
        "locale": "ko_KR",
        "searchType": "1",
        "mktId": market,
        "trdDd": bas_date,
        "tboxisuCd_finder_stkisu0_1": f"{stock_short_code}/{stock_name}",
        "isuCd": isu_cd,
        "isuCd2": isu_cd2,
        "codeNmisuCd_finder_stkisu0_1": stock_name,
        "param1isuCd_finder_stkisu0_1": market,
        "strtDd": bas_date,
        "endDd": bas_date,
        "share": "1",
        "csvxls_isNo": "false",
        "name": "fileDown",
        "url": INTERNAL_URL,
    }

    otp_headers = common_headers.copy()
    otp_headers.update({
        "Accept": "text/plain, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    })

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
            f"{bas_date}: OTP 응답이 LOGOUT입니다. KRX_COOKIE가 만료되었을 수 있습니다."
        )

    download_headers = common_headers.copy()
    download_headers.update({
        "Accept": "text/csv,application/vnd.ms-excel,application/octet-stream,*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    })

    csv_response = session.post(
        DOWNLOAD_URL,
        data={"code": otp_code},
        headers=download_headers,
        timeout=(10, 120),
    )
    csv_response.raise_for_status()

    content = csv_response.content

    if len(content) == 0:
        raise RuntimeError(f"{bas_date}: 다운로드된 CSV가 비어 있습니다.")

    try:
        df = pd.read_csv(BytesIO(content), encoding="euc-kr")
    except UnicodeDecodeError:
        df = pd.read_csv(BytesIO(content), encoding="cp949")

    if df.empty:
        return pd.DataFrame()

    # 최종 CSV에 들어갈 날짜는 이것 하나만 사용
    df["date"] = bas_date

    return df


def clean_foreign_ownership(df: pd.DataFrame) -> pd.DataFrame:
    column_map = {
        "date": "date",
        "일자": "date",
        "기준일자": "date",
        "종목코드": "ticker",
        "종목명": "stock_name",
        "시장구분": "market",
        "상장주식수": "listed_shares",
        "외국인 보유수량": "foreign_holding_shares",
        "외국인보유수량": "foreign_holding_shares",
        "보유수량": "foreign_holding_shares",
        "외국인 보유비율": "foreign_holding_ratio",
        "외국인보유비율": "foreign_holding_ratio",
        "지분율": "foreign_holding_ratio",
        "외국인 한도수량": "foreign_limit_shares",
        "외국인한도수량": "foreign_limit_shares",
        "한도수량": "foreign_limit_shares",
        "외국인 한도소진율": "foreign_limit_exhaustion_ratio",
        "외국인한도소진율": "foreign_limit_exhaustion_ratio",
        "한도소진율": "foreign_limit_exhaustion_ratio",
    }

    df = df.rename(columns={k: v for k, v in column_map.items() if k in df.columns})

    # 혹시 원본 CSV에 조회시작일/조회종료일 같은 컬럼이 있으면 제거
    drop_cols = [
        "start_date",
        "end_date",
        "base_date",
        "조회시작일",
        "조회종료일",
        "기준일자",
        "수집기준일자",
    ]
    df = df.drop(columns=[col for col in drop_cols if col in df.columns], errors="ignore")

    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], errors="coerce")

    numeric_cols = [
        "listed_shares",
        "foreign_holding_shares",
        "foreign_holding_ratio",
        "foreign_limit_shares",
        "foreign_limit_exhaustion_ratio",
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

    # 최종 CSV 컬럼 순서: date만 맨 앞
    preferred_cols = [
        "date",
        "ticker",
        "stock_name",
        "market",
        "listed_shares",
        "foreign_holding_shares",
        "foreign_holding_ratio",
        "foreign_limit_shares",
        "foreign_limit_exhaustion_ratio",
    ]

    existing_cols = [col for col in preferred_cols if col in df.columns]
    other_cols = [
        col for col in df.columns
        if col not in existing_cols
        and col not in ["start_date", "end_date", "base_date"]
    ]

    return df[existing_cols + other_cols]


def collect_foreign_ownership_daily(
    start_date: str,
    end_date: str,
    output_filename: str,
    stock_short_code: str = "079160",
    stock_name: str = "CJ CGV",
    isu_cd: str = "KR7079160008",
    isu_cd2: str = "KR7005930003",
    market: str = "ALL",
):
    all_data = []
    failed_dates = []

    for bas_date in date_range(start_date, end_date):
        try:
            df = fetch_foreign_ownership_one_day(
                bas_date=bas_date,
                stock_short_code=stock_short_code,
                stock_name=stock_name,
                isu_cd=isu_cd,
                isu_cd2=isu_cd2,
                market=market,
            )

            if df.empty:
                print(f"{bas_date}: 데이터 없음")
            else:
                all_data.append(df)
                print(f"{bas_date}: {len(df)}건 수집")

            time.sleep(0.4)

        except Exception as e:
            print(f"{bas_date} 수집 실패: {e}")
            failed_dates.append({
                "date": bas_date,
                "error": str(e),
            })

    if not all_data:
        print("수집된 데이터가 없습니다.")
        return None

    result = pd.concat(all_data, ignore_index=True)
    result = clean_foreign_ownership(result)
    result = result.drop_duplicates()

    sort_cols = [col for col in ["date", "market", "ticker"] if col in result.columns]
    if sort_cols:
        result = result.sort_values(sort_cols)

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    output_path = DATA_DIR / output_filename
    result.to_csv(output_path, index=False, encoding="utf-8-sig")

    print(f"\nCSV 저장 완료: {output_path}")
    print(result.head())

    if failed_dates:
        failed_path = DATA_DIR / output_filename.replace(".csv", "_failed_dates.csv")
        failed_df = pd.DataFrame(failed_dates)
        failed_df.to_csv(failed_path, index=False, encoding="utf-8-sig")
        print(f"\n실패 날짜 저장 완료: {failed_path}")

    return result


if __name__ == "__main__":
    collect_foreign_ownership_daily(
        start_date="20260401",
        end_date="20260430",
        output_filename="foreign_ownership_2604.csv",
        stock_short_code="079160",
        stock_name="CJ CGV",
        isu_cd="KR7079160008",
        isu_cd2="KR7005930003",
        market="ALL",
    )