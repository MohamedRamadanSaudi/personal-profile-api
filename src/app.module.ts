import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminModule } from './admin/admin.module';
import { VolunteeringModule } from './volunteering/volunteering.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    AdminModule, AuthModule, VolunteeringModule, CertificatesModule, ReviewsModule, ExperiencesModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
