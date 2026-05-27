# SafePB AI — 개발 인수인계 문서 (Implementation Plan for Next Developer)

> 작성일: 2026-05-27  
> 프로젝트: SafePB AI (금융보안 기반 AI 개인투자비서)  
> 기술 스택: **Next.js 15 (frontend)** + **NestJS + Prisma + SQLite (backend)**  
> 브랜치: `temp`

---

## 1. 프로젝트 개요

| 구분 | 내용 |
|------|------|
| 서비스명 | SafePB AI |
| 목적 | 개인 투자자가 자신의 포트폴리오를 입력하고, AI 기반 분석 리포트를 받는 투자 비서 서비스 |
| 주요 사용자 | 금융 도메인 지식이 적은 개인 투자자 |
| 보안 요구사항 | 이메일, 전화번호, 투자 금액, 보유 수량 등 민감 정보는 AES-256 암호화 처리 예정 |

---

## 2. 디렉토리 구조

```
safe-ai-pb/
├── frontend/                   # Next.js 15 앱 (포트 3000)
│   ├── app/
│   │   ├── page.tsx            # 랜딩 페이지 (v0 생성, 정적)
│   │   ├── login/page.tsx      # 로그인 페이지 (v0 생성, 정적)
│   │   ├── onboarding/page.tsx # ✅ 온보딩 위자드 (구현 완료, API 연동 미완)
│   │   └── (dashboard)/
│   │       ├── layout.tsx
│   │       ├── portfolio/      # ⚠️ Mock 데이터만 표시 (백엔드 미연동)
│   │       ├── ai-report/      # ⚠️ Mock 데이터만 표시 (백엔드 미연동)
│   │       ├── security/       # ⚠️ 구현 미완
│   │       ├── events/         # ⚠️ 구현 미완
│   │       └── settings/       # ⚠️ 구현 미완
│   ├── components/
│   │   ├── onboarding/         # ✅ 온보딩 스텝 컴포넌트 5개 (구현 완료)
│   │   ├── dashboard/          # ⚠️ Mock 위젯 (정적 데이터)
│   │   ├── portfolio/          # ⚠️ Mock 차트 (정적 데이터)
│   │   ├── ai/                 # ⚠️ AI 챗봇 UI (백엔드 미연동)
│   │   └── ui/                 # shadcn/ui 기반 공통 컴포넌트
│   ├── lib/
│   │   └── onboarding-types.ts # ✅ 온보딩 페이로드 타입 정의
│   └── .env.local              # ✅ NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
│
├── backend/                    # NestJS 앱 (포트 3001)
│   ├── src/
│   │   ├── main.ts             # ✅ CORS + ValidationPipe 설정 완료
│   │   ├── app.module.ts       # ✅ OnboardingModule 등록 완료
│   │   └── onboarding/
│   │       ├── onboarding.module.ts     # ✅ 모듈 바인딩 완료
│   │       ├── onboarding.controller.ts # ✅ POST /onboarding 라우트 완료
│   │       ├── onboarding.service.ts    # ⚠️ 플레이스홀더만 (DB 저장 미구현)
│   │       └── dto/
│   │           └── create-onboarding.dto.ts # ✅ class-validator DTO 완료
│   └── prisma/
│       └── schema.prisma       # ⚠️ SQLite 설정만 있고 모델 정의 없음
│
└── data/                       # 수집된 금융 CSV 데이터 (활용 미정)
```

---

## 3. 현재 구현 상태 (완료 vs 미완)

### ✅ 완료된 기능

#### [온보딩 프론트엔드]
- 4단계 멀티스텝 위자드 (`app/onboarding/page.tsx`)
  - **Step 1**: 개인정보 입력 (닉네임, 이메일, 전화번호, 연령대, 직업)
  - **Step 2**: 투자 성향 입력 (위험 유형, 투자 목표, 경험, 선호 자산)
  - **Step 3**: 포트폴리오 입력 (시장/종목/섹터/수량/단가 등)
  - **Step 4**: 입력 내용 확인 및 최종 제출 (민감 정보 마스킹 표시)
- 각 스텝별 컴포넌트 분리 (`components/onboarding/` 5개 파일)
- 페이로드 타입 정의 (`lib/onboarding-types.ts`)

#### [온보딩 백엔드]
- `POST /onboarding` 엔드포인트 생성
- `class-validator` 기반 DTO 검증 (3중 계층: Personal / InvestmentProfile / PortfolioAsset)
- CORS 설정 (`origin: http://localhost:3000`)
- 전역 `ValidationPipe` 설정 (`transform: true, whitelist: true`)

---

### ⚠️ 미구현 / 플레이스홀더 상태인 기능

