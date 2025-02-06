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
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from the uploads folder
    }),
    AdminModule, AuthModule, VolunteeringModule, CertificatesModule, ReviewsModule, ExperiencesModule, ProjectsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
