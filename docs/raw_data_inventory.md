# Raw Data Inventory

이 문서는 `scripts/inspect_raw_data.py`로 `data/raw/` 하위 CSV를 읽어 자동 생성한 원본 데이터 명세입니다.
원본 CSV는 수정하지 않으며, 향후 전처리 완료 CSV는 `data/processed/` 하위에 저장합니다.

- scanned_at: 2026-05-28T14:36:56
- raw_path: `data/raw/`
- expected_processed_path: `data/processed/`
- file_count: 324
- failed_file_count: 0

## File Summary

| dataset | file_path | file_name | rows | columns | encoding | delimiter |
|---|---|---|---:|---:|---|---|
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_0101000_한국은행_기준금리.csv` | `ecos_rate_0101000_한국은행_기준금리.csv` | 1966 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010101000_콜금리_1일__전체거래_.csv` | `ecos_market_rate_daily_010101000_콜금리_1일__전체거래_.csv` | 1324 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010200000_국고채_3년_.csv` | `ecos_market_rate_daily_010200000_국고채_3년_.csv` | 1324 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010210000_국고채_10년_.csv` | `ecos_market_rate_daily_010210000_국고채_10년_.csv` | 1324 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010300000_회사채_3년__AA-_.csv` | `ecos_market_rate_daily_010300000_회사채_3년__AA-_.csv` | 1324 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010502000_CD_91일_.csv` | `ecos_market_rate_daily_010502000_CD_91일_.csv` | 1324 | 13 | utf-8-sig | `,` |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | `ecos_market_rates_daily_selected.csv` | 6620 | 13 | utf-8-sig | `,` |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | `fred_dff_us_federal_funds_rate.csv` | 1966 | 13 | utf-8-sig | `,` |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | `fred_dgs10_us_10y_treasury_rate.csv` | 1404 | 13 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/bond_index_4m_2601.csv` | `bond_index_4m_2601.csv` | 360 | 15 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/bond_index_6m_2401.csv` | `bond_index_6m_2401.csv` | 546 | 15 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/bond_index_6m_2407.csv` | `bond_index_6m_2407.csv` | 552 | 15 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/bond_index_6m_2501.csv` | `bond_index_6m_2501.csv` | 543 | 15 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/bond_index_6m_2507.csv` | `bond_index_6m_2507.csv` | 552 | 15 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/derivative_index_4m_2601.csv` | `derivative_index_4m_2601.csv` | 24786 | 9 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/derivative_index_6m_2401.csv` | `derivative_index_6m_2401.csv` | 34122 | 9 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/derivative_index_6m_2407.csv` | `derivative_index_6m_2407.csv` | 34686 | 9 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/derivative_index_6m_2501.csv` | `derivative_index_6m_2501.csv` | 35636 | 9 | utf-8-sig | `,` |
| 기타 | `data/raw/krx/derivative_index_6m_2507.csv` | `derivative_index_6m_2507.csv` | 37627 | 9 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_2601.csv` | `kosdaq_index_4m_2601.csv` | 3240 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_2401.csv` | `kosdaq_index_6m_2401.csv` | 4598 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_2407.csv` | `kosdaq_index_6m_2407.csv` | 4920 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_2501.csv` | `kosdaq_index_6m_2501.csv` | 4720 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_2507.csv` | `kosdaq_index_6m_2507.csv` | 4960 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_2601.csv` | `kospi_index_4m_2601.csv` | 4131 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_2401.csv` | `kospi_index_6m_2401.csv` | 5808 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_2407.csv` | `kospi_index_6m_2407.csv` | 6273 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_2501.csv` | `kospi_index_6m_2501.csv` | 6018 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_2507.csv` | `kospi_index_6m_2507.csv` | 6324 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_2601.csv` | `krx_index_4m_2601.csv` | 2916 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_2401.csv` | `krx_index_6m_2401.csv` | 4114 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_2407.csv` | `krx_index_6m_2407.csv` | 4182 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_2501.csv` | `krx_index_6m_2501.csv` | 4248 | 12 | utf-8-sig | `,` |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_2507.csv` | `krx_index_6m_2507.csv` | 4464 | 12 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2401.csv` | `foreign_ownership_2401.csv` | 61284 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2402.csv` | `foreign_ownership_2402.csv` | 53064 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2403.csv` | `foreign_ownership_2403.csv` | 55997 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2404.csv` | `foreign_ownership_2404.csv` | 58861 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2405.csv` | `foreign_ownership_2405.csv` | 56158 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2406.csv` | `foreign_ownership_2406.csv` | 53402 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2407.csv` | `foreign_ownership_2407.csv` | 64848 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2408.csv` | `foreign_ownership_2408.csv` | 59363 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2409.csv` | `foreign_ownership_2409.csv` | 50981 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2410.csv` | `foreign_ownership_2410.csv` | 56707 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2411.csv` | `foreign_ownership_2411.csv` | 59855 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2412.csv` | `foreign_ownership_2412.csv` | 57188 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2501.csv` | `foreign_ownership_2501.csv` | 51596 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2502.csv` | `foreign_ownership_2502.csv` | 57465 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2503.csv` | `foreign_ownership_2503.csv` | 57524 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2504.csv` | `foreign_ownership_2504.csv` | 63298 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2505.csv` | `foreign_ownership_2505.csv` | 54721 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2506.csv` | `foreign_ownership_2506.csv` | 54671 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2507.csv` | `foreign_ownership_2507.csv` | 66136 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2508.csv` | `foreign_ownership_2508.csv` | 57579 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2509.csv` | `foreign_ownership_2509.csv` | 63343 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2510.csv` | `foreign_ownership_2510.csv` | 51786 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2511.csv` | `foreign_ownership_2511.csv` | 57601 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2512.csv` | `foreign_ownership_2512.csv` | 60804 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2601.csv` | `foreign_ownership_2601.csv` | 60807 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2602.csv` | `foreign_ownership_2602.csv` | 49006 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2603.csv` | `foreign_ownership_2603.csv` | 60477 | 11 | utf-8-sig | `,` |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_2604.csv` | `foreign_ownership_2604.csv` | 63377 | 11 | utf-8-sig | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_24.csv` | `investing_trade_HD한국조선해양_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_25.csv` | `investing_trade_HD한국조선해양_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_26.csv` | `investing_trade_HD한국조선해양_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_24.csv` | `investing_trade_HD현대중공업_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_25.csv` | `investing_trade_HD현대중공업_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_26.csv` | `investing_trade_HD현대중공업_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_24.csv` | `investing_trade_KB금융_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_25.csv` | `investing_trade_KB금융_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_26.csv` | `investing_trade_KB금융_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_24.csv` | `investing_trade_KT&G_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_25.csv` | `investing_trade_KT&G_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_26.csv` | `investing_trade_KT&G_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_24.csv` | `investing_trade_LG에너지솔루션_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_25.csv` | `investing_trade_LG에너지솔루션_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_26.csv` | `investing_trade_LG에너지솔루션_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_24.csv` | `investing_trade_LG이노텍_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_25.csv` | `investing_trade_LG이노텍_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_26.csv` | `investing_trade_LG이노텍_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_24.csv` | `investing_trade_LG전자_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_25.csv` | `investing_trade_LG전자_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_26.csv` | `investing_trade_LG전자_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_24.csv` | `investing_trade_LG화학_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_25.csv` | `investing_trade_LG화학_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_26.csv` | `investing_trade_LG화학_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_24.csv` | `investing_trade_LIG디펜스앤에어로스페이스_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_25.csv` | `investing_trade_LIG디펜스앤에어로스페이스_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_26.csv` | `investing_trade_LIG디펜스앤에어로스페이스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_24.csv` | `investing_trade_LS ELECTRIC_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_25.csv` | `investing_trade_LS ELECTRIC_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_26.csv` | `investing_trade_LS ELECTRIC_26.csv` | 78 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_24.csv` | `investing_trade_NAVER_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_25.csv` | `investing_trade_NAVER_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_26.csv` | `investing_trade_NAVER_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_24.csv` | `investing_trade_POSCO홀딩스_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_25.csv` | `investing_trade_POSCO홀딩스_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_26.csv` | `investing_trade_POSCO홀딩스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_24.csv` | `investing_trade_SK_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_25.csv` | `investing_trade_SK_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_26.csv` | `investing_trade_SK_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_24.csv` | `investing_trade_SK스퀘어_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_25.csv` | `investing_trade_SK스퀘어_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_26.csv` | `investing_trade_SK스퀘어_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_24.csv` | `investing_trade_SK이노베이션_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_25.csv` | `investing_trade_SK이노베이션_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_26.csv` | `investing_trade_SK이노베이션_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_24.csv` | `investing_trade_SK텔레콤_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_25.csv` | `investing_trade_SK텔레콤_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_26.csv` | `investing_trade_SK텔레콤_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_24.csv` | `investing_trade_SK하이닉스_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_25.csv` | `investing_trade_SK하이닉스_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_26.csv` | `investing_trade_SK하이닉스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_24.csv` | `investing_trade_고려아연_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_25.csv` | `investing_trade_고려아연_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_26.csv` | `investing_trade_고려아연_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_24.csv` | `investing_trade_기아_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_25.csv` | `investing_trade_기아_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_26.csv` | `investing_trade_기아_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_24.csv` | `investing_trade_두산_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_25.csv` | `investing_trade_두산_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_26.csv` | `investing_trade_두산_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_24.csv` | `investing_trade_두산에너빌리티_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_25.csv` | `investing_trade_두산에너빌리티_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_26.csv` | `investing_trade_두산에너빌리티_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_24.csv` | `investing_trade_미래에셋증권_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_25.csv` | `investing_trade_미래에셋증권_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_26.csv` | `investing_trade_미래에셋증권_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_24.csv` | `investing_trade_삼성SDI_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_25.csv` | `investing_trade_삼성SDI_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_26.csv` | `investing_trade_삼성SDI_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_24.csv` | `investing_trade_삼성물산_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_25.csv` | `investing_trade_삼성물산_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_26.csv` | `investing_trade_삼성물산_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_24.csv` | `investing_trade_삼성바이오로직스_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_25.csv` | `investing_trade_삼성바이오로직스_25.csv` | 225 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_26.csv` | `investing_trade_삼성바이오로직스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_24.csv` | `investing_trade_삼성생명_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_25.csv` | `investing_trade_삼성생명_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_26.csv` | `investing_trade_삼성생명_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_24.csv` | `investing_trade_삼성전기_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_25.csv` | `investing_trade_삼성전기_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_26.csv` | `investing_trade_삼성전기_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_24.csv` | `investing_trade_삼성전자_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_25.csv` | `investing_trade_삼성전자_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_26.csv` | `investing_trade_삼성전자_26.csv` | 323 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_24.csv` | `investing_trade_삼성전자우_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_25.csv` | `investing_trade_삼성전자우_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_26.csv` | `investing_trade_삼성전자우_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_24.csv` | `investing_trade_삼성중공업_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_25.csv` | `investing_trade_삼성중공업_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_26.csv` | `investing_trade_삼성중공업_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_24.csv` | `investing_trade_삼성화재_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_25.csv` | `investing_trade_삼성화재_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_26.csv` | `investing_trade_삼성화재_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_24.csv` | `investing_trade_셀트리온_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_25.csv` | `investing_trade_셀트리온_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_26.csv` | `investing_trade_셀트리온_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_24.csv` | `investing_trade_신한지주_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_25.csv` | `investing_trade_신한지주_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_26.csv` | `investing_trade_신한지주_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_24.csv` | `investing_trade_알테오젠_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_25.csv` | `investing_trade_알테오젠_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_26.csv` | `investing_trade_알테오젠_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_24.csv` | `investing_trade_에코프로_24.csv` | 233 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_25.csv` | `investing_trade_에코프로_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_26.csv` | `investing_trade_에코프로_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_24.csv` | `investing_trade_에코프로비엠_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_25.csv` | `investing_trade_에코프로비엠_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_26.csv` | `investing_trade_에코프로비엠_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_24.csv` | `investing_trade_우리금융지주_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_25.csv` | `investing_trade_우리금융지주_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_26.csv` | `investing_trade_우리금융지주_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_24.csv` | `investing_trade_포스코퓨처엠_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_25.csv` | `investing_trade_포스코퓨처엠_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_26.csv` | `investing_trade_포스코퓨처엠_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_24.csv` | `investing_trade_하나금융지주_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_25.csv` | `investing_trade_하나금융지주_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_26.csv` | `investing_trade_하나금융지주_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_24.csv` | `investing_trade_한국전력_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_25.csv` | `investing_trade_한국전력_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_26.csv` | `investing_trade_한국전력_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_24.csv` | `investing_trade_한미반도체_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_25.csv` | `investing_trade_한미반도체_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_26.csv` | `investing_trade_한미반도체_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_24.csv` | `investing_trade_한화시스템_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_25.csv` | `investing_trade_한화시스템_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_26.csv` | `investing_trade_한화시스템_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_24.csv` | `investing_trade_한화에어로스페이스_24.csv` | 226 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_25.csv` | `investing_trade_한화에어로스페이스_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_26.csv` | `investing_trade_한화에어로스페이스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_24.csv` | `investing_trade_한화오션_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_25.csv` | `investing_trade_한화오션_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_26.csv` | `investing_trade_한화오션_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_24.csv` | `investing_trade_현대로템_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_25.csv` | `investing_trade_현대로템_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_26.csv` | `investing_trade_현대로템_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_24.csv` | `investing_trade_현대모비스_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_25.csv` | `investing_trade_현대모비스_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_26.csv` | `investing_trade_현대모비스_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_24.csv` | `investing_trade_현대일렉트릭_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_25.csv` | `investing_trade_현대일렉트릭_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_26.csv` | `investing_trade_현대일렉트릭_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_24.csv` | `investing_trade_현대차_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_25.csv` | `investing_trade_현대차_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_26.csv` | `investing_trade_현대차_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_24.csv` | `investing_trade_효성중공업_24.csv` | 244 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_25.csv` | `investing_trade_효성중공업_25.csv` | 242 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_26.csv` | `investing_trade_효성중공업_26.csv` | 81 | 6 | cp949 | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_2601.csv` | `investor_trading_4m_2601.csv` | 4320 | 8 | utf-8-sig | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_2401.csv` | `investor_trading_6m_2401.csv` | 6552 | 8 | utf-8-sig | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_2407.csv` | `investor_trading_6m_2407.csv` | 6624 | 8 | utf-8-sig | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_2501.csv` | `investor_trading_6m_2501.csv` | 6516 | 8 | utf-8-sig | `,` |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_2507.csv` | `investor_trading_6m_2507.csv` | 6624 | 8 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2401.csv` | `krx_all_stocks_2401.csv` | 86355 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2402.csv` | `krx_all_stocks_2402.csv` | 80990 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2403.csv` | `krx_all_stocks_2403.csv` | 86790 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2404.csv` | `krx_all_stocks_2404.csv` | 84083 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2405.csv` | `krx_all_stocks_2405.csv` | 87032 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2406.csv` | `krx_all_stocks_2406.csv` | 84324 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2407.csv` | `krx_all_stocks_2407.csv` | 87404 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2408.csv` | `krx_all_stocks_2408.csv` | 87624 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2409.csv` | `krx_all_stocks_2409.csv` | 84967 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2410.csv` | `krx_all_stocks_2410.csv` | 87889 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2411.csv` | `krx_all_stocks_2411.csv` | 85500 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2412.csv` | `krx_all_stocks_2412.csv` | 88656 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2501.csv` | `krx_all_stocks_2501.csv` | 88882 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2502.csv` | `krx_all_stocks_2502.csv` | 80447 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2503.csv` | `krx_all_stocks_2503.csv` | 89157 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2504.csv` | `krx_all_stocks_2504.csv` | 86314 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2505.csv` | `krx_all_stocks_2505.csv` | 89275 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2506.csv` | `krx_all_stocks_2506.csv` | 86327 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2507.csv` | `krx_all_stocks_2507.csv` | 89140 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2508.csv` | `krx_all_stocks_2508.csv` | 89246 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2509.csv` | `krx_all_stocks_2509.csv` | 86375 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2510.csv` | `krx_all_stocks_2510.csv` | 89210 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2511.csv` | `krx_all_stocks_2511.csv` | 86399 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2512.csv` | `krx_all_stocks_2512.csv` | 89788 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2601.csv` | `krx_all_stocks_2601.csv` | 89780 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2602.csv` | `krx_all_stocks_2602.csv` | 80716 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2603.csv` | `krx_all_stocks_2603.csv` | 89279 | 15 | utf-8-sig | `,` |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_2604.csv` | `krx_all_stocks_2604.csv` | 86423 | 15 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2401.csv` | `krx_per_pbr_2401.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2402.csv` | `krx_per_pbr_2402.csv` | 1044 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2403.csv` | `krx_per_pbr_2403.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2404.csv` | `krx_per_pbr_2404.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2405.csv` | `krx_per_pbr_2405.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2406.csv` | `krx_per_pbr_2406.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2407.csv` | `krx_per_pbr_2407.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2408.csv` | `krx_per_pbr_2408.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2409.csv` | `krx_per_pbr_2409.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2410.csv` | `krx_per_pbr_2410.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2411.csv` | `krx_per_pbr_2411.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2412.csv` | `krx_per_pbr_2412.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2501.csv` | `krx_per_pbr_2501.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2502.csv` | `krx_per_pbr_2502.csv` | 1008 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2503.csv` | `krx_per_pbr_2503.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2504.csv` | `krx_per_pbr_2504.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2505.csv` | `krx_per_pbr_2505.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2506.csv` | `krx_per_pbr_2506.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2507.csv` | `krx_per_pbr_2507.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2508.csv` | `krx_per_pbr_2508.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2509.csv` | `krx_per_pbr_2509.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2510.csv` | `krx_per_pbr_2510.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2511.csv` | `krx_per_pbr_2511.csv` | 1080 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2512.csv` | `krx_per_pbr_2512.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2601.csv` | `krx_per_pbr_2601.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2602.csv` | `krx_per_pbr_2602.csv` | 1008 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2603.csv` | `krx_per_pbr_2603.csv` | 1116 | 8 | utf-8-sig | `,` |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_2604.csv` | `krx_per_pbr_2604.csv` | 1080 | 8 | utf-8-sig | `,` |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_20240101_20260430.csv` | `yahoo_us_etf_spy_20240101_20260430.csv` | 584 | 17 | utf-8-sig | `,` |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_20240101_20260430.csv` | `yahoo_usd_krw_fx_20240101_20260430.csv` | 604 | 17 | utf-8-sig | `,` |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_20240101_20260430.csv` | `yahoo_nasdaq_index_20240101_20260430.csv` | 584 | 17 | utf-8-sig | `,` |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_20240101_20260430.csv` | `yahoo_sp500_index_20240101_20260430.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | `yahoo_overseas_stock_aapl_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | `yahoo_overseas_stock_abbv_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | `yahoo_overseas_stock_amat_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | `yahoo_overseas_stock_amd_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | `yahoo_overseas_stock_amzn_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | `yahoo_overseas_stock_avgo_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | `yahoo_overseas_stock_axp_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | `yahoo_overseas_stock_bac_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | `yahoo_overseas_stock_brk-a_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | `yahoo_overseas_stock_c_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | `yahoo_overseas_stock_cat_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | `yahoo_overseas_stock_cost_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | `yahoo_overseas_stock_csco_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | `yahoo_overseas_stock_cvx_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | `yahoo_overseas_stock_ge_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | `yahoo_overseas_stock_gev_2y.csv` | 525 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | `yahoo_overseas_stock_goog_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | `yahoo_overseas_stock_gs_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | `yahoo_overseas_stock_hd_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | `yahoo_overseas_stock_ibm_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | `yahoo_overseas_stock_intc_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | `yahoo_overseas_stock_jnj_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | `yahoo_overseas_stock_jpm_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | `yahoo_overseas_stock_klac_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | `yahoo_overseas_stock_ko_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | `yahoo_overseas_stock_lin_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | `yahoo_overseas_stock_lly_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | `yahoo_overseas_stock_lrcx_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | `yahoo_overseas_stock_ma_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | `yahoo_overseas_stock_meta_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | `yahoo_overseas_stock_mrk_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | `yahoo_overseas_stock_ms_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | `yahoo_overseas_stock_msft_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | `yahoo_overseas_stock_mu_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | `yahoo_overseas_stock_nflx_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | `yahoo_overseas_stock_nvda_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | `yahoo_overseas_stock_orcl_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | `yahoo_overseas_stock_pg_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | `yahoo_overseas_stock_pltr_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | `yahoo_overseas_stock_pm_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | `yahoo_overseas_stock_qcom_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | `yahoo_overseas_stock_rtx_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | `yahoo_overseas_stock_sndk_2y.csv` | 304 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | `yahoo_overseas_stock_tsla_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | `yahoo_overseas_stock_txn_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | `yahoo_overseas_stock_unh_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | `yahoo_overseas_stock_v_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | `yahoo_overseas_stock_wfc_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | `yahoo_overseas_stock_wmt_2y.csv` | 584 | 17 | utf-8-sig | `,` |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | `yahoo_overseas_stock_xom_2y.csv` | 584 | 17 | utf-8-sig | `,` |

## Column Profiles

### data/raw/ecos/base_rates/ecos_rate_0101000_한국은행_기준금리.csv

