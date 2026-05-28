# AI Report 개발 결과 전달 (handoff)

SafePB AI 저장소에 `ai-report` 기능(백엔드 Nest 모듈 + 프론트 페이지 연동)을 추가했습니다.
구조: **[수치 계산 엔진(analyzer)] → [AI 번역 레이어(refiner, 선택)] → [UI]**.
`docs/ai-report_claude_handoff.md`의 응답 타입/계산 로직 권장안을 따랐고, 추가로
요청된 편향 방어(상관관계·최신성·거시 단정 금지·CRO 페르소나)를 반영했습니다.

전달물:
- `patch.diff` — 저장소 루트 기준 unified diff (새 파일 9개, `git apply patch.diff`로 적용. 검증 완료)
- `handoff.md` — 이 문서

---

## 1. 변경한 파일 목록

### 새로 만든 파일 (patch.diff에 포함, git apply로 적용됨)
1. `backend/src/ai-report/ai-report.types.ts` — 응답/도메인 타입
2. `backend/src/ai-report/ai-report.analyzer.ts` — 순수 규칙 계산 엔진(DB 무의존)
3. `backend/src/ai-report/ai-report.service.ts` — DB 조회·복호화·자산군 분류·상관/최신성 로드
4. `backend/src/ai-report/ai-report-refiner.service.ts` — (선택) Claude 문장 다듬기
5. `backend/src/ai-report/ai-report.controller.ts` — `GET /ai-report/latest`
6. `backend/src/ai-report/ai-report.module.ts` — Nest 모듈
7. `backend/src/ai-report/dto/get-ai-report-query.dto.ts` — query DTO
8. `frontend/lib/ai-report-types.ts` — 프론트용 응답 타입(백엔드와 동기화)
9. `frontend/app/(dashboard)/ai-report/page.tsx` — 더미 제거, API 연동 페이지(완전 교체)

### 수정해야 하는 기존 파일 (patch 미포함 → 아래 [수동 수정] 절 참조)
- `backend/src/app.module.ts` — `imports`에 `AiReportModule` 1줄 추가
- `frontend/lib/api.ts` — `getLatestAiReport` 함수 추가 (기존 `API_BASE_URL` 패턴 재사용)

### 삭제한 파일
- 없음. (단, `page.tsx`는 기존 더미 버전을 **완전 교체**합니다.)

---

## 2. 적용 순서

1. 저장소 루트에서 패치 적용:
   ```bash
   git apply patch.diff
   ```
   → 새 파일 9개가 생성됩니다. (`frontend/app/(dashboard)/ai-report/page.tsx` 포함 — 완전 교체)
2. [수동 수정] 절을 보고 `backend/src/app.module.ts` 1줄, `frontend/lib/api.ts` 함수 추가.
3. 백엔드 빌드/실행 → 프론트 빌드/실행 (5번, 6번 절 참조).

> `page.tsx`는 **일부 diff가 아니라 전체 교체**입니다. 기존 더미 배열/고정 점수는 제거됩니다.
> 나머지 8개는 신규 생성이라 충돌이 없습니다.

---

## 3. 코드 전달 방식

- `patch.diff`: 저장소 루트 기준 unified diff (new file 9개). `git apply patch.diff`로 검증 완료.
- 기존 파일 2곳 수정은 컨텍스트 의존이라 [수동 수정] 절에 정확한 삽입 코드로 분리.

### [수동 수정] (A) `backend/src/app.module.ts`
import 추가:
```ts
import { AiReportModule } from './ai-report/ai-report.module';
```
`@Module({ imports: [...] })` 배열에 추가:
```ts
// 기존: imports: [PrismaModule, SecurityModule, OnboardingModule, EventsModule],
imports: [PrismaModule, SecurityModule, OnboardingModule, EventsModule, AiReportModule],
```
> 전제: `PrismaModule`이 `PrismaService`를, `SecurityModule`이 `EncryptionService`를
> `exports` 해야 합니다(Onboarding/Events가 이미 쓰고 있으면 충족). 만약 export가
> 안 되어 있으면 두 모듈의 `exports`에 각 서비스를 추가하세요.

