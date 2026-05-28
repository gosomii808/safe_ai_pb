# Preprocessing Report

- executed_at: 2026-05-28T19:50:54
- input_raw_path: `data/raw/`
- output_processed_path: `data/processed/`
- processed_raw_file_count: 315
- skipped_file_count: 5

## Generated Processed Files

| dataset | path | rows | columns | input_files | input_rows | duplicate_rows_removed |
|---|---|---:|---:|---:|---:|---:|
| market_prices | `data/processed/market_prices/krx_market_prices.csv` | 2428372 | 14 | 28 | 2428372 | 0 |
| market_indices | `data/processed/market_indices/market_indices.csv` | 72084 | 14 | 17 | 72084 | 0 |
| overseas_prices | `data/processed/overseas_prices/overseas_prices.csv` | 29445 | 11 | 51 | 29445 | 0 |
| fx_rates | `data/processed/fx_rates/fx_rates.csv` | 604 | 8 | 1 | 604 | 0 |
| foreign_ownership | `data/processed/foreign_ownership/foreign_ownership.csv` | 1617899 | 12 | 28 | 1617899 | 0 |
| interest_rates | `data/processed/interest_rates/interest_rates.csv` | 11956 | 11 | 9 | 18576 | 6620 |
| fundamentals | `data/processed/fundamentals/fundamentals.csv` | 30636 | 7 | 28 | 30636 | 0 |
| investor_flows | `data/processed/investor_flows/investor_flows.csv` | 138670 | 6 | 152 | 58612 | 1210 |
| economic_events | `data/processed/economic_events/economic_events.csv` | 38 | 16 | 1 | 38 | 0 |

## Missing Values

| dataset | major_null_counts |
|---|---|
| market_prices | closePrice=810473, openPrice=810473, highPrice=810473, lowPrice=810473, volume=810473, tradingValue=810473, marketCap=810473, change=810473, changeRate=810473 |
| market_indices | openValue=3757, highValue=3757, lowValue=3757, closeValue=1134, change=2309, changeRate=2309, volume=2623, tradingValue=3791, marketCap=3791 |
| overseas_prices | none |
| fx_rates | none |
| foreign_ownership | foreignHoldingShares=1, foreignLimitShares=1, foreignLimitExhaustionRatio=1, foreignOwnershipRatio=1 |
| interest_rates | rateValue=58 |
| fundamentals | market=1702 |
| investor_flows | ticker=138670 |
| economic_events | forecastValue=1, surpriseBp=1 |

## Skipped Files

| dataset | file_path | reason |
|---|---|---|
| investor_flows | `data/raw/krx_stat/investor_trading_4m_2601.csv` | wide investor flow columns not found |
| investor_flows | `data/raw/krx_stat/investor_trading_6m_2401.csv` | wide investor flow columns not found |
| investor_flows | `data/raw/krx_stat/investor_trading_6m_2407.csv` | wide investor flow columns not found |
| investor_flows | `data/raw/krx_stat/investor_trading_6m_2501.csv` | wide investor flow columns not found |
| investor_flows | `data/raw/krx_stat/investor_trading_6m_2507.csv` | wide investor flow columns not found |

## ReleaseDate / EffectiveDate Manual Checks

- 수동 검증 필요 항목 없음

## Forward Fill Status

- 실제 forward fill 적용 데이터: 없음
- 미적용 데이터: 기준금리, 시장금리, 환율, 지수
- 이번 단계에서는 원본 관측일 기준 CSV만 생성했습니다.
- 향후 daily calendar feature table 생성 단계에서 `date <= analysisDate` 조건으로 forward fill을 적용해야 합니다.
- 경제 이벤트는 forward fill하지 않고 `eventDate` 또는 `releaseDate` 기준 이벤트 마커로 사용합니다.

## Look-Ahead Bias Controls

- 원본 `date`, `releaseDate`, `effectiveDate` 의미를 분리해 보존했습니다.
- 기준금리 수준 데이터는 `effectiveDate`/`releaseDate` 이후부터만 유효한 것으로 해석해야 합니다.
- CPI, FOMC, 금통위, 고용지표 등 발표성 데이터는 `targetPeriod`가 아니라 `releaseDate` 기준으로 분석에 사용해야 합니다.
- 이번 작업에서는 미래 값을 과거 행에 붙이는 daily feature table을 생성하지 않았습니다.

## Warnings

- data/raw/events/base_rate_decisions_manual.csv: 기준금리 발표 이벤트 38건을 수동 입력 데이터로 사용했습니다. 추후 BOK/FOMC 공식 출처 검증 필요.
- data/raw/ecos/base_rates/ecos_rate_0101000_한국은행_기준금리.csv: releaseDate/effectiveDate 원본 부재. 수동 기준금리 이벤트로 19개 발표일을 보완했으며 공식 출처 검증 필요.
- data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv: releaseDate/effectiveDate 원본 부재. 수동 기준금리 이벤트로 19개 발표일을 보완했으며 공식 출처 검증 필요.

## Next Steps

1. `data/processed/`를 `.gitignore`에 포함할지 결정합니다.
2. processed CSV 스키마를 DB 테이블 DDL과 1:1로 확정합니다.
3. 경제 이벤트 수동 CSV를 추가하고 `releaseDate` 기준 조인 규칙을 검증합니다.
4. 영업일 캘린더를 만든 뒤 금리/환율/지수의 forward fill feature table을 별도 생성합니다.
5. DB 적재 전 unique key와 nullable 정책을 마이그레이션에 반영합니다.
