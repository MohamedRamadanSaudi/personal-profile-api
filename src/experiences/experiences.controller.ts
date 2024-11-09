import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('company_logo'))
  create(
    @UploadedFile() company_logo: Express.Multer.File,
    @Body() createExperienceDto: CreateExperienceDto
  ) {
    const parsedDto = {
      ...createExperienceDto,
      start_date: new Date(createExperienceDto.start_date),
      end_date: createExperienceDto.end_date ? new Date(createExperienceDto.end_date) : null
    };
    return this.experiencesService.create(parsedDto, company_logo);
  }

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('company_logo'))
  update(
    @Param('id') id: string,
    @UploadedFile() company_logo: Express.Multer.File,
    @Body() updateExperienceDto: UpdateExperienceDto
  ) {
    const parsedDto = {
      ...updateExperienceDto,
      start_date: updateExperienceDto.start_date ? new Date(updateExperienceDto.start_date) : undefined,
      end_date: updateExperienceDto.end_date ? new Date(updateExperienceDto.end_date) : undefined
    };
    return this.experiencesService.update(id, parsedDto, company_logo);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}
