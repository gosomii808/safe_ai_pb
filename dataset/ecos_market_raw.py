# dataset/fetch_ecos_market_rates_daily.py

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

SAVE_DIR = os.path.join(BASE_DIR, "data", "raw", "ecos", "market_rates_daily")
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
# 1.3.2.1. 시장금리(일별)
# STAT_CODE = 817Y002
# PERIOD = D

ECOS_BASE_URL = "https://ecos.bok.or.kr/api/StatisticSearch"

STAT_CODE = "817Y002"      # 1.3.2.1. 시장금리(일별)
PERIOD = "D"               # 일별 데이터

START_DATE = "20210101"
END_DATE = datetime.now().strftime("%Y%m%d")


# =========================
# 3. 시장금리 수집 대상
# =========================
# 업로드한 1.3.2.1 시장금리(일별) 코드표 기준.
#
# MVP 추천:
# - 국고채(3년)
# - 국고채(10년)
# - CD(91일)
# - 회사채(3년, AA-)
# - 콜금리(1일, 전체거래)

MARKET_RATE_ITEMS = [
    {
        "item_name": "콜금리(1일, 전체거래)",
        "item_code": "010101000",
        "unit": "연%",
        "priority": "should",
        "description": "초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용.",
    },
    {
        "item_name": "콜금리(1일, 중개회사거래)",
        "item_code": "010102000",
        "unit": "연%",
        "priority": "could",
        "description": "중개회사 거래 기준 콜금리.",
    },
    {
        "item_name": "콜금리(1일, 은행증권금융차입)",
        "item_code": "010103000",
        "unit": "연%",
        "priority": "could",
        "description": "은행·증권금융 차입 기준 콜금리.",
    },
    {
        "item_name": "KOFR(공시RFR)",
        "item_code": "010901000",
        "unit": "연%",
        "priority": "could",
        "description": "한국 무위험지표금리. 단기금리 참고 지표.",
    },
    {
        "item_name": "KORIBOR(3개월)",
        "item_code": "010150000",
        "unit": "연%",
        "priority": "could",
        "description": "은행 간 기준금리 성격의 단기 시장금리.",
    },
    {
        "item_name": "KORIBOR(6개월)",
        "item_code": "010151000",
        "unit": "연%",
        "priority": "could",
        "description": "은행 간 6개월물 시장금리.",
    },
    {
        "item_name": "KORIBOR(12개월)",
        "item_code": "010152000",
        "unit": "연%",
        "priority": "could",
        "description": "은행 간 12개월물 시장금리.",
    },
    {
        "item_name": "CD(91일)",
        "item_code": "010502000",
        "unit": "연%",
        "priority": "should",
        "description": "대표 단기 시장금리. 대출금리와 자금시장 흐름 설명에 사용.",
    },
    {
        "item_name": "CP(91일)",
        "item_code": "010503000",
        "unit": "연%",
        "priority": "could",
        "description": "기업어음 금리. 기업 단기자금 조달 비용 참고.",
    },
    {
        "item_name": "국민주택채권1종(5년)",
        "item_code": "010503500",
        "unit": "연%",
        "priority": "could",
        "description": "국민주택채권 5년물 금리.",
    },
    {
        "item_name": "국고채(1년)",
        "item_code": "010190000",
        "unit": "연%",
        "priority": "could",
        "description": "단기 국채금리.",
    },
    {
        "item_name": "국고채(2년)",
        "item_code": "010195000",
        "unit": "연%",
        "priority": "could",
        "description": "2년 만기 국채금리.",
    },
    {
        "item_name": "국고채(3년)",
        "item_code": "010200000",
        "unit": "연%",
        "priority": "must",
        "description": "국내 대표 시장금리. 기준금리 변화가 시장에 반영되는 흐름을 분석할 때 사용.",
    },
    {
        "item_name": "국고채(5년)",
        "item_code": "010200001",
        "unit": "연%",
        "priority": "could",
        "description": "중기 국채금리.",
    },
    {
        "item_name": "국고채(10년)",
        "item_code": "010210000",
        "unit": "연%",
        "priority": "must",
        "description": "대표 장기금리. 성장주, 채권, 장기자산 가격 영향 분석에 사용.",
    },
    {
        "item_name": "국고채(20년)",
        "item_code": "010220000",
        "unit": "연%",
        "priority": "could",
        "description": "장기 국채금리.",
    },
    {
        "item_name": "국고채(30년)",
        "item_code": "010230000",
        "unit": "연%",
        "priority": "could",
        "description": "초장기 국채금리.",
    },
    {
        "item_name": "국고채(50년)",
        "item_code": "010240000",
        "unit": "연%",
        "priority": "could",
        "description": "초장기 국채금리.",
    },
    {
        "item_name": "통안증권(91일)",
        "item_code": "010400000",
        "unit": "연%",
        "priority": "could",
        "description": "한국은행 통화안정증권 단기금리.",
    },
    {
        "item_name": "통안증권(1년)",
        "item_code": "010400001",
        "unit": "연%",
        "priority": "could",
        "description": "통화안정증권 1년물 금리.",
    },
    {
        "item_name": "통안증권(2년)",
        "item_code": "010400002",
        "unit": "연%",
        "priority": "could",
        "description": "통화안정증권 2년물 금리.",
    },
    {
        "item_name": "산금채(1년)",
        "item_code": "010260000",
        "unit": "연%",
        "priority": "could",
        "description": "산업금융채권 1년물 금리.",
    },
    {
        "item_name": "회사채(3년, AA-)",
        "item_code": "010300000",
        "unit": "연%",
        "priority": "should",
        "description": "우량 회사채 금리. 기업 자금조달 비용과 신용시장 흐름 설명에 사용.",
    },
    {
        "item_name": "회사채(3년, BBB-)",
        "item_code": "010320000",
        "unit": "연%",
        "priority": "could",
        "description": "비우량 회사채 금리. 신용위험 확대 여부를 볼 때 사용.",
    },
    {
        "item_name": "회사채(3년, AA-, 민평)",
        "item_code": "010310000",
        "unit": "연%",
        "priority": "could",
        "description": "민간평가사 기준 우량 회사채 금리.",
    },
    {
        "item_name": "MMF(7일)",
        "item_code": "010501000",
        "unit": "연%",
        "priority": "could",
        "description": "단기 금융상품 수익률 참고 지표.",
    },
    {
        "item_name": "CMA(수시형)",
        "item_code": "010504000",
        "unit": "연%",
        "priority": "could",
        "description": "CMA 수시형 금리.",
    },
]


