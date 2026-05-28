// backend/src/ai-report/dto/get-ai-report-query.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class GetAiReportQueryDto {
  // MVP: 로그인/세션이 없어 userId를 query로 받습니다.
  // TODO(auth): 인증 도입 후 query 제거하고 인증 컨텍스트에서 userId 추출.
  @IsString()
  userId!: string;

  // "true"면 Claude API로 자연어 문장만 다듬습니다 (선택).
  @IsOptional()
  @IsString()
  refine?: string;
}
