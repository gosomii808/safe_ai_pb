# SafePB AI — 개발 인수인계 문서 (Implementation Plan for Next Developer)

> 업데이트일: 2026-05-27  
> 프로젝트: SafePB AI (금융보안 기반 AI 개인투자비서)  
> 기술 스택: **Next.js 15 (frontend)** + **NestJS + Prisma + SQLite (backend)**  
> 기준 브랜치: `temp` (사용자 전달 기준)

---

## 1. 이번 업데이트 핵심

기존 문서에서 “Prisma 모델 미정의/온보딩 저장 미구현”으로 되어 있던 내용이 현재 코드와 맞지 않아, 실제 상태 기준으로 정리했습니다.

### ✅ 이미 완료된 DB 구조
- `backend/prisma/schema.prisma`에 MVP 기준 핵심 모델이 정의되어 있음
  - 사용자/온보딩: `User`, `InvestmentProfile`, `PortfolioAsset`
  - 분석/시세: `PortfolioAnalysisSnapshot`, `MarketPrice`, `MarketIndex`, `ValuationIndicator`, `ForeignOwnership`, `YahooPrice`
  - 이벤트: `EconomicEvent`, `EventImpactRule`
  - 보안/감사: `AccessLog`, `AiRequestLog`, `SecurityEvent`
- enum 정의 완료
  - `RiskLevel`, `EventCategory`, `ImportanceLevel`, `LogAction`, `SecuritySeverity`
- 관계/제약조건 반영
  - 1:1 (`User` ↔ `InvestmentProfile`), 1:N (`User` ↔ `PortfolioAsset` 등)
  - 복합 unique / index 다수 반영
- 마이그레이션 파일 생성됨
  - `backend/prisma/migrations/20260527114906_mvp_core_schema/migration.sql`

---

## 2. 현재 구조 분석 (DB 관점)

### 2.1 사용자/온보딩 도메인
- `User`
  - `email`, `phone`는 평문이 아닌 “암호화 문자열 저장” 전제 주석 포함
  - `createdAt`, `updatedAt` 자동 관리
- `InvestmentProfile`
  - `userId @unique`로 사용자당 단일 투자성향 보장
  - `riskType`, `investmentGoal`은 암호화 문자열 전제
- `PortfolioAsset`
  - 보유 종목의 키는 `(userId, market, ticker)`로 유일성 보장
  - `quantity`, `avgBuyPrice`, `investmentAmount`는 암호화 문자열 전제

### 2.2 분석/시장 데이터 도메인
- `PortfolioAnalysisSnapshot`: 사용자별 분석 스냅샷 시계열 저장
- `MarketPrice`, `MarketIndex`, `ValuationIndicator`, `ForeignOwnership`, `YahooPrice`
  - 모두 날짜 축 기준 unique/index 포함
  - 대시보드 계산 및 AI 리포트 입력 데이터 소스로 사용 가능

### 2.3 이벤트 도메인
- `EconomicEvent` + `EventImpactRule`
  - 카테고리, 중요도, 영향 규칙을 분리해 재사용 가능하게 설계
  - 이벤트별 다수 규칙 연결(1:N)

### 2.4 보안/감사 도메인
- `AccessLog`, `AiRequestLog`, `SecurityEvent`
  - MVP 단계에서 추후 보안 페이지/감사 기능으로 확장 가능한 형태

---

## 3. 구현 상태 재분류 (완료 vs 진행 필요)

## ✅ 완료됨
1. Prisma MVP 코어 스키마 정의 완료
2. Prisma 마이그레이션 파일 생성 완료
3. Events 모듈/DTO/시드 데이터 파일 존재
4. 온보딩 프론트 멀티스텝 UI 및 DTO 구조 존재

## ⚠️ 진행 필요
1. **온보딩 서비스 실제 DB 트랜잭션 저장 검증**
   - 컨트롤러/DTO는 존재하나, 실제 저장 로직의 일관성/에러 처리 확인 필요
2. **민감정보 암호화 계층 구현/적용**
   - 스키마는 “암호화 문자열 저장” 전제이나, 서비스 계층 적용 여부 점검 필요