- dataset: 한국 기준금리
- file_name: `ecos_rate_0101000_한국은행_기준금리.csv`
- row_count: 1966
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-01, 2021-01-02, 2021-01-03 | date | 0 |
| stat_code | 722Y001, 722Y001, 722Y001 | string | 0 |
| stat_name | 1.3.1. 한국은행 기준금리 및 여수신금리, 1.3.1. 한국은행 기준금리 및 여수신금리, 1.3.1. 한국은행 기준금리 및 여수신금리 | string | 0 |
| item_code | 0101000, 0101000, 0101000 | integer | 0 |
| item_name | 한국은행 기준금리, 한국은행 기준금리, 한국은행 기준금리 | string | 0 |
| rate_value | 0.5, 0.5, 0.5 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | must, must, must | string | 0 |
| category | 1.3.1. 한국은행 기준금리 및 여수신금리, 1.3.1. 한국은행 기준금리 및 여수신금리, 1.3.1. 한국은행 기준금리 및 여수신금리 | string | 0 |
| description | 한국은행의 대표 정책금리. 금리 이벤트 분석의 핵심 데이터., 한국은행의 대표 정책금리. 금리 이벤트 분석의 핵심 데이터., 한국은행의 대표 정책금리. 금리 이벤트 분석의 핵심 데이터. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 15:53:38, 2026-05-22 15:53:38, 2026-05-22 15:53:38 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010101000_콜금리_1일__전체거래_.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rate_daily_010101000_콜금리_1일__전체거래_.csv`
- row_count: 1324
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010101000, 010101000, 010101000 | integer | 0 |
| item_name | 콜금리(1일, 전체거래), 콜금리(1일, 전체거래), 콜금리(1일, 전체거래) | string | 0 |
| rate_value | 0.53, 0.48, 0.48 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | should, should, should | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용., 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용., 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:07, 2026-05-22 16:26:07, 2026-05-22 16:26:07 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010200000_국고채_3년_.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rate_daily_010200000_국고채_3년_.csv`
- row_count: 1324
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010200000, 010200000, 010200000 | integer | 0 |
| item_name | 국고채(3년), 국고채(3년), 국고채(3년) | string | 0 |
| rate_value | 0.954, 0.936, 0.953 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | must, must, must | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 국내 대표 시장금리. 기준금리 변화가 시장에 반영되는 흐름을 분석할 때 사용., 국내 대표 시장금리. 기준금리 변화가 시장에 반영되는 흐름을 분석할 때 사용., 국내 대표 시장금리. 기준금리 변화가 시장에 반영되는 흐름을 분석할 때 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:09, 2026-05-22 16:26:09, 2026-05-22 16:26:09 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010210000_국고채_10년_.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rate_daily_010210000_국고채_10년_.csv`
- row_count: 1324
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010210000, 010210000, 010210000 | integer | 0 |
| item_name | 국고채(10년), 국고채(10년), 국고채(10년) | string | 0 |
| rate_value | 1.723, 1.691, 1.731 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | must, must, must | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 대표 장기금리. 성장주, 채권, 장기자산 가격 영향 분석에 사용., 대표 장기금리. 성장주, 채권, 장기자산 가격 영향 분석에 사용., 대표 장기금리. 성장주, 채권, 장기자산 가격 영향 분석에 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:10, 2026-05-22 16:26:10, 2026-05-22 16:26:10 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010300000_회사채_3년__AA-_.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rate_daily_010300000_회사채_3년__AA-_.csv`
- row_count: 1324
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010300000, 010300000, 010300000 | integer | 0 |
| item_name | 회사채(3년, AA-), 회사채(3년, AA-), 회사채(3년, AA-) | string | 0 |
| rate_value | 2.192, 2.173, 2.176 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | should, should, should | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 우량 회사채 금리. 기업 자금조달 비용과 신용시장 흐름 설명에 사용., 우량 회사채 금리. 기업 자금조달 비용과 신용시장 흐름 설명에 사용., 우량 회사채 금리. 기업 자금조달 비용과 신용시장 흐름 설명에 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:11, 2026-05-22 16:26:11, 2026-05-22 16:26:11 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rate_daily_010502000_CD_91일_.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rate_daily_010502000_CD_91일_.csv`
- row_count: 1324
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010502000, 010502000, 010502000 | integer | 0 |
| item_name | CD(91일), CD(91일), CD(91일) | string | 0 |
| rate_value | 0.66, 0.66, 0.66 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | should, should, should | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 대표 단기 시장금리. 대출금리와 자금시장 흐름 설명에 사용., 대표 단기 시장금리. 대출금리와 자금시장 흐름 설명에 사용., 대표 단기 시장금리. 대출금리와 자금시장 흐름 설명에 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:08, 2026-05-22 16:26:08, 2026-05-22 16:26:08 | string | 0 |

### data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv

- dataset: 국내 시장금리
- file_name: `ecos_market_rates_daily_selected.csv`
- row_count: 6620
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-04, 2021-01-05, 2021-01-06 | date | 0 |
| stat_code | 817Y002, 817Y002, 817Y002 | string | 0 |
| stat_name | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| item_code | 010101000, 010101000, 010101000 | integer | 0 |
| item_name | 콜금리(1일, 전체거래), 콜금리(1일, 전체거래), 콜금리(1일, 전체거래) | string | 0 |
| rate_value | 0.53, 0.48, 0.48 | number | 0 |
| unit | 연%, 연%, 연% | string | 0 |
| period | D, D, D | string | 0 |
| priority | should, should, should | string | 0 |
| category | 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별), 1.3.2.1. 시장금리(일별) | string | 0 |
| description | 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용., 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용., 초단기 자금시장 금리. 금융시장 유동성 흐름을 볼 때 사용. | string | 0 |
| source | ECOS, ECOS, ECOS | string | 0 |
| collected_at | 2026-05-22 16:26:07, 2026-05-22 16:26:07, 2026-05-22 16:26:07 | string | 0 |

### data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv

- dataset: 미국 기준금리
- file_name: `fred_dff_us_federal_funds_rate.csv`
- row_count: 1966
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-01, 2021-01-02, 2021-01-03 | date | 0 |
| series_id | DFF, DFF, DFF | string | 0 |
| data_name | 미국_기준금리_실효연방기금금리, 미국_기준금리_실효연방기금금리, 미국_기준금리_실효연방기금금리 | string | 0 |
| item_name | Federal Funds Effective Rate, Federal Funds Effective Rate, Federal Funds Effective Rate | string | 0 |
| korean_name | 미국 기준금리, 미국 기준금리, 미국 기준금리 | string | 0 |
| rate_value | 0.09, 0.09, 0.09 | number | 0 |
| unit | percent, percent, percent | string | 0 |
| frequency | daily, daily, daily | string | 0 |
| description | 미국 실효 연방기금금리. FOMC 정책금리 환경과 미국 금리 이벤트 분석에 사용., 미국 실효 연방기금금리. FOMC 정책금리 환경과 미국 금리 이벤트 분석에 사용., 미국 실효 연방기금금리. FOMC 정책금리 환경과 미국 금리 이벤트 분석에 사용. | string | 0 |
| source | FRED, FRED, FRED | string | 0 |
| realtime_start | 2026-05-22, 2026-05-22, 2026-05-22 | date | 0 |
| realtime_end | 2026-05-22, 2026-05-22, 2026-05-22 | date | 0 |
| collected_at | 2026-05-22 18:32:23, 2026-05-22 18:32:23, 2026-05-22 18:32:23 | string | 0 |

### data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv

- dataset: 기타
- file_name: `fred_dgs10_us_10y_treasury_rate.csv`
- row_count: 1404
- column_count: 13
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2021-01-01, 2021-01-04, 2021-01-05 | date | 0 |
| series_id | DGS10, DGS10, DGS10 | string | 0 |
| data_name | 미국_10년물_국채금리, 미국_10년물_국채금리, 미국_10년물_국채금리 | string | 0 |
| item_name | 10-Year Treasury Constant Maturity Rate, 10-Year Treasury Constant Maturity Rate, 10-Year Treasury Constant Maturity Rate | string | 0 |
| korean_name | 미국 10년물 국채금리, 미국 10년물 국채금리, 미국 10년물 국채금리 | string | 0 |
| rate_value | , 0.93, 0.96 | number | 58 |
| unit | percent, percent, percent | string | 0 |
| frequency | daily, daily, daily | string | 0 |
| description | 미국 장기금리 대표 지표. 나스닥, 성장주, 채권, 환율 영향 분석에 사용., 미국 장기금리 대표 지표. 나스닥, 성장주, 채권, 환율 영향 분석에 사용., 미국 장기금리 대표 지표. 나스닥, 성장주, 채권, 환율 영향 분석에 사용. | string | 0 |
| source | FRED, FRED, FRED | string | 0 |
| realtime_start | 2026-05-22, 2026-05-22, 2026-05-22 | date | 0 |
| realtime_end | 2026-05-22, 2026-05-22, 2026-05-22 | date | 0 |
| collected_at | 2026-05-22 18:46:51, 2026-05-22 18:46:51, 2026-05-22 18:46:51 | string | 0 |

### data/raw/krx/bond_index_4m_2601.csv

- dataset: 기타
- file_name: `bond_index_4m_2601.csv`
- row_count: 360
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-01, 2026-01-02, 2026-01-03 | date | 0 |
| bond_index_name | KRX 채권지수, KRX 채권지수, KRX 채권지수 | string | 0 |
| total_return_index_close | 201.15, 201.19, 201.2 | number | 78 |
| total_return_index_change | 0.02, 0.04, 0.02 | number | 78 |
| net_price_index_close | 101.01, 101.02, 101.03 | number | 78 |
| net_price_index_change | 0.0, 0.01, 0.0 | number | 78 |
| zero_reinvestment_index_close | 194.29, 194.33, 194.35 | number | 240 |
| zero_reinvestment_index_change | 0.02, 0.04, 0.02 | number | 240 |
| call_reinvestment_index_close | 199.95, 199.99, 200.01 | number | 240 |
| call_reinvestment_index_change | 0.02, 0.04, 0.02 | number | 240 |
| market_price_index_close | 101.7, 101.71, 101.72 | number | 159 |
| market_price_index_change | 0.01, 0.0, 0.01 | number | 159 |
| avg_duration | 5.512, 5.52, 5.519 | number | 78 |
| avg_convexity_price | 88.347, 88.478, 88.47 | number | 78 |
| ytm | 3.095, 3.084, 3.084 | number | 78 |

### data/raw/krx/bond_index_6m_2401.csv

- dataset: 기타
- file_name: `bond_index_6m_2401.csv`
- row_count: 546
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-01, 2024-01-02, 2024-01-03 | date | 0 |
| bond_index_name | KRX 채권지수, KRX 채권지수, KRX 채권지수 | string | 0 |
| total_return_index_close | 189.56, 188.34, 188.16 | number | 122 |
| total_return_index_change | 0.02, -1.22, -0.18 | number | 122 |
| net_price_index_close | 101.06, 100.39, 100.29 | number | 122 |
| net_price_index_change | 0.0, -0.66, -0.11 | number | 122 |
| zero_reinvestment_index_close | 183.2, 182.02, 181.84 | number | 364 |
| zero_reinvestment_index_change | 0.01, -1.18, -0.18 | number | 364 |
| call_reinvestment_index_close | 188.39, 187.18, 186.99 | number | 364 |
| call_reinvestment_index_change | 0.02, -1.21, -0.18 | number | 364 |
| market_price_index_close | 101.76, 101.07, 100.97 | number | 243 |
| market_price_index_change | 0.01, -0.69, -0.1 | number | 243 |
| avg_duration | 5.285, 5.224, 5.235 | number | 122 |
| avg_convexity_price | 81.371, 79.562, 79.907 | number | 122 |
| ytm | 3.465, 3.55, 3.569 | number | 122 |

### data/raw/krx/bond_index_6m_2407.csv

- dataset: 기타
- file_name: `bond_index_6m_2407.csv`
- row_count: 552
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| bond_index_name | KRX 채권지수, KRX 채권지수, KRX 채권지수 | string | 0 |
| total_return_index_close | 192.57, 192.9, 192.98 | number | 122 |
| total_return_index_change | -0.2, 0.34, 0.08 | number | 122 |
| net_price_index_close | 101.11, 101.28, 101.31 | number | 122 |
| net_price_index_change | -0.11, 0.17, 0.03 | number | 122 |
| zero_reinvestment_index_close | 186.06, 186.39, 186.46 | number | 368 |
| zero_reinvestment_index_change | -0.19, 0.32, 0.08 | number | 368 |
| call_reinvestment_index_close | 191.36, 191.69, 191.76 | number | 368 |
| call_reinvestment_index_change | -0.2, 0.33, 0.08 | number | 368 |
| market_price_index_close | 101.82, 101.97, 102.01 | number | 245 |
| market_price_index_change | -0.11, 0.15, 0.04 | number | 245 |
| avg_duration | 5.345, 5.398, 5.394 | number | 122 |
| avg_convexity_price | 83.324, 84.53, 84.502 | number | 122 |
| ytm | 3.377, 3.336, 3.328 | number | 122 |

### data/raw/krx/bond_index_6m_2501.csv

- dataset: 기타
- file_name: `bond_index_6m_2501.csv`
- row_count: 543
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-01, 2025-01-02, 2025-01-03 | date | 0 |
| bond_index_name | KRX 채권지수, KRX 채권지수, KRX 채권지수 | string | 0 |
| total_return_index_close | 199.66, 200.78, 201.09 | number | 126 |
| total_return_index_change | 0.02, 1.12, 0.31 | number | 126 |
| net_price_index_close | 103.27, 103.84, 104.0 | number | 126 |
| net_price_index_change | -0.0, 0.58, 0.15 | number | 126 |
| zero_reinvestment_index_close | 192.8, 193.89, 194.19 | number | 362 |
| zero_reinvestment_index_change | 0.02, 1.08, 0.3 | number | 362 |
| call_reinvestment_index_close | 198.35, 199.47, 199.78 | number | 362 |
| call_reinvestment_index_change | 0.02, 1.12, 0.31 | number | 362 |
| market_price_index_close | 103.98, 104.55, 104.71 | number | 244 |
| market_price_index_change | 0.01, 0.56, 0.16 | number | 244 |
| avg_duration | 5.562, 5.646, 5.656 | number | 126 |
| avg_convexity_price | 89.605, 91.702, 92.0 | number | 126 |
| ytm | 2.972, 2.886, 2.856 | number | 126 |

### data/raw/krx/bond_index_6m_2507.csv

- dataset: 기타
- file_name: `bond_index_6m_2507.csv`
- row_count: 552
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| bond_index_name | KRX 채권지수, KRX 채권지수, KRX 채권지수 | string | 0 |
| total_return_index_close | 204.62, 204.22, 204.47 | number | 120 |
| total_return_index_change | 0.45, -0.4, 0.24 | number | 120 |
| net_price_index_close | 104.29, 104.08, 104.2 | number | 120 |
| net_price_index_change | 0.22, -0.21, 0.12 | number | 120 |
| zero_reinvestment_index_close | 197.58, 197.2, 197.43 | number | 368 |
| zero_reinvestment_index_change | 0.43, -0.38, 0.23 | number | 368 |
| call_reinvestment_index_close | 203.28, 202.89, 203.13 | number | 368 |
| call_reinvestment_index_change | 0.44, -0.39, 0.24 | number | 368 |
| market_price_index_close | 104.99, 104.77, 104.89 | number | 244 |
| market_price_index_change | 0.23, -0.22, 0.12 | number | 244 |
| avg_duration | 5.769, 5.798, 5.793 | number | 120 |
| avg_convexity_price | 95.388, 96.113, 96.017 | number | 120 |
| ytm | 2.625, 2.652, 2.63 | number | 120 |

### data/raw/krx/derivative_index_4m_2601.csv

- dataset: 기타
- file_name: `derivative_index_4m_2601.csv`
- row_count: 24786
- column_count: 9
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-02, 2026-01-05, 2026-01-06 | date | 0 |
| index_class | 전략지수, 전략지수, 전략지수 | string | 0 |
| index_name | 10년국채선물 레버리지지수, 10년국채선물 레버리지지수, 10년국채선물 레버리지지수 | string | 0 |
| open | 1888.6, 1884.99, 1876.13 | number | 2866 |
| high | 1898.31, 1885.34, 1896.49 | number | 2866 |
| low | 1880.56, 1865.62, 1875.46 | number | 2866 |
| close | 1885.28, 1880.98, 1879.47 | number | 0 |
| change | -5.27, -4.3, -1.51 | number | 0 |
| change_rate | -0.28, -0.23, -0.08 | number | 0 |

### data/raw/krx/derivative_index_6m_2401.csv

- dataset: 기타
- file_name: `derivative_index_6m_2401.csv`
- row_count: 34122
- column_count: 9
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| index_class | 전략지수, 전략지수, 전략지수 | string | 0 |
| index_name | 10년국채선물 레버리지지수, 10년국채선물 레버리지지수, 10년국채선물 레버리지지수 | string | 0 |
| open | 1868.14, 1846.36, 1848.12 | number | 6147 |
| high | 1868.14, 1857.71, 1853.95 | number | 6147 |
| low | 1845.53, 1834.7, 1842.66 | number | 6147 |
| close | 1846.82, 1836.65, 1849.76 | number | 0 |
| change | -45.28, -10.17, 13.11 | number | 0 |
| change_rate | -2.39, -0.55, 0.71 | number | 0 |

### data/raw/krx/derivative_index_6m_2407.csv

- dataset: 기타
- file_name: `derivative_index_6m_2407.csv`
- row_count: 34686
- column_count: 9
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_class | 전략지수, 전략지수, 전략지수 | string | 0 |
| index_name | 10년국채선물 레버리지지수, 10년국채선물 레버리지지수, 10년국채선물 레버리지지수 | string | 0 |
| open | 1859.25, 1862.71, 1876.61 | number | 5205 |
| high | 1866.15, 1876.77, 1878.59 | number | 5205 |
| low | 1858.94, 1856.52, 1869.41 | number | 5205 |
| close | 1864.51, 1873.5, 1876.3 | number | 0 |
| change | -14.54, 8.99, 2.8 | number | 0 |
| change_rate | -0.77, 0.48, 0.15 | number | 0 |

### data/raw/krx/derivative_index_6m_2501.csv

- dataset: 기타
- file_name: `derivative_index_6m_2501.csv`
- row_count: 35636
- column_count: 9
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-02, 2025-01-03, 2025-01-06 | date | 0 |
| index_class | 전략지수, 전략지수, 전략지수 | string | 0 |
| index_name | 10년국채선물 레버리지지수, 10년국채선물 레버리지지수, 10년국채선물 레버리지지수 | string | 0 |
| open | 1968.67, 1989.33, 1980.3 | number | 6470 |
| high | 1989.83, 2004.89, 1987.76 | number | 6470 |
| low | 1960.61, 1983.91, 1978.27 | number | 6470 |
| close | 1988.81, 2000.14, 1981.97 | number | 0 |
| change | 25.7, 11.33, -18.17 | number | 21 |
| change_rate | 1.31, 0.57, -0.91 | number | 21 |

### data/raw/krx/derivative_index_6m_2507.csv

- dataset: 기타
- file_name: `derivative_index_6m_2507.csv`
- row_count: 37627
- column_count: 9
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_class | 전략지수, 전략지수, 전략지수 | string | 0 |
| index_name | 10년국채선물 레버리지지수, 10년국채선물 레버리지지수, 10년국채선물 레버리지지수 | string | 0 |
| open | 2036.22, 2043.25, 2021.71 | number | 5940 |
| high | 2046.86, 2045.63, 2033.69 | number | 5940 |
| low | 2033.12, 2023.96, 2019.63 | number | 5940 |
| close | 2041.38, 2024.64, 2033.69 | number | 0 |
| change | 7.71, -16.74, 9.05 | number | 4 |
| change_rate | 0.38, -0.82, 0.45 | number | 4 |

### data/raw/krx/kosdaq_index_4m_2601.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kosdaq_index_4m_2601.csv`
- row_count: 3240
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-02, 2026-01-05, 2026-01-06 | date | 0 |
| index_class | KOSDAQ, KOSDAQ, KOSDAQ | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 890.52, 926.19, 915.1 | number | 81 |
| high | 923.6, 926.19, 918.5 | number | 81 |
| low | 890.52, 908.67, 908.24 | number | 81 |
| close | 923.6, 912.73, 910.85 | number | 81 |
| change | 36.32, -10.87, -1.88 | number | 81 |
| change_rate | 4.09, -1.18, -0.21 | number | 81 |
| volume | 84715647, 96375100, 114589048 | integer | 0 |
| trading_value | 1017648079317, 982440713260, 690098760524 | integer | 0 |
| market_cap | 39574807447616, 39113423207534, 39053357954905 | integer | 0 |

### data/raw/krx/kosdaq_index_6m_2401.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kosdaq_index_6m_2401.csv`
- row_count: 4598
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| index_class | KOSDAQ, KOSDAQ, KOSDAQ | string | 0 |
| index_name | 건설, 건설, 건설 | string | 0 |
| open | 69.6, 70.34, 70.25 | number | 121 |
| high | 70.64, 71.21, 70.3 | number | 121 |
| low | 69.13, 69.99, 69.53 | number | 121 |
| close | 70.64, 70.24, 69.78 | number | 121 |
| change | 1.35, -0.4, -0.46 | number | 121 |
| change_rate | 1.95, -0.57, -0.65 | number | 121 |
| volume | 6892753, 7070082, 5032953 | integer | 0 |
| trading_value | 73677608048, 112404532679, 63650486795 | integer | 0 |
| market_cap | 3358933486414, 3339883256694, 3318023185903 | integer | 0 |

### data/raw/krx/kosdaq_index_6m_2407.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kosdaq_index_6m_2407.csv`
- row_count: 4920
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_class | KOSDAQ, KOSDAQ, KOSDAQ | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | , ,  | number | 339 |
| high | , ,  | number | 339 |
| low | , ,  | number | 339 |
| close | 1000.0, 977.35, 972.35 | number | 123 |
| change | , -22.65, -5.0 | number | 125 |
| change_rate | , -2.27, -0.51 | number | 125 |
| volume | , ,  | number | 216 |
| trading_value | , ,  | number | 216 |
| market_cap | , ,  | number | 216 |

### data/raw/krx/kosdaq_index_6m_2501.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kosdaq_index_6m_2501.csv`
- row_count: 4720
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-02, 2025-01-03, 2025-01-06 | date | 0 |
| index_class | KOSDAQ, KOSDAQ, KOSDAQ | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 853.17, 869.59, 888.54 | number | 118 |
| high | 870.49, 885.83, 897.7 | number | 118 |
| low | 849.5, 867.59, 885.79 | number | 118 |
| close | 870.35, 885.83, 895.12 | number | 118 |
| change | 19.76, 15.48, 9.29 | number | 118 |
| change_rate | 2.32, 1.78, 1.05 | number | 118 |
| volume | 98265037, 130509638, 205627383 | integer | 0 |
| trading_value | 900914419244, 957193965199, 1530235837567 | integer | 0 |
| market_cap | 33344621704189, 33932975053781, 34285980571188 | integer | 0 |

### data/raw/krx/kosdaq_index_6m_2507.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kosdaq_index_6m_2507.csv`
- row_count: 4960
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_class | KOSDAQ, KOSDAQ, KOSDAQ | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 1061.04, 1065.02, 1040.89 | number | 124 |
| high | 1071.3, 1065.02, 1047.78 | number | 124 |
| low | 1057.46, 1028.76, 1037.85 | number | 124 |
| close | 1058.92, 1037.7, 1041.19 | number | 124 |
| change | 2.53, -21.22, 3.49 | number | 124 |
| change_rate | 0.24, -2.0, 0.34 | number | 124 |
| volume | 128079625, 84604032, 85211442 | integer | 0 |
| trading_value | 896548640826, 662372665417, 592394404519 | integer | 0 |
| market_cap | 41697815544266, 40859852818882, 40980846546289 | integer | 0 |

### data/raw/krx/kospi_index_4m_2601.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kospi_index_4m_2601.csv`
- row_count: 4131
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-02, 2026-01-05, 2026-01-06 | date | 0 |
| index_class | KOSPI, KOSPI, KOSPI | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 1283.15, 1310.78, 1312.85 | number | 81 |
| high | 1312.52, 1320.36, 1345.51 | number | 81 |
| low | 1265.69, 1299.58, 1312.19 | number | 81 |
| close | 1307.45, 1309.67, 1337.27 | number | 81 |
| change | 28.34, 2.22, 27.6 | number | 81 |
| change_rate | 2.22, 0.17, 2.11 | number | 81 |
| volume | 13783578, 10946421, 12030603 | integer | 0 |
| trading_value | 879035249614, 691735698666, 1430964990797 | integer | 0 |
| market_cap | 127450622770757, 127666830028402, 130357813086243 | integer | 0 |

### data/raw/krx/kospi_index_6m_2401.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kospi_index_6m_2401.csv`
- row_count: 5808
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| index_class | KOSPI, KOSPI, KOSPI | string | 0 |
| index_name | 건설, 건설, 건설 | string | 0 |
| open | 70.97, 70.6, 70.52 | number | 121 |
| high | 70.97, 70.93, 70.88 | number | 121 |
| low | 70.26, 70.36, 70.19 | number | 121 |
| close | 70.67, 70.61, 70.27 | number | 121 |
| change | -0.72, -0.06, -0.34 | number | 121 |
| change_rate | -1.01, -0.08, -0.48 | number | 121 |
| volume | 24342843, 35981809, 48640939 | integer | 0 |
| trading_value | 102931157536, 143326387758, 181526813765 | integer | 0 |
| market_cap | 14300479138163, 14291097690660, 14224496708062 | integer | 0 |

### data/raw/krx/kospi_index_6m_2407.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kospi_index_6m_2407.csv`
- row_count: 6273
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_class | KOSPI, KOSPI, KOSPI | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | , ,  | number | 447 |
| high | , ,  | number | 447 |
| low | , ,  | number | 447 |
| close | 1000.0, 985.15, 991.11 | number | 123 |
| change | , -14.85, 5.96 | number | 126 |
| change_rate | , -1.49, 0.6 | number | 126 |
| volume | , ,  | number | 324 |
| trading_value | , ,  | number | 324 |
| market_cap | , ,  | number | 324 |

### data/raw/krx/kospi_index_6m_2501.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kospi_index_6m_2501.csv`
- row_count: 6018
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-02, 2025-01-03, 2025-01-06 | date | 0 |
| index_class | KOSPI, KOSPI, KOSPI | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 1032.78, 1019.98, 1043.06 | number | 118 |
| high | 1035.88, 1050.56, 1071.96 | number | 118 |
| low | 1006.79, 1019.98, 1041.88 | number | 118 |
| close | 1013.93, 1042.29, 1070.55 | number | 118 |
| change | -14.06, 28.36, 28.26 | number | 118 |
| change_rate | -1.37, 2.8, 2.71 | number | 118 |
| volume | 6352373, 8074733, 13296206 | integer | 0 |
| trading_value | 317456669026, 392946838379, 424447915654 | integer | 0 |
| market_cap | 94570732203603, 97215961785787, 99851994599749 | integer | 0 |

### data/raw/krx/kospi_index_6m_2507.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `kospi_index_6m_2507.csv`
- row_count: 6324
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_class | KOSPI, KOSPI, KOSPI | string | 0 |
| index_name | IT 서비스, IT 서비스, IT 서비스 | string | 0 |
| open | 1355.05, 1367.05, 1329.78 | number | 124 |
| high | 1389.4, 1368.91, 1366.02 | number | 124 |
| low | 1348.78, 1320.98, 1329.04 | number | 124 |
| close | 1356.2, 1327.57, 1336.97 | number | 124 |
| change | 4.76, -28.63, 9.4 | number | 124 |
| change_rate | 0.35, -2.11, 0.71 | number | 124 |
| volume | 18316655, 12321364, 12397154 | integer | 0 |
| trading_value | 1143185640266, 948203167426, 869878319560 | integer | 0 |
| market_cap | 132568017089319, 129769906431353, 130688427009173 | integer | 0 |

### data/raw/krx/krx_index_4m_2601.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `krx_index_4m_2601.csv`
- row_count: 2916
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-02, 2026-01-05, 2026-01-06 | date | 0 |
| index_class | KRX, KRX, KRX | string | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| open | 9523.78, 10016.27, 10142.85 | number | 162 |
| high | 9805.71, 10194.33, 10368.89 | number | 162 |
| low | 9523.42, 9997.47, 10007.96 | number | 162 |
| close | 9795.45, 10194.3, 10368.89 | number | 0 |
| change | 300.82, 398.85, 174.59 | number | 0 |
| change_rate | 3.17, 4.07, 1.71 | number | 0 |
| volume | 98225728.0, 134036949.0, 151505466.0 | number | 162 |
| trading_value | 14535820691340.0, 19211907534002.0, 22103888471665.0 | number | 162 |
| market_cap | 3069335039824600.0, 3185409987402050.0, 3239007904653150.0 | number | 162 |

### data/raw/krx/krx_index_6m_2401.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `krx_index_6m_2401.csv`
- row_count: 4114
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| index_class | KRX, KRX, KRX | string | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| open | 5536.24, 5542.4, 5417.68 | number | 726 |
| high | 5618.39, 5543.03, 5448.82 | number | 726 |
| low | 5528.99, 5452.89, 5389.19 | number | 726 |
| close | 5604.08, 5452.89, 5407.55 | number | 0 |
| change | 41.96, -151.19, -45.34 | number | 0 |
| change_rate | 0.75, -2.7, -0.83 | number | 0 |
| volume | 92683216.0, 98390538.0, 87251618.0 | number | 726 |
| trading_value | 7969267565593.0, 8209923437591.0, 6349555636883.0 | number | 726 |
| market_cap | 1764881928138560.0, 1717769183833150.0, 1706426378908290.0 | number | 726 |

### data/raw/krx/krx_index_6m_2407.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `krx_index_6m_2407.csv`
- row_count: 4182
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_class | KRX, KRX, KRX | string | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| open | 5951.11, 5964.94, 5955.83 | number | 676 |
| high | 5983.92, 5982.77, 5979.59 | number | 676 |
| low | 5935.68, 5916.96, 5920.54 | number | 676 |
| close | 5980.18, 5922.86, 5975.11 | number | 0 |
| change | 15.23, -57.32, 52.25 | number | 0 |
| change_rate | 0.26, -0.96, 0.88 | number | 0 |
| volume | 84800349.0, 95230611.0, 105100510.0 | number | 676 |
| trading_value | 6257813258090.0, 7503617305850.0, 8433489708877.0 | number | 676 |
| market_cap | 1857353588543840.0, 1841514461997490.0, 1857117147606320.0 | number | 676 |

### data/raw/krx/krx_index_6m_2501.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `krx_index_6m_2501.csv`
- row_count: 4248
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-02, 2025-01-03, 2025-01-06 | date | 0 |
| index_class | KRX, KRX, KRX | string | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| open | 4999.52, 5007.22, 5131.43 | number | 271 |
| high | 5020.79, 5132.21, 5226.65 | number | 271 |
| low | 4969.51, 5003.97, 5117.38 | number | 271 |
| close | 4995.18, 5101.97, 5226.64 | number | 0 |
| change | -5.53, 106.79, 124.67 | number | 2 |
| change_rate | -0.11, 2.14, 2.44 | number | 2 |
| volume | 72330779.0, 93123946.0, 82863019.0 | number | 271 |
| trading_value | 5113205129696.0, 6367853213432.0, 6476639426742.0 | number | 271 |
| market_cap | 1584106916333530.0, 1616909559948710.0, 1652034979357610.0 | number | 271 |

### data/raw/krx/krx_index_6m_2507.csv

- dataset: KOSPI/KOSDAQ/KRX 지수 시세
- file_name: `krx_index_6m_2507.csv`
- row_count: 4464
- column_count: 12
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_class | KRX, KRX, KRX | string | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| open | 6477.78, 6446.09, 6494.73 | number | 248 |
| high | 6564.93, 6465.48, 6531.95 | number | 248 |
| low | 6460.13, 6342.97, 6461.18 | number | 248 |
| close | 6461.08, 6435.59, 6531.95 | number | 0 |
| change | 19.56, -25.49, 96.36 | number | 0 |
| change_rate | 0.3, -0.39, 1.5 | number | 0 |
| volume | 120060656.0, 113658448.0, 130481950.0 | number | 248 |
| trading_value | 10336482738155.0, 10227484145588.0, 11185501038920.0 | number | 248 |
| market_cap | 2002449533545340.0, 1995713982800570.0, 2028412902412250.0 | number | 248 |

