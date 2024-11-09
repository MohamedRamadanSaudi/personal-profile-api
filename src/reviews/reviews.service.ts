import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createReviewDto: CreateReviewDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
    }
    return this.prisma.reviews.create({
      data: {
        photo: photoUrl,
        ...createReviewDto,
      },
    });
  }

  findAll() {
    return this.prisma.reviews.findMany()
  }

  findOne(id: string) {
    return this.prisma.reviews.findUnique({
      where: {
        id
      }
    })
  }

  remove(id: string) {
    return this.prisma.reviews.delete({
      where: {
        id
      }
    })
  }
}