3. **프론트-백 API 실연동 완성**
   - 온보딩/포트폴리오/AI 리포트/이벤트 화면별 실데이터 연동 정리 필요
4. **보안·감사 로그 조회 API 및 대시보드 반영**
   - 저장 모델은 있으나, 조회/필터/화면 연결은 별도 구현 필요

---

## 4. 다음 작업 우선순위 (업데이트)

### P0 — 기능 완성 필수

#### [P0-1] 온보딩 저장 로직 고도화
- 대상: `backend/src/onboarding/onboarding.service.ts`
- 목표:
  - `User` + `InvestmentProfile` + `PortfolioAsset[]`를 **단일 트랜잭션**으로 저장
  - 실패 시 롤백 보장
  - 중복 사용자(이메일/전화) 처리 전략 명시

#### [P0-2] 암호화 유틸리티 + 서비스 레이어 적용
- 대상(예시): `backend/src/common/encryption/*`
- 목표:
  - 저장 전 암호화 / 조회 시 복호화 정책 확정
  - 키 관리(`ENCRYPTION_KEY`, `IV` 혹은 nonce 전략) 환경변수 정리
  - 로그/예외에서 민감정보 마스킹

#### [P0-3] 프론트 온보딩 API 연동 완료
- 대상: `frontend/app/onboarding/page.tsx`
- 목표:
  - 제출 시 `POST /onboarding` 실호출
  - 성공/실패/재시도 UX 정리
  - localStorage 임시 데이터와 서버 원본 데이터의 source-of-truth 정리

### P1 — 사용자 체감 기능

#### [P1-1] 포트폴리오 페이지 실데이터화
- 대상: `frontend/app/(dashboard)/portfolio/page.tsx` + 백엔드 조회 API
- 목표:
  - mock 통계/차트를 사용자별 실제 데이터로 치환

#### [P1-2] AI 리포트 입력 데이터 파이프라인 연결
- 대상: `frontend/app/(dashboard)/ai-report/page.tsx`, backend AI endpoint
- 목표:
  - 스냅샷 + 시장지표 + 이벤트 요약을 결합한 입력 컨텍스트 구성

#### [P1-3] 경제 이벤트 조회 API/페이지 마무리
- 대상: `backend/src/events/*`, `frontend/app/(dashboard)/events/page.tsx`
- 목표:
  - 목록/필터/중요도 뷰 + fallback 제거

### P2 — 운영 안정화

#### [P2-1] 감사/보안 대시보드 기초
- 대상: security 페이지 + logs 조회 API

#### [P2-2] 테스트/검증 자동화 강화
- Prisma/Nest 서비스 단위 테스트 + 주요 e2e 시나리오 추가

---

## 5. 개발자가 바로 확인할 체크리스트

1. **DB 스키마 동기화**
```bash
cd backend
pnpm prisma generate
pnpm prisma migrate dev
```

2. **백엔드 실행/기본 점검**
```bash
pnpm install
pnpm run start:dev
```

3. **프론트 실행/온보딩 흐름 점검**
```bash
cd ../frontend
pnpm install
pnpm run dev
```

4. **온보딩 API 호출 후 DB 반영 확인**
- 사용자 1건 생성 시 `User`, `InvestmentProfile`, `PortfolioAsset`가 함께 생성되는지 확인
- 실패 케이스(중복 이메일 등)에서 부분 저장이 남지 않는지 확인

---

## 6. 인수인계 메모

- 이전 문서의 “Prisma 모델 없음” 내용은 더 이상 유효하지 않습니다. 현재는 **MVP 핵심 스키마가 이미 구축된 상태**입니다.
- 다음 담당자는 “모델 정의”보다 “서비스 계층 완성(트랜잭션/암호화/연동)”에 집중하는 것이 효율적입니다.
- `docs/implementation_plan.md`의 경제 이벤트 변환 계획은 여전히 유효하며, 본 문서는 그 상위 실행 상태를 반영하도록 갱신되었습니다.
