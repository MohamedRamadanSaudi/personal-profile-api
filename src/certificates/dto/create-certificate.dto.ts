import { IsString, IsOptional } from 'class-validator';

export class CreateCertificateDto {
  @IsOptional()
  photo?: any;

  @IsString()
  title: string;

  @IsString()
  title_ar: string;

  // make the defualt value of link to be null
  @IsString()
  link: string = null;
}