| 영역 | 현재 상태 | 해야 할 일 |
|------|-----------|------------|
| 온보딩 API 연동 | 프론트에서 `localStorage`에만 저장, 실제 API 호출 없음 | `fetch(POST /onboarding)` 코드를 주석 해제 후 연동 |
| 온보딩 DB 저장 | `onboarding.service.ts`가 DTO를 그대로 반환만 함 | Prisma 모델 정의 및 `prismaService.create()` 구현 |
| Prisma 스키마 | `schema.prisma`에 모델 정의 없음 | `User`, `InvestmentProfile`, `PortfolioAsset` 모델 추가 |
| 인증 (Auth) | 로그인 페이지는 있으나 JWT/세션 인증 없음 | NestJS `@nestjs/jwt` + Guard 구현 필요 |
| 포트폴리오 대시보드 | 하드코딩된 mock 데이터로만 표시 | 백엔드 API와 연동하여 실제 데이터 표시 |
| AI 리포트 | 정적 카드로만 표시 | 실제 AI 분석 엔진 또는 LLM API 연동 필요 |
| 보안 민감정보 암호화 | 구현 없음 (설계만 있음) | AES-256 암호화 유틸리티 구현 후 서비스에 적용 |
| security / events / settings 페이지 | 미구현 상태 | UI + API 모두 개발 필요 |
| AI 챗봇 | UI만 있음 (`ai-chatbot.tsx`) | LLM API 연결 필요 |

---

## 4. 다음 개발 우선순위 (권장 순서)

### 🔴 최우선 (기본 기능 완성)

#### [TASK-1] Prisma 스키마 정의
파일: `backend/prisma/schema.prisma`

추가해야 할 모델:
```prisma
model User {
  id               Int      @id @default(autoincrement())
  nickname         String
  email            String   @unique  // AES 암호화 후 저장 예정
  phone            String            // AES 암호화 후 저장 예정
  ageRange         String?
  occupation       String?
  createdAt        DateTime @default(now())
  investmentProfile InvestmentProfile?
  portfolioAssets  PortfolioAsset[]
}

model InvestmentProfile {
  id                   Int      @id @default(autoincrement())
  userId               Int      @unique
  user                 User     @relation(fields: [userId], references: [id])
  riskType             String   // 암호화 예정
  investmentGoal       String   // 암호화 예정
  investmentExperience String?
  preferredAssets      String   // JSON string으로 저장
}

model PortfolioAsset {
  id               Int      @id @default(autoincrement())
  userId           Int
  user             User     @relation(fields: [userId], references: [id])
  market           String
  ticker           String
  stockName        String?
  sector           String?
  quantity         Float    // 암호화 예정
  avgBuyPrice      Float?   // 암호화 예정
  investmentAmount Float?   // 암호화 예정
  targetRatio      Float?
}
```

마이그레이션 명령어:
```bash
cd backend
npx prisma migrate dev --name init
```

---

#### [TASK-2] OnboardingService에 DB 저장 구현
파일: `backend/src/onboarding/onboarding.service.ts`

```typescript
// PrismaService를 주입받아 실제 저장 구현
// TODO: 민감 정보(email, phone, riskType, investmentGoal, quantity, avgBuyPrice, investmentAmount)
//       를 저장 전에 AES-256으로 암호화 처리
async processOnboarding(dto: CreateOnboardingDto) {
  const user = await this.prisma.user.create({ data: { ...dto.personalInfo } });
  await this.prisma.investmentProfile.create({ data: { userId: user.id, ...dto.investmentProfile } });
  await Promise.all(dto.portfolioAssets.map(asset =>
    this.prisma.portfolioAsset.create({ data: { userId: user.id, ...asset } })
  ));
  return { message: '온보딩이 완료되었습니다.', userId: user.id };
}
```

---

#### [TASK-3] 프론트엔드 온보딩 실제 API 연동
파일: `frontend/app/onboarding/page.tsx` — `submitOnboarding` 함수

현재 주석 처리된 fetch 코드를 해제하고 아래와 같이 수정:
```typescript
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL; // http://localhost:3001
const response = await fetch(`${apiBase}/onboarding`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
if (response.ok) {
  router.push('/portfolio');
} else {
  // 에러 처리 UI 구현
}
```

---

### 🟠 중요 (서비스 핵심 기능)

#### [TASK-4] 민감 정보 암호화 유틸리티
- 위치: `backend/src/common/encryption/encryption.service.ts`
- Node.js `crypto` 모듈의 `aes-256-cbc` 사용
- 대칭키는 `.env`의 `ENCRYPTION_KEY` (32바이트) + `IV`(16바이트)로 관리
- 암호화 대상 필드: `email`, `phone`, `riskType`, `investmentGoal`, `quantity`, `avgBuyPrice`, `investmentAmount`

#### [TASK-5] 인증 시스템 (JWT)
- `POST /auth/login` — 이메일+패스워드로 JWT 발급
- `POST /auth/register` — 회원 가입
- NestJS `JwtAuthGuard`로 보호된 라우트 처리
- 프론트: `localStorage` 또는 `httpOnly cookie`에 토큰 저장

#### [TASK-6] 포트폴리오 대시보드 API 연동
현재 파일: `frontend/app/(dashboard)/portfolio/page.tsx`
- 하드코딩된 `stats` 배열을 `GET /portfolio/:userId` API 호출로 대체
- `AllocationPieChart`, `HoldingsTable` 등의 차트도 실제 데이터 기반으로 전환

---

### 🟡 이후 단계 (고도화)

