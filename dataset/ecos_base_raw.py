# dataset/fetch_ecos_base_rate.py

import os
import time
from datetime import datetime

import requests
import pandas as pd
from dotenv import load_dotenv


# =========================
# 1. 기본 설정
# =========================

load_dotenv()

ECOS_API_KEY = os.getenv("ECOS_API_KEY")

if not ECOS_API_KEY:
    raise ValueError("ECOS_API_KEY가 없습니다. 프로젝트 루트의 .env 파일을 확인하세요.")


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SAVE_DIR = os.path.join(BASE_DIR, "data", "raw", "ecos", "rates")
LOG_DIR = os.path.join(BASE_DIR, "data", "processed", "ecos")

os.makedirs(SAVE_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)


# =========================
# 2. ECOS API 설정
# =========================
# ECOS StatisticSearch API 형식:
#
# https://ecos.bok.or.kr/api/StatisticSearch/
#   {인증키}/json/kr/{시작번호}/{끝번호}/{통계표코드}/{주기}/{검색시작일자}/{검색종료일자}/{항목코드}
#
# 1.3.1. 한국은행 기준금리 및 여수신금리
# 통계표 코드: 722Y001

ECOS_BASE_URL = "https://ecos.bok.or.kr/api/StatisticSearch"

STAT_CODE = "722Y001"      # 1.3.1. 한국은행 기준금리 및 여수신금리
PERIOD = "D"               # 기준금리는 일별 조회 가능성이 높으므로 D 사용

START_DATE = "20210101"
END_DATE = datetime.now().strftime("%Y%m%d")


# =========================
# 3. 수집 대상 코드
# =========================
# 업로드한 1.3.1 코드표 기준.
# 우선 프로젝트에 꼭 필요한 "한국은행 기준금리"를 Must로 두고,
# 나머지 여수신금리는 필요 시 함께 수집 가능하도록 목록화.

RATE_ITEMS = [
    {
        "item_name": "한국은행 기준금리",
        "item_code": "0101000",
        "unit": "연%",
        "priority": "must",
        "description": "한국은행의 대표 정책금리. 금리 이벤트 분석의 핵심 데이터.",
    },
    {
        "item_name": "정부대출금금리",
        "item_code": "0102000",
        "unit": "연%",
        "priority": "could",
        "description": "정부대출금 관련 금리.",
    },
    {
        "item_name": "총액한도대출금리",
        "item_code": "0109000",
        "unit": "연%",
        "priority": "could",
        "description": "총액한도대출 관련 금리.",
    },
    {
        "item_name": "결제자금지원한도 대출금리",
        "item_code": "0106000",
        "unit": "연%",
        "priority": "could",
        "description": "결제자금지원한도 대출금리.",
    },
    {
        "item_name": "무역금융지원 프로그램대출금리",
        "item_code": "0107000",
        "unit": "연%",
        "priority": "could",
        "description": "무역금융지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "신용대출지원 프로그램대출금리",
        "item_code": "0110000",
        "unit": "연%",
        "priority": "could",
        "description": "신용대출지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "영세자영업자지원 프로그램대출금리",
        "item_code": "0111000",
        "unit": "연%",
        "priority": "could",
        "description": "영세자영업자지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "신성장·일자리지원 프로그램대출금리",
        "item_code": "0108000",
        "unit": "연%",
        "priority": "could",
        "description": "신성장·일자리지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "설비투자지원 프로그램대출금리",
        "item_code": "0113000",
        "unit": "연%",
        "priority": "could",
        "description": "설비투자지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "지방중소기업지원 프로그램대출금리",
        "item_code": "0112000",
        "unit": "연%",
        "priority": "could",
        "description": "지방중소기업지원 프로그램 관련 대출금리.",
    },
    {
        "item_name": "자금조정 대출금리",
        "item_code": "0104000",
        "unit": "연%",
        "priority": "could",
        "description": "자금조정 대출금리.",
    },
    {
        "item_name": "자금조정 예금금리",
        "item_code": "0105000",
        "unit": "연%",
        "priority": "could",
        "description": "자금조정 예금금리.",
    },
]