### [수동 수정] (B) `frontend/lib/api.ts`
파일 끝에 아래 추가. `API_BASE_URL`, `readErrorMessage`가 이미 있으면
**중복 정의는 빼고** `getLatestAiReport`만 추가하세요.
```ts
import type { AiReportResponse } from "./ai-report-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3001";

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.message === "string") return data.message;
    if (Array.isArray(data?.message)) return data.message.join(", ");
    return `요청 실패 (HTTP ${response.status})`;
  } catch {
    return `요청 실패 (HTTP ${response.status})`;
  }
}

/** 최신 AI 리포트 조회. refine=true면 백엔드가 Claude로 문장을 다듬음(키 필요). */
export async function getLatestAiReport(
  userId: string,
  refine = false,
): Promise<AiReportResponse> {
  const params = new URLSearchParams({ userId });
  if (refine) params.set("refine", "true");
  const response = await fetch(
    `${API_BASE_URL}/ai-report/latest?${params.toString()}`,
    { cache: "no-store" },
  );
  if (!response.ok) throw new Error(await readErrorMessage(response));
  return response.json() as Promise<AiReportResponse>;
}
```

---

## 4. API 계약

### 엔드포인트 (신규)
```
GET /ai-report/latest
```
- Query
  - `userId: string` (필수) — MVP: 로그인 전이라 query로 받음. TODO(auth): 인증 컨텍스트로 대체.
  - `refine?: "true" | "1"` (선택) — Claude 문장 다듬기 사용 여부.
- Response: `AiReportResponse` (200 고정. 데이터 부족/없음도 200 + `status`로 표현)

```ts
type AiReportStatus = "ready" | "insufficient_data" | "generating" | "error";
type AiReportGrade = "A+"|"A"|"A-"|"B+"|"B"|"B-"|"C+"|"C"|"C-"|"D";
type AiReportCardStatus = "positive" | "warning" | "neutral" | "danger";
type AiReportRisk = "low" | "medium" | "high";

interface AiReportResponse {
  status: AiReportStatus;
  generatedAt: string | null;
  summary: {
    totalScore: number | null;            // 종합 점수 (스크린샷 "78점")
    headline: string;                     // "포트폴리오 종합 점수: NN점"
    description: string;                  // 종합 진단 설명
    grades: {                             // 스크린샷 4분할 등급
      riskManagement: AiReportGrade | null;   // 위험관리
      profitability: AiReportGrade | null;    // 수익성
      diversification: AiReportGrade | null;  // 분산도
      liquidity: AiReportGrade | null;        // 유동성
    };
  };
  cards: Array<{                          // 분석 카드 (risk/macro/volatility/diversification)
    id: "risk" | "macro" | "volatility" | "diversification" | string;
    title: string;
    status: AiReportCardStatus;          // 색상·배지 매핑(프론트)
    summary: string;                     // 카드 헤드라인
    details: string[];                   // 화살표 bullet
    recommendation: string;              // 전구 추천 문구(없으면 "")
  }>;
  productRecommendations: Array<{         // 추천 투자상품 유형
    category: string; description: string;
    examples: string[]; risk: AiReportRisk; suitability: string;
  }>;
  dataQuality: {
    hasPortfolio: boolean; hasMarketPrices: boolean; hasAnalysisSnapshot: boolean;
    hasMacroData: boolean; hasCorrelationData: boolean; hasRecencyData: boolean;
    missing: string[];
  };
  disclaimer: string;
}
```

### 프론트 호출 함수
```ts
import { getLatestAiReport } from "@/lib/api";
const report = await getLatestAiReport(userId);          // 규칙 기반
const report = await getLatestAiReport(userId, true);    // + Claude 다듬기
```

