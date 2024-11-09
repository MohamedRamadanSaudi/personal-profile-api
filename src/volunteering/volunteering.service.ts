import { Injectable } from '@nestjs/common';
import { CreateVolunteeringDto } from './dto/create-volunteering.dto';
import { UpdateVolunteeringDto } from './dto/update-volunteering.dto';

@Injectable()
export class VolunteeringService {
  create(createVolunteeringDto: CreateVolunteeringDto) {
    return 'This action adds a new volunteering';
  }

  findAll() {
    return `This action returns all volunteering`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volunteering`;
  }

  update(id: number, updateVolunteeringDto: UpdateVolunteeringDto) {
    return `This action updates a #${id} volunteering`;
  }

  remove(id: number) {
    return `This action removes a #${id} volunteering`;
  }
}
