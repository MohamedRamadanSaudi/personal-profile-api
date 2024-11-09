import { PartialType } from '@nestjs/mapped-types';
import { CreateVolunteeringDto } from './create-volunteering.dto';

export class UpdateVolunteeringDto extends PartialType(CreateVolunteeringDto) {}
