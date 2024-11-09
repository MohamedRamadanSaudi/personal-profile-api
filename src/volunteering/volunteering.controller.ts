import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolunteeringService } from './volunteering.service';
import { CreateVolunteeringDto } from './dto/create-volunteering.dto';
import { UpdateVolunteeringDto } from './dto/update-volunteering.dto';

@Controller('volunteering')
export class VolunteeringController {
  constructor(private readonly volunteeringService: VolunteeringService) {}

  @Post()
  create(@Body() createVolunteeringDto: CreateVolunteeringDto) {
    return this.volunteeringService.create(createVolunteeringDto);
  }

  @Get()
  findAll() {
    return this.volunteeringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteeringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolunteeringDto: UpdateVolunteeringDto) {
    return this.volunteeringService.update(+id, updateVolunteeringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteeringService.remove(+id);
  }
}
