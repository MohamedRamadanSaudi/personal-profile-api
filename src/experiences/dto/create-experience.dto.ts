import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  company_name: string;

  @IsOptional()
  company_logo?: any;

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
}

