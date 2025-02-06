import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FileService } from 'src/common/services/file.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, JwtService, FileService],
})
export class ReviewsModule { }
