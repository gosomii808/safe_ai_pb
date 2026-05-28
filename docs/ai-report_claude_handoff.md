# AI Report Page Handoff for Claude

이 문서는 `frontend/app/(dashboard)/ai-report/page.tsx`를 이어서 개발할 팀원/Claude에게 전달하기 위한 작업 지시서입니다. 현재 UI는 거의 만들어져 있지만 실제 분석 기능, DB 조회, AI 분석 결과 저장/조회는 구축 중입니다. 목표는 기존 화면 디자인을 유지하면서 더미 데이터를 실제 백엔드 값으로 교체할 수 있는 구조를 만드는 것입니다.

## 1. 프로젝트 현황 요약

- Repository root: `C:\Users\gyj05\safe-ai-pb`
- Frontend: `frontend`
  - Next.js 16.2.6, React 19, TypeScript strict mode
  - App Router 사용
  - Tailwind CSS v4 기반 전역 스타일
  - shadcn/radix 계열 UI 컴포넌트 일부 존재
  - 아이콘은 `lucide-react`
  - 차트는 `recharts`
- Backend: `backend`
  - NestJS 11
  - Prisma 7
  - SQLite 개발 DB: `backend/dev.db`
  - API 기본 포트: `3001`
- Frontend API base URL:
  - `frontend/.env.example`
  - `NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"`
  - 기존 패턴은 `process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:3001"` 사용

## 2. 실행 방법

백엔드:

```bash
cd backend
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm run start:dev
```

프론트엔드:

```bash
cd frontend
pnpm install
pnpm run dev
```

백엔드는 `http://localhost:3001`, 프론트는 Next dev server 기본 포트를 사용합니다.

## 3. 관련 파일

AI 리포트 페이지:

- `frontend/app/(dashboard)/ai-report/page.tsx`

대시보드 레이아웃:

- `frontend/app/(dashboard)/layout.tsx`
- `frontend/components/layout/sidebar.tsx`
- `frontend/components/layout/mobile-nav.tsx`
- `frontend/components/layout/header.tsx`
- `frontend/components/ai-chatbot.tsx`

기존 API 연결 예시:

- `frontend/lib/api.ts`
  - 온보딩 `POST /onboarding` 호출 패턴
- `frontend/app/(dashboard)/events/page.tsx`
  - `NEXT_PUBLIC_API_BASE_URL` 사용
  - `Promise.all`로 여러 API 조회
  - 실패 시 임시 fallback 데이터 사용

백엔드 관련 파일:

- `backend/src/main.ts`
  - CORS enabled
  - global `ValidationPipe`
  - 기본 포트 `3001`
- `backend/src/app.module.ts`
  - 현재 `PrismaModule`, `SecurityModule`, `OnboardingModule`, `EventsModule` import
- `backend/prisma/schema.prisma`
  - 사용자, 포트폴리오, 분석 스냅샷, 시장 데이터, 이벤트, 보안/감사 로그 모델 정의
- `backend/src/security/encryption.service.ts`
  - 민감 정보 AES-256-GCM 암호화/복호화
- `backend/src/security/anonymizer.service.ts`
  - AI 입력용 포트폴리오 익명화 helper

## 4. 현재 `ai-report/page.tsx` 상태

현재 파일은 `"use client"` 컴포넌트입니다. 실제 API 호출 없이 파일 내부 상수로 화면을 그리고 있습니다.

더미 데이터:

- `reportCards`
  - 리스크, 거시경제 영향, 변동성, 분산도 분석 카드
  - 현재 요약/상세/추천문구가 모두 고정값
- `productRecommendations`
  - 채권 ETF, 배당 ETF, 인덱스 ETF, 성장주 카테고리 등 추천 상품 유형
  - 현재 모두 고정값
- Summary Card
  - 종합 점수 `78점`
  - 위험관리 `A`, 수익성 `A-`, 분산도 `B+`, 유동성 `B`
  - 설명 문구도 고정값

주의:

- 현재 일부 한글 텍스트가 인코딩 깨짐 상태로 보입니다. 기능 개발 시 해당 페이지 내 사용자 노출 문구는 정상 한글 UTF-8로 다시 작성하는 것이 좋습니다.
- 대시보드 다른 페이지에도 더미/깨진 텍스트가 남아 있지만, 이번 작업 범위는 `ai-report/page.tsx`와 필요한 API 연결에 집중하면 됩니다.

## 5. 현재 백엔드에 이미 있는 데이터 모델

AI 리포트에 활용 가능한 주요 Prisma 모델:

```prisma
model User {
  id                String
  nickname          String
  email             String // encrypted
  phone             String // encrypted
  investmentProfile InvestmentProfile?
  portfolioAssets   PortfolioAsset[]
  analysisSnapshots PortfolioAnalysisSnapshot[]
  aiRequestLogs     AiRequestLog[]
}

model InvestmentProfile {
  userId               String
  riskType             String // encrypted
  investmentGoal       String // encrypted
  investmentExperience String?
  preferredAssets      String?
}

model PortfolioAsset {
  userId           String
  market           String
  ticker           String
  stockName        String?
  sector           String?
  quantity         String // encrypted
  avgBuyPrice      String? // encrypted
  investmentAmount String? // encrypted
  targetRatio      Float?
}

model PortfolioAnalysisSnapshot {
  userId          String
  snapshotDate    DateTime
  totalValue      Float
  dailyPnL        Float?
  riskScore       Float?
  diversification Float?
  summary         String?
}

model MarketPrice {
  market    String
  ticker    String
  price     Float
  currency  String
  priceDate DateTime
}

model ValuationIndicator {
  market        String
  ticker        String
  per           Float?
  pbr           Float?
  eps           Float?
  bps           Float?
  indicatorDate DateTime
}

model ForeignOwnership {
  market         String
  ticker         String
  ownershipRatio Float
  netBuyAmount   Float?
  ownershipDate  DateTime
}

model EconomicEvent {
  eventDate      DateTime
  title          String
  category       EventCategory
  country        String
  importance     ImportanceLevel
  affectedAssets String
  impactRules    EventImpactRule[]
  marketReaction EventMarketReaction?
}

model SectorEventSensitivity {
  sector      String
  eventColumn String
  avgAbsPct   Float?
  eventCount  Int
  score       Int
}
```

민감 값은 암호화되어 저장됩니다. 리포트 분석에서 수량/매입가/투자금액이 필요하면 `EncryptionService.decrypt()`로 복호화한 뒤 숫자로 변환해야 합니다. 단, AI 모델에 넘기는 입력은 `AnonymizerService.anonymizePortfolioForAi()`를 우선 사용해서 원금/수량을 band로 낮추는 방향이 현재 보안 설계와 맞습니다.

## 6. 현재 존재하는 API

온보딩:

- `POST /onboarding`
- 사용자가 입력한 개인정보, 투자성향, 포트폴리오 자산을 DB에 저장합니다.
- 성공 응답:

```ts
{
  userId: string
  message: string
  portfolioAssetCount: number
}
```

이벤트:

- `GET /events`
- `GET /events/impact-summary`
- `GET /events/macro-series?limit=90`
- `GET /events/sectors/sensitivity`
- `GET /events/:id/reaction`
- `GET /events/:id`

아직 없는 API:

- AI 리포트 전용 API는 아직 없습니다.
- `ai-report/page.tsx`가 호출할 수 있는 `GET /ai-report/:userId` 또는 `GET /ai-report/latest?userId=...` 같은 엔드포인트를 새로 만들 필요가 있습니다.

## 7. 권장 백엔드 구현 범위

가능하면 새 Nest 모듈을 추가하세요.

권장 파일:

- `backend/src/ai-report/ai-report.module.ts`
- `backend/src/ai-report/ai-report.controller.ts`
- `backend/src/ai-report/ai-report.service.ts`
- 필요 시 `backend/src/ai-report/dto/get-ai-report-query.dto.ts`

`backend/src/app.module.ts`에 `AiReportModule`을 import해야 합니다.

권장 API:

```ts
GET /ai-report/latest?userId={userId}
```

개발 편의상 MVP에서는 `userId` query를 받는 방식이 가장 단순합니다. 로그인/세션이 아직 완성되지 않았기 때문입니다. 추후 인증이 붙으면 `userId` query를 제거하고 인증 컨텍스트에서 가져오면 됩니다.

권장 응답 타입:

```ts
export type AiReportStatus = "ready" | "insufficient_data" | "generating" | "error"

export type AiReportGrade = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D"

export type AiReportCardStatus = "positive" | "warning" | "neutral" | "danger"

export type AiReportResponse = {
  status: AiReportStatus
  generatedAt: string | null
  summary: {
    totalScore: number | null
    headline: string
    description: string
    grades: {
      riskManagement: AiReportGrade | null
      profitability: AiReportGrade | null
      diversification: AiReportGrade | null
      liquidity: AiReportGrade | null
    }
  }
  cards: Array<{
    id: "risk" | "macro" | "volatility" | "diversification" | string
    title: string
    status: AiReportCardStatus
    summary: string
    details: string[]
    recommendation: string
  }>
  productRecommendations: Array<{
    category: string
    description: string
    examples: string[]
    risk: "low" | "medium" | "high"
    suitability: string
  }>
  dataQuality: {
    hasPortfolio: boolean
    hasMarketPrices: boolean
    hasAnalysisSnapshot: boolean
    missing: string[]
  }
  disclaimer: string
}
```