### data/raw/krx_stat/foreign_ownership_2401.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2401.csv`
- row_count: 61284
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-02, 2024-01-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_holding_shares | 1358364, 44940657, 277030 | integer | 0 |
| foreign_limit_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 4.86, 46.75, 1.01 | number | 0 |
| 종가 | 10490, 370, 8760 | integer | 0 |
| 대비 | 220, 12, -80 | integer | 0 |
| 등락률 | 2.14, 3.35, -0.9 | number | 0 |
| 외국인 지분율 | 4.86, 46.75, 1.01 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2402.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2402.csv`
- row_count: 53064
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-02-01, 2024-02-01, 2024-02-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_holding_shares | 1605042, 44764341, 274392 | integer | 0 |
| foreign_limit_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 5.75, 46.56, 1.0 | number | 0 |
| 종가 | 9740, 323, 8750 | integer | 0 |
| 대비 | 90, -4, 190 | integer | 0 |
| 등락률 | 0.93, -1.22, 2.22 | number | 0 |
| 외국인 지분율 | 5.75, 46.56, 1.0 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2403.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2403.csv`
- row_count: 55997
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-03-04, 2024-03-04, 2024-03-04 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_holding_shares | 1661814, 43963412, 273662 | integer | 0 |
| foreign_limit_shares | 27931470, 96138465, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 5.95, 45.73, 1.0 | number | 0 |
| 종가 | 9740, 465, 8890 | integer | 0 |
| 대비 | 20, 0, 230 | integer | 0 |
| 등락률 | 0.21, 0.0, 2.66 | number | 0 |
| 외국인 지분율 | 5.95, 45.73, 1.0 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2404.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2404.csv`
- row_count: 58861
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-04-01, 2024-04-01, 2024-04-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 29132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1644117, 13478228, 259285 | integer | 0 |
| foreign_limit_shares | 27931470, 29132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 5.89, 46.26, 0.95 | number | 0 |
| 종가 | 9500, 1052, 8390 | integer | 0 |
| 대비 | 100, 27, 0 | integer | 0 |
| 등락률 | 1.06, 2.63, 0.0 | number | 0 |
| 외국인 지분율 | 5.89, 46.26, 0.95 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2405.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2405.csv`
- row_count: 56158
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-05-02, 2024-05-02, 2024-05-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 29132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1507771, 13442455, 246110 | integer | 0 |
| foreign_limit_shares | 27931470, 29132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 5.4, 46.14, 0.9 | number | 0 |
| 종가 | 8700, 1058, 7620 | integer | 0 |
| 대비 | -20, 29, -10 | integer | 0 |
| 등락률 | -0.23, 2.82, -0.13 | number | 0 |
| 외국인 지분율 | 5.4, 46.14, 0.9 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2406.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2406.csv`
- row_count: 53402
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-06-03, 2024-06-03, 2024-06-03 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1432231, 25608466, 241841 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 5.13, 42.59, 0.88 | number | 0 |
| 종가 | 8370, 706, 7620 | integer | 0 |
| 대비 | 90, 9, -50 | integer | 0 |
| 등락률 | 1.09, 1.29, -0.65 | number | 0 |
| 외국인 지분율 | 5.13, 42.59, 0.88 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2407.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2407.csv`
- row_count: 64848
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-01, 2024-07-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1135828, 25174089, 236471 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 4.07, 41.86, 0.86 | number | 0 |
| 종가 | 8150, 647, 7740 | integer | 0 |
| 대비 | 90, -7, -40 | integer | 0 |
| 등락률 | 1.12, -1.07, -0.51 | number | 0 |
| 외국인 지분율 | 4.07, 41.86, 0.86 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2408.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2408.csv`
- row_count: 59363
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-08-01, 2024-08-01, 2024-08-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1018215, 25262649, 233880 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.65, 42.01, 0.85 | number | 0 |
| 종가 | 8380, 615, 7100 | integer | 0 |
| 대비 | 40, 25, 0 | integer | 0 |
| 등락률 | 0.48, 4.24, 0.0 | number | 0 |
| 외국인 지분율 | 3.65, 42.01, 0.85 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2409.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2409.csv`
- row_count: 50981
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-09-02, 2024-09-02, 2024-09-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 1095415, 25399030, 232976 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.92, 42.24, 0.85 | number | 0 |
| 종가 | 8000, 586, 6540 | integer | 0 |
| 대비 | -70, -9, -230 | integer | 0 |
| 등락률 | -0.87, -1.51, -3.4 | number | 0 |
| 외국인 지분율 | 3.92, 42.24, 0.85 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2410.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2410.csv`
- row_count: 56707
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-10-02, 2024-10-02, 2024-10-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 999239, 25341698, 221507 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.58, 42.14, 0.81 | number | 0 |
| 종가 | 7600, 557, 6030 | integer | 0 |
| 대비 | -160, -3, -90 | integer | 0 |
| 등락률 | -2.06, -0.54, -1.47 | number | 0 |
| 외국인 지분율 | 3.58, 42.14, 0.81 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2411.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2411.csv`
- row_count: 59855
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-11-01, 2024-11-01, 2024-11-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 934107, 25227479, 214201 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.34, 41.95, 0.78 | number | 0 |
| 종가 | 7320, 523, 6260 | integer | 0 |
| 대비 | -200, -1, 50 | integer | 0 |
| 등락률 | -2.66, -0.19, 0.81 | number | 0 |
| 외국인 지분율 | 3.34, 41.95, 0.78 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2412.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2412.csv`
- row_count: 57188
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-12-02, 2024-12-02, 2024-12-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 908285, 25108093, 209156 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.25, 41.75, 0.76 | number | 0 |
| 종가 | 6430, 437, 6120 | integer | 0 |
| 대비 | -180, -8, 40 | integer | 0 |
| 등락률 | -2.72, -1.8, 0.66 | number | 0 |
| 외국인 지분율 | 3.25, 41.75, 0.76 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2501.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2501.csv`
- row_count: 51596
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-02, 2025-01-02, 2025-01-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 881734, 25012518, 206863 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.16, 41.6, 0.75 | number | 0 |
| 종가 | 6300, 459, 6410 | integer | 0 |
| 대비 | 0, 5, 60 | integer | 0 |
| 등락률 | 0.0, 1.1, 0.94 | number | 0 |
| 외국인 지분율 | 3.16, 41.6, 0.75 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2502.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2502.csv`
- row_count: 57465
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-02-03, 2025-02-03, 2025-02-03 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 790313, 25014888, 204743 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.83, 41.6, 0.75 | number | 0 |
| 종가 | 5980, 404, 6240 | integer | 0 |
| 대비 | -110, -19, -30 | integer | 0 |
| 등락률 | -1.81, -4.49, -0.48 | number | 0 |
| 외국인 지분율 | 2.83, 41.6, 0.75 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2503.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2503.csv`
- row_count: 57524
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-03-04, 2025-03-04, 2025-03-04 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 793976.0, 25178335.0, 204596.0 | number | 1 |
| foreign_limit_shares | 27931470.0, 60132868.0, 27415270.0 | number | 1 |
| foreign_limit_exhaustion_ratio | 2.84, 41.87, 0.75 | number | 1 |
| 종가 | 6130, 400, 6290 | integer | 0 |
| 대비 | -80, -8, 10 | integer | 0 |
| 등락률 | -1.29, -1.96, 0.16 | number | 0 |
| 외국인 지분율 | 2.84, 41.87, 0.75 | number | 1 |