### 환경변수
- 프론트: `NEXT_PUBLIC_API_BASE_URL` (기존과 동일, 추가 없음)
- 백엔드(선택, refine 쓸 때만):
  - `ANTHROPIC_API_KEY` — 없으면 다듬기 자동 비활성(규칙 기반 원문 반환)
  - `ANTHROPIC_MODEL` — 기본 `claude-sonnet-4-20250514`

---

## 5. 데이터/DB 변경

- **Prisma schema 변경: 없음.** 기존 모델(User, InvestmentProfile, PortfolioAsset,
  PortfolioAnalysisSnapshot, MarketPrice, ValuationIndicator, ForeignOwnership,
  SectorEventSensitivity)만 조회합니다.
- **migration: 불필요.**
- **기존 `backend/dev.db`에서 바로 동작?**
  - 사용자/포트폴리오가 들어 있으면 동작합니다.
  - 단, 아래 항목은 데이터가 있으면 더 풍부해지고, 없으면 그 카드만 "데이터 부족"으로
    정직하게 표시됩니다(점수를 꾸며내지 않음):
    - `MarketPrice` 없으면 → `investmentAmount` 또는 `수량×평균매입가`로 평가액 대체
    - `PortfolioAnalysisSnapshot` 없으면 → 변동성 카드가 neutral(데이터 부족)
    - 상관관계/최신성 소스 없으면 → 해당 분석은 단정하지 않음(아래 7번·TODO 참조)
- **seed/테스트 데이터**: 별도 필수 아님. 친구 PC에 정리된 데이터를 그대로 사용 가능.
  (상관관계/변동성 수치 소스 연결만 TODO에서 확인)

---

## 6. 로컬 실행/검증 결과

### 실행한 검증
- analyzer 순수 로직 **TypeScript strict 타입체크 통과**
  ```
  tsc --noEmit --strict (ai-report.analyzer.ts + ai-report.types.ts + frontend types)  → 에러 0
  ```
- analyzer **런타임 동작 테스트** (사용자가 준 correlation JSON 그대로 주입):
  - highCorrelationAlerts 2문장을 가공 없이 분산도 카드에 인용 ✅
  - macroSectorExposure Tech 75.2% → "표면적 분산 뒤 실질 쏠림" 경고 ✅
  - 최신성: 1M +28.4% / 1Y +3.1% / RSI 74 / 고점근접 → 추세반전 경고 ✅
  - 거시 카드: "실시간 미연동"으로 단정 안 함 ✅
  - 점수 D/D로 정직하게 하락(무조건 칭찬 안 함) ✅
- patch.diff **git apply 적용 검증 통과** (빈 트리 + 신규생성 기준)

### 검증하지 못한 것(친구 PC에서 필요)
- `pnpm run build` / `pnpm run start:dev` 전체 빌드는 이 환경에 NestJS/Prisma/Next
  의존성이 없어 실행하지 못했습니다. service/controller/module은 문서의 import 경로
  (`../prisma/prisma.service`, `../security/encryption.service`)와 기존 패턴을 따랐습니다.
  실제 경로/클래스명이 다르면 import만 맞추면 됩니다.

### 적용 후 권장 검증 명령
```bash
# backend
cd backend && pnpm install && pnpm prisma generate
pnpm run start:dev          # http://localhost:3001
curl "http://localhost:3001/ai-report/latest?userId=<실제ID>"
# frontend
cd frontend && pnpm install && pnpm run dev
# /ai-report 접속 (localStorage.userId 필요)
pnpm run lint || pnpm run build   # 타입 확인
```

---

## 7. 주의사항

### 더미로 남겨둔 값 / 단정하지 않는 부분
- **거시경제 카드**: 매일 새벽 실시간 갱신이 어렵다고 하여 `hasMacroData=false` 고정.
  "실시간 거시 데이터 미연동 구간" 문구로 표시하고 금리/환율을 단정하지 않습니다.
  (이전 하드코딩된 "금리 인하 국면 유리" 류 단정은 제거됨)
