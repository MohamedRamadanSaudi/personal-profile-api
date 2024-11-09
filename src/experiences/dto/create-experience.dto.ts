import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  company_name: string;

  @IsOptional()
  @IsString()
  company_logo?: string;

  @IsString()
  position: string;

  @IsString()
  position_ar: string;

  @IsString()
  job_type: string;

  @IsString()
  job_type_ar: string;

  @IsDateString()
  start_date: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}