### data/raw/krx_stat/foreign_ownership_2504.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2504.csv`
- row_count: 63298
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-04-01, 2025-04-01, 2025-04-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 818258, 25367374, 224824 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.93, 42.19, 0.82 | number | 0 |
| 종가 | 6040, 377, 6550 | integer | 0 |
| 대비 | 50, 2, 40 | integer | 0 |
| 등락률 | 0.83, 0.53, 0.61 | number | 0 |
| 외국인 지분율 | 2.93, 42.19, 0.82 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2505.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2505.csv`
- row_count: 54721
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-05-02, 2025-05-02, 2025-05-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 853244, 25709447, 233395 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.05, 42.75, 0.85 | number | 0 |
| 종가 | 6270, 462, 6850 | integer | 0 |
| 대비 | -10, 12, -160 | integer | 0 |
| 등락률 | -0.16, 2.67, -2.28 | number | 0 |
| 외국인 지분율 | 3.05, 42.75, 0.85 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2506.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2506.csv`
- row_count: 54671
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-06-02, 2025-06-02, 2025-06-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 838159, 25530022, 247146 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.0, 42.46, 0.9 | number | 0 |
| 종가 | 6490, 429, 7520 | integer | 0 |
| 대비 | -110, -8, 210 | integer | 0 |
| 등락률 | -1.67, -1.83, 2.87 | number | 0 |
| 외국인 지분율 | 3.0, 42.46, 0.9 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2507.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2507.csv`
- row_count: 66136
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-01, 2025-07-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 773379, 25696427, 428845 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.77, 42.73, 1.56 | number | 0 |
| 종가 | 6800, 410, 7750 | integer | 0 |
| 대비 | 60, 3, 90 | integer | 0 |
| 등락률 | 0.89, 0.74, 1.17 | number | 0 |
| 외국인 지분율 | 2.77, 42.73, 1.56 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2508.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2508.csv`
- row_count: 57579
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-08-01, 2025-08-01, 2025-08-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 794049, 25311482, 404884 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.84, 42.09, 1.48 | number | 0 |
| 종가 | 6450, 640, 7250 | integer | 0 |
| 대비 | -260, 28, -200 | integer | 0 |
| 등락률 | -3.87, 4.58, -2.68 | number | 0 |
| 외국인 지분율 | 2.84, 42.09, 1.48 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2509.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2509.csv`
- row_count: 63343
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-09-01, 2025-09-01, 2025-09-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_holding_shares | 818651, 25287214, 367157 | integer | 0 |
| foreign_limit_shares | 27931470, 60132868, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.93, 42.05, 1.34 | number | 0 |
| 종가 | 6170, 543, 7130 | integer | 0 |
| 대비 | -60, -11, -70 | integer | 0 |
| 등락률 | -0.96, -1.99, -0.97 | number | 0 |
| 외국인 지분율 | 2.93, 42.05, 1.34 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2510.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2510.csv`
- row_count: 51786
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-10-01, 2025-10-01, 2025-10-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 830530, 25426608, 308992 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.97, 29.44, 1.13 | number | 0 |
| 종가 | 6360, 544, 7020 | integer | 0 |
| 대비 | 0, -6, -70 | integer | 0 |
| 등락률 | 0.0, -1.09, -0.99 | number | 0 |
| 외국인 지분율 | 2.97, 29.44, 1.13 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2511.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2511.csv`
- row_count: 57601
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-11-03, 2025-11-03, 2025-11-03 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 811185, 25454067, 277190 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.9, 29.47, 1.01 | number | 0 |
| 종가 | 6150, 488, 6700 | integer | 0 |
| 대비 | -110, -8, 30 | integer | 0 |
| 등락률 | -1.76, -1.61, 0.45 | number | 0 |
| 외국인 지분율 | 2.9, 29.47, 1.01 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2512.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2512.csv`
- row_count: 60804
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-12-01, 2025-12-01, 2025-12-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 957816, 25667469, 356561 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.43, 29.72, 1.3 | number | 0 |
| 종가 | 6160, 494, 7070 | integer | 0 |
| 대비 | -110, 11, -10 | integer | 0 |
| 등락률 | -1.75, 2.28, -0.14 | number | 0 |
| 외국인 지분율 | 3.43, 29.72, 1.3 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2601.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2601.csv`
- row_count: 60807
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-02, 2026-01-02, 2026-01-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 790024, 25769079, 261512 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.83, 29.83, 0.95 | number | 0 |
| 종가 | 6210, 443, 9370 | integer | 0 |
| 대비 | -40, -8, 10 | integer | 0 |
| 등락률 | -0.64, -1.77, 0.11 | number | 0 |
| 외국인 지분율 | 2.83, 29.83, 0.95 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2602.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2602.csv`
- row_count: 49006
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-02-02, 2026-02-02, 2026-02-02 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 897486, 25752155, 486673 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.21, 29.81, 1.78 | number | 0 |
| 종가 | 5930, 416, 9380 | integer | 0 |
| 대비 | -140, -14, 30 | integer | 0 |
| 등락률 | -2.31, -3.26, 0.32 | number | 0 |
| 외국인 지분율 | 3.21, 29.81, 1.78 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2603.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2603.csv`
- row_count: 60477
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-03-03, 2026-03-03, 2026-03-03 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 1019944, 25413296, 543802 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 3.65, 29.42, 1.98 | number | 0 |
| 종가 | 6150, 385, 9900 | integer | 0 |
| 대비 | -150, -11, -300 | integer | 0 |
| 등락률 | -2.38, -2.78, -2.94 | number | 0 |
| 외국인 지분율 | 3.65, 29.42, 1.98 | number | 0 |

### data/raw/krx_stat/foreign_ownership_2604.csv

- dataset: 외국인 보유량
- file_name: `foreign_ownership_2604.csv`
- row_count: 63377
- column_count: 11
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-04-01, 2026-04-01, 2026-04-01 | date | 0 |
| ticker | 000020, 000040, 000050 | string | 0 |
| stock_name | 동화약품, KR모터스, 경방 | string | 0 |
| listed_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_holding_shares | 814296, 25796081, 669939 | integer | 0 |
| foreign_limit_shares | 27931470, 86375184, 27415270 | integer | 0 |
| foreign_limit_exhaustion_ratio | 2.92, 29.87, 2.44 | number | 0 |
| 종가 | 5930, 412, 9450 | integer | 0 |
| 대비 | 100, -5, 430 | integer | 0 |
| 등락률 | 1.72, -1.2, 4.77 | number | 0 |
| 외국인 지분율 | 2.92, 29.87, 2.44 | number | 0 |

### data/raw/krx_stat/investing_trade_HD한국조선해양_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD한국조선해양_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1165781000, -2125731000, 2153525500 | integer | 0 |
| 기타법인 | 6762000, -4401098000, 188247500 | integer | 0 |
| 개인 | 127382500, 6644156500, -5989628500 | integer | 0 |
| 외국인 합계 | 1031636500, -117327500, 3647855500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_HD한국조선해양_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD한국조선해양_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -1941717250, -2601160500, -10138773500 | integer | 0 |
| 기타법인 | -307762500, -281357500, 58599500 | integer | 0 |
| 개인 | -2555996750, -164277000, 12981392500 | integer | 0 |
| 외국인 합계 | 4805476500, 3046795000, -2901218500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_HD한국조선해양_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD한국조선해양_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 4324936250, 481826250, -6128221750 | integer | 0 |
| 기타법인 | 180658500, -1438291000, 231757000 | integer | 0 |
| 개인 | -6200241000, -8973185000, 730808500 | integer | 0 |
| 외국인 합계 | 1694646250, 9929649750, 5165656250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_HD현대중공업_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD현대중공업_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -5241536000, -4911825500, -10064710000 | integer | 0 |
| 기타법인 | -162642500, -1329296500, 340279500 | integer | 0 |
| 개인 | 7246084000, 13477345000, -7186388500 | integer | 0 |
| 외국인 합계 | -1841905500, -7236223000, 16910819000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_HD현대중공업_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD현대중공업_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -753974000, -191997000, 1802930500 | integer | 0 |
| 기타법인 | -184529500, -115188500, 866405000 | integer | 0 |
| 개인 | 20827456000, -12461153000, 545382500 | integer | 0 |
| 외국인 합계 | -19888952500, 12768338500, -3214718000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_HD현대중공업_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_HD현대중공업_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 21930170000, 47783571500, -39854626500 | integer | 0 |
| 기타법인 | 1389669000, 1817556000, 669428000 | integer | 0 |
| 개인 | -16020282000, -41536359500, -5761780000 | integer | 0 |
| 외국인 합계 | -7299557000, -8064768000, 44946978500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KB금융_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KB금융_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 374936300, -2882413700, 3659906100 | integer | 0 |
| 기타법인 | 39845100, -172404100, 880595700 | integer | 0 |
| 개인 | 12686387800, -3520848500, 4841047600 | integer | 0 |
| 외국인 합계 | -13101169200, 6575666300, -9381549400 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KB금융_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KB금융_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -6667694550, -6570712150, -3718336850 | integer | 0 |
| 기타법인 | -234730000, -144957300, -70836200 | integer | 0 |
| 개인 | -3180167700, -5243581700, 6847775300 | integer | 0 |
| 외국인 합계 | 10082592250, 11959251150, -3058602250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KB금융_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KB금융_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 7425746100, -5932225400, 3280274950 | integer | 0 |
| 기타법인 | -441041800, -829899450, -407222400 | integer | 0 |
| 개인 | -21927481100, -20453946500, -24331969800 | integer | 0 |
| 외국인 합계 | 14942776800, 27216071350, 21458917250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KT&G_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KT&G_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2232708200, -1223290700, -2583660300 | integer | 0 |
| 기타법인 | 3208600, 58129400, -64080400 | integer | 0 |
| 개인 | 134807100, -468915300, 1898210500 | integer | 0 |
| 외국인 합계 | -2370723900, 1634076600, 749530200 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KT&G_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KT&G_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -167311050, -5950667850, -12017225250 | integer | 0 |
| 기타법인 | -96325200, -859969200, 17564600 | integer | 0 |
| 개인 | 2252388250, 1400053000, 5503190200 | integer | 0 |
| 외국인 합계 | -1988752000, 5410584050, 6496470450 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_KT&G_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_KT&G_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 4291629200, -4195188250, -4285456900 | integer | 0 |
| 기타법인 | -76205400, 8132300, 363872700 | integer | 0 |
| 개인 | -7989196400, 87228300, -2384188800 | integer | 0 |
| 외국인 합계 | 3773772600, 4099827650, 6305773000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG에너지솔루션_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG에너지솔루션_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2017703500, 13638384500, -5065609500 | integer | 0 |
| 기타법인 | -31413500, -71632000, -2202791000 | integer | 0 |
| 개인 | 848519500, -18028150500, 3110338500 | integer | 0 |
| 외국인 합계 | -2834809500, 4461398000, 4158062000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG에너지솔루션_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG에너지솔루션_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -44869176500, -35159214500, -17826067250 | integer | 0 |
| 기타법인 | -6586557500, -10911368500, -5410918250 | integer | 0 |
| 개인 | 33856529250, -4651262000, 15317503750 | integer | 0 |
| 외국인 합계 | 17599204750, 50721845000, 7919481750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG에너지솔루션_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG에너지솔루션_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 958167750, 277674250, -4524819250 | integer | 0 |
| 기타법인 | -12067650000, -11695421250, -11235511750 | integer | 0 |
| 개인 | 32156931250, 16793747000, 2738219250 | integer | 0 |
| 외국인 합계 | -21047449000, -5376000000, 13022111750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG이노텍_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG이노텍_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 928646700, -1046961600, 7262352300 | integer | 0 |
| 기타법인 | -2030800, -150540200, -391034900 | integer | 0 |
| 개인 | -189777300, 3981937300, -7398877500 | integer | 0 |
| 외국인 합계 | -736838600, -2784435500, 527560100 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG이노텍_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG이노텍_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -6596188750, -5004385500, -1553721250 | integer | 0 |
| 기타법인 | -13925000, -111122000, -2397982250 | integer | 0 |
| 개인 | -2037283250, -5845281250, 829532750 | integer | 0 |
| 외국인 합계 | 8647397000, 10960788750, 3122170750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG이노텍_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG이노텍_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -11761855500, 7707937000, 13508779500 | integer | 0 |
| 기타법인 | -1712430500, 146891000, 670380000 | integer | 0 |
| 개인 | -5135833000, 17185595000, 4720865000 | integer | 0 |
| 외국인 합계 | 18610119000, -25040423000, -18900024500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG전자_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG전자_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -3736408500, -2679022800, -4938044200 | integer | 0 |
| 기타법인 | -88407400, -21176600, -1091436700 | integer | 0 |
| 개인 | 8720841500, 6263943300, 7003060800 | integer | 0 |
| 외국인 합계 | -4896025600, -3563743900, -973579900 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG전자_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG전자_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 6028129500, 1220003950, -577761600 | integer | 0 |
| 기타법인 | -394540350, -177681550, -426336650 | integer | 0 |
| 개인 | -7066649350, 286592100, 10039377800 | integer | 0 |
| 외국인 합계 | 1433060200, -1328914500, -9035279550 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG전자_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG전자_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 24245491650, -22362900050, 15261353800 | integer | 0 |
| 기타법인 | 1688760800, -3881217050, -1471335100 | integer | 0 |
| 개인 | -55425609300, 63195452100, -25205110950 | integer | 0 |
| 외국인 합계 | 29491356850, -36951335000, 11415092250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG화학_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG화학_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 12056720000, -2993029000, -2987969500 | integer | 0 |
| 기타법인 | -183826000, 89095500, -679341500 | integer | 0 |
| 개인 | -12697136000, -516577000, 7834370000 | integer | 0 |
| 외국인 합계 | 824242000, 3420510500, -4167059000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG화학_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG화학_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 2669037250, -966114250, -8405784000 | integer | 0 |
| 기타법인 | 355552750, -306982000, -2761129750 | integer | 0 |
| 개인 | -3149937000, -8051297750, 6010098000 | integer | 0 |
| 외국인 합계 | 125347000, 9324394000, 5156815750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LG화학_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LG화학_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -8523752000, 12175348750, 12336621750 | integer | 0 |
| 기타법인 | 9130500, -65736250, -216271000 | integer | 0 |
| 개인 | 12810296000, -31037882500, -42549371000 | integer | 0 |
| 외국인 합계 | -4295674500, 18928270000, 30429020250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LIG디펜스앤에어로스페이스_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 1970401000, -771246500, 1211459500 | integer | 0 |
| 기타법인 | -13350000, -584560000, 56053000 | integer | 0 |
| 개인 | -6500256500, -1835348000, -474452500 | integer | 0 |
| 외국인 합계 | 4543205500, 3191154500, -793060000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LIG디펜스앤에어로스페이스_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 4916940000, 17050137000, -6037349750 | integer | 0 |
| 기타법인 | -403981250, -406139500, 443076750 | integer | 0 |
| 개인 | 5444793250, -31256658750, 4510830000 | integer | 0 |
| 외국인 합계 | -9957752000, 14612661250, 1083443000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LIG디펜스앤에어로스페이스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -55216278000, 55467683000, -18106785500 | integer | 0 |
| 기타법인 | 1128026000, 564449000, 2129885000 | integer | 0 |
| 개인 | 48339278000, -108151771000, 47792078000 | integer | 0 |
| 외국인 합계 | 5748974000, 52119639000, -31815177500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LS ELECTRIC_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LS ELECTRIC_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 397387500, 400990500, 127390000 | integer | 0 |
| 기타법인 | -79999000, -406708100, -218422900 | integer | 0 |
| 개인 | -1598235200, -2692850300, 4867289900 | integer | 0 |
| 외국인 합계 | 1280846700, 2698567900, -4776257000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LS ELECTRIC_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LS ELECTRIC_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -3948015250, 2176841750, -4008650500 | integer | 0 |
| 기타법인 | 495697500, -465980250, -30021500 | integer | 0 |
| 개인 | 8787284750, -18322116250, -741391750 | integer | 0 |
| 외국인 합계 | -5334967000, 16611254750, 4780063750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_LS ELECTRIC_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_LS ELECTRIC_26.csv`
- row_count: 78
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 42589993250, 28016741250, -39856251000 | integer | 0 |
| 기타법인 | -1149863750, -316267250, 5182976750 | integer | 0 |
| 개인 | 30763793250, 57573214000, 265045050500 | integer | 0 |
| 외국인 합계 | -72203922750, -85273688000, -230371776250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_NAVER_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_NAVER_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 1100170800, -12180079500, 7848431100 | integer | 0 |
| 기타법인 | -2554939900, 158964000, -651207600 | integer | 0 |
| 개인 | -12299351700, -9512685600, -15160833500 | integer | 0 |
| 외국인 합계 | 13754120800, 21533801100, 7963610000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_NAVER_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_NAVER_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 896871750, 11562233000, -8193626250 | integer | 0 |
| 기타법인 | -1530569000, -1183826750, -1541739750 | integer | 0 |
| 개인 | -30673135500, -54699089750, 23832095250 | integer | 0 |
| 외국인 합계 | 31306832750, 44320683500, -14096729250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_NAVER_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_NAVER_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -76904938250, -14020231250, 2397846500 | integer | 0 |
| 기타법인 | 1546267250, 3154158500, 1941103250 | integer | 0 |
| 개인 | 201417887500, 43978207500, -12251439500 | integer | 0 |
| 외국인 합계 | -126059216500, -33112134750, 7912489750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_POSCO홀딩스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_POSCO홀딩스_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 6465601500, 12273945000, 9138084500 | integer | 0 |
| 기타법인 | -2412589000, 545140500, -647617000 | integer | 0 |
| 개인 | -8077482500, -9401820000, -3630882500 | integer | 0 |
| 외국인 합계 | 4024470000, -3417265500, -4859585000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_POSCO홀딩스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_POSCO홀딩스_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 1007825750, 6650231500, -4694728250 | integer | 0 |
| 기타법인 | 127145000, -5219951750, 831124000 | integer | 0 |
| 개인 | 20905625750, -22971553750, 21069839750 | integer | 0 |
| 외국인 합계 | -22040596500, 21541274000, -17206235500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_POSCO홀딩스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_POSCO홀딩스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 191054000, 23281545000, 73858823750 | integer | 0 |
| 기타법인 | 613605250, -542277500, -8080773750 | integer | 0 |
| 개인 | 28247202000, 13086711750, -252024843500 | integer | 0 |
| 외국인 합계 | -29051861250, -35825979250, 186246793500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1983978700, -979200100, 971452300 | integer | 0 |
| 기타법인 | 71078600, -419657500, -104596500 | integer | 0 |
| 개인 | 7771185500, 234074900, -432169300 | integer | 0 |
| 외국인 합계 | -5858285400, 1164782700, -434686500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 3790701500, -1380545250, -10034554000 | integer | 0 |
| 기타법인 | -74779000, -968671750, 1191710250 | integer | 0 |
| 개인 | -7148936750, -11069906250, 2289781750 | integer | 0 |
| 외국인 합계 | 3433014250, 13419123250, 6553062000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 9519176000, 48533750, -195270500 | integer | 0 |
| 기타법인 | 1433258000, 860591500, 1125344000 | integer | 0 |
| 개인 | -11909325750, -21455974250, -15394906750 | integer | 0 |
| 외국인 합계 | 956891750, 20546849000, 14464833250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK스퀘어_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK스퀘어_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2785609500, 1523935500, 839713100 | integer | 0 |
| 기타법인 | 92695900, 144511600, -32613800 | integer | 0 |
| 개인 | -89630200, 23690400, -533604200 | integer | 0 |
| 외국인 합계 | -2788675200, -1692137500, -273495100 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK스퀘어_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK스퀘어_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 12336944000, 29684347000, 17056865750 | integer | 0 |
| 기타법인 | 43378500, -420941000, -1847089750 | integer | 0 |
| 개인 | -14445554000, 8544184250, -29497851250 | integer | 0 |
| 외국인 합계 | 2065231500, -37807590250, 14288075250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK스퀘어_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK스퀘어_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 14880813500, 796632500, 37570121000 | integer | 0 |
| 기타법인 | -3052350000, 1627081500, -3417484000 | integer | 0 |
| 개인 | 33524733500, 43698676000, -5052517500 | integer | 0 |
| 외국인 합계 | -45353197000, -46122390000, -29100119500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK이노베이션_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK이노베이션_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 4531702200, 15275300, 3623539800 | integer | 0 |
| 기타법인 | -73146400, -132548700, -1150189200 | integer | 0 |
| 개인 | -3759617400, 342050800, -4943408000 | integer | 0 |
| 외국인 합계 | -698938400, -224777400, 2470057400 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK이노베이션_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK이노베이션_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -5582754150, -2898171000, -924804600 | integer | 0 |
| 기타법인 | 117462300, 275177850, -473421650 | integer | 0 |
| 개인 | 6523797850, 967555400, 3731535800 | integer | 0 |
| 외국인 합계 | -1058506000, 1655437750, -2333309550 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK이노베이션_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK이노베이션_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 14036603850, 27312763050, 3461518850 | integer | 0 |
| 기타법인 | -30093977300, -45910140300, -25993003450 | integer | 0 |
| 개인 | -7028886000, -91282785350, -9249021200 | integer | 0 |
| 외국인 합계 | 23086259450, 109880162600, 31780505800 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK텔레콤_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK텔레콤_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -2159580100, 1744230700, 1909838900 | integer | 0 |
| 기타법인 | 624117700, 35773300, 101410800 | integer | 0 |
| 개인 | 8269686900, -1394308600, 1533407800 | integer | 0 |
| 외국인 합계 | -6734224500, -385695400, -3544657500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK텔레콤_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK텔레콤_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 1143254700, -777491150, -414031000 | integer | 0 |
| 기타법인 | -150196450, -89964400, 298433700 | integer | 0 |
| 개인 | -4332069800, 2351154550, 4102850550 | integer | 0 |
| 외국인 합계 | 3339011550, -1483699000, -3987253250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK텔레콤_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK텔레콤_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 14224276150, -5805340150, -4523004700 | integer | 0 |
| 기타법인 | -167717600, 66382650, -442084900 | integer | 0 |
| 개인 | 7622404150, 3386147400, 11053866350 | integer | 0 |
| 외국인 합계 | -21678962700, 2352810100, -6088776750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK하이닉스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK하이닉스_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 9431240400, 4480624300, 28529687800 | integer | 0 |
| 기타법인 | 175397300, -1317568100, -320866400 | integer | 0 |
| 개인 | -3479593700, -19971413400, -148387176400 | integer | 0 |
| 외국인 합계 | -6127044000, 16808357200, 120178355000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK하이닉스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK하이닉스_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -87472117000, -105616670500, 190324006000 | integer | 0 |
| 기타법인 | 8911464000, -6714288500, 4182616500 | integer | 0 |
| 개인 | 160575408500, -55737949500, -965147190000 | integer | 0 |
| 외국인 합계 | -82014755500, 168068908500, 770640567500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_SK하이닉스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_SK하이닉스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 95921707500, -18762301500, -16402555000 | integer | 0 |
| 기타법인 | -408985500, 19064128000, 18457983500 | integer | 0 |
| 개인 | -78369433000, 543305284500, 404352013500 | integer | 0 |
| 외국인 합계 | -17143289000, -543607111000, -406407442000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_고려아연_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_고려아연_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2913152000, 3306061000, 15659362000 | integer | 0 |
| 기타법인 | -53426000, 127668000, -2535452000 | integer | 0 |
| 개인 | 2754364000, 19037192000, -1851313000 | integer | 0 |
| 외국인 합계 | -5614090000, -22470921000, -11272597000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_고려아연_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_고려아연_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -13071665500, 12932365500, -17572770500 | integer | 0 |
| 기타법인 | -41595000, -507959000, -320632000 | integer | 0 |
| 개인 | 16199067500, -29454576000, 15046141500 | integer | 0 |
| 외국인 합계 | -3085807000, 17030169500, 2847261000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_고려아연_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_고려아연_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 8325839500, -7442802000, 510059500 | integer | 0 |
| 기타법인 | 1059182000, 80814000, -86611000 | integer | 0 |
| 개인 | 52526032500, 30806791500, 7833850000 | integer | 0 |
| 외국인 합계 | -61911054000, -23444803500, -8257298500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_기아_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_기아_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 9687390100, 6361337700, 28079938300 | integer | 0 |
| 기타법인 | -108037800, -271347900, -393523000 | integer | 0 |
| 개인 | -7219587200, 2035959400, -41650672800 | integer | 0 |
| 외국인 합계 | -2359765100, -8125949200, 13964257500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_기아_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_기아_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 4577841250, 338061950, 3932221200 | integer | 0 |
| 기타법인 | -274260600, -24767300, -250976250 | integer | 0 |
| 개인 | -14861516650, -10978116300, 2283961900 | integer | 0 |
| 외국인 합계 | 10557936000, 10664821650, -5965206850 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_기아_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_기아_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -8127993300, -7826228500, 6346237050 | integer | 0 |
| 기타법인 | 5367116300, -1865652600, 78109400 | integer | 0 |
| 개인 | 68422576200, 6654774450, -18358701300 | integer | 0 |
| 외국인 합계 | -65661699200, 3037106650, 11934354850 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1345767000, -5089018500, 63261622000 | integer | 0 |
| 기타법인 | 478861000, -666303000, 837736500 | integer | 0 |
| 개인 | -829062500, 7387985500, -63482819500 | integer | 0 |
| 외국인 합계 | 1695968500, -1632664000, -616539000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -11146526000, -4349604000, -10926682000 | integer | 0 |
| 기타법인 | 363127500, 370576500, 434285000 | integer | 0 |
| 개인 | 6206187500, 3631989500, 31039492000 | integer | 0 |
| 외국인 합계 | 4577211000, 347038000, -20547095000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 7657402500, -8520442000, 13275069500 | integer | 0 |
| 기타법인 | -943217000, 268029000, -7156500 | integer | 0 |
| 개인 | -16184462500, 12295700000, -6299086500 | integer | 0 |
| 외국인 합계 | 9470277000, -4043287000, -6968826500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산에너빌리티_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산에너빌리티_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 659069300, -5636145810, -2281711770 | integer | 0 |
| 기타법인 | -137176490, 227587670, 452005070 | integer | 0 |
| 개인 | 1788266030, 9922846450, 7125309070 | integer | 0 |
| 외국인 합계 | -2310158840, -4514288310, -5295602370 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산에너빌리티_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산에너빌리티_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -9906229050, -10829664250, -25188079150 | integer | 0 |
| 기타법인 | -7557668600, -49698386300, 46873581550 | integer | 0 |
| 개인 | 32493109550, 12000189000, 18253334850 | integer | 0 |
| 외국인 합계 | -15029211900, 48527861550, -39938837250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_두산에너빌리티_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_두산에너빌리티_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 105873550, 47561032750, -25117232900 | integer | 0 |
| 기타법인 | -1791729500, -354270300, -304480400 | integer | 0 |
| 개인 | 9482016000, -77847666500, 3787450600 | integer | 0 |
| 외국인 합계 | -7796160050, 30640904050, 21634262700 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_미래에셋증권_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_미래에셋증권_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -381187600, -1183038200, -216224950 | integer | 0 |
| 기타법인 | 80948700, 211268500, -120093130 | integer | 0 |
| 개인 | 708413820, 914915570, 733059050 | integer | 0 |
| 외국인 합계 | -408174920, 56854130, -396740970 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_미래에셋증권_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_미래에셋증권_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 9978254400, 11364934375, 10835211550 | integer | 0 |
| 기타법인 | -157579500, 91017925, -1016526450 | integer | 0 |
| 개인 | -5193540100, -20272124150, -7141734450 | integer | 0 |
| 외국인 합계 | -4627134800, 8816171850, -2676950650 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_미래에셋증권_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_미래에셋증권_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -19146495100, -4328246250, -16066945950 | integer | 0 |
| 기타법인 | 125255650, 1609104200, -5838438100 | integer | 0 |
| 개인 | 51181342750, 22917779750, 631918250 | integer | 0 |
| 외국인 합계 | -32160103300, -20198637700, 21273465800 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성SDI_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성SDI_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1124867000, -3263041000, -4028300500 | integer | 0 |
| 기타법인 | -820667000, 12899000, -1934036000 | integer | 0 |
| 개인 | -1492162500, -6620672500, 17524880500 | integer | 0 |
| 외국인 합계 | 3437696500, 9870814500, -11562544000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성SDI_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성SDI_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -25498140250, -3877341000, -7479735750 | integer | 0 |
| 기타법인 | -1108107000, -158515500, -332555750 | integer | 0 |
| 개인 | 10608912500, -14729312250, 3101861500 | integer | 0 |
| 외국인 합계 | 15997334750, 18765168750, 4710430000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성SDI_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성SDI_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 8290929500, 55149074000, 116155577500 | integer | 0 |
| 기타법인 | -1285632500, 3726615000, -5199680000 | integer | 0 |
| 개인 | 59034099500, -200306866000, -232715034000 | integer | 0 |
| 외국인 합계 | -66039396500, 141431177000, 121759136500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성물산_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성물산_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -2111019200, -1488435100, 2265186200 | integer | 0 |
| 기타법인 | 23808900, 49457700, -167013500 | integer | 0 |
| 개인 | 2044901900, 2237027200, -1929150400 | integer | 0 |
| 외국인 합계 | 42308400, -798049800, -169022300 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성물산_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성물산_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -7294230750, -7957409500, -1074921000 | integer | 0 |
| 기타법인 | -46872250, -184595500, -442143750 | integer | 0 |
| 개인 | 2638041000, 2740163000, -1907884500 | integer | 0 |
| 외국인 합계 | 4703062000, 5401842000, 3424949250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성물산_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성물산_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -27087831750, -32762328500, -18048067750 | integer | 0 |
| 기타법인 | 931419250, 2411286750, -104254750 | integer | 0 |
| 개인 | 34477609250, 16573393750, 10916530250 | integer | 0 |
| 외국인 합계 | -8321196750, 13777648000, 7235792250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성바이오로직스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성바이오로직스_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 6809456000, -2208291000, -3811701000 | integer | 0 |
| 기타법인 | -486395000, 1274190000, -4954695000 | integer | 0 |
| 개인 | -17574990000, -3406599000, -1944327000 | integer | 0 |
| 외국인 합계 | 11251929000, 4340700000, 10710723000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성바이오로직스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성바이오로직스_25.csv`
- row_count: 225
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -7153430500, -10007926500, 1620735500 | integer | 0 |
| 기타법인 | 13739000, 893348000, 467913500 | integer | 0 |
| 개인 | 8617229500, 476599000, 4169990000 | integer | 0 |
| 외국인 합계 | -1477538000, 8637979500, -6258639000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성바이오로직스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성바이오로직스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -9564851500, -31407185500, -7002124000 | integer | 0 |
| 기타법인 | 772899000, -2000119500, 715120000 | integer | 0 |
| 개인 | 27374471000, 62865011500, 24725718500 | integer | 0 |
| 외국인 합계 | -18582518500, -29457706500, -18438714500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성생명_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성생명_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -8510098800, -9347784800, 524363800 | integer | 0 |
| 기타법인 | 13254800, -1658001000, -19730100 | integer | 0 |
| 개인 | 5748369800, 5759876200, 1275716700 | integer | 0 |
| 외국인 합계 | 2748474200, 5245909600, -1780350400 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성생명_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성생명_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -11273738650, -16157095800, 12320194700 | integer | 0 |
| 기타법인 | -215735900, 579274700, 13916550 | integer | 0 |
| 개인 | 2339633250, 8520300600, 1355834750 | integer | 0 |
| 외국인 합계 | 9149841300, 7057520500, -13689946000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성생명_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성생명_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 5041052750, -11353731000, -3435378000 | integer | 0 |
| 기타법인 | -138285500, 139300500, -143113750 | integer | 0 |
| 개인 | -3723405250, 8444250, -5767056500 | integer | 0 |
| 외국인 합계 | -1179362000, 11205986250, 9345548250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전기_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전기_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 993749500, 786239000, -188219100 | integer | 0 |
| 기타법인 | -11945400, -116886900, -258638300 | integer | 0 |
| 개인 | -2338830000, 432610900, -2761821000 | integer | 0 |
| 외국인 합계 | 1357025900, -1101963000, 3208678400 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전기_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전기_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -19801400500, -26230542000, 22102145500 | integer | 0 |
| 기타법인 | -775419500, 382529500, 388881500 | integer | 0 |
| 개인 | 1602817750, 30018488500, -6889375750 | integer | 0 |
| 외국인 합계 | 18974002250, -4170476000, -15601651250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전기_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전기_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -40399375000, -15162324500, 2482816000 | integer | 0 |
| 기타법인 | 2367211500, 1690426500, -508348500 | integer | 0 |
| 개인 | 23414376000, 73298860000, -47403600000 | integer | 0 |
| 외국인 합계 | 14617787500, -59826962000, 45429132500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -3277287800, -13922536000, -6930760500 | integer | 0 |
| 기타법인 | 73455673600, 55601263000, 67237626700 | integer | 0 |
| 개인 | 72859108500, -39507459700, 13274611300 | integer | 0 |
| 외국인 합계 | -143037494300, -2171267300, -73581477500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -33616846650, -81086826050, 337185326650 | integer | 0 |
| 기타법인 | 6671813200, 4982970550, 9910569050 | integer | 0 |
| 개인 | 175413882600, 627483314950, -1600574115250 | integer | 0 |
| 외국인 합계 | -148468849150, -551379459450, 1253478219550 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자_26.csv`
- row_count: 323
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 30726830000, 241309775500, 201716441000 | integer | 0 |
| 기타법인 | 14153992000, -15656303750, 4813339500 | integer | 0 |
| 개인 | 129042397000, -680974831000, 476701321500 | integer | 0 |
| 외국인 합계 | -173923219000, 455321359250, -683231102000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자우_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자우_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 297850900, 1510650900, -3455528400 | integer | 0 |
| 기타법인 | 11656182400, 8884259500, 7211603800 | integer | 0 |
| 개인 | -729526350, -8732491350, 2621058350 | integer | 0 |
| 외국인 합계 | -11224506950, -1662419050, -6377133750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자우_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자우_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 35968438150, 29828280400, 58266718250 | integer | 0 |
| 기타법인 | -19028350, 140001100, 459450850 | integer | 0 |
| 개인 | 34008809550, -12881572150, -122449527150 | integer | 0 |
| 외국인 합계 | -69958219350, -17086709350, 63723358050 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성전자우_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성전자우_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -16131430900, -24310535100, -105639814000 | integer | 0 |
| 기타법인 | 791449100, 5255069550, 3743350 | integer | 0 |
| 개인 | 196367959500, 40763265050, 111028778850 | integer | 0 |
| 외국인 합계 | -181027977700, -21707799500, -5392708200 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성중공업_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성중공업_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 1994382610, -2661097610, 5705369630 | integer | 0 |
| 기타법인 | 2069233530, -238804090, -305859600 | integer | 0 |
| 개인 | -2747853610, 4752985880, -12642241230 | integer | 0 |
| 외국인 합계 | -1315762530, -1853084180, 7242731200 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성중공업_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성중공업_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -2614519950, 4691223875, -5081909575 | integer | 0 |
| 기타법인 | -2338840325, -3963297350, 6013965700 | integer | 0 |
| 개인 | 7993003225, -15198554075, -10314100475 | integer | 0 |
| 외국인 합계 | -3039642950, 14470627550, 9382044350 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성중공업_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성중공업_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -18724369850, -15815417825, -17583162475 | integer | 0 |
| 기타법인 | 185870625, 48304825, 214634400 | integer | 0 |
| 개인 | 16525610350, 26190115000, 16456331575 | integer | 0 |
| 외국인 합계 | 2012888875, -10423002000, 912196500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성화재_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성화재_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1216376500, -266616500, -1970970000 | integer | 0 |
| 기타법인 | -45209500, -2543500, -2566000 | integer | 0 |
| 개인 | 126208500, -300995000, -2214382500 | integer | 0 |
| 외국인 합계 | 1135377500, 570155000, 4187918500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성화재_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성화재_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 3710048500, -1515311000, -1510987750 | integer | 0 |
| 기타법인 | 159874000, 311966500, -78047000 | integer | 0 |
| 개인 | -3506358000, -2742369750, 2514986750 | integer | 0 |
| 외국인 합계 | -363564500, 3945714250, -925952000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_삼성화재_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_삼성화재_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 4488179000, -12872655750, -9433252250 | integer | 0 |
| 기타법인 | 300291500, 384611000, 169482750 | integer | 0 |
| 개인 | 595669500, 23160378000, -20464900250 | integer | 0 |
| 외국인 합계 | -5384140000, -10672333250, 29728669750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_셀트리온_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_셀트리온_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 21204237700, -8585693600, -3105293500 | integer | 0 |
| 기타법인 | 5393419900, 1807105700, -522640400 | integer | 0 |
| 개인 | -29510243900, 23448954700, 6573042600 | integer | 0 |
| 외국인 합계 | 2912586300, -16670366800, -2945108700 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_셀트리온_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_셀트리온_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -6754478450, -2576181600, -3317563350 | integer | 0 |
| 기타법인 | 19497982900, 16898661250, 19493949150 | integer | 0 |
| 개인 | -3079253850, -16409367200, -10853852450 | integer | 0 |
| 외국인 합계 | -9664250600, 2086887550, -5322533350 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_셀트리온_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_셀트리온_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -2171142500, -12269003000, -1300620500 | integer | 0 |
| 기타법인 | 14369107250, 14855063500, 20305231500 | integer | 0 |
| 개인 | 10065115000, 1956633000, -39850571250 | integer | 0 |
| 외국인 합계 | -22263079750, -4542693500, 20845960250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_신한지주_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_신한지주_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -3595144500, -5497993100, 2430965100 | integer | 0 |
| 기타법인 | 122111400, 628282650, 624482350 | integer | 0 |
| 개인 | 4869449250, 947555150, -4937559750 | integer | 0 |
| 외국인 합계 | -1396416150, 3922155300, 1882112300 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_신한지주_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_신한지주_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -2716489800, -5603177500, 955924700 | integer | 0 |
| 기타법인 | -269523800, 218096400, -210803650 | integer | 0 |
| 개인 | 3423988200, -6856033500, 2452267150 | integer | 0 |
| 외국인 합계 | -437974600, 12241114600, -3197388200 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_신한지주_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_신한지주_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 20597692250, -15392118650, 1287634850 | integer | 0 |
| 기타법인 | -249202600, 38419600, -50087000 | integer | 0 |
| 개인 | -12893813500, -701789800, -1738592600 | integer | 0 |
| 외국인 합계 | -7454676150, 16055488850, 501044750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_알테오젠_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_알테오젠_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -4673542000, -68797102000, 64561403500 | integer | 0 |
| 기타법인 | 2659388000, -1414933000, -379258000 | integer | 0 |
| 개인 | -19579433000, 130824417500, -71306774000 | integer | 0 |
| 외국인 합계 | 21593587000, -60612382500, 7124628500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_알테오젠_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_알테오젠_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -20438416250, -10197721000, 73500446500 | integer | 0 |
| 기타법인 | -1334177000, -1124323000, 160014500 | integer | 0 |
| 개인 | 54177804500, 79955171250, -149321422750 | integer | 0 |
| 외국인 합계 | -32405211250, -68633127250, 75660961750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_알테오젠_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_알테오젠_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -15800716750, 107759750, -20255593750 | integer | 0 |
| 기타법인 | 2344604250, -92305250, 2837969000 | integer | 0 |
| 개인 | 18861852000, -4206972000, 11597597500 | integer | 0 |
| 외국인 합계 | -5405739500, 4191517500, 5820027250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로_24.csv`
- row_count: 233
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -2355481200, -3879412700, 1626764700 | integer | 0 |
| 기타법인 | 175918600, 761492900, 1135121600 | integer | 0 |
| 개인 | -4963316400, -5501248400, -7385736700 | integer | 0 |
| 외국인 합계 | 7142879000, 8619168200, 4623850400 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -22977615550, -2681233700, 14602833850 | integer | 0 |
| 기타법인 | -141475950, -786593050, 1132185350 | integer | 0 |
| 개인 | 41062723050, 13722695200, 1138353500 | integer | 0 |
| 외국인 합계 | -17943631550, -10254868450, -16873372700 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -25425107100, -20073704800, -15284478900 | integer | 0 |
| 기타법인 | -1030562200, -306908500, 1319259200 | integer | 0 |
| 개인 | 71159768100, 49456191550, 3833548200 | integer | 0 |
| 외국인 합계 | -44704098800, -29075578250, 10131671500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로비엠_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로비엠_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 836321500, -3865998900, -3248698000 | integer | 0 |
| 기타법인 | 60615800, 802917600, 836253600 | integer | 0 |
| 개인 | -13860638100, -14494907500, 13059247700 | integer | 0 |
| 외국인 합계 | 12963700800, 17557988800, -10646803300 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로비엠_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로비엠_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -20133791600, 378349800, 8341149750 | integer | 0 |
| 기타법인 | -413242650, -62044600, -85382600 | integer | 0 |
| 개인 | 23760087250, -3432057250, -4349478150 | integer | 0 |
| 외국인 합계 | -3213053000, 3115752050, -3906289000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_에코프로비엠_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_에코프로비엠_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -10899601500, -12926487000, -11467297750 | integer | 0 |
| 기타법인 | -754608250, 122982750, -3898359750 | integer | 0 |
| 개인 | 9046101500, 13309057000, 9183694000 | integer | 0 |
| 외국인 합계 | 2608108250, -505552750, 6181963500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_우리금융지주_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_우리금융지주_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 418637220, -393542980, 1206988750 | integer | 0 |
| 기타법인 | 4511080, 136407190, 367084350 | integer | 0 |
| 개인 | -1879586990, -933844440, 2776789530 | integer | 0 |
| 외국인 합계 | 1456438690, 1190980230, -4350862630 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_우리금융지주_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_우리금융지주_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -1529328625, -401929925, 1483114050 | integer | 0 |
| 기타법인 | 48706950, -103780050, 74060800 | integer | 0 |
| 개인 | 1540071850, -1798895725, 2820454050 | integer | 0 |
| 외국인 합계 | -59450175, 2304605700, -4377628900 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_우리금융지주_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_우리금융지주_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 17226262050, -5318164275, 7890168250 | integer | 0 |
| 기타법인 | 14166499375, 13443360675, 10950888900 | integer | 0 |
| 개인 | -7513434825, -306602675, -9573895875 | integer | 0 |
| 외국인 합계 | -23879326600, -7818593725, -9267161275 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_포스코퓨처엠_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_포스코퓨처엠_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -7307979100, -4923952300, -8173936400 | integer | 0 |
| 기타법인 | 210656600, 98763500, -1769115900 | integer | 0 |
| 개인 | -1053935600, -8544995300, 4384291700 | integer | 0 |
| 외국인 합계 | 8151258100, 13370184100, 5558760600 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_포스코퓨처엠_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_포스코퓨처엠_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -20198270850, -290296100, -2643820750 | integer | 0 |
| 기타법인 | -447318450, -588963300, -296628700 | integer | 0 |
| 개인 | 29994169550, -9115768600, 6982721250 | integer | 0 |
| 외국인 합계 | -9348580250, 9995028000, -4042271800 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_포스코퓨처엠_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_포스코퓨처엠_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 11967185500, -2827444000, 19178575250 | integer | 0 |
| 기타법인 | 424162500, -442252250, -342902500 | integer | 0 |
| 개인 | 9762591750, 14427613500, -40684729750 | integer | 0 |
| 외국인 합계 | -22153939750, -11157917250, 21849057000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_하나금융지주_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_하나금융지주_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2097982800, -1623158500, -2558283900 | integer | 0 |
| 기타법인 | -1578600, -410119400, 7034200 | integer | 0 |
| 개인 | 6599261600, 196909100, 513820200 | integer | 0 |
| 외국인 합계 | -8695665800, 1836368800, 2037429500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_하나금융지주_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_하나금융지주_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -2506025850, 3191288200, 7177644700 | integer | 0 |
| 기타법인 | 10956000, 11183450, 34049800 | integer | 0 |
| 개인 | -1038997600, -8344804150, 1343149750 | integer | 0 |
| 외국인 합계 | 3534067450, 5142332500, -8554844250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_하나금융지주_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_하나금융지주_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 11086500000, -17785311650, -6834620550 | integer | 0 |
| 기타법인 | 528813600, -240278150, 272759850 | integer | 0 |
| 개인 | -4783838900, -10840496200, -22522776750 | integer | 0 |
| 외국인 합계 | -6831474700, 28866086000, 29084637450 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한국전력_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한국전력_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -1211696900, -11303588590, 122542800 | integer | 0 |
| 기타법인 | -398743850, -322664810, 1512545750 | integer | 0 |
| 개인 | 377537600, 12586084660, -2370132750 | integer | 0 |
| 외국인 합계 | 1232903150, -959831260, 735044200 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한국전력_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한국전력_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -12315234400, -42303281050, 28457605425 | integer | 0 |
| 기타법인 | 215528050, -542131900, 21610425 | integer | 0 |
| 개인 | 6615105125, 67224260425, -32985164425 | integer | 0 |
| 외국인 합계 | 5484601225, -24378847475, 4505948575 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한국전력_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한국전력_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -10906489925, -20115042825, -17473796475 | integer | 0 |
| 기타법인 | -16616934700, 868593575, 1570951950 | integer | 0 |
| 개인 | 19407806100, 19659869375, 25700381425 | integer | 0 |
| 외국인 합계 | 8115618525, -413420125, -9797536900 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한미반도체_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한미반도체_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -959442900, 2364658900, -742121300 | integer | 0 |
| 기타법인 | 37525000, 10602400, -63580600 | integer | 0 |
| 개인 | 2358141700, 1355568700, 5507427700 | integer | 0 |
| 외국인 합계 | -1436223800, -3730830000, -4701725800 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한미반도체_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한미반도체_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -16864077400, -37535692800, 7841842400 | integer | 0 |
| 기타법인 | 247596200, -2478404500, -585111900 | integer | 0 |
| 개인 | 49648500750, 101540608650, -36428077550 | integer | 0 |
| 외국인 합계 | -33032019550, -61526511350, 29171347050 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한미반도체_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한미반도체_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 16814163500, 65814186500, 48816371750 | integer | 0 |
| 기타법인 | 957477500, 460925000, 789476250 | integer | 0 |
| 개인 | -176635482750, -12077197000, -110583089750 | integer | 0 |
| 외국인 합계 | 158863841750, -54197914500, 60977241750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화시스템_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화시스템_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 3050929200, -5649741950, 4075465350 | integer | 0 |
| 기타법인 | 687008800, 104164900, 143365900 | integer | 0 |
| 개인 | -7480840250, 15818639600, 4976001600 | integer | 0 |
| 외국인 합계 | 3742902250, -10273062550, -9194832850 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화시스템_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화시스템_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 2094363900, 795173350, -598907100 | integer | 0 |
| 기타법인 | -541775500, -147162900, -332399200 | integer | 0 |
| 개인 | 1550659250, 2460027750, 8118214250 | integer | 0 |
| 외국인 합계 | -3103247650, -3108038200, -7186907950 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화시스템_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화시스템_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -833723450, -22199309800, -42871809800 | integer | 0 |
| 기타법인 | -467690500, -160104700, 743448450 | integer | 0 |
| 개인 | 1924225600, 38770531450, 73327841800 | integer | 0 |
| 외국인 합계 | -622811650, -16411116950, -31199480450 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화에어로스페이스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화에어로스페이스_24.csv`
- row_count: 226
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 2124999000, -2575568500, 1234240000 | integer | 0 |
| 기타법인 | 319040500, 205365500, -216209500 | integer | 0 |
| 개인 | -17600535000, -4563585500, -8519012500 | integer | 0 |
| 외국인 합계 | 15156495500, 6933788500, 7500982000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화에어로스페이스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화에어로스페이스_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 1271609500, 49165327500, 7185594500 | integer | 0 |
| 기타법인 | -29079000, -194197500, -315397000 | integer | 0 |
| 개인 | 11377712000, -96669665000, -14920816500 | integer | 0 |
| 외국인 합계 | -12620242500, 47698535000, 8050619000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화에어로스페이스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화에어로스페이스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 46272815500, -14721161000, -54154970000 | integer | 0 |
| 기타법인 | -132917000, 221007000, 456217500 | integer | 0 |
| 개인 | -18922946500, 4664639000, 78043045000 | integer | 0 |
| 외국인 합계 | -27216952000, 9835515000, -24344292500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화오션_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화오션_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -6357659350, -3732216850, 1659675950 | integer | 0 |
| 기타법인 | 3892995550, 226295050, -677426300 | integer | 0 |
| 개인 | 12436395700, 9251923800, -17009524700 | integer | 0 |
| 외국인 합계 | -9971731900, -5746002000, 16027275050 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화오션_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화오션_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -3568540550, -1723083100, -14791042350 | integer | 0 |
| 기타법인 | -903106100, -741341600, 1180007400 | integer | 0 |
| 개인 | 3485138250, 10280860000, 36295376600 | integer | 0 |
| 외국인 합계 | 986508400, -7816435300, -22684341650 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_한화오션_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_한화오션_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 3980682450, -16407467500, -1448091650 | integer | 0 |
| 기타법인 | -35854024600, -46637274900, -43390179250 | integer | 0 |
| 개인 | 1312317250, 43209808700, 5831925150 | integer | 0 |
| 외국인 합계 | 30561024900, 19834933700, 39006345750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대로템_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대로템_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 1536171800, -3225384750, 4256768300 | integer | 0 |
| 기타법인 | 41202450, -226933700, -75748050 | integer | 0 |
| 개인 | -5533768600, 4208379850, -9554786050 | integer | 0 |
| 외국인 합계 | 3956394350, -756061400, 5373765800 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대로템_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대로템_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 3025514850, 316787150, 930472800 | integer | 0 |
| 기타법인 | -223376100, -1130455200, -508025950 | integer | 0 |
| 개인 | -17343482050, -34647942000, -26276355800 | integer | 0 |
| 외국인 합계 | 14541343300, 35461610050, 25853908950 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대로템_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대로템_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 4673896750, 71947910500, 13124782250 | integer | 0 |
| 기타법인 | -1257462000, -2040803750, -749195000 | integer | 0 |
| 개인 | -82311499250, -141228601000, -77746611500 | integer | 0 |
| 외국인 합계 | 78895064500, 71321494250, 65371024250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대모비스_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대모비스_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 4463924000, 6570802000, 5236487500 | integer | 0 |
| 기타법인 | 60196000, 28287500, -30564000 | integer | 0 |
| 개인 | -1785706000, 6722287500, -8313453000 | integer | 0 |
| 외국인 합계 | -2738414000, -13321377000, 3107529500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대모비스_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대모비스_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 12326204500, 2066598000, -7695693250 | integer | 0 |
| 기타법인 | 3561162500, -60425250, 81202000 | integer | 0 |
| 개인 | 5477270750, 14872964750, 2815803000 | integer | 0 |
| 외국인 합계 | -21364637750, -16879137500, 4798688250 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대모비스_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대모비스_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -2541793250, -9735986500, 12209059500 | integer | 0 |
| 기타법인 | 10789261250, 13039953000, 1250270250 | integer | 0 |
| 개인 | 14666650750, 22870440250, -20411376250 | integer | 0 |
| 외국인 합계 | -22914118750, -26174406750, 6952046500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대일렉트릭_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대일렉트릭_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | -3669760500, 1990827500, 6661974500 | integer | 0 |
| 기타법인 | -30302500, 33055500, -156596000 | integer | 0 |
| 개인 | 9924252000, -1429936500, -4166100000 | integer | 0 |
| 외국인 합계 | -6224189000, -593946500, -2339278500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대일렉트릭_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대일렉트릭_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -2839657000, -7102527000, -8172927500 | integer | 0 |
| 기타법인 | -1358603000, 1021683000, -596796000 | integer | 0 |
| 개인 | 2133297000, -4980991000, 1254000500 | integer | 0 |
| 외국인 합계 | 2064963000, 11061835000, 7515723000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대일렉트릭_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대일렉트릭_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 38064021500, 32517498000, 4587445500 | integer | 0 |
| 기타법인 | -69055500, 698498500, 3619304500 | integer | 0 |
| 개인 | 15809710000, 5383494500, 154359771000 | integer | 0 |
| 외국인 합계 | -53804676000, -38599491000, -162566521000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대차_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대차_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 7118015500, 5802669000, 22688458500 | integer | 0 |
| 기타법인 | -794556500, 3692500, 8373986500 | integer | 0 |
| 개인 | 8260893000, 2934589500, -21447258000 | integer | 0 |
| 외국인 합계 | -14584352000, -8740951000, -9615187000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대차_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대차_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | 12154012500, 9104809750, -11198558250 | integer | 0 |
| 기타법인 | 1639462000, -375081000, 11424039000 | integer | 0 |
| 개인 | -7777743500, -36398144250, 33876989000 | integer | 0 |
| 외국인 합계 | -6015731000, 27668415500, -34102469750 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_현대차_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_현대차_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | -54169093000, 21744588500, 119789998500 | integer | 0 |
| 기타법인 | 7160592500, 6073555000, 324279500 | integer | 0 |
| 개인 | 269866390000, 88494933500, -496532438500 | integer | 0 |
| 외국인 합계 | -222857889500, -116313077000, 376418160500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_효성중공업_24.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_효성중공업_24.csv`
- row_count: 244
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2024/12/30, 2024/12/27, 2024/12/26 | date | 0 |
| 기관 합계 | 1553527000, 2922558500, -5244118000 | integer | 0 |
| 기타법인 | 2705500, -287168000, 11660500 | integer | 0 |
| 개인 | -3825094500, -1544811000, -2644988000 | integer | 0 |
| 외국인 합계 | 2268862000, -1090579500, 7877445500 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_효성중공업_25.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_효성중공업_25.csv`
- row_count: 242
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2025/12/30, 2025/12/29, 2025/12/26 | date | 0 |
| 기관 합계 | -9859694000, 5643526000, -21175072500 | integer | 0 |
| 기타법인 | 177030000, -771582500, -667049000 | integer | 0 |
| 개인 | 21302541000, -27501547000, -4855678500 | integer | 0 |
| 외국인 합계 | -11619877000, 22629603500, 26697800000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investing_trade_효성중공업_26.csv