- **상관관계/최신성**: 소스가 없으면 그 분석을 생략하거나 단정하지 않음.
  `service.ts`의 `loadCorrelation()`(스냅샷 summary JSON 파싱 예시) /
  `loadRecency()`(MarketPrice 이력 기반 계산)는 **친구 PC의 실제 데이터 위치에 맞게 교체** 필요.

### userId 임시 처리
- 로그인/세션 전 단계라 `GET`은 `userId` query로 받습니다.
- 프론트는 `localStorage.getItem("userId")`로 읽습니다.
  → **온보딩 성공 응답의 `userId`를 `localStorage.setItem("userId", ...)`로 저장**해야 합니다.
- 없으면 페이지는 "온보딩을 먼저 완료해 주세요" 상태를 보여줍니다(더미로 안 채움).
- TODO(auth): 인증 도입 시 query 제거 → 인증 컨텍스트에서 userId.

### 민감정보 복호화/익명화
- `quantity / avgBuyPrice / investmentAmount`는 **서버 내부에서만** `EncryptionService.decrypt()`로 복호화.
- 개별 복호화 실패는 `dataQuality.missing`에 담고 API를 500으로 죽이지 않음.
- **프론트 응답에는 원본 수량/금액/이메일/전화 미노출.** 카드 텍스트는 비율(%)·등급·
  평가액 합계 기준으로만 구성.
- Claude refiner 프롬프트에는 이미 추상화된 리포트 문장만 투입(원본 개인정보 미전송).

---

## Claude 구현 요약 (짧게)

- 점수/등급/집중도/상관/최신성은 **백엔드 규칙 엔진**이 계산하고, LLM은 (선택적으로)
  문장만 다듬어 일관성·환각을 방지. 상품 추천은 특정 종목이 아닌 **카테고리**로만 제시(자문업법 방어).
- 스크린샷 3장의 모든 영역(종합진단·등급4종·위험·거시·변동성·분산도·추천상품·disclaimer)을
  `AiReportResponse` 필드에 1:1 매핑. `page.tsx`가 동일 레이아웃으로 렌더.
- 자산군은 **주식 / 채권**만 처리. 채권은 CD 91일물·국고채 3년물·10년물·채권ETF로 세분.

## 남은 TODO (친구 PC / Codex가 이어서)

1. `app.module.ts`에 `AiReportModule` import (필수, 위 [수동 수정] A).
2. `frontend/lib/api.ts`에 `getLatestAiReport` 추가 (위 [수동 수정] B).
3. **자산군 분류 정확도**: `PortfolioAsset`에 자산군/채권 구분 컬럼이 있으면
   `service.ts`의 `classifyAssetClass`/`classifyBondType` 텍스트 추정 대신 그 컬럼 사용.
4. **상관관계 소스 연결**: `loadCorrelation()`을 실제 correlation 데이터 위치에 맞게 교체
   (사용자 제공 형식 portfolioSummary.macroSectorExposure / highCorrelationAlerts /
   correlationMatrix 그대로 수용함). 상관계수 계산 엔진이 따로 없으면 그건 별도 구현 필요.
5. **변동성 수치**: 스크린샷의 베타/연간변동성/MDD를 그대로 띄우려면 그 값들이
   스냅샷/별도 테이블에 있어야 함. 있으면 `buildVolatilityCard`에 매핑(현재는 riskScore 기반).
6. **최신성 소스**: `loadRecency()`가 RSI/ATH를 MarketPrice로 계산. 별도 지표 테이블이
   있으면 그걸 우선 사용.
7. 컬럼명(`MarketPrice.price`, `ValuationIndicator.per`, `aiRequestLog.*` 등)이 스키마와
   다르면 조회부만 수정.
8. 임계값(섹터30%/종목25%/매크로60%/상관0.7)은 `ai-report.analyzer.ts` 상단 상수에서 조정.
