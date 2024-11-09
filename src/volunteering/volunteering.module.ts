import { Module } from '@nestjs/common';
import { VolunteeringService } from './volunteering.service';
import { VolunteeringController } from './volunteering.controller';

@Module({
  controllers: [VolunteeringController],
  providers: [VolunteeringService],
})
export class VolunteeringModule {}