- dataset: 투자자별 거래실적
- file_name: `investing_trade_효성중공업_26.csv`
- row_count: 81
- column_count: 6
- encoding: `cp949`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| 일자 | 2026/04/30, 2026/04/29, 2026/04/28 | date | 0 |
| 기관 합계 | 25432830000, 34988318500, -19586823500 | integer | 0 |
| 기타법인 | 3075922500, 1264890000, 1510733000 | integer | 0 |
| 개인 | 45417632000, 21765011500, 87326195500 | integer | 0 |
| 외국인 합계 | -73926384500, -58018220000, -69250105000 | integer | 0 |
| 전체 | 0, 0, 0 | integer | 0 |

### data/raw/krx_stat/investor_trading_4m_2601.csv

- dataset: 투자자별 거래실적
- file_name: `investor_trading_4m_2601.csv`
- row_count: 4320
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-01, 2026-01-02, 2026-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| 종가 | , 9795.45,  | number | 1404 |
| 대비 | , 300.82,  | number | 1404 |
| 등락률 | , 3.17,  | number | 1404 |
| PER | 0.0, 17.55, 0.0 | number | 0 |
| PBR | 0.0, 1.61, 0.0 | number | 0 |
| 배당수익률 | 0.0, 1.19, 0.0 | number | 0 |

### data/raw/krx_stat/investor_trading_6m_2401.csv

- dataset: 투자자별 거래실적
- file_name: `investor_trading_6m_2401.csv`
- row_count: 6552
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-01, 2024-01-02, 2024-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| 종가 | , 5604.08, 5452.89 | number | 2438 |
| 대비 | , 41.96, -151.19 | number | 2438 |
| 등락률 | , 0.75, -2.7 | number | 2438 |
| PER | 0.0, 21.99, 21.4 | number | 0 |
| PBR | 0.0, 1.04, 1.02 | number | 0 |
| 배당수익률 | 0.0, 1.8, 1.85 | number | 0 |

### data/raw/krx_stat/investor_trading_6m_2407.csv

- dataset: 투자자별 거래실적
- file_name: `investor_trading_6m_2407.csv`
- row_count: 6624
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| 종가 | 5980.18, 5922.86, 5975.11 | number | 2442 |
| 대비 | 15.23, -57.32, 52.25 | number | 2442 |
| 등락률 | 0.26, -0.96, 0.88 | number | 2442 |
| PER | 20.59, 20.39, 20.57 | number | 0 |
| PBR | 1.09, 1.08, 1.09 | number | 0 |
| 배당수익률 | 1.74, 1.76, 1.74 | number | 0 |

### data/raw/krx_stat/investor_trading_6m_2501.csv

- dataset: 투자자별 거래실적
- file_name: `investor_trading_6m_2501.csv`
- row_count: 6516
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-01, 2025-01-02, 2025-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| 종가 | , 4995.18, 5101.97 | number | 2268 |
| 대비 | , -5.53, 106.79 | number | 2270 |
| 등락률 | , -0.11, 2.14 | number | 2270 |
| PER | 0.0, 12.1, 12.36 | number | 0 |
| PBR | 0.0, 0.88, 0.9 | number | 0 |
| 배당수익률 | 0.0, 2.09, 2.05 | number | 0 |

### data/raw/krx_stat/investor_trading_6m_2507.csv

- dataset: 투자자별 거래실적
- file_name: `investor_trading_6m_2507.csv`
- row_count: 6624
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| 종가 | 6461.08, 6435.59, 6531.95 | number | 2160 |
| 대비 | 19.56, -25.49, 96.36 | number | 2160 |
| 등락률 | 0.3, -0.39, 1.5 | number | 2160 |
| PER | 12.68, 12.63, 12.82 | number | 0 |
| PBR | 1.09, 1.09, 1.11 | number | 0 |
| 배당수익률 | 1.79, 1.8, 1.77 | number | 0 |

### data/raw/krx_stat/krx_all_stocks_2401.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2401.csv`
- row_count: 86355
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-01, 2024-01-02, 2024-01-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29545 |
| open | , 10270.0, 10410.0 | number | 25071 |
| high | , 10580.0, 10580.0 | number | 25071 |
| low | , 10270.0, 10350.0 | number | 25071 |
| close | , 10490.0, 10550.0 | number | 25071 |
| change | , 220.0, 60.0 | number | 25071 |
| change_rate | , 2.14, 0.57 | number | 25071 |
| volume | , 238593.0, 120979.0 | number | 25071 |
| trading_value | , 2487160600.0, 1269041950.0 | number | 25071 |
| market_cap | , 293001120300.0, 294677008500.0 | number | 25071 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2402.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2402.csv`
- row_count: 80990
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-02-01, 2024-02-02, 2024-02-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 27640 |
| open | 9650.0, 9750.0,  | number | 27926 |
| high | 9740.0, 9830.0,  | number | 27926 |
| low | 9550.0, 9730.0,  | number | 27926 |
| close | 9740.0, 9750.0,  | number | 27926 |
| change | 90.0, 10.0,  | number | 27926 |
| change_rate | 0.93, 0.1,  | number | 27926 |
| volume | 54652.0, 110867.0,  | number | 27926 |
| trading_value | 525936980.0, 1082822450.0,  | number | 27926 |
| market_cap | 272052517800.0, 272331832500.0,  | number | 27926 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2403.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2403.csv`
- row_count: 86790
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-03-01, 2024-03-02, 2024-03-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29549 |
| open | , ,  | number | 30793 |
| high | , ,  | number | 30793 |
| low | , ,  | number | 30793 |
| close | , ,  | number | 30793 |
| change | , ,  | number | 30793 |
| change_rate | , ,  | number | 30793 |
| volume | , ,  | number | 30793 |
| trading_value | , ,  | number | 30793 |
| market_cap | , ,  | number | 30793 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2404.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2404.csv`
- row_count: 84083
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-04-01, 2024-04-02, 2024-04-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28615 |
| open | 9400.0, 9500.0, 9350.0 | number | 25222 |
| high | 9510.0, 9510.0, 9360.0 | number | 25222 |
| low | 9400.0, 9340.0, 9210.0 | number | 25222 |
| close | 9500.0, 9350.0, 9240.0 | number | 25222 |
| change | 100.0, -150.0, -110.0 | number | 25222 |
| change_rate | 1.06, -1.58, -1.18 | number | 25222 |
| volume | 42835.0, 77100.0, 64634.0 | number | 25222 |
| trading_value | 404701390.0, 723286000.0, 597727870.0 | number | 25222 |
| market_cap | 265348965000.0, 261159244500.0, 258086782800.0 | number | 25222 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2405.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2405.csv`
- row_count: 87032
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-05-01, 2024-05-02, 2024-05-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29548 |
| open | , 8750.0, 8770.0 | number | 30874 |
| high | , 8780.0, 8800.0 | number | 30874 |
| low | , 8670.0, 8660.0 | number | 30874 |
| close | , 8700.0, 8680.0 | number | 30874 |
| change | , -20.0, -20.0 | number | 30874 |
| change_rate | , -0.23, -0.23 | number | 30874 |
| volume | , 29311.0, 26024.0 | number | 30874 |
| trading_value | , 255301610.0, 226342090.0 | number | 30874 |
| market_cap | , 243003789000.0, 242445159600.0 | number | 30874 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2406.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2406.csv`
- row_count: 84324
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-06-01, 2024-06-02, 2024-06-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28597 |
| open | , , 8280.0 | number | 30922 |
| high | , , 8390.0 | number | 30922 |
| low | , , 8200.0 | number | 30922 |
| close | , , 8370.0 | number | 30922 |
| change | , , 90.0 | number | 30922 |
| change_rate | , , 1.09 | number | 30922 |
| volume | , , 35614.0 | number | 30922 |
| trading_value | , , 296509020.0 | number | 30922 |
| market_cap | , , 233786403900.0 | number | 30922 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2407.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2407.csv`
- row_count: 87404
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29609 |
| open | 8100.0, 8180.0, 8030.0 | number | 22556 |
| high | 8190.0, 8180.0, 8030.0 | number | 22556 |
| low | 8040.0, 8040.0, 7930.0 | number | 22556 |
| close | 8150.0, 8040.0, 7930.0 | number | 22556 |
| change | 90.0, -110.0, -110.0 | number | 22556 |
| change_rate | 1.12, -1.35, -1.37 | number | 22556 |
| volume | 68343.0, 54455.0, 125063.0 | number | 22556 |
| trading_value | 554684430.0, 439542160.0, 994829540.0 | number | 22556 |
| market_cap | 227641480500.0, 224569018800.0, 221496557100.0 | number | 22556 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2408.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2408.csv`
- row_count: 87624
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-08-01, 2024-08-02, 2024-08-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29680 |
| open | 8370.0, 8300.0,  | number | 28261 |
| high | 8490.0, 8340.0,  | number | 28261 |
| low | 8350.0, 8030.0,  | number | 28261 |
| close | 8380.0, 8130.0,  | number | 28261 |
| change | 40.0, -250.0,  | number | 28261 |
| change_rate | 0.48, -2.98,  | number | 28261 |
| volume | 108804.0, 145193.0,  | number | 28261 |
| trading_value | 916181280.0, 1184747120.0,  | number | 28261 |
| market_cap | 234065718600.0, 227082851100.0,  | number | 28261 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2409.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2409.csv`
- row_count: 84967
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-09-01, 2024-09-02, 2024-09-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28744 |
| open | , 8090.0, 8060.0 | number | 33986 |
| high | , 8090.0, 8060.0 | number | 33986 |
| low | , 7950.0, 7930.0 | number | 33986 |
| close | , 8000.0, 8020.0 | number | 33986 |
| change | , -70.0, 20.0 | number | 33986 |
| change_rate | , -0.87, 0.25 | number | 33986 |
| volume | , 65903.0, 41265.0 | number | 33986 |
| trading_value | , 526305590.0, 329890430.0 | number | 33986 |
| market_cap | , 223451760000.0, 224010389400.0 | number | 33986 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2410.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2410.csv`
- row_count: 87889
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-10-01, 2024-10-02, 2024-10-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29705 |
| open | , 7750.0,  | number | 31182 |
| high | , 7770.0,  | number | 31182 |
| low | , 7600.0,  | number | 31182 |
| close | , 7600.0,  | number | 31182 |
| change | , -160.0,  | number | 31182 |
| change_rate | , -2.06,  | number | 31182 |
| volume | , 54534.0,  | number | 31182 |
| trading_value | , 417003080.0,  | number | 31182 |
| market_cap | , 212279172000.0,  | number | 31182 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2411.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2411.csv`
- row_count: 85500
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-11-01, 2024-11-02, 2024-11-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28767 |
| open | 7520.0, ,  | number | 25645 |
| high | 7530.0, ,  | number | 25645 |
| low | 7170.0, ,  | number | 25645 |
| close | 7320.0, ,  | number | 25645 |
| change | -200.0, ,  | number | 25645 |
| change_rate | -2.66, ,  | number | 25645 |
| volume | 163284.0, ,  | number | 25645 |
| trading_value | 1194080610.0, ,  | number | 25645 |
| market_cap | 204458360400.0, ,  | number | 25645 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2412.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2412.csv`
- row_count: 88656
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-12-01, 2024-12-02, 2024-12-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29762 |
| open | , 6620.0, 6480.0 | number | 31468 |
| high | , 6620.0, 6500.0 | number | 31468 |
| low | , 6410.0, 6430.0 | number | 31468 |
| close | , 6430.0, 6470.0 | number | 31468 |
| change | , -180.0, 40.0 | number | 31468 |
| change_rate | , -2.72, 0.62 | number | 31468 |
| volume | , 76608.0, 37006.0 | number | 31468 |
| trading_value | , 496302500.0, 239079850.0 | number | 31468 |
| market_cap | , 179599352100.0, 180716610900.0 | number | 31468 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2501.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2501.csv`
- row_count: 88882
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-01, 2025-01-02, 2025-01-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29791 |
| open | , 6310.0, 6310.0 | number | 37286 |
| high | , 6340.0, 6420.0 | number | 37286 |
| low | , 6240.0, 6300.0 | number | 37286 |
| close | , 6300.0, 6330.0 | number | 37286 |
| change | , 0.0, 30.0 | number | 37286 |
| change_rate | , 0.0, 0.48 | number | 37286 |
| volume | , 23822.0, 30238.0 | number | 37286 |
| trading_value | , 149708880.0, 191981370.0 | number | 37286 |
| market_cap | , 175968261000.0, 176806205100.0 | number | 37286 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2502.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2502.csv`
- row_count: 80447
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-02-01, 2025-02-02, 2025-02-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 26927 |
| open | , , 6040.0 | number | 22982 |
| high | , , 6080.0 | number | 22982 |
| low | , , 5960.0 | number | 22982 |
| close | , , 5980.0 | number | 22982 |
| change | , , -110.0 | number | 22982 |
| change_rate | , , -1.81 | number | 22982 |
| volume | , , 60581.0 | number | 22982 |
| trading_value | , , 362839860.0 | number | 22982 |
| market_cap | , , 167030190600.0 | number | 22982 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2503.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2503.csv`
- row_count: 89157
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-03-01, 2025-03-02, 2025-03-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29824 |
| open | , ,  | number | 31633 |
| high | , ,  | number | 31633 |
| low | , ,  | number | 31633 |
| close | , ,  | number | 31633 |
| change | , ,  | number | 31633 |
| change_rate | , ,  | number | 31633 |
| volume | , ,  | number | 31633 |
| trading_value | , ,  | number | 31633 |
| market_cap | , ,  | number | 31633 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2504.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2504.csv`
- row_count: 86314
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-04-01, 2025-04-02, 2025-04-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28860 |
| open | 5960.0, 6040.0, 5980.0 | number | 23016 |
| high | 6080.0, 6090.0, 6080.0 | number | 23016 |
| low | 5960.0, 5970.0, 5910.0 | number | 23016 |
| close | 6040.0, 6000.0, 6010.0 | number | 23016 |
| change | 50.0, -40.0, 10.0 | number | 23016 |
| change_rate | 0.83, -0.66, 0.17 | number | 23016 |
| volume | 16821.0, 22492.0, 27400.0 | number | 23016 |
| trading_value | 101377050.0, 134929295.0, 164140615.0 | number | 23016 |
| market_cap | 168706078800.0, 167588820000.0, 167868134700.0 | number | 23016 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2505.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2505.csv`
- row_count: 89275
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-05-01, 2025-05-02, 2025-05-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29827 |
| open | , 6290.0,  | number | 34554 |
| high | , 6290.0,  | number | 34554 |
| low | , 6220.0,  | number | 34554 |
| close | , 6270.0,  | number | 34554 |
| change | , -10.0,  | number | 34554 |
| change_rate | , -0.16,  | number | 34554 |
| volume | , 14312.0,  | number | 34554 |
| trading_value | , 89648110.0,  | number | 34554 |
| market_cap | , 175130316900.0,  | number | 34554 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2506.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2506.csv`
- row_count: 86327
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-06-01, 2025-06-02, 2025-06-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28860 |
| open | , 6600.0,  | number | 31656 |
| high | , 6600.0,  | number | 31656 |
| low | , 6480.0,  | number | 31656 |
| close | , 6490.0,  | number | 31656 |
| change | , -110.0,  | number | 31656 |
| change_rate | , -1.67,  | number | 31656 |
| volume | , 62493.0,  | number | 31656 |
| trading_value | , 407648250.0,  | number | 31656 |
| market_cap | , 181275240300.0,  | number | 31656 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2507.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2507.csv`
- row_count: 89140
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29826 |
| open | 6740.0, 6800.0, 6790.0 | number | 23004 |
| high | 6830.0, 6800.0, 6950.0 | number | 23004 |
| low | 6710.0, 6670.0, 6780.0 | number | 23004 |
| close | 6800.0, 6780.0, 6950.0 | number | 23004 |
| change | 60.0, -20.0, 170.0 | number | 23004 |
| change_rate | 0.89, -0.29, 2.51 | number | 23004 |
| volume | 76759.0, 55485.0, 97646.0 | number | 23004 |
| trading_value | 521701475.0, 373075175.0, 671236285.0 | number | 23004 |
| market_cap | 189933996000.0, 189375366600.0, 194123716500.0 | number | 23004 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2508.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2508.csv`
- row_count: 89246
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-08-01, 2025-08-02, 2025-08-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29810 |
| open | 6700.0, ,  | number | 31667 |
| high | 6700.0, ,  | number | 31667 |
| low | 6410.0, ,  | number | 31667 |
| close | 6450.0, ,  | number | 31667 |
| change | -260.0, ,  | number | 31667 |
| change_rate | -3.87, ,  | number | 31667 |
| volume | 133776.0, ,  | number | 31667 |
| trading_value | 870092700.0, ,  | number | 31667 |
| market_cap | 180157981500.0, ,  | number | 31667 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2509.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2509.csv`
- row_count: 86375
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-09-01, 2025-09-02, 2025-09-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28803 |
| open | 6230.0, 6120.0, 6270.0 | number | 23032 |
| high | 6240.0, 6250.0, 6350.0 | number | 23032 |
| low | 6130.0, 6120.0, 6250.0 | number | 23032 |
| close | 6170.0, 6250.0, 6320.0 | number | 23032 |
| change | -60.0, 80.0, 70.0 | number | 23032 |
| change_rate | -0.96, 1.3, 1.12 | number | 23032 |
| volume | 35496.0, 33984.0, 27800.0 | number | 23032 |
| trading_value | 218758970.0, 210434295.0, 175464250.0 | number | 23032 |
| market_cap | 172337169900.0, 174571687500.0, 176526890400.0 | number | 23032 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2510.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2510.csv`
- row_count: 89210
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-10-01, 2025-10-02, 2025-10-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29724 |
| open | 6370.0, 6370.0,  | number | 37424 |
| high | 6420.0, 6410.0,  | number | 37424 |
| low | 6290.0, 6350.0,  | number | 37424 |
| close | 6360.0, 6370.0,  | number | 37424 |
| change | 0.0, 10.0,  | number | 37424 |
| change_rate | 0.0, 0.16,  | number | 37424 |
| volume | 41276.0, 19571.0,  | number | 37424 |
| trading_value | 261326355.0, 124740810.0,  | number | 37424 |
| market_cap | 177644149200.0, 177923463900.0,  | number | 37424 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2511.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2511.csv`
- row_count: 86399
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-11-01, 2025-11-02, 2025-11-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28741 |
| open | , , 6280.0 | number | 28798 |
| high | , , 6320.0 | number | 28798 |
| low | , , 6140.0 | number | 28798 |
| close | , , 6150.0 | number | 28798 |
| change | , , -110.0 | number | 28798 |
| change_rate | , , -1.76 | number | 28798 |
| volume | , , 105026.0 | number | 28798 |
| trading_value | , , 650191750.0 | number | 28798 |
| market_cap | , , 171778540500.0 | number | 28798 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2512.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2512.csv`
- row_count: 89788
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-12-01, 2025-12-02, 2025-12-03 | date | 0 |
| ticker | 000020, 000020, 000020 | integer | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29698 |
| open | 6270.0, 6160.0, 6200.0 | number | 28984 |
| high | 6310.0, 6200.0, 6240.0 | number | 28984 |
| low | 6150.0, 6090.0, 6180.0 | number | 28984 |
| close | 6160.0, 6190.0, 6220.0 | number | 28984 |
| change | -110.0, 30.0, 30.0 | number | 28984 |
| change_rate | -1.75, 0.49, 0.48 | number | 28984 |
| volume | 82591.0, 38537.0, 37195.0 | number | 28984 |
| trading_value | 513279255.0, 237034760.0, 230918360.0 | number | 28984 |
| market_cap | 172057855200.0, 172895799300.0, 173733743400.0 | number | 28984 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2601.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2601.csv`
- row_count: 89780
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-01, 2026-01-02, 2026-01-03 | date | 0 |
| ticker | 000020, 000020, 000020 | string | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29597 |
| open | , 6250.0,  | number | 28973 |
| high | , 6300.0,  | number | 28973 |
| low | , 6190.0,  | number | 28973 |
| close | , 6210.0,  | number | 28973 |
| change | , -40.0,  | number | 28973 |
| change_rate | , -0.64,  | number | 28973 |
| volume | , 73031.0,  | number | 28973 |
| trading_value | , 454875500.0,  | number | 28973 |
| market_cap | , 173454428700.0,  | number | 28973 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2602.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2602.csv`
- row_count: 80716
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-02-01, 2026-02-02, 2026-02-03 | date | 0 |
| ticker | 000020, 000020, 000020 | string | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 26611 |
| open | , 6060.0, 6010.0 | number | 31710 |
| high | , 6060.0, 6050.0 | number | 31710 |
| low | , 5880.0, 5970.0 | number | 31710 |
| close | , 5930.0, 6050.0 | number | 31710 |
| change | , -140.0, 120.0 | number | 31710 |
| change_rate | , -2.31, 2.02 | number | 31710 |
| volume | , 153271.0, 80286.0 | number | 31710 |
| trading_value | , 911968535.0, 483033780.0 | number | 31710 |
| market_cap | , 165633617100.0, 168985393500.0 | number | 31710 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2603.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2603.csv`
- row_count: 89279
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-03-01, 2026-03-02, 2026-03-03 | date | 0 |
| ticker | 000020, 000020, 000020 | string | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 29475 |
| open | , , 6210.0 | number | 28802 |
| high | , , 6340.0 | number | 28802 |
| low | , , 6150.0 | number | 28802 |
| close | , , 6150.0 | number | 28802 |
| change | , , -150.0 | number | 28802 |
| change_rate | , , -2.38 | number | 28802 |
| volume | , , 161448.0 | number | 28802 |
| trading_value | , , 1008047255.0 | number | 28802 |
| market_cap | , , 171778540500.0 | number | 28802 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_all_stocks_2604.csv

