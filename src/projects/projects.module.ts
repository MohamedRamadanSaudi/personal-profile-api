import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { FileService } from 'src/common/services/file.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, JwtService, FileService],
})
export class ProjectsModule { }
