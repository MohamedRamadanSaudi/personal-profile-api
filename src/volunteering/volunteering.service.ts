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
      this.cloudinaryService.deleteImage(volunteering?.photo
      )
    }
    return this.prisma.volunteering.delete({
      where: {
        id
      }
    })
  }
}
