import os
import time
from pathlib import Path
from datetime import datetime, timedelta

import requests
import pandas as pd
from dotenv import load_dotenv


# =========================
# 1. 환경변수 로드
# =========================

# 현재 파일 위치: safe_ai_pb/dataset/kospi_index_to_csv.py
# 프로젝트 루트: safe_ai_pb/
BASE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

KRX_AUTH_KEY = os.getenv("KRX_AUTH_KEY")

if KRX_AUTH_KEY:
    KRX_AUTH_KEY = KRX_AUTH_KEY.strip()


# =========================
# 2. API 기본 설정
# =========================

API_URL = "https://data-dbg.krx.co.kr/svc/apis/idx/kospi_dd_trd"


# =========================
# 3. 날짜 범위 생성 함수
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
# 4. 하루치 KOSPI 지수 데이터 수집
# =========================

def fetch_kospi_index_one_day(bas_date: str) -> pd.DataFrame:
    """
    KOSPI 시리즈 일별시세정보 API에서 특정 날짜의 지수 데이터를 가져온다.

    bas_date 형식: YYYYMMDD
    """

    if not KRX_AUTH_KEY:
        raise ValueError(
            "KRX_AUTH_KEY가 없습니다. 프로젝트 루트의 .env 파일에 KRX_AUTH_KEY를 설정하세요."
        )

    headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "AUTH_KEY": KRX_AUTH_KEY
    }

    payload = {
        "basDd": bas_date
    }

    response = requests.post(
        API_URL,
        json=payload,
        headers=headers,
        timeout=10
    )

    # 인증 실패는 날짜 문제가 아니므로 바로 중단
    if response.status_code == 401:
        print("401 Unauthorized: 인증 실패")
        print("응답본문:", response.text[:1000])
        raise SystemExit(
            "인증 실패로 수집을 중단합니다. "
            "KRX_AUTH_KEY, API 사용 승인 여부, 인증 헤더명을 확인하세요."
        )

    response.raise_for_status()

    data = response.json()

    # 명세서 기준 응답 구조: {"OutBlock_1": [...]}
    rows = data.get("OutBlock_1", [])

    if not rows:
        return pd.DataFrame()

    return pd.DataFrame(rows)


# =========================
# 5. 컬럼 정리 함수
# =========================

def clean_kospi_index_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    KRX 원본 컬럼명을 프로젝트에서 쓰기 좋은 영문 컬럼명으로 변경하고,
    숫자/날짜 타입을 정리한다.
    """

    column_map = {
        "BAS_DD": "date",
        "IDX_CLSS": "index_class",
        "IDX_NM": "index_name",
        "CLSPRC_IDX": "close",
        "CMPPREVDD_IDX": "change",
        "FLUC_RT": "change_rate",
        "OPNPRC_IDX": "open",
        "HGPRC_IDX": "high",
        "LWPRC_IDX": "low",
        "ACC_TRDVOL": "volume",
        "ACC_TRDVAL": "trading_value",
        "MKTCAP": "market_cap"
    }

    df = df.rename(columns=column_map)

    # 날짜 변환
    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], format="%Y%m%d", errors="coerce")

    # 숫자형 컬럼 변환
    numeric_cols = [
        "close",
        "change",
        "change_rate",
        "open",
        "high",
        "low",
        "volume",
        "trading_value",
        "market_cap"
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

    # 컬럼 순서 정리
    preferred_cols = [
        "date",
        "index_class",
        "index_name",
        "open",
        "high",
        "low",
        "close",
        "change",
        "change_rate",
        "volume",
        "trading_value",
        "market_cap"
    ]

    existing_cols = [col for col in preferred_cols if col in df.columns]
    df = df[existing_cols]

    return df


# =========================
# 6. 기간별 수집 후 CSV 저장
# =========================

def collect_kospi_index_period(
    start_date: str,
    end_date: str,
    output_file: str
):
    """
    지정한 기간의 KOSPI 시리즈 지수 데이터를 수집해 CSV로 저장한다.
    """

    all_data = []

    for bas_date in date_range(start_date, end_date):
        try:
            df = fetch_kospi_index_one_day(bas_date)

            if df.empty:
                print(f"{bas_date}: 데이터 없음")
            else:
                all_data.append(df)
                print(f"{bas_date}: {len(df)}건 수집")

            # 요청 과다 방지
            time.sleep(0.2)

        except SystemExit:
            # 인증 실패 같은 치명적 오류는 그대로 중단
            raise

        except Exception as e:
            # 주말/공휴일/일시적 오류는 넘어감
            print(f"{bas_date} 수집 실패: {e}")

    if not all_data:
        print("수집된 데이터가 없습니다.")
        return None

    result = pd.concat(all_data, ignore_index=True)

    result = clean_kospi_index_data(result)

    result = result.drop_duplicates()
    result = result.sort_values(["index_name", "date"])

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    result.to_csv(output_path, index=False, encoding="utf-8-sig")

    print(f"\nCSV 저장 완료: {output_path}")
    print(result.head())

    return result


# =========================
# 7. 실행부
# =========================

if __name__ == "__main__":
    collect_kospi_index_period(
        start_date="20260101",
        end_date="20260430",
        output_file="../data/raw/krx/kospi_index_4m_2601.csv"
    )