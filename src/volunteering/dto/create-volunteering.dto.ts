import { IsString, IsOptional } from 'class-validator';

export class CreateVolunteeringDto {
  @IsOptional()
  photo?: any;

  @IsString()
  position: string;

  @IsString()
  position_ar: string;

  @IsString()
  community_name: string;

  @IsString()
  community_name_ar: string;
}
