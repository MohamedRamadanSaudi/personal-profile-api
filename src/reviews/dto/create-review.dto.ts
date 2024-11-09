import { IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  photo?: any;

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
}
