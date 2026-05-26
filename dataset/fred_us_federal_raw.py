# dataset/fetch_fred_us_federal_funds_rate.py

import os
from datetime import datetime

import requests
import pandas as pd
from dotenv import load_dotenv


# =========================
# 1. 기본 설정
# =========================

load_dotenv()

FRED_API_KEY = os.getenv("FRED_API_KEY")

if not FRED_API_KEY:
    raise ValueError("FRED_API_KEY가 없습니다. 프로젝트 루트의 .env 파일을 확인하세요.")


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SAVE_DIR = os.path.join(BASE_DIR, "data", "raw", "fred", "rates")
LOG_DIR = os.path.join(BASE_DIR, "data", "processed", "fred")

os.makedirs(SAVE_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)


# =========================
# 2. FRED API 설정
# =========================

FRED_OBSERVATIONS_URL = "https://api.stlouisfed.org/fred/series/observations"

START_DATE = "2021-01-01"
END_DATE = datetime.now().strftime("%Y-%m-%d")


# =========================
# 3. 수집 대상: 미국 기준금리
# =========================
# DFF:
# Federal Funds Effective Rate
# 미국 실효 연방기금금리
#
# 주의:
# DFF는 FOMC 목표금리 상단/하단 그 자체가 아니라,
# 실제 시장에서 형성된 실효 연방기금금리다.
# MVP에서는 미국 기준금리 환경을 대표하는 지표로 사용해도 충분하다.

SERIES_ID = "DFF"
DATA_NAME = "미국_기준금리_실효연방기금금리"
ITEM_NAME = "Federal Funds Effective Rate"
KOREAN_NAME = "미국 기준금리"
UNIT = "percent"
FREQUENCY = "daily"
DESCRIPTION = "미국 실효 연방기금금리. FOMC 정책금리 환경과 미국 금리 이벤트 분석에 사용."


# =========================
# 4. FRED 데이터 수집 함수
# =========================

def fetch_us_federal_funds_rate(
    start_date: str = START_DATE,
    end_date: str = END_DATE,
) -> pd.DataFrame:
    """
    FRED API에서 미국 실효 연방기금금리(DFF)를 수집한다.
    """

    params = {
        "series_id": SERIES_ID,
        "api_key": FRED_API_KEY,
        "file_type": "json",
        "observation_start": start_date,
        "observation_end": end_date,
    }

    print(f"[INFO] FRED 수집 시작: {KOREAN_NAME} ({SERIES_ID})")
    print(f"[INFO] 기간: {start_date} ~ {end_date}")

    response = requests.get(
        FRED_OBSERVATIONS_URL,
        params=params,
        timeout=30
    )

    response.raise_for_status()

    data = response.json()

    if "observations" not in data:
        raise ValueError(f"FRED 응답에 observations가 없습니다: {data}")

    observations = data["observations"]

    if not observations:
        raise ValueError(f"{SERIES_ID} 데이터가 비어 있습니다.")

    df = pd.DataFrame(observations)

    # FRED 응답 주요 컬럼:
    # realtime_start, realtime_end, date, value
    keep_columns = [
        "date",
        "value",
        "realtime_start",
        "realtime_end",
    ]

    existing_columns = [col for col in keep_columns if col in df.columns]
    df = df[existing_columns]

    # 날짜 정리
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # FRED 결측치는 "."으로 오는 경우가 있음
    df["rate_value"] = pd.to_numeric(
        df["value"].replace(".", pd.NA),
        errors="coerce"
    )

    df = df.drop(columns=["value"])

    # 날짜 기준 정렬
    df = df.sort_values("date").reset_index(drop=True)

    # 프로젝트용 메타데이터 추가
    df["source"] = "FRED"
    df["series_id"] = SERIES_ID
    df["data_name"] = DATA_NAME
    df["item_name"] = ITEM_NAME
    df["korean_name"] = KOREAN_NAME
    df["unit"] = UNIT
    df["frequency"] = FREQUENCY
    df["description"] = DESCRIPTION
    df["collected_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    df["date"] = df["date"].dt.strftime("%Y-%m-%d")

    final_columns = [
        "date",
        "series_id",
        "data_name",
        "item_name",
        "korean_name",
        "rate_value",
        "unit",
        "frequency",
        "priority",
        "description",
        "source",
        "realtime_start",
        "realtime_end",
        "collected_at",
    ]

    existing_final_columns = [col for col in final_columns if col in df.columns]
    df = df[existing_final_columns]

    return df


# =========================
# 5. CSV 저장 함수
# =========================

def save_csv(df: pd.DataFrame):
    file_name = "fred_dff_us_federal_funds_rate.csv"
    save_path = os.path.join(SAVE_DIR, file_name)

    df.to_csv(save_path, index=False, encoding="utf-8-sig")

    print(f"[SUCCESS] 저장 완료: {save_path}")
    print(f"[INFO] 행 수: {len(df)}")

    return save_path


# =========================
# 6. 실행 함수
# =========================

def main():
    try:
        df = fetch_us_federal_funds_rate()
        save_csv(df)

        print("\n[PREVIEW]")
        print(df.tail())

        print("\n[DONE] 미국 기준금리 데이터 수집 완료")

    except Exception as e:
        print("[ERROR] 미국 기준금리 수집 실패")
        print(f"[ERROR] 사유: {e}")

        failed_log = pd.DataFrame([{
            "series_id": SERIES_ID,
            "data_name": DATA_NAME,
            "korean_name": KOREAN_NAME,
            "error_message": str(e),
            "failed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }])

        failed_log_path = os.path.join(
            LOG_DIR,
            "fred_us_federal_funds_rate_failed_logs.csv"
        )

        failed_log.to_csv(
            failed_log_path,
            index=False,
            encoding="utf-8-sig"
        )

        print(f"[WARNING] 실패 로그 저장 완료: {failed_log_path}")


if __name__ == "__main__":
    main()