#### [TASK-7] AI 리포트 실제 연동
현재 파일: `frontend/app/(dashboard)/ai-report/page.tsx`
- 하드코딩된 `reportCards` 배열을 AI 분석 결과로 교체
- 옵션 A: `backend/data/` 폴더의 금융 CSV 데이터를 백엔드에서 파싱하여 분석 점수 계산
- 옵션 B: OpenAI API (또는 Gemini API) 에 포트폴리오 요약 전송 후 분석 결과 반환

#### [TASK-8] 나머지 대시보드 페이지 구현
- `security/page.tsx` — 보안 이벤트 로그, 2FA 설정 등
- `events/page.tsx` — 시장 이슈/뉴스 피드
- `settings/page.tsx` — 사용자 설정, 알림 설정 등

#### [TASK-9] AI 챗봇 백엔드 연동
현재 파일: `frontend/components/ai-chatbot.tsx`
- `POST /ai/chat` 엔드포인트 구현
- 사용자 포트폴리오 컨텍스트를 프롬프트에 주입하여 응답

---

## 5. 로컬 개발 환경 설정 방법

### 프론트엔드 실행
```bash
cd frontend
npm install   # 또는 pnpm install
npm run dev   # http://localhost:3000
```

### 백엔드 실행
```bash
cd backend
pnpm install
pnpm run start:dev   # http://localhost:3001
```

### 환경변수 확인
| 파일 | 변수명 | 설명 |
|------|--------|------|
| `frontend/.env.local` | `NEXT_PUBLIC_API_BASE_URL` | 백엔드 API 주소 (`http://localhost:3001`) |
| `backend/.env` | `DATABASE_URL` | SQLite DB 경로 (현재 미설정, 추가 필요) |
| `backend/.env` | `ENCRYPTION_KEY` | AES-256 키 (32바이트, 추후 추가) |

### Prisma 초기화 (스키마 추가 후 반드시 실행)
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

## 6. 알려진 이슈 및 주의사항

> [!WARNING]
> `onboarding.service.ts`는 현재 DTO를 그대로 반환하는 플레이스홀더입니다. DB 저장 로직을 구현하기 전에 **반드시 Prisma 스키마 마이그레이션을 먼저 완료**해야 합니다.

> [!WARNING]
> `frontend/app/onboarding/page.tsx`의 `submitOnboarding` 함수는 현재 `localStorage`에 저장하고 `/portfolio`로 이동하도록 되어 있습니다. 실제 API 연동 코드는 해당 함수 내 주석 처리된 fetch 블록에 있으며, 백엔드 구현 완료 후 주석 해제하면 됩니다.

> [!IMPORTANT]
> `prisma/schema.prisma`에는 현재 모델이 전혀 정의되어 있지 않습니다. `datasource db { provider = "sqlite" }` 이후 `url` 필드와 모델 정의를 추가해야 합니다.

> [!NOTE]
> 포트폴리오 대시보드, AI 리포트 페이지의 모든 수치/차트 데이터는 **하드코딩된 mock 데이터**입니다. 백엔드 없이도 UI는 정상적으로 표시됩니다.

---

## 7. 파일별 구현 상태 요약

| 파일 | 상태 | 비고 |
|------|------|------|
| `frontend/app/onboarding/page.tsx` | ✅ UI 완료, ⚠️ API 미연동 | fetch 코드 주석 해제 필요 |
| `frontend/components/onboarding/*.tsx` | ✅ 완료 | 5개 스텝 컴포넌트 |
| `frontend/lib/onboarding-types.ts` | ✅ 완료 | 타입 정의 |
| `frontend/.env.local` | ✅ 완료 | API URL 설정됨 |
| `frontend/app/(dashboard)/portfolio/page.tsx` | ⚠️ Mock | 실제 데이터 연동 필요 |
| `frontend/app/(dashboard)/ai-report/page.tsx` | ⚠️ Mock | AI 분석 연동 필요 |
| `frontend/app/(dashboard)/security/page.tsx` | ❌ 미구현 | — |
| `frontend/app/(dashboard)/events/page.tsx` | ❌ 미구현 | — |
| `frontend/app/(dashboard)/settings/page.tsx` | ❌ 미구현 | — |
| `backend/src/main.ts` | ✅ 완료 | CORS, ValidationPipe |
| `backend/src/app.module.ts` | ✅ 완료 | OnboardingModule 등록 |
| `backend/src/onboarding/onboarding.module.ts` | ✅ 완료 | — |
| `backend/src/onboarding/onboarding.controller.ts` | ✅ 완료 | POST /onboarding |
| `backend/src/onboarding/onboarding.service.ts` | ⚠️ Placeholder | DB 저장 구현 필요 |
| `backend/src/onboarding/dto/create-onboarding.dto.ts` | ✅ 완료 | 3중 계층 DTO |
| `backend/prisma/schema.prisma` | ❌ 모델 없음 | User/InvestmentProfile/PortfolioAsset 추가 필요 |
| `backend/src/auth/` | ❌ 없음 | JWT 인증 모듈 전체 구현 필요 |
| `backend/src/common/encryption/` | ❌ 없음 | AES-256 암호화 유틸리티 구현 필요 |
