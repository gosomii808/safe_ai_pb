import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsOptional } from 'class-validator';

export class GetEventsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  @IsIn(['INTEREST_RATE', 'INFLATION', 'EMPLOYMENT', 'GDP', 'POLICY', 'EARNINGS', 'OTHER'])
  category?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  importance?: string;
}
