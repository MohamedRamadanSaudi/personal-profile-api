import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VolunteeringService } from './volunteering.service';
import { CreateVolunteeringDto } from './dto/create-volunteering.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('volunteering')
export class VolunteeringController {
  constructor(private readonly volunteeringService: VolunteeringService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createVolunteeringDto: CreateVolunteeringDto
  ) {
    return this.volunteeringService.create(createVolunteeringDto, photo);
  }

  @Get()
  findAll() {
    return this.volunteeringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteeringService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteeringService.remove(id);
  }
}
