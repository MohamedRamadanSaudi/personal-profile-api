import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { FileService } from 'src/common/services/file.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, PrismaService, JwtService, FileService],
})
export class ExperiencesModule { }
