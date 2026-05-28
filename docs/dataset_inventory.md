# Dataset Inventory

MVP 우선순위 데이터셋과 raw/processed 저장 구조입니다. `observed_raw_file_count`는 현재 `data/raw/` 자동 탐색 결과 기준입니다.

| dataset | source | raw_path | frequency | expected_processed_path | mvp_priority | usage | observed_raw_file_count |
|---|---|---|---|---|---|---|---:|
| 전종목 시세 | KRX | `data/raw/krx_stat/krx_all_stocks_*.csv` | daily | `data/processed/market_prices/` | high | 포트폴리오 평가 및 수익률 분석 | 28 |
| KOSPI/KOSDAQ/KRX 지수 시세 | KRX | `data/raw/krx/*_index_*.csv` | daily | `data/processed/market_indices/` | high | 시장 벤치마크 및 국면 분석 | 15 |
| 외국인 보유량 | KRX | `data/raw/krx_stat/foreign_ownership_*.csv` | daily/monthly snapshot | `data/processed/foreign_ownership/` | high | 수급 및 외국인 보유 분석 | 28 |
| 해외주식 | Yahoo | `data/raw/yahoo/overseas_stocks/` | daily | `data/processed/overseas_prices/` | high | 글로벌 종목 가격 분석 | 50 |
| 미국 ETF | Yahoo | `data/raw/yahoo/etfs/` | daily | `data/processed/overseas_prices/` | high | ETF 벤치마크 분석 | 1 |
| S&P500 | Yahoo | `data/raw/yahoo/indices/yahoo_sp500_index_*.csv` | daily | `data/processed/market_indices/` | high | 미국 대형주 시장 분석 | 1 |
| 나스닥 | Yahoo | `data/raw/yahoo/indices/yahoo_nasdaq_index_*.csv` | daily | `data/processed/market_indices/` | high | 미국 성장주 시장 분석 | 1 |
| 환율 | Yahoo | `data/raw/yahoo/fx/` | daily | `data/processed/fx_rates/` | high | 원화 환산 및 환율 환경 분석 | 1 |
| 한국 기준금리 | ECOS | `data/raw/ecos/base_rates/` | event/stepwise | `data/processed/interest_rates/` | high | 금리 환경 분석 | 1 |
| 미국 기준금리 | FRED | `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv` | event/stepwise | `data/processed/interest_rates/` | high | 글로벌 금리 분석 | 1 |
| 국내 시장금리 | ECOS | `data/raw/ecos/market_rates_daily/` | daily | `data/processed/interest_rates/` | medium | 채권 및 시장금리 환경 분석 | 6 |
| PER/PBR/배당수익률 | KRX | `data/raw/krx_stat/krx_per_pbr_*.csv` | daily/monthly snapshot | `data/processed/fundamentals/` | high | 밸류에이션 분석 | 28 |
| 투자자별 거래실적 | KRX | `data/raw/krx_stat/investor_trading_*.csv; data/raw/krx_stat/investing_trade_*.csv` | daily | `data/processed/investor_flows/` | high | 투자자 수급 분석 | 152 |
| 경제 이벤트 | manual/excel/csv | `data/raw/events/` | event | `data/processed/economic_events/` | high | 이벤트 영향 분석 | 0 |