- dataset: 전종목 시세
- file_name: `krx_all_stocks_2604.csv`
- row_count: 86423
- column_count: 15
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-04-01, 2026-04-02, 2026-04-03 | date | 0 |
| ticker | 000020, 000020, 000020 | string | 0 |
| stock_name | 동화약품, 동화약품, 동화약품 | string | 0 |
| market | KOSPI, KOSPI, KOSPI | string | 0 |
| division | , ,  | string | 28485 |
| open | 5860.0, 5960.0, 5850.0 | number | 23046 |
| high | 5960.0, 5980.0, 5920.0 | number | 23046 |
| low | 5860.0, 5800.0, 5850.0 | number | 23046 |
| close | 5930.0, 5830.0, 5860.0 | number | 23046 |
| change | 100.0, -100.0, 30.0 | number | 23046 |
| change_rate | 1.72, -1.69, 0.51 | number | 23046 |
| volume | 32359.0, 60961.0, 29287.0 | number | 23046 |
| trading_value | 191279565.0, 357677200.0, 172288290.0 | number | 23046 |
| market_cap | 165633617100.0, 162840470100.0, 163678414200.0 | number | 23046 |
| listed_shares | 27931470, 27931470, 27931470 | integer | 0 |

### data/raw/krx_stat/krx_per_pbr_2401.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2401.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-01, 2024-01-02, 2024-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5604.08, 5452.89 | number | 368 |
| change | , 41.96, -151.19 | number | 368 |
| change_rate | , 0.75, -2.7 | number | 368 |
| per | 0.0, 21.99, 21.4 | number | 0 |
| pbr | 0.0, 1.04, 1.02 | number | 0 |
| dividend_yield | 0.0, 1.8, 1.85 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2402.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2402.csv`
- row_count: 1044
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-02-01, 2024-02-02, 2024-02-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5283.14, 5465.87,  | number | 398 |
| change | 94.93, 182.73,  | number | 398 |
| change_rate | 1.83, 3.46,  | number | 398 |
| per | 20.74, 21.46, 0.0 | number | 0 |
| pbr | 0.99, 1.02, 0.0 | number | 0 |
| dividend_yield | 1.9, 1.84, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2403.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2403.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-03-01, 2024-03-02, 2024-03-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , ,  | number | 436 |
| change | , ,  | number | 436 |
| change_rate | , ,  | number | 436 |
| per | 0.0, 0.0, 0.0 | number | 0 |
| pbr | 0.0, 0.0, 0.0 | number | 0 |
| dividend_yield | 0.0, 0.0, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2404.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2404.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-04-01, 2024-04-02, 2024-04-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5872.03, 5882.1, 5762.9 | number | 366 |
| change | -11.17, 10.07, -119.2 | number | 366 |
| change_rate | -0.19, 0.17, -2.03 | number | 366 |
| per | 23.44, 23.48, 23.0 | number | 0 |
| pbr | 1.1, 1.1, 1.08 | number | 0 |
| dividend_yield | 1.71, 1.71, 1.74 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2405.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2405.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-05-01, 2024-05-02, 2024-05-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5677.39, 5661.31 | number | 436 |
| change | , -22.21, -16.08 | number | 436 |
| change_rate | , -0.39, -0.28 | number | 436 |
| per | 0.0, 23.71, 23.64 | number | 0 |
| pbr | 0.0, 1.05, 1.05 | number | 0 |
| dividend_yield | 0.0, 1.83, 1.83 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2406.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2406.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-06-01, 2024-06-02, 2024-06-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , , 5649.49 | number | 434 |
| change | , , 107.48 | number | 434 |
| change_rate | , , 1.94 | number | 434 |
| per | 0.0, 0.0, 23.57 | number | 0 |
| pbr | 0.0, 0.0, 1.05 | number | 0 |
| dividend_yield | 0.0, 0.0, 1.84 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2407.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2407.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-07-01, 2024-07-02, 2024-07-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5980.18, 5922.86, 5975.11 | number | 334 |
| change | 15.23, -57.32, 52.25 | number | 334 |
| change_rate | 0.26, -0.96, 0.88 | number | 334 |
| per | 20.59, 20.39, 20.57 | number | 0 |
| pbr | 1.09, 1.08, 1.09 | number | 0 |
| dividend_yield | 1.74, 1.76, 1.74 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2408.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2408.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-08-01, 2024-08-02, 2024-08-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5923.2, 5685.49,  | number | 402 |
| change | 4.33, -237.71,  | number | 402 |
| change_rate | 0.07, -4.01,  | number | 402 |
| per | 20.4, 19.58, 0.0 | number | 0 |
| pbr | 1.08, 1.03, 0.0 | number | 0 |
| dividend_yield | 1.76, 1.83, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2409.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2409.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-09-01, 2024-09-02, 2024-09-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5668.06, 5613.2 | number | 468 |
| change | , 21.21, -54.86 | number | 468 |
| change_rate | , 0.38, -0.97 | number | 468 |
| per | 0.0, 19.51, 19.31 | number | 0 |
| pbr | 0.0, 1.03, 1.02 | number | 0 |
| dividend_yield | 0.0, 1.84, 1.86 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2410.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2410.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-10-01, 2024-10-02, 2024-10-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5381.76,  | number | 436 |
| change | , -57.7,  | number | 436 |
| change_rate | , -1.06,  | number | 436 |
| per | 0.0, 14.61, 0.0 | number | 0 |
| pbr | 0.0, 0.96, 0.0 | number | 0 |
| dividend_yield | 0.0, 1.94, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2411.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2411.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-11-01, 2024-11-02, 2024-11-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5317.38, ,  | number | 366 |
| change | -22.77, ,  | number | 366 |
| change_rate | -0.43, ,  | number | 366 |
| per | 14.43, 0.0, 0.0 | number | 0 |
| pbr | 0.95, 0.0, 0.0 | number | 0 |
| dividend_yield | 1.96, 0.0, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2412.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2412.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-12-01, 2024-12-02, 2024-12-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5135.34, 5235.14 | number | 436 |
| change | , 12.82, 99.8 | number | 436 |
| change_rate | , 0.25, 1.94 | number | 436 |
| per | 0.0, 13.97, 14.24 | number | 0 |
| pbr | 0.0, 0.92, 0.94 | number | 0 |
| dividend_yield | 0.0, 2.03, 1.99 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2501.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2501.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-01-01, 2025-01-02, 2025-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 4995.18, 5101.97 | number | 468 |
| change | , -5.53, 106.79 | number | 470 |
| change_rate | , -0.11, 2.14 | number | 470 |
| per | 0.0, 12.1, 12.36 | number | 0 |
| pbr | 0.0, 0.88, 0.9 | number | 0 |
| dividend_yield | 0.0, 2.09, 2.05 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2502.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2502.csv`
- row_count: 1008
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-02-01, 2025-02-02, 2025-02-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , , 5144.49 | number | 288 |
| change | , , -144.28 | number | 288 |
| change_rate | , , -2.73 | number | 288 |
| per | 0.0, 0.0, 12.45 | number | 0 |
| pbr | 0.0, 0.0, 0.91 | number | 0 |
| dividend_yield | 0.0, 0.0, 2.03 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2503.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2503.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-03-01, 2025-03-02, 2025-03-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , ,  | number | 396 |
| change | , ,  | number | 396 |
| change_rate | , ,  | number | 396 |
| per | 0.0, 0.0, 0.0 | number | 0 |
| pbr | 0.0, 0.0, 0.0 | number | 0 |
| dividend_yield | 0.0, 0.0, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2504.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2504.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-04-01, 2025-04-02, 2025-04-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 5287.45, 5249.47, 5204.28 | number | 288 |
| change | 98.02, -37.98, -45.19 | number | 288 |
| change_rate | 1.89, -0.72, -0.86 | number | 288 |
| per | 12.77, 12.68, 12.57 | number | 0 |
| pbr | 0.93, 0.93, 0.92 | number | 0 |
| dividend_yield | 1.98, 1.99, 2.01 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2505.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2505.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-05-01, 2025-05-02, 2025-05-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5297.11,  | number | 432 |
| change | , 7.91,  | number | 432 |
| change_rate | , 0.15,  | number | 432 |
| per | 0.0, 11.49, 0.0 | number | 0 |
| pbr | 0.0, 0.91, 0.0 | number | 0 |
| dividend_yield | 0.0, 2.2, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2506.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2506.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-06-01, 2025-06-02, 2025-06-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 5567.34,  | number | 396 |
| change | , 3.83,  | number | 396 |
| change_rate | , 0.07,  | number | 396 |
| per | 0.0, 12.1, 0.0 | number | 0 |
| pbr | 0.0, 0.95, 0.0 | number | 0 |
| dividend_yield | 0.0, 2.09, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2507.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2507.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-07-01, 2025-07-02, 2025-07-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 6461.08, 6435.59, 6531.95 | number | 288 |
| change | 19.56, -25.49, 96.36 | number | 288 |
| change_rate | 0.3, -0.39, 1.5 | number | 288 |
| per | 12.68, 12.63, 12.82 | number | 0 |
| pbr | 1.09, 1.09, 1.11 | number | 0 |
| dividend_yield | 1.79, 1.8, 1.77 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2508.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2508.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-08-01, 2025-08-02, 2025-08-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 6511.65, ,  | number | 396 |
| change | -278.76, ,  | number | 396 |
| change_rate | -4.11, ,  | number | 396 |
| per | 12.77, 0.0, 0.0 | number | 0 |
| pbr | 1.1, 0.0, 0.0 | number | 0 |
| dividend_yield | 1.78, 0.0, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2509.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2509.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-09-01, 2025-09-02, 2025-09-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 6572.19, 6649.42, 6681.01 | number | 288 |
| change | -93.86, 77.23, 31.59 | number | 288 |
| change_rate | -1.41, 1.18, 0.48 | number | 288 |
| per | 12.89, 13.04, 13.1 | number | 0 |
| pbr | 1.11, 1.13, 1.13 | number | 0 |
| dividend_yield | 1.76, 1.74, 1.73 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2510.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2510.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-10-01, 2025-10-02, 2025-10-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 7448.03, 7674.66,  | number | 468 |
| change | 86.84, 226.63,  | number | 468 |
| change_rate | 1.18, 3.04,  | number | 468 |
| per | 14.56, 15.0, 0.0 | number | 0 |
| pbr | 1.27, 1.31, 0.0 | number | 0 |
| dividend_yield | 1.58, 1.53, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2511.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2511.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-11-01, 2025-11-02, 2025-11-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , , 9410.19 | number | 360 |
| change | , , 326.26 | number | 360 |
| change_rate | , , 3.59 | number | 360 |
| per | 0.0, 0.0, 18.38 | number | 0 |
| pbr | 0.0, 0.0, 1.61 | number | 0 |
| dividend_yield | 0.0, 0.0, 1.25 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2512.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2512.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-12-01, 2025-12-02, 2025-12-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 8663.8, 8842.29, 8913.79 | number | 360 |
| change | 0.53, 178.49, 71.5 | number | 360 |
| change_rate | 0.01, 2.06, 0.81 | number | 360 |
| per | 16.97, 17.32, 17.45 | number | 0 |
| pbr | 1.48, 1.51, 1.52 | number | 0 |
| dividend_yield | 1.36, 1.33, 1.32 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2601.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2601.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-01-01, 2026-01-02, 2026-01-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 9795.45,  | number | 360 |
| change | , 300.82,  | number | 360 |
| change_rate | , 3.17,  | number | 360 |
| per | 0.0, 17.55, 0.0 | number | 0 |
| pbr | 0.0, 1.61, 0.0 | number | 0 |
| dividend_yield | 0.0, 1.19, 0.0 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2602.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2602.csv`
- row_count: 1008
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-02-01, 2026-02-02, 2026-02-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , 11437.25, 12295.51 | number | 396 |
| change | , -686.78, 858.26 | number | 396 |
| change_rate | , -5.66, 7.5 | number | 396 |
| per | 0.0, 20.51, 22.05 | number | 0 |
| pbr | 0.0, 1.88, 2.02 | number | 0 |
| dividend_yield | 0.0, 1.02, 0.95 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2603.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2603.csv`
- row_count: 1116
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-03-01, 2026-03-02, 2026-03-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | , , 13543.24 | number | 360 |
| change | , , -1183.15 | number | 360 |
| change_rate | , , -8.03 | number | 360 |
| per | 0.0, 0.0, 24.17 | number | 0 |
| pbr | 0.0, 0.0, 2.22 | number | 0 |
| dividend_yield | 0.0, 0.0, 0.86 | number | 0 |

### data/raw/krx_stat/krx_per_pbr_2604.csv

- dataset: PER/PBR/배당수익률
- file_name: `krx_per_pbr_2604.csv`
- row_count: 1080
- column_count: 8
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2026-04-01, 2026-04-02, 2026-04-03 | date | 0 |
| index_name | KRX 100, KRX 100, KRX 100 | string | 0 |
| close | 12791.4, 12173.46, 12548.42 | number | 288 |
| change | 1101.86, -617.94, 374.96 | number | 288 |
| change_rate | 9.43, -4.83, 3.08 | number | 288 |
| per | 22.81, 21.71, 22.38 | number | 0 |
| pbr | 2.09, 1.99, 2.05 | number | 0 |
| dividend_yield | 0.92, 0.96, 0.93 | number | 0 |

### data/raw/yahoo/etfs/yahoo_us_etf_spy_20240101_20260430.csv

- dataset: 미국 ETF
- file_name: `yahoo_us_etf_spy_20240101_20260430.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | SPY, SPY, SPY | string | 0 |
| data_name | 미국ETF_SPY, 미국ETF_SPY, 미국ETF_SPY | string | 0 |
| asset_type | us_etf, us_etf, us_etf | string | 0 |
| stock_name | SPDR S&P 500 ETF Trust, SPDR S&P 500 ETF Trust, SPDR S&P 500 ETF Trust | string | 0 |
| sector | , ,  | string | 584 |
| open | 472.1600036621094, 470.42999267578125, 468.29998779296875 | number | 0 |
| high | 473.6700134277344, 471.19000244140625, 470.9599914550781 | number | 0 |
| low | 470.489990234375, 468.1700134277344, 467.04998779296875 | number | 0 |
| close | 472.6499938964844, 468.7900085449219, 467.2799987792969 | number | 0 |
| adj_close | 459.9912109375, 456.2346496582031, 454.7650146484375 | number | 0 |
| volume | 123623700, 103585900, 84232200 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/SPY, https://finance.yahoo.com/quote/SPY, https://finance.yahoo.com/quote/SPY | string | 0 |
| description | S&P500 지수를 추종하는 대표 미국 ETF, S&P500 지수를 추종하는 대표 미국 ETF, S&P500 지수를 추종하는 대표 미국 ETF | string | 0 |
| collected_at | 2026-05-26 13:48:12, 2026-05-26 13:48:12, 2026-05-26 13:48:12 | string | 0 |

### data/raw/yahoo/fx/yahoo_usd_krw_fx_20240101_20260430.csv

- dataset: 환율
- file_name: `yahoo_usd_krw_fx_20240101_20260430.csv`
- row_count: 604
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-01, 2024-01-02, 2024-01-03 | date | 0 |
| ticker | KRW=X, KRW=X, KRW=X | string | 0 |
| data_name | 원달러_환율, 원달러_환율, 원달러_환율 | string | 0 |
| asset_type | fx, fx, fx | string | 0 |
| stock_name | USD/KRW, USD/KRW, USD/KRW | string | 0 |
| sector | , ,  | string | 604 |
| open | 1293.530029296875, 1292.8900146484375, 1307.6199951171875 | number | 0 |
| high | 1293.5400390625, 1313.489990234375, 1312.8299560546875 | number | 0 |
| low | 1293.530029296875, 1291.1700439453125, 1304.280029296875 | number | 0 |
| close | 1293.530029296875, 1293.5400390625, 1307.6199951171875 | number | 0 |
| adj_close | 1293.530029296875, 1293.5400390625, 1307.6199951171875 | number | 0 |
| volume | 0, 0, 0 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/KRW%3DX, https://finance.yahoo.com/quote/KRW%3DX, https://finance.yahoo.com/quote/KRW%3DX | string | 0 |
| description | 미국 달러 대비 원화 환율, 미국 달러 대비 원화 환율, 미국 달러 대비 원화 환율 | string | 0 |
| collected_at | 2026-05-26 13:48:16, 2026-05-26 13:48:16, 2026-05-26 13:48:16 | string | 0 |

### data/raw/yahoo/indices/yahoo_nasdaq_index_20240101_20260430.csv

- dataset: 나스닥
- file_name: `yahoo_nasdaq_index_20240101_20260430.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | ^IXIC, ^IXIC, ^IXIC | string | 0 |
| data_name | 나스닥_지수, 나스닥_지수, 나스닥_지수 | string | 0 |
| asset_type | us_index, us_index, us_index | string | 0 |
| stock_name | NASDAQ Composite Index, NASDAQ Composite Index, NASDAQ Composite Index | string | 0 |
| sector | , ,  | string | 584 |
| open | 14873.7001953125, 14641.4697265625, 14532.23046875 | number | 0 |
| high | 14887.7998046875, 14694.580078125, 14632.76953125 | number | 0 |
| low | 14682.3798828125, 14577.4404296875, 14504.7802734375 | number | 0 |
| close | 14765.9404296875, 14592.2099609375, 14510.2998046875 | number | 0 |
| adj_close | 14765.9404296875, 14592.2099609375, 14510.2998046875 | number | 0 |
| volume | 5791170000, 5449950000, 5289220000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/%5EIXIC, https://finance.yahoo.com/quote/%5EIXIC, https://finance.yahoo.com/quote/%5EIXIC | string | 0 |
| description | 기술주 중심의 미국 나스닥 종합지수, 기술주 중심의 미국 나스닥 종합지수, 기술주 중심의 미국 나스닥 종합지수 | string | 0 |
| collected_at | 2026-05-26 13:48:14, 2026-05-26 13:48:14, 2026-05-26 13:48:14 | string | 0 |

### data/raw/yahoo/indices/yahoo_sp500_index_20240101_20260430.csv

