# Column Mapping Draft

MVP DB 적재를 위한 표준 컬럼명 매핑 초안입니다. `TBD`는 다음 전처리 단계에서 도메인 의미를 확인해야 합니다.
향후 전처리 산출물은 `data/processed/` 하위에 저장합니다.

| dataset | source_file_pattern | original_column | standard_column | type | nullable | description |
|---|---|---|---|---|---|---|
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | date | date | date | false | 분석 기준 일자 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | rate_value | rateValue | number | true | 금리 값 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | unit | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | period | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | priority | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | category | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | description | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | source | TBD | string | false | 원본 컬럼 |
| 한국 기준금리 | `data/raw/ecos/base_rates/ecos_rate_*_한국은행_기준금리.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_콜금리_1일__전체거래_.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_3년_.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_국고채_10년_.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_회사채_3년__AA-_.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rate_daily_*0_CD_91일_.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | date | date | date | false | 분석 기준 일자 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | stat_code | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | stat_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | item_code | TBD | integer | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | rate_value | rateValue | number | true | 금리 값 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | unit | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | period | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | priority | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | category | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | description | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | source | TBD | string | false | 원본 컬럼 |
| 국내 시장금리 | `data/raw/ecos/market_rates_daily/ecos_market_rates_daily_selected.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | date | date | date | false | 분석 기준 일자 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | series_id | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | korean_name | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | rate_value | rateValue | number | true | 금리 값 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | unit | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | frequency | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | description | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | source | TBD | string | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | realtime_start | TBD | date | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | realtime_end | TBD | date | false | 원본 컬럼 |
| 미국 기준금리 | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | date | date | date | false | 분석 기준 일자 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | series_id | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | item_name | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | korean_name | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | rate_value | rateValue | number | true | 금리 값 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | unit | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | frequency | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | description | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | source | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | realtime_start | TBD | date | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | realtime_end | TBD | date | false | 원본 컬럼 |
| 기타 | `data/raw/fred/rates/fred_dgs10_us_10y_treasury_rate.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | bond_index_name | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | total_return_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | total_return_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | net_price_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | net_price_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | zero_reinvestment_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | zero_reinvestment_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | call_reinvestment_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | call_reinvestment_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | market_price_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | market_price_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | avg_duration | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | avg_convexity_price | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_4m_YYMM.csv` | ytm | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | bond_index_name | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | total_return_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | total_return_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | net_price_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | net_price_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | zero_reinvestment_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | zero_reinvestment_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | call_reinvestment_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | call_reinvestment_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | market_price_index_close | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | market_price_index_change | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | avg_duration | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | avg_convexity_price | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/bond_index_6m_YYMM.csv` | ytm | TBD | number | true | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | open | openPrice | number | true | 시가 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | high | highPrice | number | true | 고가 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | change | TBD | number | false | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_4m_YYMM.csv` | change_rate | TBD | number | false | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | open | openPrice | number | true | 시가 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | high | highPrice | number | true | 고가 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | change | TBD | number | false | 원본 컬럼 |
| 기타 | `data/raw/krx/derivative_index_6m_YYMM.csv` | change_rate | TBD | number | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_4m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kosdaq_index_6m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_4m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/kospi_index_6m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | change | TBD | number | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | change_rate | TBD | number | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_4m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | index_class | TBD | string | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | open | openPrice | number | true | 시가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | high | highPrice | number | true | 고가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | low | lowPrice | number | true | 저가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | close | closeValue | number | true | 지수 종가 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | change | TBD | number | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | change_rate | TBD | number | false | 원본 컬럼 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | volume | volume | number | true | 거래량 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| KOSPI/KOSDAQ/KRX 지수 시세 | `data/raw/krx/krx_index_6m_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | stock_name | stockName | string | true | 종목명 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | listed_shares | TBD | integer | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | foreign_holding_shares | TBD | integer | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | foreign_limit_shares | TBD | integer | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | foreign_limit_exhaustion_ratio | TBD | number | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | 종가 | closePrice | number | true | 종가 또는 수정 종가 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | 대비 | TBD | integer | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | 등락률 | TBD | number | false | 원본 컬럼 |
| 외국인 보유량 | `data/raw/krx_stat/foreign_ownership_YYMM.csv` | 외국인 지분율 | TBD | number | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD한국조선해양_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_HD현대중공업_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KB금융_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_KT&G_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG에너지솔루션_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG이노텍_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG전자_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LG화학_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LIG디펜스앤에어로스페이스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_LS ELECTRIC_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_NAVER_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_POSCO홀딩스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK스퀘어_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK이노베이션_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK텔레콤_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_SK하이닉스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_고려아연_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_기아_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_두산에너빌리티_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_미래에셋증권_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성SDI_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성물산_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성바이오로직스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성생명_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전기_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성전자우_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성중공업_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_삼성화재_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_셀트리온_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_신한지주_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_알테오젠_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_에코프로비엠_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_우리금융지주_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_포스코퓨처엠_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_하나금융지주_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한국전력_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한미반도체_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화시스템_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화에어로스페이스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_한화오션_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대로템_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대모비스_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대일렉트릭_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_현대차_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 일자 | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 기관 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 기타법인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 개인 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 외국인 합계 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investing_trade_효성중공업_YY.csv` | 전체 | TBD | integer | false | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | 종가 | closePrice | number | true | 종가 또는 수정 종가 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | 대비 | TBD | number | true | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | 등락률 | TBD | number | true | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | PER | per | number | true | 주가수익비율 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | PBR | pbr | number | true | 주가순자산비율 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_4m_YYMM.csv` | 배당수익률 | dividendYield | number | true | 배당수익률 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | 종가 | closePrice | number | true | 종가 또는 수정 종가 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | 대비 | TBD | number | true | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | 등락률 | TBD | number | true | 원본 컬럼 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | PER | per | number | true | 주가수익비율 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | PBR | pbr | number | true | 주가순자산비율 |
| 투자자별 거래실적 | `data/raw/krx_stat/investor_trading_6m_YYMM.csv` | 배당수익률 | dividendYield | number | true | 배당수익률 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | stock_name | stockName | string | true | 종목명 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | market | market | string | true | 시장 구분 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | division | TBD | string | true | 원본 컬럼 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | open | openPrice | number | true | 시가 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | high | highPrice | number | true | 고가 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | low | lowPrice | number | true | 저가 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | volume | volume | number | true | 거래량 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | trading_value | tradingValue | number | true | 거래대금 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | market_cap | marketCap | number | true | 시가총액 |
| 전종목 시세 | `data/raw/krx_stat/krx_all_stocks_YYMM.csv` | listed_shares | TBD | integer | false | 원본 컬럼 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | date | date | date | false | 분석 기준 일자 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | index_name | indexName | string | true | 지수명 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | change | TBD | number | true | 원본 컬럼 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | change_rate | TBD | number | true | 원본 컬럼 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | per | per | number | true | 주가수익비율 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | pbr | pbr | number | true | 주가순자산비율 |
| PER/PBR/배당수익률 | `data/raw/krx_stat/krx_per_pbr_YYMM.csv` | dividend_yield | dividendYield | number | true | 배당수익률 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | date | date | date | false | 분석 기준 일자 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | stock_name | stockName | string | true | 종목명 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | sector | TBD | string | true | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | open | openPrice | number | true | 시가 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | high | highPrice | number | true | 고가 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | low | lowPrice | number | true | 저가 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | volume | volume | number | true | 거래량 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | description | TBD | string | false | 원본 컬럼 |
| 미국 ETF | `data/raw/yahoo/etfs/yahoo_us_etf_spy_*_*.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | date | date | date | false | 분석 기준 일자 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | stock_name | stockName | string | true | 종목명 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | sector | TBD | string | true | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | open | openPrice | number | true | 시가 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | high | highPrice | number | true | 고가 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | low | lowPrice | number | true | 저가 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | volume | volume | number | true | 거래량 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | description | TBD | string | false | 원본 컬럼 |
| 환율 | `data/raw/yahoo/fx/yahoo_usd_krw_fx_*_*.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | date | date | date | false | 분석 기준 일자 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | stock_name | stockName | string | true | 종목명 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | sector | TBD | string | true | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | open | openPrice | number | true | 시가 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | high | highPrice | number | true | 고가 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | low | lowPrice | number | true | 저가 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | volume | volume | number | true | 거래량 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | description | TBD | string | false | 원본 컬럼 |
| 나스닥 | `data/raw/yahoo/indices/yahoo_nasdaq_index_*_*.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | date | date | date | false | 분석 기준 일자 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | data_name | TBD | string | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | stock_name | stockName | string | true | 종목명 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | sector | TBD | string | true | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | open | openPrice | number | true | 시가 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | high | highPrice | number | true | 고가 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | low | lowPrice | number | true | 저가 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | volume | volume | number | true | 거래량 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | dividends | TBD | number | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | source_url | TBD | string | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | description | TBD | string | false | 원본 컬럼 |
| S&P500 | `data/raw/yahoo/indices/yahoo_sp500_index_*_*.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_aapl_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_abbv_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amat_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amd_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_amzn_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_avgo_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_axp_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_bac_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_brk-a_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_c_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cat_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cost_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_csco_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_cvx_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ge_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gev_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_goog_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_gs_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_hd_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ibm_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_intc_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jnj_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_jpm_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_klac_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ko_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lin_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lly_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_lrcx_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ma_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_meta_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mrk_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_ms_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_msft_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_mu_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nflx_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_nvda_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_orcl_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pg_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pltr_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_pm_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_qcom_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_rtx_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_sndk_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_tsla_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_txn_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_unh_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_v_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wfc_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_wmt_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | date | date | date | false | 분석 기준 일자 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | ticker | ticker | string | false | 종목 식별 코드 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | data_name | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | asset_type | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | stock_name | stockName | string | true | 종목명 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | sector | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | open | openPrice | number | true | 시가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | high | highPrice | number | true | 고가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | low | lowPrice | number | true | 저가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | adj_close | closePrice | number | true | 종가 또는 수정 종가 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | volume | volume | number | true | 거래량 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | dividends | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | stock_splits | TBD | number | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | source_url | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | description | TBD | string | false | 원본 컬럼 |
| 해외주식 | `data/raw/yahoo/overseas_stocks/yahoo_overseas_stock_xom_2y.csv` | collected_at | TBD | string | false | 원본 컬럼 |
