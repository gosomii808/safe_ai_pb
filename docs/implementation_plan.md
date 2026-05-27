# Implementation Plan

## 경제 이벤트 기능 변환 계획

### 목표
- Python 중심 배포/마이그레이션 문서의 핵심 아이디어(경제 이벤트 + 거시 영향 설명)를 SafePB AI의 현재 스택(Next.js 15, NestJS, Prisma, SQLite) 기반 MVP로 변환한다.

### 적용 범위 (MVP)
1. Prisma 스키마에 경제 이벤트 모델 추가
2. NestJS `events` 모듈(조회/상세/요약/시드 API) 구현
3. JSON 기반 시드 데이터 적재 구조 제공
4. 규칙 기반 영향 요약 서비스 분리 (`impact-summary`, AI 리포트 재사용 가능)
5. 프론트엔드 `events` 페이지를 API 연동 구조로 전환하고 mock fallback 유지

### 제외 범위
- Python 런타임(yfinance/openpyxl/cron/lambda) 직접 구현
- 실시간 시세 수집 자동화
- 이메일 알림, PostgreSQL 마이그레이션, 투자 추천/예측 엔진

### 단계별 구현 순서
1. **문서/모델 정의**: Prisma 모델 및 enum 설계
2. **백엔드 구현**: EventsController / EventsService / DTO / Prisma 연동
3. **시드 데이터**: JSON seed + `POST /events/seed`
4. **프론트엔드 구현**: 이벤트 목록/필터/요약 카드 + 로딩/에러/빈 상태 + fallback
5. **검증**: 타입체크 및 빌드/린트 기반 확인

### 운영/표현 가이드 반영
- API 응답에는 민감 포트폴리오 데이터 포함 금지
- 문구는 "영향 가능성", "리스크 설명", "의사결정 참고 정보" 중심으로 유지
- 투자 추천/수익 보장 표현 금지
