# Development Log

## 2026-05-28 - SafePB AI security utilities

### Summary
- Added a backend security module for encryption, masking, and AI-input anonymization utilities.
- Implemented AES-256-GCM encryption/decryption using Node.js `crypto`.
- Added masking helpers for email, phone, amount, and quantity display values.
- Added portfolio anonymization for AI prompts so raw `quantity`, `avgBuyPrice`, and `investmentAmount` are not passed through.
- Added `ENCRYPTION_KEY` guidance to `backend/.env.example` without modifying the real `.env` file.

### Files Changed
- `backend/src/security/security.module.ts`
- `backend/src/security/encryption.service.ts`
- `backend/src/security/masking.service.ts`
- `backend/src/security/anonymizer.service.ts`
- `backend/src/security/security.service.spec.ts`
- `backend/src/app.module.ts`
- `backend/.env.example`

### Security Notes
- Sensitive encryption fields are `email`, `phone`, `riskType`, `investmentGoal`, `quantity`, `avgBuyPrice`, and `investmentAmount`.
- Encryption keys are read from `process.env.ENCRYPTION_KEY`; no key material is hard-coded.
- AI portfolio input uses derived bands instead of raw quantity, average buy price, or investment amount.
- Access logs and AI request logs should continue to store only metadata, hashes, masked values, or anonymized payload references.

### Verification
- Passed: `npm test -- security.service.spec.ts --runInBand`
- Build note: `npm run build` still fails due to pre-existing Prisma generated client and events module typing issues outside this security utility change.

### Next Steps
- Wire `EncryptionService` into onboarding persistence when DB writes are implemented.
- Ensure future AI report generation calls `AnonymizerService.anonymizePortfolioForAi()` before building prompts.
- Use `MaskingService` for any UI/API response that needs to display sensitive user values.

## 2026-05-28 - POST /onboarding DB persistence

### Summary
- Completed `POST /onboarding` backend persistence in `OnboardingService`.
- Saves `User`, `InvestmentProfile`, multiple `PortfolioAsset` rows, and an `AccessLog` entry in one Prisma transaction.
- Encrypts `email`, `phone`, `riskType`, `investmentGoal`, `quantity`, `avgBuyPrice`, and `investmentAmount` before storage.
- Returns `userId`, a success message, and `portfolioAssetCount`.
- Imported `SecurityModule` into `OnboardingModule` so `EncryptionService` is available through Nest DI.

### Files Changed
- `backend/src/onboarding/onboarding.service.ts`
- `backend/src/onboarding/onboarding.module.ts`
- `backend/src/onboarding/onboarding.service.spec.ts`
- `backend/src/prisma/prisma.service.ts`
- `backend/src/events/events.controller.ts`
- `backend/src/events/events.service.ts`

### Build Fix Notes
- Updated `PrismaService` to import the generated Prisma client entrypoint directly.
- Removed stale `eventImpactSummary` / `impactSummaries` references so the backend matches the current Prisma schema.

### Verification
- Passed: `npm test -- onboarding.service.spec.ts security.service.spec.ts --runInBand`
- Passed: `npm run build`

### API Test Method
- Set `ENCRYPTION_KEY` in the real local `.env` using a generated 32-byte base64 key.
- Start the backend with `npm run start:dev`.
- Send `POST /onboarding` with `personalInfo`, `investmentProfile`, and `portfolioAssets`.
- Confirm the response includes `userId`, `message`, and `portfolioAssetCount`.
- Confirm DB rows are created and sensitive fields are stored as encrypted `v1:*` payloads, not raw values.

## 2026-05-28 - Frontend onboarding API connection

### Summary
- Added `frontend/lib/api.ts` with `submitOnboarding()`.
- Uses `NEXT_PUBLIC_API_BASE_URL`, defaulting to `http://localhost:3001` for local development.
- Replaced the onboarding page mock submit/localStorage payload save with a real `POST /onboarding` call.
- Stores only the returned `userId` in localStorage as `safe_pb_user_id`.
- Routes successful submissions to `/portfolio`.
- Shows a user-friendly error message on submission failure.
- Removed full onboarding payload console logging.

### Files Changed
- `frontend/lib/api.ts`
- `frontend/app/onboarding/page.tsx`
- `frontend/components/onboarding/ReviewSubmitStep.tsx`
- `frontend/.env.example`
- `backend/src/main.ts`

### Security Notes
- The frontend no longer stores the full onboarding payload in localStorage.
- Review UI masks email and phone, and continues hiding raw quantity, price, and investment amount.
- Backend CORS is enabled so the Next.js frontend can call the Nest API during local development.

### Verification
- Passed: `npm run build` in `frontend`
- Passed: `npm run build` in `backend`
