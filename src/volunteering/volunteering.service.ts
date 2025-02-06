import { Injectable } from '@nestjs/common';
import { CreateVolunteeringDto } from './dto/create-volunteering.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/common/services/file.service';
import * as path from 'path';
@Injectable()
export class VolunteeringService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) { }

  async create(createVolunteeringDto: CreateVolunteeringDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.fileService.saveFile(photo);
    }
    return this.prisma.volunteering.create({
      data: {
        photo: photoUrl,
        ...createVolunteeringDto,
      },
    });
  }

  findAll() {
    return this.prisma.volunteering.findMany()
  }

  findOne(id: string) {
    return this.prisma.volunteering.findUnique({
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    // delete the image from cloudinary
    const volunteering = await this.prisma.volunteering.findFirst({
      where: {
        id
      }
      , select: {
        photo: true
      }
    })
    if (volunteering?.photo) {
      const urlParts = volunteering.photo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
    }
    return this.prisma.volunteering.delete({
      where: {
        id
      }
    })
  }
}
