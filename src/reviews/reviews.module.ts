import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, JwtService, CloudinaryService],
})
export class ReviewsModule { }
