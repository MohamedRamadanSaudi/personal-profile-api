import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/common/services/file.service';
import * as path from 'path';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) { }

  async create(createCertificateDto: CreateCertificateDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.fileService.saveFile(photo);
    }
    if (!createCertificateDto.link) {
      createCertificateDto.link = null;
    }
    return this.prisma.certificates.create({
      data: {
        photo: photoUrl,
        ...createCertificateDto,
      },
    });
  }

  findAll() {
    return this.prisma.certificates.findMany()
  }

  findOne(id: string) {
    return this.prisma.certificates.findUnique({
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    // delete the image from cloudinary
    const certificate = await this.prisma.certificates.findFirst({
      where: {
        id
      }
      , select: {
        photo: true
      }
    })
    if (certificate?.photo) {
      const urlParts = certificate.photo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
    }

    return this.prisma.certificates.delete({
      where: {
        id
      }
    })
  }
}