# =========================
# 4. 파일명 안전 처리
# =========================

def safe_filename(text: str) -> str:
    """
    파일명에 들어가면 불편한 문자를 안전하게 바꾼다.
    """
    return (
        text.replace("/", "_")
            .replace("\\", "_")
            .replace(":", "_")
            .replace("*", "_")
            .replace("?", "_")
            .replace('"', "_")
            .replace("<", "_")
            .replace(">", "_")
            .replace("|", "_")
            .replace("·", "_")
            .replace(" ", "_")
    )


# =========================
# 5. ECOS API 호출 함수
# =========================

def fetch_ecos_rate_item(
    item: dict,
    start_date: str = START_DATE,
    end_date: str = END_DATE,
    period: str = PERIOD,
    start_count: int = 1,
    end_count: int = 10000,
) -> pd.DataFrame:
    """
    ECOS StatisticSearch API에서 특정 금리 항목 데이터를 가져온다.

    item:
    - item_name
    - item_code
    - unit
    """

    item_code = item["item_code"]
    item_name = item["item_name"]

    url = (
        f"{ECOS_BASE_URL}/"
        f"{ECOS_API_KEY}/json/kr/"
        f"{start_count}/{end_count}/"
        f"{STAT_CODE}/"
        f"{period}/"
        f"{start_date}/{end_date}/"
        f"{item_code}"
    )

    print(f"\n[INFO] ECOS 수집 시작: {item_name} ({item_code})")
    print(f"[INFO] 요청 URL: {url.replace(ECOS_API_KEY, '***API_KEY***')}")

    response = requests.get(url, timeout=30)
    response.raise_for_status()

    data = response.json()

    # ECOS API 오류 처리
    if "RESULT" in data:
        result = data["RESULT"]
        code = result.get("CODE")
        message = result.get("MESSAGE")

        raise ValueError(f"ECOS API 오류: CODE={code}, MESSAGE={message}")

    if "StatisticSearch" not in data:
        raise ValueError(f"예상한 응답 구조가 아닙니다: {data}")

    rows = data["StatisticSearch"].get("row", [])

    if not rows:
        raise ValueError(f"{item_name} 데이터가 비어 있습니다.")

    df = pd.DataFrame(rows)

    # =========================
    # 6. 컬럼 정리
    # =========================
    # ECOS 응답 주요 컬럼:
    # STAT_CODE  : 통계표 코드
    # STAT_NAME  : 통계표명
    # ITEM_CODE1 : 항목 코드
    # ITEM_NAME1 : 항목명
    # TIME       : 시점
    # DATA_VALUE : 값
    # UNIT_NAME  : 단위

    rename_map = {
        "STAT_CODE": "stat_code",
        "STAT_NAME": "stat_name",
        "ITEM_CODE1": "item_code",
        "ITEM_NAME1": "item_name",
        "TIME": "date",
        "DATA_VALUE": "rate_value",
        "UNIT_NAME": "unit",
    }

    df = df.rename(columns=rename_map)

    # 필요한 컬럼이 없을 수 있으므로 있는 컬럼만 정리
    keep_columns = [
        "date",
        "stat_code",
        "stat_name",
        "item_code",
        "item_name",
        "rate_value",
        "unit",
    ]

    existing_columns = [col for col in keep_columns if col in df.columns]
    df = df[existing_columns]

    # 날짜 정리
    # D 주기: YYYYMMDD
    # M 주기: YYYYMM
    # Q 주기: YYYYQn 형태일 수 있음
    # A 주기: YYYY
    if "date" in df.columns:
        df["date"] = df["date"].astype(str)

        if period == "D":
            df["date"] = pd.to_datetime(df["date"], format="%Y%m%d", errors="coerce").dt.strftime("%Y-%m-%d")
        elif period == "M":
            df["date"] = pd.to_datetime(df["date"], format="%Y%m", errors="coerce").dt.strftime("%Y-%m")
        else:
            # 분기/연도는 원본 유지
            df["date"] = df["date"].astype(str)

    # 값 숫자 변환
    if "rate_value" in df.columns:
        df["rate_value"] = pd.to_numeric(df["rate_value"], errors="coerce")

    # 프로젝트용 메타데이터 추가
    df["source"] = "ECOS"
    df["category"] = "1.3.1. 한국은행 기준금리 및 여수신금리"
    df["period"] = period
    df["priority"] = item.get("priority")
    df["description"] = item.get("description")
    df["collected_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 컬럼 순서 재정리
    final_columns = [
        "date",
        "stat_code",
        "stat_name",
        "item_code",
        "item_name",
        "rate_value",
        "unit",
        "period",
        "priority",
        "category",
        "description",
        "source",
        "collected_at",
    ]

    existing_final_columns = [col for col in final_columns if col in df.columns]
    df = df[existing_final_columns]

    return df


# =========================
# 7. 저장 함수
# =========================

def save_rate_csv(df: pd.DataFrame, item: dict):
    item_name = item["item_name"]
    item_code = item["item_code"]

    file_name = f"ecos_rate_{item_code}_{safe_filename(item_name)}.csv"
    save_path = os.path.join(SAVE_DIR, file_name)

    df.to_csv(save_path, index=False, encoding="utf-8-sig")

    print(f"[SUCCESS] 저장 완료: {save_path}")
    print(f"[INFO] 행 수: {len(df)}")

    return save_path


# =========================
# 8. 실행 함수
# =========================

def main(fetch_all_items: bool = False):
    """
    fetch_all_items=False
    - 한국은행 기준금리만 수집

    fetch_all_items=True
    - 1.3.1 항목 전체 수집
    """

    if fetch_all_items:
        targets = RATE_ITEMS
        print("[INFO] 1.3.1 전체 항목 수집 모드")
    else:
        targets = [item for item in RATE_ITEMS if item["item_code"] == "0101000"]
        print("[INFO] 한국은행 기준금리만 수집 모드")

    all_dataframes = []
    failed_logs = []

    for item in targets:
        try:
            df = fetch_ecos_rate_item(item)

            save_rate_csv(df, item)

            all_dataframes.append(df)

            time.sleep(0.5)

        except Exception as e:
            print(f"[ERROR] 수집 실패: {item['item_name']} ({item['item_code']})")
            print(f"[ERROR] 사유: {e}")

            failed_logs.append({
                "stat_code": STAT_CODE,
                "item_code": item["item_code"],
                "item_name": item["item_name"],
                "error_message": str(e),
                "failed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            })

    # 여러 항목 수집 시 병합 파일 저장
    if all_dataframes:
        merged_df = pd.concat(all_dataframes, ignore_index=True)

        merged_path = os.path.join(
            SAVE_DIR,
            "ecos_1_3_1_base_rate_and_lending_deposit_rates.csv"
        )

        merged_df.to_csv(merged_path, index=False, encoding="utf-8-sig")

        print(f"\n[SUCCESS] 병합 파일 저장 완료: {merged_path}")
        print(f"[INFO] 전체 행 수: {len(merged_df)}")

    # 실패 로그 저장
    if failed_logs:
        failed_df = pd.DataFrame(failed_logs)

        failed_log_path = os.path.join(
            LOG_DIR,
            "ecos_rate_failed_logs.csv"
        )

        failed_df.to_csv(failed_log_path, index=False, encoding="utf-8-sig")

        print(f"\n[WARNING] 실패 로그 저장 완료: {failed_log_path}")

    print("\n[DONE] ECOS 금리 데이터 수집 완료")


if __name__ == "__main__":
    # 기본값: 한국은행 기준금리만 수집
    main(fetch_all_items=False)

    # 1.3.1 전체 항목을 수집하고 싶으면 위 줄 대신 아래 줄 사용
    # main(fetch_all_items=True)