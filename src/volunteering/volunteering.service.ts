import { Injectable } from '@nestjs/common';
import { CreateVolunteeringDto } from './dto/create-volunteering.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class VolunteeringService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createVolunteeringDto: CreateVolunteeringDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
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

  remove(id: string) {
    return this.prisma.volunteering.delete({
      where: {
        id
      }
    })
  }
}
