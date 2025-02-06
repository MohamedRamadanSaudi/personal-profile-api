import { Module } from '@nestjs/common';
import { VolunteeringService } from './volunteering.service';
import { VolunteeringController } from './volunteering.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/common/services/file.service';

@Module({
  controllers: [VolunteeringController],
  providers: [VolunteeringService, PrismaService, JwtService, FileService],
})
export class VolunteeringModule { }
