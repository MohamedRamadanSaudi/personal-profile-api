import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateVolunteeringDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  position: string;

  @IsString()
  position_ar: string;

  @IsString()
  community_name: string;

  @IsString()
  community_name_ar: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