- dataset: S&P500
- file_name: `yahoo_sp500_index_20240101_20260430.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | ^GSPC, ^GSPC, ^GSPC | string | 0 |
| data_name | SP500_지수, SP500_지수, SP500_지수 | string | 0 |
| asset_type | us_index, us_index, us_index | string | 0 |
| stock_name | S&P 500 Index, S&P 500 Index, S&P 500 Index | string | 0 |
| sector | , ,  | string | 584 |
| open | 4745.2001953125, 4725.06982421875, 4697.419921875 | number | 0 |
| high | 4754.330078125, 4729.2900390625, 4726.77978515625 | number | 0 |
| low | 4722.669921875, 4699.7099609375, 4687.52978515625 | number | 0 |
| close | 4742.830078125, 4704.81005859375, 4688.68017578125 | number | 0 |
| adj_close | 4742.830078125, 4704.81005859375, 4688.68017578125 | number | 0 |
| volume | 3743050000, 3950760000, 3715480000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/%5EGSPC, https://finance.yahoo.com/quote/%5EGSPC, https://finance.yahoo.com/quote/%5EGSPC | string | 0 |
| description | 미국 대형주 500개 기업 흐름을 보여주는 S&P500 지수, 미국 대형주 500개 기업 흐름을 보여주는 S&P500 지수, 미국 대형주 500개 기업 흐름을 보여주는 S&P500 지수 | string | 0 |
| collected_at | 2026-05-26 13:48:13, 2026-05-26 13:48:13, 2026-05-26 13:48:13 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_aapl_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AAPL, AAPL, AAPL | string | 0 |
| data_name | 해외주식_Apple Inc., 해외주식_Apple Inc., 해외주식_Apple Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Apple Inc., Apple Inc., Apple Inc. | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 187.14999389648438, 184.22000122070312, 182.14999389648438 | number | 0 |
| high | 188.44000244140625, 185.8800048828125, 183.08999633789062 | number | 0 |
| low | 183.88999938964844, 183.42999267578125, 180.8800048828125 | number | 0 |
| close | 185.63999938964844, 184.25, 181.91000366210938 | number | 0 |
| adj_close | 183.56219482421875, 182.18777465820312, 179.8739471435547 | number | 0 |
| volume | 82488700, 58414500, 71983600 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AAPL, https://finance.yahoo.com/quote/AAPL, https://finance.yahoo.com/quote/AAPL | string | 0 |
| description | Apple Inc. 해외 개별주 가격 데이터, Apple Inc. 해외 개별주 가격 데이터, Apple Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:03, 2026-05-26 13:47:03, 2026-05-26 13:47:03 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_abbv_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | ABBV, ABBV, ABBV | string | 0 |
| data_name | 해외주식_AbbVie, Inc., 해외주식_AbbVie, Inc., 해외주식_AbbVie, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | AbbVie, Inc., AbbVie, Inc., AbbVie, Inc. | string | 0 |
| sector | Healthcare, Healthcare, Healthcare | string | 0 |
| open | 154.89999389648438, 160.58999633789062, 160.30999755859375 | number | 0 |
| high | 160.13999938964844, 161.75, 162.2899932861328 | number | 0 |
| low | 154.77000427246094, 159.83999633789062, 159.42999267578125 | number | 0 |
| close | 159.82000732421875, 160.4600067138672, 161.4600067138672 | number | 0 |
| adj_close | 146.5697784423828, 147.15672302246094, 148.07383728027344 | number | 0 |
| volume | 8059900, 5301400, 8332200 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/ABBV, https://finance.yahoo.com/quote/ABBV, https://finance.yahoo.com/quote/ABBV | string | 0 |
| description | AbbVie, Inc. 해외 개별주 가격 데이터, AbbVie, Inc. 해외 개별주 가격 데이터, AbbVie, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:37, 2026-05-26 13:47:37, 2026-05-26 13:47:37 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_amat_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AMAT, AMAT, AMAT | string | 0 |
| data_name | 해외주식_Applied Materials, Inc., 해외주식_Applied Materials, Inc., 해외주식_Applied Materials, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Applied Materials, Inc., Applied Materials, Inc., Applied Materials, Inc. | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 160.0, 151.7100067138672, 149.8000030517578 | number | 0 |
| high | 160.11000061035156, 153.1699981689453, 152.0 | number | 0 |
| low | 153.42999267578125, 150.72999572753906, 148.75 | number | 0 |
| close | 154.3699951171875, 151.4499969482422, 149.30999755859375 | number | 0 |
| adj_close | 151.2788543701172, 148.41729736328125, 146.32017517089844 | number | 0 |
| volume | 8607300, 6100100, 6196100 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AMAT, https://finance.yahoo.com/quote/AMAT, https://finance.yahoo.com/quote/AMAT | string | 0 |
| description | Applied Materials, Inc. 해외 개별주 가격 데이터, Applied Materials, Inc. 해외 개별주 가격 데이터, Applied Materials, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:44, 2026-05-26 13:47:44, 2026-05-26 13:47:44 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_amd_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AMD, AMD, AMD | string | 0 |
| data_name | 해외주식_Advanced Micro Devices, Inc., 해외주식_Advanced Micro Devices, Inc., 해외주식_Advanced Micro Devices, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Advanced Micro Devices, Inc., Advanced Micro Devices, Inc., Advanced Micro Devices, Inc. | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 144.27999877929688, 135.7100067138672, 134.3000030517578 | number | 0 |
| high | 144.39999389648438, 137.42999267578125, 137.6999969482422 | number | 0 |
| low | 137.42999267578125, 133.74000549316406, 134.0 | number | 0 |
| close | 138.5800018310547, 135.32000732421875, 136.00999450683594 | number | 0 |
| adj_close | 138.5800018310547, 135.32000732421875, 136.00999450683594 | number | 0 |
| volume | 64902000, 61988600, 58610300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AMD, https://finance.yahoo.com/quote/AMD, https://finance.yahoo.com/quote/AMD | string | 0 |
| description | Advanced Micro Devices, Inc. 해외 개별주 가격 데이터, Advanced Micro Devices, Inc. 해외 개별주 가격 데이터, Advanced Micro Devices, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:21, 2026-05-26 13:47:21, 2026-05-26 13:47:21 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_amzn_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AMZN, AMZN, AMZN | string | 0 |
| data_name | 해외주식_Amazon.com, Inc., 해외주식_Amazon.com, Inc., 해외주식_Amazon.com, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Amazon.com, Inc., Amazon.com, Inc., Amazon.com, Inc. | string | 0 |
| sector | Consumer Discretionary, Consumer Discretionary, Consumer Discretionary | string | 0 |
| open | 151.5399932861328, 149.1999969482422, 145.58999633789062 | number | 0 |
| high | 152.3800048828125, 151.0500030517578, 147.3800048828125 | number | 0 |
| low | 148.38999938964844, 148.3300018310547, 144.0500030517578 | number | 0 |
| close | 149.92999267578125, 148.47000122070312, 144.57000732421875 | number | 0 |
| adj_close | 149.92999267578125, 148.47000122070312, 144.57000732421875 | number | 0 |
| volume | 47339400, 49425500, 56039800 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AMZN, https://finance.yahoo.com/quote/AMZN, https://finance.yahoo.com/quote/AMZN | string | 0 |
| description | Amazon.com, Inc. 해외 개별주 가격 데이터, Amazon.com, Inc. 해외 개별주 가격 데이터, Amazon.com, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:06, 2026-05-26 13:47:06, 2026-05-26 13:47:06 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_avgo_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AVGO, AVGO, AVGO | string | 0 |
| data_name | 해외주식_Broadcom Inc., 해외주식_Broadcom Inc., 해외주식_Broadcom Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Broadcom Inc., Broadcom Inc., Broadcom Inc. | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 109.21199798583984, 107.0199966430664, 105.7959976196289 | number | 0 |
| high | 110.19999694824219, 107.5, 106.94999694824219 | number | 0 |
| low | 107.70899963378906, 105.53099822998047, 104.73699951171875 | number | 0 |
| close | 108.53800201416016, 105.85800170898438, 104.9010009765625 | number | 0 |
| adj_close | 105.91424560546875, 103.29902648925781, 102.36514282226562 | number | 0 |
| volume | 28831000, 34735000, 25658000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AVGO, https://finance.yahoo.com/quote/AVGO, https://finance.yahoo.com/quote/AVGO | string | 0 |
| description | Broadcom Inc. 해외 개별주 가격 데이터, Broadcom Inc. 해외 개별주 가격 데이터, Broadcom Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:07, 2026-05-26 13:47:07, 2026-05-26 13:47:07 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_axp_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | AXP, AXP, AXP | string | 0 |
| data_name | 해외주식_American Express Company, 해외주식_American Express Company, 해외주식_American Express Company | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | American Express Company, American Express Company, American Express Company | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 186.49000549316406, 186.67999267578125, 186.00999450683594 | number | 0 |
| high | 188.74000549316406, 187.49000549316406, 188.57000732421875 | number | 0 |
| low | 186.07000732421875, 185.58999633789062, 185.75999450683594 | number | 0 |
| close | 188.30999755859375, 186.32000732421875, 187.13999938964844 | number | 0 |
| adj_close | 183.1117401123047, 181.1766815185547, 182.5619354248047 | number | 0 |
| volume | 2236600, 2720500, 2777500 | integer | 0 |
| dividends | 0.0, 0.0, 0.6 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/AXP, https://finance.yahoo.com/quote/AXP, https://finance.yahoo.com/quote/AXP | string | 0 |
| description | American Express Company 해외 개별주 가격 데이터, American Express Company 해외 개별주 가격 데이터, American Express Company 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:10, 2026-05-26 13:48:10, 2026-05-26 13:48:10 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_bac_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | BAC, BAC, BAC | string | 0 |
| data_name | 해외주식_Bank of America Corp, 해외주식_Bank of America Corp, 해외주식_Bank of America Corp | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Bank of America Corp, Bank of America Corp, Bank of America Corp | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 33.38999938964844, 33.650001525878906, 33.56999969482422 | number | 0 |
| high | 34.06999969482422, 33.77000045776367, 34.310001373291016 | number | 0 |
| low | 33.27000045776367, 33.2400016784668, 33.540000915527344 | number | 0 |
| close | 33.900001525878906, 33.529998779296875, 33.79999923706055 | number | 0 |
| adj_close | 32.128780364990234, 31.778106689453125, 32.03400421142578 | number | 0 |
| volume | 36668600, 45988700, 39834600 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/BAC, https://finance.yahoo.com/quote/BAC, https://finance.yahoo.com/quote/BAC | string | 0 |
| description | Bank of America Corp 해외 개별주 가격 데이터, Bank of America Corp 해외 개별주 가격 데이터, Bank of America Corp 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:40, 2026-05-26 13:47:40, 2026-05-26 13:47:40 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_brk-a_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | BRK-A, BRK-A, BRK-A | string | 0 |
| data_name | 해외주식_Berkshire Hathaway Inc. Class A, 해외주식_Berkshire Hathaway Inc. Class A, 해외주식_Berkshire Hathaway Inc. Class A | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Berkshire Hathaway Inc. Class A, Berkshire Hathaway Inc. Class A, Berkshire Hathaway Inc. Class A | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 539496.0, 549272.0, 557707.0 | number | 0 |
| high | 550500.0, 557900.0, 560400.0 | number | 0 |
| low | 539496.0, 547106.0, 551100.0 | number | 0 |
| close | 549787.0, 556050.0, 551550.0 | number | 0 |
| adj_close | 549787.0, 556050.0, 551550.0 | number | 0 |
| volume | 12000, 9500, 9100 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/BRK-A, https://finance.yahoo.com/quote/BRK-A, https://finance.yahoo.com/quote/BRK-A | string | 0 |
| description | Berkshire Hathaway Inc. Class A 해외 개별주 가격 데이터, Berkshire Hathaway Inc. Class A 해외 개별주 가격 데이터, Berkshire Hathaway Inc. Class A 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:13, 2026-05-26 13:47:13, 2026-05-26 13:47:13 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_c_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | C, C, C | string | 0 |
| data_name | 해외주식_Citigroup Inc., 해외주식_Citigroup Inc., 해외주식_Citigroup Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Citigroup Inc., Citigroup Inc., Citigroup Inc. | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 51.29999923706055, 53.25, 53.91999816894531 | number | 0 |
| high | 53.150001525878906, 54.369998931884766, 54.75 | number | 0 |
| low | 51.189998626708984, 52.22999954223633, 53.65999984741211 | number | 0 |
| close | 53.040000915527344, 53.63999938964844, 53.77000045776367 | number | 0 |
| adj_close | 49.26477813720703, 49.82206726074219, 49.94281768798828 | number | 0 |
| volume | 24784900, 30897600, 23714300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/C, https://finance.yahoo.com/quote/C, https://finance.yahoo.com/quote/C | string | 0 |
| description | Citigroup Inc. 해외 개별주 가격 데이터, Citigroup Inc. 해외 개별주 가격 데이터, Citigroup Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:09, 2026-05-26 13:48:09, 2026-05-26 13:48:09 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_cat_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | CAT, CAT, CAT | string | 0 |
| data_name | 해외주식_Caterpillar Inc., 해외주식_Caterpillar Inc., 해외주식_Caterpillar Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Caterpillar Inc., Caterpillar Inc., Caterpillar Inc. | string | 0 |
| sector | Industrials, Industrials, Industrials | string | 0 |
| open | 293.42999267578125, 288.3900146484375, 284.4100036621094 | number | 0 |
| high | 296.6400146484375, 288.92999267578125, 288.2200012207031 | number | 0 |
| low | 291.3500061035156, 283.32000732421875, 283.7900085449219 | number | 0 |
| close | 292.7099914550781, 284.29998779296875, 286.1000061035156 | number | 0 |
| adj_close | 282.6031494140625, 274.4835510253906, 276.221435546875 | number | 0 |
| volume | 2433100, 3043400, 2995400 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/CAT, https://finance.yahoo.com/quote/CAT, https://finance.yahoo.com/quote/CAT | string | 0 |
| description | Caterpillar Inc. 해외 개별주 가격 데이터, Caterpillar Inc. 해외 개별주 가격 데이터, Caterpillar Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:33, 2026-05-26 13:47:33, 2026-05-26 13:47:33 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_cost_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | COST, COST, COST | string | 0 |
| data_name | 해외주식_Costco Wholesale Corporation, 해외주식_Costco Wholesale Corporation, 해외주식_Costco Wholesale Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Costco Wholesale Corporation, Costco Wholesale Corporation, Costco Wholesale Corporation | string | 0 |
| sector | Consumer Staples, Consumer Staples, Consumer Staples | string | 0 |
| open | 655.5800170898438, 651.2100219726562, 642.0800170898438 | number | 0 |
| high | 657.7999877929688, 655.4500122070312, 649.9000244140625 | number | 0 |
| low | 649.5, 643.0999755859375, 640.510009765625 | number | 0 |
| close | 650.6500244140625, 644.6900024414062, 648.3499755859375 | number | 0 |
| adj_close | 641.7051391601562, 635.8269653320312, 639.4366455078125 | number | 0 |
| volume | 2657700, 2612600, 2171100 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/COST, https://finance.yahoo.com/quote/COST, https://finance.yahoo.com/quote/COST | string | 0 |
| description | Costco Wholesale Corporation 해외 개별주 가격 데이터, Costco Wholesale Corporation 해외 개별주 가격 데이터, Costco Wholesale Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:30, 2026-05-26 13:47:30, 2026-05-26 13:47:30 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_csco_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | CSCO, CSCO, CSCO | string | 0 |
| data_name | 해외주식_Cisco Systems, Inc., 해외주식_Cisco Systems, Inc., 해외주식_Cisco Systems, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Cisco Systems, Inc., Cisco Systems, Inc., Cisco Systems, Inc. | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 50.4900016784668, 50.16999816894531, 50.439998626708984 | number | 0 |
| high | 50.86000061035156, 50.68000030517578, 50.5099983215332 | number | 0 |
| low | 50.25, 49.939998626708984, 49.9900016784668 | number | 0 |
| close | 50.5099983215332, 50.5099983215332, 50.08000183105469 | number | 0 |
| adj_close | 47.178462982177734, 47.545570373535156, 47.140811920166016 | number | 0 |
| volume | 20242900, 20303900, 18134100 | integer | 0 |
| dividends | 0.0, 0.39, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/CSCO, https://finance.yahoo.com/quote/CSCO, https://finance.yahoo.com/quote/CSCO | string | 0 |
| description | Cisco Systems, Inc. 해외 개별주 가격 데이터, Cisco Systems, Inc. 해외 개별주 가격 데이터, Cisco Systems, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:29, 2026-05-26 13:47:29, 2026-05-26 13:47:29 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_cvx_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | CVX, CVX, CVX | string | 0 |
| data_name | 해외주식_Chevron Corporation, 해외주식_Chevron Corporation, 해외주식_Chevron Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Chevron Corporation, Chevron Corporation, Chevron Corporation | string | 0 |
| sector | Energy, Energy, Energy | string | 0 |
| open | 149.99000549316406, 149.38999938964844, 153.66000366210938 | number | 0 |
| high | 151.47999572753906, 153.19000244140625, 154.35000610351562 | number | 0 |
| low | 149.24000549316406, 148.67999267578125, 150.58999633789062 | number | 0 |
| close | 149.47999572753906, 152.3300018310547, 150.66000366210938 | number | 0 |
| adj_close | 134.39952087402344, 136.96200561523438, 135.4604949951172 | number | 0 |
| volume | 8879700, 10255300, 8220300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/CVX, https://finance.yahoo.com/quote/CVX, https://finance.yahoo.com/quote/CVX | string | 0 |
| description | Chevron Corporation 해외 개별주 가격 데이터, Chevron Corporation 해외 개별주 가격 데이터, Chevron Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:36, 2026-05-26 13:47:36, 2026-05-26 13:47:36 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_ge_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | GE, GE, GE | string | 0 |
| data_name | 해외주식_GE Aerospace, 해외주식_GE Aerospace, 해외주식_GE Aerospace | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | GE Aerospace, GE Aerospace, GE Aerospace | string | 0 |
| sector | Industrials, Industrials, Industrials | string | 0 |
| open | 101.3647232055664, 99.8563461303711, 99.20191192626953 | number | 0 |
| high | 102.27454376220703, 99.93614959716797, 100.3750991821289 | number | 0 |
| low | 99.95211791992188, 98.68315887451172, 99.0981674194336 | number | 0 |
| close | 100.51875305175781, 99.0103759765625, 99.48922729492188 | number | 0 |
| adj_close | 99.14961242675781, 97.66180419921875, 98.13411712646484 | number | 0 |
| volume | 5189425, 4531850, 4364199 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/GE, https://finance.yahoo.com/quote/GE, https://finance.yahoo.com/quote/GE | string | 0 |
| description | GE Aerospace 해외 개별주 가격 데이터, GE Aerospace 해외 개별주 가격 데이터, GE Aerospace 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:50, 2026-05-26 13:47:50, 2026-05-26 13:47:50 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_gev_2y.csv`
- row_count: 525
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-03-27, 2024-03-28, 2024-04-01 | date | 0 |
| ticker | GEV, GEV, GEV | string | 0 |
| data_name | 해외주식_GE Vernova Inc., 해외주식_GE Vernova Inc., 해외주식_GE Vernova Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | GE Vernova Inc., GE Vernova Inc., GE Vernova Inc. | string | 0 |
| sector | Industrials, Industrials, Industrials | string | 0 |
| open | 115.0, 137.92999267578125, 141.00999450683594 | number | 0 |
| high | 135.0, 137.92999267578125, 144.3300018310547 | number | 0 |
| low | 115.0, 129.9600067138672, 137.07000732421875 | number | 0 |
| close | 131.25, 136.75, 142.02000427246094 | number | 0 |
| adj_close | 130.7644805908203, 136.24412536621094, 141.49461364746094 | number | 0 |
| volume | 4960400, 2239100, 1029500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/GEV, https://finance.yahoo.com/quote/GEV, https://finance.yahoo.com/quote/GEV | string | 0 |
| description | GE Vernova Inc. 해외 개별주 가격 데이터, GE Vernova Inc. 해외 개별주 가격 데이터, GE Vernova Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:58, 2026-05-26 13:47:58, 2026-05-26 13:47:58 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_goog_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | GOOG, GOOG, GOOG | string | 0 |
| data_name | 해외주식_Alphabet Inc. Class C, 해외주식_Alphabet Inc. Class C, 해외주식_Alphabet Inc. Class C | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Alphabet Inc. Class C, Alphabet Inc. Class C, Alphabet Inc. Class C | string | 0 |
| sector | Communication Services, Communication Services, Communication Services | string | 0 |
| open | 139.60000610351562, 138.60000610351562, 139.85000610351562 | number | 0 |
| high | 140.61500549316406, 141.08999633789062, 140.63499450683594 | number | 0 |
| low | 137.74000549316406, 138.42999267578125, 138.00999450683594 | number | 0 |
| close | 139.55999755859375, 140.36000061035156, 138.0399932861328 | number | 0 |
| adj_close | 138.42355346679688, 139.21701049804688, 136.91592407226562 | number | 0 |
| volume | 20071900, 18974300, 18253300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/GOOG, https://finance.yahoo.com/quote/GOOG, https://finance.yahoo.com/quote/GOOG | string | 0 |
| description | Alphabet Inc. Class C 해외 개별주 가격 데이터, Alphabet Inc. Class C 해외 개별주 가격 데이터, Alphabet Inc. Class C 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:01, 2026-05-26 13:47:01, 2026-05-26 13:47:01 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_gs_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | GS, GS, GS | string | 0 |
| data_name | 해외주식_Goldman Sachs Group, Inc., 해외주식_Goldman Sachs Group, Inc., 해외주식_Goldman Sachs Group, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Goldman Sachs Group, Inc., Goldman Sachs Group, Inc., Goldman Sachs Group, Inc. | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 383.0, 383.8800048828125, 383.54998779296875 | number | 0 |
| high | 389.1400146484375, 385.3999938964844, 387.0899963378906 | number | 0 |
| low | 382.19000244140625, 376.760009765625, 381.95001220703125 | number | 0 |
| close | 388.29998779296875, 381.7900085449219, 382.95001220703125 | number | 0 |
| adj_close | 369.5888671875, 363.3925476074219, 364.4966735839844 | number | 0 |
| volume | 2263100, 2265300, 1618300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/GS, https://finance.yahoo.com/quote/GS, https://finance.yahoo.com/quote/GS | string | 0 |
| description | Goldman Sachs Group, Inc. 해외 개별주 가격 데이터, Goldman Sachs Group, Inc. 해외 개별주 가격 데이터, Goldman Sachs Group, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:55, 2026-05-26 13:47:55, 2026-05-26 13:47:55 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_hd_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | HD, HD, HD | string | 0 |
| data_name | 해외주식_Home Depot, Inc., 해외주식_Home Depot, Inc., 해외주식_Home Depot, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Home Depot, Inc., Home Depot, Inc., Home Depot, Inc. | string | 0 |
| sector | Consumer Discretionary, Consumer Discretionary, Consumer Discretionary | string | 0 |
| open | 344.2099914550781, 342.4800109863281, 339.92999267578125 | number | 0 |
| high | 347.29998779296875, 342.70001220703125, 342.9200134277344 | number | 0 |
| low | 343.2200012207031, 336.5899963378906, 338.5400085449219 | number | 0 |
| close | 345.0799865722656, 338.260009765625, 338.5899963378906 | number | 0 |
| adj_close | 326.4539489746094, 320.0021057128906, 320.31427001953125 | number | 0 |
| volume | 2833600, 3309600, 3652400 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/HD, https://finance.yahoo.com/quote/HD, https://finance.yahoo.com/quote/HD | string | 0 |
| description | Home Depot, Inc. 해외 개별주 가격 데이터, Home Depot, Inc. 해외 개별주 가격 데이터, Home Depot, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:51, 2026-05-26 13:47:51, 2026-05-26 13:47:51 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_ibm_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | IBM, IBM, IBM | string | 0 |
| data_name | 해외주식_International Business Machines Corporation, 해외주식_International Business Machines Corporation, 해외주식_International Business Machines Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | International Business Machines Corporation, International Business Machines Corporation, International Business Machines Corporation | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 162.8300018310547, 161.0, 160.22000122070312 | number | 0 |
| high | 163.2899932861328, 161.72999572753906, 161.80999755859375 | number | 0 |
| low | 160.4600067138672, 160.0800018310547, 160.1699981689453 | number | 0 |
| close | 161.5, 160.10000610351562, 160.86000061035156 | number | 0 |
| adj_close | 149.97451782226562, 148.67445373535156, 149.38021850585938 | number | 0 |
| volume | 3825000, 4086100, 3212000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/IBM, https://finance.yahoo.com/quote/IBM, https://finance.yahoo.com/quote/IBM | string | 0 |
| description | International Business Machines Corporation 해외 개별주 가격 데이터, International Business Machines Corporation 해외 개별주 가격 데이터, International Business Machines Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:03, 2026-05-26 13:48:03, 2026-05-26 13:48:03 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_intc_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | INTC, INTC, INTC | string | 0 |
| data_name | 해외주식_Intel Corporation, 해외주식_Intel Corporation, 해외주식_Intel Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Intel Corporation, Intel Corporation, Intel Corporation | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 49.20000076293945, 47.099998474121094, 45.720001220703125 | number | 0 |
| high | 49.380001068115234, 47.810001373291016, 47.15999984741211 | number | 0 |
| low | 47.45000076293945, 46.79999923706055, 45.2400016784668 | number | 0 |
| close | 47.79999923706055, 47.04999923706055, 46.869998931884766 | number | 0 |
| adj_close | 47.16828155517578, 46.42819595336914, 46.25057601928711 | number | 0 |
| volume | 45905700, 35858400, 47797800 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/INTC, https://finance.yahoo.com/quote/INTC, https://finance.yahoo.com/quote/INTC | string | 0 |
| description | Intel Corporation 해외 개별주 가격 데이터, Intel Corporation 해외 개별주 가격 데이터, Intel Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:25, 2026-05-26 13:47:25, 2026-05-26 13:47:25 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_jnj_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | JNJ, JNJ, JNJ | string | 0 |
| data_name | 해외주식_Johnson & Johnson, 해외주식_Johnson & Johnson, 해외주식_Johnson & Johnson | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Johnson & Johnson, Johnson & Johnson, Johnson & Johnson | string | 0 |
| sector | Healthcare, Healthcare, Healthcare | string | 0 |
| open | 156.92999267578125, 160.63999938964844, 161.58999633789062 | number | 0 |
| high | 161.63999938964844, 161.44000244140625, 161.97999572753906 | number | 0 |
| low | 156.7899932861328, 159.8000030517578, 160.4199981689453 | number | 0 |
| close | 159.97000122070312, 160.97000122070312, 160.6300048828125 | number | 0 |
| adj_close | 149.65975952148438, 150.59532165527344, 150.2772216796875 | number | 0 |
| volume | 9622100, 8232000, 6766600 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/JNJ, https://finance.yahoo.com/quote/JNJ, https://finance.yahoo.com/quote/JNJ | string | 0 |
| description | Johnson & Johnson 해외 개별주 가격 데이터, Johnson & Johnson 해외 개별주 가격 데이터, Johnson & Johnson 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:27, 2026-05-26 13:47:27, 2026-05-26 13:47:27 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_jpm_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | JPM, JPM, JPM | string | 0 |
| data_name | 해외주식_JPMorgan Chase & Co., 해외주식_JPMorgan Chase & Co., 해외주식_JPMorgan Chase & Co. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | JPMorgan Chase & Co., JPMorgan Chase & Co., JPMorgan Chase & Co. | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 169.08999633789062, 171.86000061035156, 170.63999938964844 | number | 0 |
| high | 172.1699981689453, 172.0399932861328, 173.35000610351562 | number | 0 |
| low | 168.91000366210938, 170.3699951171875, 170.5399932861328 | number | 0 |
| close | 172.0800018310547, 171.3300018310547, 171.41000366210938 | number | 0 |
| adj_close | 163.0093231201172, 162.2988739013672, 163.3759307861328 | number | 0 |
| volume | 9977400, 9852300, 11972500 | integer | 0 |
| dividends | 0.0, 0.0, 1.05 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/JPM, https://finance.yahoo.com/quote/JPM, https://finance.yahoo.com/quote/JPM | string | 0 |
| description | JPMorgan Chase & Co. 해외 개별주 가격 데이터, JPMorgan Chase & Co. 해외 개별주 가격 데이터, JPMorgan Chase & Co. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:20, 2026-05-26 13:47:20, 2026-05-26 13:47:20 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_klac_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | KLAC, KLAC, KLAC | string | 0 |
| data_name | 해외주식_KLA Corporation, 해외주식_KLA Corporation, 해외주식_KLA Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | KLA Corporation, KLA Corporation, KLA Corporation | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 573.2100219726562, 552.0, 546.3900146484375 | number | 0 |
| high | 573.2100219726562, 558.25, 554.9000244140625 | number | 0 |
| low | 553.6500244140625, 550.0, 544.8099975585938 | number | 0 |
| close | 560.3900146484375, 552.5900268554688, 546.4400024414062 | number | 0 |
| adj_close | 549.3285522460938, 541.6824951171875, 535.65380859375 | number | 0 |
| volume | 967500, 819100, 859900 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/KLAC, https://finance.yahoo.com/quote/KLAC, https://finance.yahoo.com/quote/KLAC | string | 0 |
| description | KLA Corporation 해외 개별주 가격 데이터, KLA Corporation 해외 개별주 가격 데이터, KLA Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:01, 2026-05-26 13:48:01, 2026-05-26 13:48:01 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_ko_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | KO, KO, KO | string | 0 |
| data_name | 해외주식_Coca-Cola Company, 해외주식_Coca-Cola Company, 해외주식_Coca-Cola Company | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Coca-Cola Company, Coca-Cola Company, Coca-Cola Company | string | 0 |
| sector | Consumer Staples, Consumer Staples, Consumer Staples | string | 0 |
| open | 58.79999923706055, 59.93000030517578, 60.04999923706055 | number | 0 |
| high | 59.880001068115234, 60.20000076293945, 60.2599983215332 | number | 0 |
| low | 58.66999816894531, 59.7599983215332, 59.65999984741211 | number | 0 |
| close | 59.81999969482422, 59.959999084472656, 59.7599983215332 | number | 0 |
| adj_close | 55.998592376708984, 56.12965393066406, 55.94242858886719 | number | 0 |
| volume | 16322600, 14830600, 12912900 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/KO, https://finance.yahoo.com/quote/KO, https://finance.yahoo.com/quote/KO | string | 0 |
| description | Coca-Cola Company 해외 개별주 가격 데이터, Coca-Cola Company 해외 개별주 가격 데이터, Coca-Cola Company 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:43, 2026-05-26 13:47:43, 2026-05-26 13:47:43 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_lin_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | LIN, LIN, LIN | string | 0 |
| data_name | 해외주식_Linde plc, 해외주식_Linde plc, 해외주식_Linde plc | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Linde plc, Linde plc, Linde plc | string | 0 |
| sector | Materials, Materials, Materials | string | 0 |
| open | 409.7799987792969, 405.8999938964844, 407.6400146484375 | number | 0 |
| high | 411.7300109863281, 409.8599853515625, 411.6499938964844 | number | 0 |
| low | 406.70001220703125, 405.2900085449219, 407.5799865722656 | number | 0 |
| close | 409.5799865722656, 408.7099914550781, 408.5899963378906 | number | 0 |
| adj_close | 397.9319152832031, 397.0865783691406, 396.9700012207031 | number | 0 |
| volume | 1571900, 1536300, 1517800 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/LIN, https://finance.yahoo.com/quote/LIN, https://finance.yahoo.com/quote/LIN | string | 0 |
| description | Linde plc 해외 개별주 가격 데이터, Linde plc 해외 개별주 가격 데이터, Linde plc 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:02, 2026-05-26 13:48:02, 2026-05-26 13:48:02 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_lly_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | LLY, LLY, LLY | string | 0 |
| data_name | 해외주식_Eli Lilly and Company, 해외주식_Eli Lilly and Company, 해외주식_Eli Lilly and Company | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Eli Lilly and Company, Eli Lilly and Company, Eli Lilly and Company | string | 0 |
| sector | Healthcare, Healthcare, Healthcare | string | 0 |
| open | 580.4099731445312, 600.0, 625.260009765625 | number | 0 |
| high | 592.719970703125, 619.8400268554688, 636.4099731445312 | number | 0 |
| low | 579.0499877929688, 598.7999877929688, 613.27001953125 | number | 0 |
| close | 592.2000122070312, 617.7000122070312, 614.5 | number | 0 |
| adj_close | 582.0289916992188, 607.091064453125, 603.9459228515625 | number | 0 |
| volume | 3226700, 5130300, 6272500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/LLY, https://finance.yahoo.com/quote/LLY, https://finance.yahoo.com/quote/LLY | string | 0 |
| description | Eli Lilly and Company 해외 개별주 가격 데이터, Eli Lilly and Company 해외 개별주 가격 데이터, Eli Lilly and Company 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:16, 2026-05-26 13:47:16, 2026-05-26 13:47:16 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_lrcx_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | LRCX, LRCX, LRCX | string | 0 |
| data_name | 해외주식_Lam Research Corporation, 해외주식_Lam Research Corporation, 해외주식_Lam Research Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Lam Research Corporation, Lam Research Corporation, Lam Research Corporation | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 76.875, 73.19999694824219, 72.5780029296875 | number | 0 |
| high | 76.93800354003906, 74.30000305175781, 74.49099731445312 | number | 0 |
| low | 74.20700073242188, 72.96600341796875, 72.32499694824219 | number | 0 |
| close | 74.93000030517578, 73.69300079345703, 73.10800170898438 | number | 0 |
| adj_close | 73.41434478759766, 72.20236206054688, 71.62921142578125 | number | 0 |
| volume | 11136000, 9224000, 10330000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/LRCX, https://finance.yahoo.com/quote/LRCX, https://finance.yahoo.com/quote/LRCX | string | 0 |
| description | Lam Research Corporation 해외 개별주 가격 데이터, Lam Research Corporation 해외 개별주 가격 데이터, Lam Research Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:35, 2026-05-26 13:47:35, 2026-05-26 13:47:35 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_ma_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | MA, MA, MA | string | 0 |
| data_name | 해외주식_Mastercard Incorporated Class A, 해외주식_Mastercard Incorporated Class A, 해외주식_Mastercard Incorporated Class A | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Mastercard Incorporated Class A, Mastercard Incorporated Class A, Mastercard Incorporated Class A | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 424.0899963378906, 421.20001220703125, 418.5 | number | 0 |
| high | 424.2799987792969, 421.3399963378906, 423.45001220703125 | number | 0 |
| low | 419.55999755859375, 417.5, 418.2799987792969 | number | 0 |
| close | 421.8900146484375, 418.7699890136719, 419.7699890136719 | number | 0 |
| adj_close | 415.7274169921875, 412.6529541015625, 413.63836669921875 | number | 0 |
| volume | 2463700, 3093700, 2042600 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/MA, https://finance.yahoo.com/quote/MA, https://finance.yahoo.com/quote/MA | string | 0 |
| description | Mastercard Incorporated Class A 해외 개별주 가격 데이터, Mastercard Incorporated Class A 해외 개별주 가격 데이터, Mastercard Incorporated Class A 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:32, 2026-05-26 13:47:32, 2026-05-26 13:47:32 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_meta_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | META, META, META | string | 0 |
| data_name | 해외주식_Meta Platforms Inc Class A, 해외주식_Meta Platforms Inc Class A, 해외주식_Meta Platforms Inc Class A | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Meta Platforms Inc Class A, Meta Platforms Inc Class A, Meta Platforms Inc Class A | string | 0 |
| sector | Communication Services, Communication Services, Communication Services | string | 0 |
| open | 351.32000732421875, 344.9800109863281, 344.5 | number | 0 |
| high | 353.1600036621094, 347.95001220703125, 348.1499938964844 | number | 0 |
| low | 340.010009765625, 343.17999267578125, 343.3999938964844 | number | 0 |
| close | 346.2900085449219, 344.4700012207031, 347.1199951171875 | number | 0 |
| adj_close | 343.5936584472656, 341.787841796875, 344.41717529296875 | number | 0 |
| volume | 19042200, 15451100, 12099900 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/META, https://finance.yahoo.com/quote/META, https://finance.yahoo.com/quote/META | string | 0 |
| description | Meta Platforms Inc Class A 해외 개별주 가격 데이터, Meta Platforms Inc Class A 해외 개별주 가격 데이터, Meta Platforms Inc Class A 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:11, 2026-05-26 13:47:11, 2026-05-26 13:47:11 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_mrk_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | MRK, MRK, MRK | string | 0 |
| data_name | 해외주식_Merck & Co., Inc., 해외주식_Merck & Co., Inc., 해외주식_Merck & Co., Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Merck & Co., Inc., Merck & Co., Inc., Merck & Co., Inc. | string | 0 |
| sector | Healthcare, Healthcare, Healthcare | string | 0 |
| open | 109.16000366210938, 114.2699966430664, 115.91999816894531 | number | 0 |
| high | 113.31999969482422, 115.9000015258789, 117.6500015258789 | number | 0 |
| low | 109.16000366210938, 114.16000366210938, 115.86000061035156 | number | 0 |
| close | 113.23999786376953, 114.7699966430664, 117.01000213623047 | number | 0 |
| adj_close | 105.45626068115234, 106.881103515625, 108.96713256835938 | number | 0 |
| volume | 11920100, 10721900, 11492200 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/MRK, https://finance.yahoo.com/quote/MRK, https://finance.yahoo.com/quote/MRK | string | 0 |
| description | Merck & Co., Inc. 해외 개별주 가격 데이터, Merck & Co., Inc. 해외 개별주 가격 데이터, Merck & Co., Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:52, 2026-05-26 13:47:52, 2026-05-26 13:47:52 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_ms_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | MS, MS, MS | string | 0 |
| data_name | 해외주식_Morgan Stanley, 해외주식_Morgan Stanley, 해외주식_Morgan Stanley | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Morgan Stanley, Morgan Stanley, Morgan Stanley | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 92.66000366210938, 93.19999694824219, 92.1500015258789 | number | 0 |
| high | 94.1500015258789, 93.19999694824219, 93.13999938964844 | number | 0 |
| low | 92.2699966430664, 91.2699966430664, 91.66000366210938 | number | 0 |
| close | 93.9000015258789, 91.91000366210938, 92.1500015258789 | number | 0 |
| adj_close | 87.18042755126953, 85.33284759521484, 85.5556640625 | number | 0 |
| volume | 6132200, 7487900, 8735600 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/MS, https://finance.yahoo.com/quote/MS, https://finance.yahoo.com/quote/MS | string | 0 |
| description | Morgan Stanley 해외 개별주 가격 데이터, Morgan Stanley 해외 개별주 가격 데이터, Morgan Stanley 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:48, 2026-05-26 13:47:48, 2026-05-26 13:47:48 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_msft_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | MSFT, MSFT, MSFT | string | 0 |
| data_name | 해외주식_Microsoft Corporation, 해외주식_Microsoft Corporation, 해외주식_Microsoft Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Microsoft Corporation, Microsoft Corporation, Microsoft Corporation | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 373.8599853515625, 369.010009765625, 370.6700134277344 | number | 0 |
| high | 375.8999938964844, 373.260009765625, 373.1000061035156 | number | 0 |
| low | 366.7699890136719, 368.510009765625, 367.1700134277344 | number | 0 |
| close | 370.8699951171875, 370.6000061035156, 367.94000244140625 | number | 0 |
| adj_close | 363.8014831542969, 363.53668212890625, 360.9273376464844 | number | 0 |
| volume | 25258600, 23083500, 20901500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/MSFT, https://finance.yahoo.com/quote/MSFT, https://finance.yahoo.com/quote/MSFT | string | 0 |
| description | Microsoft Corporation 해외 개별주 가격 데이터, Microsoft Corporation 해외 개별주 가격 데이터, Microsoft Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:04, 2026-05-26 13:47:04, 2026-05-26 13:47:04 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_mu_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | MU, MU, MU | string | 0 |
| data_name | 해외주식_Micron Technology, Inc., 해외주식_Micron Technology, Inc., 해외주식_Micron Technology, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Micron Technology, Inc., Micron Technology, Inc., Micron Technology, Inc. | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 84.0, 81.19999694824219, 83.47000122070312 | number | 0 |
| high | 84.08000183105469, 82.58999633789062, 84.26000213623047 | number | 0 |
| low | 81.75, 80.58000183105469, 82.61000061035156 | number | 0 |
| close | 82.33999633789062, 82.26000213623047, 82.70999908447266 | number | 0 |
| adj_close | 81.68760681152344, 81.6082534790039, 82.05467987060547 | number | 0 |
| volume | 13597100, 12915600, 19134200 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/MU, https://finance.yahoo.com/quote/MU, https://finance.yahoo.com/quote/MU | string | 0 |
| description | Micron Technology, Inc. 해외 개별주 가격 데이터, Micron Technology, Inc. 해외 개별주 가격 데이터, Micron Technology, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:18, 2026-05-26 13:47:18, 2026-05-26 13:47:18 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_nflx_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | NFLX, NFLX, NFLX | string | 0 |
| data_name | 해외주식_Netflix, Inc., 해외주식_Netflix, Inc., 해외주식_Netflix, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Netflix, Inc., Netflix, Inc., Netflix, Inc. | string | 0 |
| sector | Communication Services, Communication Services, Communication Services | string | 0 |
| open | 48.319000244140625, 46.731998443603516, 47.29800033569336 | number | 0 |
| high | 48.46500015258789, 47.505001068115234, 48.07400131225586 | number | 0 |
| low | 46.18600082397461, 46.57699966430664, 46.65299987792969 | number | 0 |
| close | 46.849998474121094, 47.0260009765625, 47.46699905395508 | number | 0 |
| adj_close | 46.849998474121094, 47.0260009765625, 47.46699905395508 | number | 0 |
| volume | 50494000, 34437000, 36365000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/NFLX, https://finance.yahoo.com/quote/NFLX, https://finance.yahoo.com/quote/NFLX | string | 0 |
| description | Netflix, Inc. 해외 개별주 가격 데이터, Netflix, Inc. 해외 개별주 가격 데이터, Netflix, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:39, 2026-05-26 13:47:39, 2026-05-26 13:47:39 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_nvda_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | NVDA, NVDA, NVDA | string | 0 |
| data_name | 해외주식_NVIDIA Corporation, 해외주식_NVIDIA Corporation, 해외주식_NVIDIA Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | NVIDIA Corporation, NVIDIA Corporation, NVIDIA Corporation | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 49.24399948120117, 47.48500061035156, 47.766998291015625 | number | 0 |
| high | 49.29499816894531, 48.183998107910156, 48.5 | number | 0 |
| low | 47.595001220703125, 47.31999969482422, 47.507999420166016 | number | 0 |
| close | 48.167999267578125, 47.569000244140625, 47.99800109863281 | number | 0 |
| adj_close | 48.13856887817383, 47.539939880371094, 47.96867752075195 | number | 0 |
| volume | 411254000, 320896000, 306535000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/NVDA, https://finance.yahoo.com/quote/NVDA, https://finance.yahoo.com/quote/NVDA | string | 0 |
| description | NVIDIA Corporation 해외 개별주 가격 데이터, NVIDIA Corporation 해외 개별주 가격 데이터, NVIDIA Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:00, 2026-05-26 13:47:00, 2026-05-26 13:47:00 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_orcl_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | ORCL, ORCL, ORCL | string | 0 |
| data_name | 해외주식_Oracle Corporation, 해외주식_Oracle Corporation, 해외주식_Oracle Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Oracle Corporation, Oracle Corporation, Oracle Corporation | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 104.5199966430664, 103.30000305175781, 102.7699966430664 | number | 0 |
| high | 104.68000030517578, 103.37999725341797, 103.36000061035156 | number | 0 |
| low | 102.44000244140625, 101.73999786376953, 102.4000015258789 | number | 0 |
| close | 104.05999755859375, 102.45999908447266, 102.58999633789062 | number | 0 |
| adj_close | 101.1686782836914, 99.61312866210938, 99.7395248413086 | number | 0 |
| volume | 9597500, 9455600, 6822300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/ORCL, https://finance.yahoo.com/quote/ORCL, https://finance.yahoo.com/quote/ORCL | string | 0 |
| description | Oracle Corporation 해외 개별주 가격 데이터, Oracle Corporation 해외 개별주 가격 데이터, Oracle Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:28, 2026-05-26 13:47:28, 2026-05-26 13:47:28 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_pg_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | PG, PG, PG | string | 0 |
| data_name | 해외주식_Procter & Gamble Company, 해외주식_Procter & Gamble Company, 해외주식_Procter & Gamble Company | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Procter & Gamble Company, Procter & Gamble Company, Procter & Gamble Company | string | 0 |
| sector | Consumer Staples, Consumer Staples, Consumer Staples | string | 0 |
| open | 146.36000061035156, 148.33999633789062, 148.0500030517578 | number | 0 |
| high | 149.41000366210938, 149.1999969482422, 149.27000427246094 | number | 0 |
| low | 146.30999755859375, 147.17999267578125, 147.77000427246094 | number | 0 |
| close | 148.74000549316406, 147.83999633789062, 148.64999389648438 | number | 0 |
| adj_close | 139.3453369140625, 138.502197265625, 139.2610321044922 | number | 0 |
| volume | 7238400, 7697500, 7067400 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/PG, https://finance.yahoo.com/quote/PG, https://finance.yahoo.com/quote/PG | string | 0 |
| description | Procter & Gamble Company 해외 개별주 가격 데이터, Procter & Gamble Company 해외 개별주 가격 데이터, Procter & Gamble Company 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:46, 2026-05-26 13:47:46, 2026-05-26 13:47:46 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_pltr_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | PLTR, PLTR, PLTR | string | 0 |
| data_name | 해외주식_Palantir Technologies Inc. Class A, 해외주식_Palantir Technologies Inc. Class A, 해외주식_Palantir Technologies Inc. Class A | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Palantir Technologies Inc. Class A, Palantir Technologies Inc. Class A, Palantir Technologies Inc. Class A | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 16.950000762939453, 16.1200008392334, 16.049999237060547 | number | 0 |
| high | 16.950000762939453, 16.3799991607666, 16.579999923706055 | number | 0 |
| low | 16.5, 16.010000228881836, 15.949999809265137 | number | 0 |
| close | 16.579999923706055, 16.09000015258789, 16.25 | number | 0 |
| adj_close | 16.579999923706055, 16.09000015258789, 16.25 | number | 0 |
| volume | 41626700, 46865200, 39937700 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/PLTR, https://finance.yahoo.com/quote/PLTR, https://finance.yahoo.com/quote/PLTR | string | 0 |
| description | Palantir Technologies Inc. Class A 해외 개별주 가격 데이터, Palantir Technologies Inc. Class A 해외 개별주 가격 데이터, Palantir Technologies Inc. Class A 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:47, 2026-05-26 13:47:47, 2026-05-26 13:47:47 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_pm_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | PM, PM, PM | string | 0 |
| data_name | 해외주식_Philip Morris International Inc., 해외주식_Philip Morris International Inc., 해외주식_Philip Morris International Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Philip Morris International Inc., Philip Morris International Inc., Philip Morris International Inc. | string | 0 |
| sector | Consumer Staples, Consumer Staples, Consumer Staples | string | 0 |
| open | 93.81999969482422, 95.44000244140625, 95.77999877929688 | number | 0 |
| high | 95.87999725341797, 95.68000030517578, 96.81999969482422 | number | 0 |
| low | 93.66000366210938, 94.73999786376953, 95.55999755859375 | number | 0 |
| close | 95.55999755859375, 95.41999816894531, 95.66000366210938 | number | 0 |
| adj_close | 87.11552429199219, 86.9878921508789, 87.2066879272461 | number | 0 |
| volume | 5038500, 4145200, 5179400 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/PM, https://finance.yahoo.com/quote/PM, https://finance.yahoo.com/quote/PM | string | 0 |
| description | Philip Morris International Inc. 해외 개별주 가격 데이터, Philip Morris International Inc. 해외 개별주 가격 데이터, Philip Morris International Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:54, 2026-05-26 13:47:54, 2026-05-26 13:47:54 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_qcom_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | QCOM, QCOM, QCOM | string | 0 |
| data_name | 해외주식_QUALCOMM Incorporated, 해외주식_QUALCOMM Incorporated, 해외주식_QUALCOMM Incorporated | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | QUALCOMM Incorporated, QUALCOMM Incorporated, QUALCOMM Incorporated | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 142.19000244140625, 138.88999938964844, 135.44000244140625 | number | 0 |
| high | 142.1999969482422, 138.88999938964844, 137.3300018310547 | number | 0 |
| low | 138.77999877929688, 136.99000549316406, 134.94000244140625 | number | 0 |
| close | 140.22999572753906, 137.60000610351562, 136.1699981689453 | number | 0 |
| adj_close | 133.64910888671875, 131.1425323486328, 129.77964782714844 | number | 0 |
| volume | 8495800, 8133300, 6770300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/QCOM, https://finance.yahoo.com/quote/QCOM, https://finance.yahoo.com/quote/QCOM | string | 0 |
| description | QUALCOMM Incorporated 해외 개별주 가격 데이터, QUALCOMM Incorporated 해외 개별주 가격 데이터, QUALCOMM Incorporated 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:59, 2026-05-26 13:47:59, 2026-05-26 13:47:59 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_rtx_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | RTX, RTX, RTX | string | 0 |
| data_name | 해외주식_RTX Corporation, 해외주식_RTX Corporation, 해외주식_RTX Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | RTX Corporation, RTX Corporation, RTX Corporation | string | 0 |
| sector | Industrials, Industrials, Industrials | string | 0 |
| open | 84.05000305175781, 85.4800033569336, 85.98999786376953 | number | 0 |
| high | 86.0199966430664, 86.9000015258789, 86.58999633789062 | number | 0 |
| low | 83.95999908447266, 85.3499984741211, 85.33999633789062 | number | 0 |
| close | 85.22000122070312, 85.61000061035156, 85.41000366210938 | number | 0 |
| adj_close | 81.1324234008789, 81.50372314453125, 81.31330871582031 | number | 0 |
| volume | 10455600, 9957500, 6656500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/RTX, https://finance.yahoo.com/quote/RTX, https://finance.yahoo.com/quote/RTX | string | 0 |
| description | RTX Corporation 해외 개별주 가격 데이터, RTX Corporation 해외 개별주 가격 데이터, RTX Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:05, 2026-05-26 13:48:05, 2026-05-26 13:48:05 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_sndk_2y.csv`
- row_count: 304
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2025-02-13, 2025-02-14, 2025-02-18 | date | 0 |
| ticker | SNDK, SNDK, SNDK | string | 0 |
| data_name | 해외주식_Sandisk Corporation, 해외주식_Sandisk Corporation, 해외주식_Sandisk Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Sandisk Corporation, Sandisk Corporation, Sandisk Corporation | string | 0 |
| sector | Technology, Technology, Technology | string | 0 |
| open | 35.060001373291016, 37.0, 40.529998779296875 | number | 0 |
| high | 44.0, 38.25, 47.150001525878906 | number | 0 |
| low | 34.9900016784668, 35.505001068115234, 39.0 | number | 0 |
| close | 36.0, 36.650001525878906, 47.150001525878906 | number | 0 |
| adj_close | 36.0, 36.650001525878906, 47.150001525878906 | number | 0 |
| volume | 369100, 242700, 444500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/SNDK, https://finance.yahoo.com/quote/SNDK, https://finance.yahoo.com/quote/SNDK | string | 0 |
| description | Sandisk Corporation 해외 개별주 가격 데이터, Sandisk Corporation 해외 개별주 가격 데이터, Sandisk Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:08, 2026-05-26 13:48:08, 2026-05-26 13:48:08 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_tsla_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | TSLA, TSLA, TSLA | string | 0 |
| data_name | 해외주식_Tesla, Inc., 해외주식_Tesla, Inc., 해외주식_Tesla, Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Tesla, Inc., Tesla, Inc., Tesla, Inc. | string | 0 |
| sector | Consumer Discretionary, Consumer Discretionary, Consumer Discretionary | string | 0 |
| open | 250.0800018310547, 244.97999572753906, 239.25 | number | 0 |
| high | 251.25, 245.67999267578125, 242.6999969482422 | number | 0 |
| low | 244.41000366210938, 236.32000732421875, 237.72999572753906 | number | 0 |
| close | 248.4199981689453, 238.4499969482422, 237.92999267578125 | number | 0 |
| adj_close | 248.4199981689453, 238.4499969482422, 237.92999267578125 | number | 0 |
| volume | 104654200, 121082600, 102629300 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/TSLA, https://finance.yahoo.com/quote/TSLA, https://finance.yahoo.com/quote/TSLA | string | 0 |
| description | Tesla, Inc. 해외 개별주 가격 데이터, Tesla, Inc. 해외 개별주 가격 데이터, Tesla, Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:09, 2026-05-26 13:47:09, 2026-05-26 13:47:09 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_txn_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | TXN, TXN, TXN | string | 0 |
| data_name | 해외주식_Texas Instruments Incorporated, 해외주식_Texas Instruments Incorporated, 해외주식_Texas Instruments Incorporated | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Texas Instruments Incorporated, Texas Instruments Incorporated, Texas Instruments Incorporated | string | 0 |
| sector | Semiconductor, Semiconductor, Semiconductor | string | 0 |
| open | 168.85000610351562, 167.99000549316406, 162.5 | number | 0 |
| high | 169.92999267578125, 168.5, 165.7100067138672 | number | 0 |
| low | 167.41000366210938, 166.2100067138672, 162.39999389648438 | number | 0 |
| close | 169.25999450683594, 166.74000549316406, 164.47000122070312 | number | 0 |
| adj_close | 157.56178283691406, 155.21595764160156, 153.10284423828125 | number | 0 |
| volume | 5652500, 5874900, 6445700 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/TXN, https://finance.yahoo.com/quote/TXN, https://finance.yahoo.com/quote/TXN | string | 0 |
| description | Texas Instruments Incorporated 해외 개별주 가격 데이터, Texas Instruments Incorporated 해외 개별주 가격 데이터, Texas Instruments Incorporated 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:57, 2026-05-26 13:47:57, 2026-05-26 13:47:57 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_unh_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | UNH, UNH, UNH | string | 0 |
| data_name | 해외주식_UnitedHealth Group Incorporated, 해외주식_UnitedHealth Group Incorporated, 해외주식_UnitedHealth Group Incorporated | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | UnitedHealth Group Incorporated, UnitedHealth Group Incorporated, UnitedHealth Group Incorporated | string | 0 |
| sector | Healthcare, Healthcare, Healthcare | string | 0 |
| open | 526.8400268554688, 543.0399780273438, 545.0 | number | 0 |
| high | 539.6599731445312, 546.7899780273438, 549.0 | number | 0 |
| low | 526.6699829101562, 539.47998046875, 543.0 | number | 0 |
| close | 539.3400268554688, 542.030029296875, 545.4199829101562 | number | 0 |
| adj_close | 514.2647094726562, 516.8296508789062, 520.06201171875 | number | 0 |
| volume | 3415700, 2891400, 2994400 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/UNH, https://finance.yahoo.com/quote/UNH, https://finance.yahoo.com/quote/UNH | string | 0 |
| description | UnitedHealth Group Incorporated 해외 개별주 가격 데이터, UnitedHealth Group Incorporated 해외 개별주 가격 데이터, UnitedHealth Group Incorporated 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:42, 2026-05-26 13:47:42, 2026-05-26 13:47:42 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_v_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | V, V, V | string | 0 |
| data_name | 해외주식_Visa Inc. Class A, 해외주식_Visa Inc. Class A, 해외주식_Visa Inc. Class A | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Visa Inc. Class A, Visa Inc. Class A, Visa Inc. Class A | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 259.6099853515625, 258.54998779296875, 258.07000732421875 | number | 0 |
| high | 260.0899963378906, 258.8599853515625, 261.0400085449219 | number | 0 |
| low | 257.6700134277344, 256.8599853515625, 258.0 | number | 0 |
| close | 258.8699951171875, 257.9800109863281, 259.6099853515625 | number | 0 |
| adj_close | 254.04287719726562, 253.1694793701172, 254.76904296875 | number | 0 |
| volume | 5471000, 4148300, 3843000 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/V, https://finance.yahoo.com/quote/V, https://finance.yahoo.com/quote/V | string | 0 |
| description | Visa Inc. Class A 해외 개별주 가격 데이터, Visa Inc. Class A 해외 개별주 가격 데이터, Visa Inc. Class A 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:24, 2026-05-26 13:47:24, 2026-05-26 13:47:24 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_wfc_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | WFC, WFC, WFC | string | 0 |
| data_name | 해외주식_Wells Fargo & Company, 해외주식_Wells Fargo & Company, 해외주식_Wells Fargo & Company | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Wells Fargo & Company, Wells Fargo & Company, Wells Fargo & Company | string | 0 |
| sector | Financials, Financials, Financials | string | 0 |
| open | 49.04999923706055, 49.09000015258789, 48.81999969482422 | number | 0 |
| high | 49.7599983215332, 49.09000015258789, 49.86000061035156 | number | 0 |
| low | 48.81999969482422, 48.31999969482422, 48.77000045776367 | number | 0 |
| close | 49.33000183105469, 48.68000030517578, 49.279998779296875 | number | 0 |
| adj_close | 46.541465759277344, 45.928199768066406, 46.49428939819336 | number | 0 |
| volume | 14916000, 21653600, 15917500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/WFC, https://finance.yahoo.com/quote/WFC, https://finance.yahoo.com/quote/WFC | string | 0 |
| description | Wells Fargo & Company 해외 개별주 가격 데이터, Wells Fargo & Company 해외 개별주 가격 데이터, Wells Fargo & Company 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:48:06, 2026-05-26 13:48:06, 2026-05-26 13:48:06 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_wmt_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | WMT, WMT, WMT | string | 0 |
| data_name | 해외주식_Walmart Inc., 해외주식_Walmart Inc., 해외주식_Walmart Inc. | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Walmart Inc., Walmart Inc., Walmart Inc. | string | 0 |
| sector | Consumer Staples, Consumer Staples, Consumer Staples | string | 0 |
| open | 52.41666793823242, 53.25666809082031, 53.06999969482422 | number | 0 |
| high | 53.18000030517578, 53.43333435058594, 53.18000030517578 | number | 0 |
| low | 52.39666748046875, 52.97666549682617, 52.496665954589844 | number | 0 |
| close | 53.0966682434082, 53.099998474121094, 52.586666107177734 | number | 0 |
| adj_close | 51.76509094238281, 51.76833724975586, 51.26788330078125 | number | 0 |
| volume | 23539800, 18756000, 19282500 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/WMT, https://finance.yahoo.com/quote/WMT, https://finance.yahoo.com/quote/WMT | string | 0 |
| description | Walmart Inc. 해외 개별주 가격 데이터, Walmart Inc. 해외 개별주 가격 데이터, Walmart Inc. 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:17, 2026-05-26 13:47:17, 2026-05-26 13:47:17 | string | 0 |

### data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv

- dataset: 해외주식
- file_name: `yahoo_overseas_stock_xom_2y.csv`
- row_count: 584
- column_count: 17
- encoding: `utf-8-sig`
- delimiter: `,`

| original_column | sample_values_first_3 | inferred_type | missing_count |
|---|---|---|---:|
| date | 2024-01-02, 2024-01-03, 2024-01-04 | date | 0 |
| ticker | XOM, XOM, XOM | string | 0 |
| data_name | 해외주식_Exxon Mobil Corporation, 해외주식_Exxon Mobil Corporation, 해외주식_Exxon Mobil Corporation | string | 0 |
| asset_type | overseas_stock, overseas_stock, overseas_stock | string | 0 |
| stock_name | Exxon Mobil Corporation, Exxon Mobil Corporation, Exxon Mobil Corporation | string | 0 |
| sector | Energy, Energy, Energy | string | 0 |
| open | 100.91999816894531, 102.2699966430664, 104.08000183105469 | number | 0 |
| high | 103.0999984741211, 103.62000274658203, 104.56999969482422 | number | 0 |
| low | 100.8499984741211, 101.66000366210938, 102.05000305175781 | number | 0 |
| close | 102.36000061035156, 103.22000122070312, 102.31999969482422 | number | 0 |
| adj_close | 94.20768737792969, 94.99919891357422, 94.17088317871094 | number | 0 |
| volume | 23483000, 23490800, 19395200 | integer | 0 |
| dividends | 0.0, 0.0, 0.0 | number | 0 |
| stock_splits | 0.0, 0.0, 0.0 | number | 0 |
| source_url | https://finance.yahoo.com/quote/XOM, https://finance.yahoo.com/quote/XOM, https://finance.yahoo.com/quote/XOM | string | 0 |
| description | Exxon Mobil Corporation 해외 개별주 가격 데이터, Exxon Mobil Corporation 해외 개별주 가격 데이터, Exxon Mobil Corporation 해외 개별주 가격 데이터 | string | 0 |
| collected_at | 2026-05-26 13:47:22, 2026-05-26 13:47:22, 2026-05-26 13:47:22 | string | 0 |

## Read Failures

읽기 실패한 CSV 파일은 없습니다.