# =========================
# 4. MVP에서 우선 수집할 항목
# =========================
# 너무 많은 항목을 처음부터 다 가져오기보다
# SafePB AI 설명에 직접 쓰기 좋은 항목만 먼저 수집한다.

DEFAULT_TARGET_ITEM_CODES = [
    "010200000",  # 국고채(3년)
    "010210000",  # 국고채(10년)
    "010502000",  # CD(91일)
    "010300000",  # 회사채(3년, AA-)
    "010101000",  # 콜금리(1일, 전체거래)
]


# =========================
# 5. 파일명 안전 처리
# =========================

def safe_filename(text: str) -> str:
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
            .replace(",", "_")
            .replace("(", "_")
            .replace(")", "_")
            .replace(" ", "_")
    )


# =========================
# 6. ECOS API 호출 함수
# =========================

def fetch_ecos_market_rate_item(
    item: dict,
    start_date: str = START_DATE,
    end_date: str = END_DATE,
    period: str = PERIOD,
    start_count: int = 1,
    end_count: int = 10000,
) -> pd.DataFrame:
    """
    ECOS StatisticSearch API에서 시장금리 일별 데이터를 가져온다.
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

    print(f"\n[INFO] ECOS 시장금리 수집 시작: {item_name} ({item_code})")
    print(f"[INFO] 요청 URL: {url.replace(ECOS_API_KEY, '***API_KEY***')}")

    response = requests.get(url, timeout=30)
    response.raise_for_status()

    data = response.json()

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

    if "date" in df.columns:
        df["date"] = df["date"].astype(str)
        df["date"] = pd.to_datetime(
            df["date"],
            format="%Y%m%d",
            errors="coerce"
        ).dt.strftime("%Y-%m-%d")

    if "rate_value" in df.columns:
        df["rate_value"] = pd.to_numeric(df["rate_value"], errors="coerce")

    df["source"] = "ECOS"
    df["category"] = "1.3.2.1. 시장금리(일별)"
    df["period"] = period
    df["priority"] = item.get("priority")
    df["description"] = item.get("description")
    df["collected_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

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
# 7. CSV 저장 함수
# =========================

def save_market_rate_csv(df: pd.DataFrame, item: dict):
    item_name = item["item_name"]
    item_code = item["item_code"]

    file_name = f"ecos_market_rate_daily_{item_code}_{safe_filename(item_name)}.csv"
    save_path = os.path.join(SAVE_DIR, file_name)

    df.to_csv(save_path, index=False, encoding="utf-8-sig")

    print(f"[SUCCESS] 개별 파일 저장 완료: {save_path}")
    print(f"[INFO] 행 수: {len(df)}")

    return save_path


# =========================
# 8. 실행 함수
# =========================

def main(fetch_all_items: bool = False):
    """
    fetch_all_items=False
    - SafePB AI MVP에 필요한 주요 시장금리만 수집
    - 국고채 3년, 국고채 10년, CD 91일, 회사채 AA-, 콜금리

    fetch_all_items=True
    - 1.3.2.1 시장금리(일별) 코드표의 전체 항목 수집
    """

    if fetch_all_items:
        targets = [item for item in MARKET_RATE_ITEMS if item["item_code"]]
        print("[INFO] 시장금리 전체 항목 수집 모드")
    else:
        targets = [
            item for item in MARKET_RATE_ITEMS
            if item["item_code"] in DEFAULT_TARGET_ITEM_CODES
        ]
        print("[INFO] SafePB AI MVP용 주요 시장금리만 수집 모드")

    all_dataframes = []
    failed_logs = []

    for item in targets:
        try:
            df = fetch_ecos_market_rate_item(item)

            save_market_rate_csv(df, item)

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

    if all_dataframes:
        merged_df = pd.concat(all_dataframes, ignore_index=True)

        merged_path = os.path.join(
            SAVE_DIR,
            "ecos_market_rates_daily_selected.csv"
        )

        merged_df.to_csv(merged_path, index=False, encoding="utf-8-sig")

        print(f"\n[SUCCESS] 병합 파일 저장 완료: {merged_path}")
        print(f"[INFO] 전체 행 수: {len(merged_df)}")

    if failed_logs:
        failed_df = pd.DataFrame(failed_logs)

        failed_log_path = os.path.join(
            LOG_DIR,
            "ecos_market_rates_daily_failed_logs.csv"
        )

        failed_df.to_csv(failed_log_path, index=False, encoding="utf-8-sig")

        print(f"\n[WARNING] 실패 로그 저장 완료: {failed_log_path}")

    print("\n[DONE] ECOS 시장금리(일별) 데이터 수집 완료")


if __name__ == "__main__":
    # 기본값: SafePB AI MVP용 주요 시장금리만 수집
    main(fetch_all_items=False)

    # 전체 시장금리 항목을 수집하고 싶으면 위 줄 대신 아래 줄 사용
    # main(fetch_all_items=True)