# DB Load Report

- executed_at: 2026-05-28T20:36:27
- database_path: `C:\Users\gyj05\safe-ai-pb\backend\dev.db`
- input_path: `data/processed/`
- load_strategy: delete processed-source rows, then INSERT OR REPLACE with deterministic ids
- raw_csv_loaded_directly: no

## Loaded CSV Files

| dataset | table | csv | input_rows | inserted_rows | skipped_rows | duplicate_rows_removed | failed_rows |
|---|---|---|---:|---:|---:|---:|---:|
| report_only | - | - | 0 | 0 | 0 | 0 | 0 |

## Processed CSV Inventory

| dataset | table | csv | exists | current_db_rows |
|---|---|---|---|---:|
| market_prices | MarketPrice | `data/processed/market_prices/krx_market_prices.csv` | true | 1617899 |
| market_indices | MarketIndex | `data/processed/market_indices/market_indices.csv` | true | 59973 |
| overseas_prices | YahooPrice | `data/processed/overseas_prices/overseas_prices.csv` | true | 29445 |
| fx_rates | FxRate | `data/processed/fx_rates/fx_rates.csv` | true | 604 |
| foreign_ownership | ForeignOwnership | `data/processed/foreign_ownership/foreign_ownership.csv` | true | 1617898 |
| interest_rates | InterestRate | `data/processed/interest_rates/interest_rates.csv` | true | 11956 |
| fundamentals | ValuationIndicator | `data/processed/fundamentals/fundamentals.csv` | true | 30636 |
| investor_flows | InvestorFlow | `data/processed/investor_flows/investor_flows.csv` | true | 138670 |
| economic_events | EconomicEvent | `data/processed/economic_events/economic_events.csv` | true | 38 |

## Skipped Files

스킵된 processed CSV 파일은 없습니다.

## Row Skip Reasons

| dataset | reason | count |
|---|---|---:|
| none | none | 0 |

## Validation Query Results

```json
{
  "MarketPrice": 1617899,
  "MarketIndex": 59973,
  "YahooPrice": 29445,
  "FxRate": 604,
  "ForeignOwnership": 1617898,
  "InterestRate": 11956,
  "ValuationIndicator": 30636,
  "InvestorFlow": 138670,
  "EconomicEvent": 38,
  "BASE_RATE_DECISION": 38,
  "BASE_RATE_DECISION_hold": 28,
  "BASE_RATE_DECISION_cut": 10,
  "BASE_RATE_DECISION_hike": 0,
  "duplicate_checks": {
    "MarketPrice_market_ticker_priceDate": 0,
    "MarketIndex_indexCode_indexDate": 0,
    "InterestRate_key": 0,
    "EconomicEvent_eventDate_title_country": 0
  },
  "date_samples": {
    "MarketPrice": [
      "2024-01-02"
    ],
    "InterestRate": [
      "2024-01-11",
      "2024-01-11",
      "2024-01-11"
    ],
    "EconomicEvent": [
      "2024-01-11",
      "2024-01-11"
    ]
  }
}
```

## Notes

- `MarketPrice`, `MarketIndex`, `ForeignOwnership`의 필수 수치가 비어 있는 휴장일/결측 행은 DB NOT NULL 제약 때문에 스킵했습니다.
- `EconomicEvent`의 `BASE_RATE_DECISION` 38건은 수동 기준금리 이벤트 파일에서 적재했습니다.
- processed CSV만 적재했으며 raw CSV는 DB에 직접 적재하지 않았습니다.
- Prisma CLI는 현재 로컬 dependency 누락으로 실행되지 않아 Python sqlite3 스크립트가 필요한 컬럼/테이블을 보장했습니다.

## Next Steps

1. 백엔드 서비스에서 새 테이블 또는 확장 컬럼을 조회하는 repository/service를 추가합니다.
2. 분석 API의 기준일 파라미터를 `analysisDate`로 통일하고 `date <= analysisDate` 조건을 강제합니다.
3. daily feature table 생성은 별도 배치로 분리하고, 금리/환율/지수 forward fill은 그 단계에서만 적용합니다.
4. Prisma CLI dependency를 복구한 뒤 `prisma generate`와 migration 상태를 검증합니다.
