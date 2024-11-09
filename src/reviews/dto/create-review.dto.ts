import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  name: string;

  @IsString()
  name_ar: string;

  @IsString()
  position: string;

  @IsString()
  position_ar: string;

  @IsString()
  review: string;

  @IsString()
  review_ar: string;

  @IsOptional()
  @IsString()
  facebook_link?: string;

  @IsOptional()
  @IsString()
  linkedin_link?: string;

  @IsOptional()
  @IsString()
  website_link?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
