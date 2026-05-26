import os
import time
from pathlib import Path
from datetime import datetime, timedelta

import requests
import pandas as pd
from dotenv import load_dotenv


# =========================
# 환경변수 로드
# =========================

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "raw" / "krx"
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

KRX_AUTH_KEY = os.getenv("KRX_AUTH_KEY")

if KRX_AUTH_KEY:
    KRX_AUTH_KEY = KRX_AUTH_KEY.strip()


# =========================
# 날짜 범위 생성
# =========================

def date_range(start_date: str, end_date: str):
    """
    start_date, end_date 형식: YYYYMMDD
    예: 20230101
    """
    start = datetime.strptime(start_date, "%Y%m%d")
    end = datetime.strptime(end_date, "%Y%m%d")

    current = start
    while current <= end:
        yield current.strftime("%Y%m%d")
        current += timedelta(days=1)


# =========================
# 숫자 변환 유틸
# =========================

def to_number(value):
    """
    KRX 응답값을 숫자로 변환한다.
    '-', '', None 같은 값은 결측치로 처리한다.
    쉼표가 있는 숫자도 처리한다.
    """
    if value is None:
        return pd.NA

    value = str(value).strip().replace(",", "").replace("%", "")

    if value in ["", "-", "nan", "None"]:
        return pd.NA

    return value


# =========================
# 하루치 데이터 요청
# =========================

def fetch_one_day(api_url: str, bas_date: str) -> pd.DataFrame:
    """
    KRX Open API에서 특정 날짜 데이터를 가져온다.
    """

    if not KRX_AUTH_KEY:
        raise ValueError(
            "KRX_AUTH_KEY가 없습니다. 프로젝트 루트의 .env 파일을 확인하세요."
        )

    headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "AUTH_KEY": KRX_AUTH_KEY
    }

    payload = {
        "basDd": bas_date
    }

    response = requests.post(
        api_url,
        json=payload,
        headers=headers,
        timeout=10
    )

    if response.status_code == 401:
        print("401 Unauthorized: 인증 실패")
        print("응답본문:", response.text[:1000])
        raise SystemExit(
            "인증 실패로 수집을 중단합니다. "
            "KRX_AUTH_KEY, API 승인 여부, 인증 헤더명을 확인하세요."
        )

    response.raise_for_status()

    data = response.json()

    rows = data.get("OutBlock_1", [])

    if not rows:
        return pd.DataFrame()

    return pd.DataFrame(rows)


# =========================
# 컬럼 정리
# =========================

def clean_data(
    df: pd.DataFrame,
    column_map: dict,
    numeric_cols: list,
    preferred_cols: list
) -> pd.DataFrame:
    """
    원본 컬럼명을 영문 컬럼명으로 바꾸고,
    날짜/숫자 타입을 정리한다.
    """

    df = df.rename(columns=column_map)

    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], format="%Y%m%d", errors="coerce")

    for col in numeric_cols:
        if col in df.columns:
            df[col] = df[col].apply(to_number)
            df[col] = pd.to_numeric(df[col], errors="coerce")

    existing_cols = [col for col in preferred_cols if col in df.columns]
    df = df[existing_cols]

    return df


# =========================
# 기간별 수집 후 CSV 저장
# =========================

def collect_period_to_csv(
    api_url: str,
    start_date: str,
    end_date: str,
    output_filename: str,
    column_map: dict,
    numeric_cols: list,
    preferred_cols: list,
    sort_cols: list
):
    """
    기간별 데이터를 수집한 뒤 CSV로 저장한다.
    """

    all_data = []

    for bas_date in date_range(start_date, end_date):
        try:
            df = fetch_one_day(api_url, bas_date)

            if df.empty:
                print(f"{bas_date}: 데이터 없음")
            else:
                all_data.append(df)
                print(f"{bas_date}: {len(df)}건 수집")

            time.sleep(0.2)

        except SystemExit:
            raise

        except Exception as e:
            print(f"{bas_date} 수집 실패: {e}")

    if not all_data:
        print("수집된 데이터가 없습니다.")
        return None

    result = pd.concat(all_data, ignore_index=True)

    result = clean_data(
        df=result,
        column_map=column_map,
        numeric_cols=numeric_cols,
        preferred_cols=preferred_cols
    )

    result = result.drop_duplicates()

    existing_sort_cols = [col for col in sort_cols if col in result.columns]

    if existing_sort_cols:
        result = result.sort_values(existing_sort_cols)

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    output_path = DATA_DIR / output_filename

    result.to_csv(output_path, index=False, encoding="utf-8-sig")

    print(f"\nCSV 저장 완료: {output_path}")
    print(result.head())

    return result