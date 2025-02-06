import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FileService } from 'src/common/services/file.service';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, PrismaService, JwtService, FileService],
})
export class CertificatesModule { }
