# Data Cleaning Rules

이 문서는 raw 데이터 명세화 이후 전처리 및 DB 적재 단계에서 적용할 정제 원칙입니다.

1. 원본 데이터는 `data/raw/`에 보관한다.
2. 전처리 완료 데이터는 향후 `data/processed/`에 저장한다.
3. 샘플 데이터는 `data/sample/`에 저장한다.
4. 이번 작업에서는 processed 파일을 실제 생성하지 않는다.
5. 날짜는 `YYYY-MM-DD`로 통일한다.
6. 숫자 컬럼의 쉼표를 제거한다.
7. `%` 기호는 제거한 뒤 number로 변환한다.
8. `-`와 빈 문자열은 null 처리한다.
9. 종목코드는 숫자가 아니라 문자열로 유지한다.
10. 가격, 금리, 환율, 지수는 number로 변환한다.
11. 기준금리와 시장금리는 `effectiveDate` 또는 `releaseDate` 이후부터 forward fill 가능하다.
12. `data/raw/ecos/base_rates/`의 한국 기준금리 데이터는 향후 `releaseDate`/`effectiveDate` 컬럼을 추가할 예정이다.
13. `data/raw/fred/rates/fred_dff_us_federal_funds_rate.csv`의 미국 기준금리 데이터는 향후 `releaseDate`/`effectiveDate` 컬럼을 추가할 예정이다.
14. 주말/공휴일로 인해 비어 있는 금리, 환율, 지수 값은 향후 전처리 단계에서 forward fill 방식으로 채울 예정이다.
15. 경제 이벤트는 forward fill하지 않고 `eventDate` 또는 `releaseDate` 기준 이벤트 마커로 저장한다.
16. 월별 거시지표는 `targetMonth`가 아니라 `releaseDate` 기준으로 조인한다.
17. 모든 분석 API는 `analysisDate` 기준으로 `date <= analysisDate` 데이터만 사용한다.
18. 미래 데이터가 과거 분석에 섞이지 않도록 look-ahead bias를 방지한다.
19. 데이터가 부족한 경우 미래 데이터를 보완용으로 사용하지 않고 null 또는 `insufficient_data` 상태로 처리한다.
