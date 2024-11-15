import { IsArray, IsOptional, IsString } from "class-validator";


export class CreateProjectDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  description_ar: string;

  @IsOptional()
  @IsString()
  link_behance?: string;

  @IsOptional()
  @IsString()
  link_live?: string;

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];
}
