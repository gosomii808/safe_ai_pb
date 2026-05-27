import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class PersonalInfoDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  ageRange?: string;

  @IsString()
  @IsOptional()
  occupation?: string;
}

export class InvestmentProfileDto {
  @IsString()
  @IsNotEmpty()
  riskType: string;

  @IsString()
  @IsNotEmpty()
  investmentGoal: string;

  @IsString()
  @IsOptional()
  investmentExperience?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredAssets?: string[];
}

export class PortfolioAssetDto {
  @IsString()
  @IsNotEmpty()
  market: string;

  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsString()
  @IsOptional()
  stockName?: string;

  @IsString()
  @IsOptional()
  sector?: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  avgBuyPrice?: number;

  @IsNumber()
  @IsOptional()
  investmentAmount?: number;

  @IsNumber()
  @IsOptional()
  targetRatio?: number;
}

export class CreateOnboardingDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;

  @ValidateNested()
  @Type(() => InvestmentProfileDto)
  investmentProfile: InvestmentProfileDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioAssetDto)
  portfolioAssets: PortfolioAssetDto[];
}
