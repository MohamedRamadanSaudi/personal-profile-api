import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createCertificateDto: CreateCertificateDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
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

  remove(id: string) {
    return this.prisma.certificates.delete({
      where: {
        id
      }
    })
  }
}