권장 계산 로직:

- `User` + `InvestmentProfile` + `PortfolioAsset[]` 조회
- `PortfolioAsset`의 암호화된 `quantity`, `avgBuyPrice`, `investmentAmount` 복호화
- 보유 종목별 평가액 계산:
  - 최신 `MarketPrice`가 있으면 `quantity * latest price`
  - 시장가가 없고 `investmentAmount`가 있으면 임시로 투자금액 사용
  - 둘 다 없으면 해당 종목은 dataQuality missing에 추가
- 섹터 비중 계산:
  - `sector`별 평가액 합산
  - 단일 섹터 비중이 30% 이상이면 concentration warning
- 종목 집중도 계산:
  - 단일 종목 비중이 25% 이상이면 warning
- 분산도:
  - 종목 수, 섹터 수, 최대 종목 비중, 최대 섹터 비중 기반
- 변동성:
  - MVP에서는 `PortfolioAnalysisSnapshot.riskScore`, `diversification`, `dailyPnL`를 우선 사용
  - 스냅샷이 없으면 카드 상태를 `insufficient_data`에 가깝게 표현
- 거시경제 영향:
  - `GET /events/impact-summary`와 유사한 로직을 서비스에서 재사용하거나 `EconomicEvent`, `EventImpactRule`, `SectorEventSensitivity`를 직접 조회
  - 사용자의 보유 섹터와 `SectorEventSensitivity.sector`를 매칭
- 상품 추천:
  - 투자성향, 섹터/종목 집중도, 변동성, 현금성 자산 부족 여부 기반으로 카테고리 추천
  - 특정 상품 매수/매도 권유처럼 보이지 않게 카테고리 중심 문구 사용

AI 모델 연동이 아직 준비되지 않은 경우:

- 백엔드 서비스에서 규칙 기반 리포트를 먼저 반환하세요.
- `AiRequestLog`에는 실제 AI 호출이 있을 때만 기록하거나, requestType을 `AI_REPORT_RULE_BASED`로 남겨도 됩니다.
- 나중에 OpenAI/Claude API가 연결되면 규칙 기반 결과를 prompt context로 쓰고 자연어 문장만 개선하는 구조가 좋습니다.

## 8. 권장 프론트 구현 범위

작업 대상:

- `frontend/app/(dashboard)/ai-report/page.tsx`

권장 방향:

- 현재 UI 레이아웃은 유지합니다.
- `reportCards`, `productRecommendations`, 종합 점수/등급 고정값을 제거합니다.
- API 응답 타입을 페이지 내부 또는 `frontend/lib/ai-report-types.ts`에 정의합니다.
- API 호출 helper는 `frontend/lib/api.ts`에 추가하는 것을 권장합니다.
- 기존 `events/page.tsx`처럼 loading/error/empty 상태를 명확하게 처리합니다.

권장 프론트 helper:

```ts
export async function getLatestAiReport(userId: string): Promise<AiReportResponse> {
  const response = await fetch(`${API_BASE_URL}/ai-report/latest?userId=${encodeURIComponent(userId)}`)

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}
```

임시 userId 처리:

- 로그인/세션이 아직 없으므로 아래 중 하나를 선택해야 합니다.
- 추천: 온보딩 성공 후 반환되는 `userId`를 localStorage에 저장하고 페이지에서 읽습니다.
- 이미 저장된 값이 없다면 `ai-report/page.tsx`에서 “온보딩 후 리포트를 확인할 수 있습니다” 상태를 보여주세요.
- 하드코딩 userId는 최후의 임시 수단으로만 사용하고 코드에 TODO를 남기세요.

상태별 UX:

- loading:
  - “AI 리포트를 불러오는 중입니다.”
- no userId:
  - “사용자 정보가 없어 리포트를 생성할 수 없습니다. 온보딩을 먼저 완료해 주세요.”
- insufficient_data:
  - 카드 UI는 유지하되 데이터 부족 안내를 보여줍니다.
  - 없는 값을 `0`, `A`, `좋음`으로 꾸며내지 마세요.
- error:
  - API 실패 메시지 표시
  - 현재 더미값으로 조용히 대체하지 않는 것을 권장합니다. 실제 값 전환 작업이 목적이기 때문입니다.

아이콘 매핑:

백엔드는 icon component를 내려줄 수 없으므로 프론트에서 `card.id` 기준으로 매핑하세요.

```ts
const cardIcons = {
  risk: Shield,
  macro: BarChart3,
  volatility: TrendingUp,
  diversification: PieChart,
} satisfies Record<string, LucideIcon>
```

색상 매핑도 프론트에서 status 기준으로 처리하세요.

```ts
const cardTone = {
  positive: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  neutral: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
}
```

## 9. 반드시 제거/대체해야 하는 더미 값

`frontend/app/(dashboard)/ai-report/page.tsx`에서 다음을 실제 API 응답으로 대체하세요.

- `const reportCards = [...]`
- `const productRecommendations = [...]`
- Summary Card의 `78점`
- Summary Card의 `A`, `A-`, `B+`, `B`
- “AI 분석 완료” 상태 badge
- 고정 disclaimer 문구

단, disclaimer 자체는 반드시 유지하세요. 문구는 API 응답의 `disclaimer` 또는 프론트 상수로 정상 한글로 표시하면 됩니다.

권장 disclaimer:

```txt
본 리포트는 투자 참고용 정보이며, 특정 금융상품의 매수 또는 매도를 권유하지 않습니다. 투자 결정과 책임은 투자자 본인에게 있습니다.
```

## 10. 백엔드 구현 시 주의사항

- `EncryptionService.decrypt()`는 잘못된 암호문이면 예외를 던집니다. 개별 자산 복호화 실패가 전체 API 500으로 터지지 않도록 dataQuality에 넣거나 명확히 처리하세요.
- `quantity`, `avgBuyPrice`, `investmentAmount`는 문자열로 복호화됩니다. 숫자 변환 helper를 두세요.
- `PortfolioAsset.quantity`는 DB에서 encrypted string입니다. Prisma 모델 타입만 보고 number처럼 쓰면 안 됩니다.
- `MarketPrice`는 날짜별 unique입니다. 종목별 최신가를 가져올 때는 ticker별 최신 row를 골라야 합니다.
- `affectedAssets`는 `EconomicEvent`에서 comma-separated string으로 저장되고, 기존 `EventsService`는 split해서 배열로 내려줍니다.
- 현재 인증이 없으므로 다른 사용자의 `userId`를 query로 볼 수 있는 구조입니다. MVP용이라고 명시하고, 추후 auth 도입 시 수정해야 합니다.
- AI에 원본 개인정보, 이메일, 전화번호, 정확한 수량/매입가를 그대로 보내지 마세요. `AnonymizerService`를 활용하세요.

## 11. 권장 작업 순서

1. `backend/src/ai-report` 모듈 생성
2. `GET /ai-report/latest?userId=...` 구현
3. 규칙 기반 리포트 응답 타입 확정
4. `backend/src/app.module.ts`에 모듈 연결
5. 프론트 `frontend/lib/api.ts`에 `getLatestAiReport` 추가
6. `frontend/app/(dashboard)/ai-report/page.tsx`에서 더미 상수 제거
7. loading/error/no-data/ready 상태 구현
8. 기존 카드 UI에 API 응답 연결
9. `pnpm run lint` 또는 `pnpm run build`로 타입 오류 확인

## 12. Claude에게 줄 핵심 지시

아래 범위를 우선 구현하세요.

- `ai-report/page.tsx`의 현재 디자인은 유지하되, 더미 데이터를 API 응답 기반으로 바꿔 주세요.
- 백엔드에 AI 리포트 전용 Nest 모듈과 `GET /ai-report/latest?userId=...` API를 추가해 주세요.
- 실제 LLM 호출은 아직 필수가 아닙니다. 우선 DB 기반 규칙 분석으로 리포트 형태를 만들고, AI 호출이 붙기 쉬운 응답 타입으로 구성해 주세요.
- 민감 정보는 복호화가 필요할 때만 서버 내부에서 사용하고, AI 입력이나 응답에는 원본 개인정보/정확한 금액/정확한 수량을 노출하지 마세요.
- 프론트는 더미 fallback으로 조용히 성공처럼 보이게 만들지 말고, 데이터 부족/오류 상태를 명확히 보여 주세요.
- 한글 깨진 문구는 이 페이지 작업 범위 안에서는 정상 UTF-8 한글로 교체해 주세요.

## 13. 완료 기준

- `/ai-report` 페이지가 더 이상 파일 내부 더미 배열만으로 렌더링되지 않습니다.
- `NEXT_PUBLIC_API_BASE_URL` 기반으로 백엔드 API를 호출합니다.
- 사용자 `userId`가 있을 때 DB 기반 리포트를 보여줍니다.
- 사용자 `userId`가 없거나 데이터가 부족할 때 적절한 안내 상태가 보입니다.
- 민감 데이터가 프론트 응답에 원문으로 노출되지 않습니다.
- TypeScript strict mode에서 타입 오류가 없습니다.
- 기존 대시보드 레이아웃, 사이드바, 모바일 nav 라우팅은 깨지지 않습니다.
