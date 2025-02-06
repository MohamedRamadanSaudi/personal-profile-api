import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/common/services/file.service';
import * as path from 'path';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) { }

  async create(createReviewDto: CreateReviewDto, photo?: Express.Multer.File) {
    let photoUrl = null;
    if (photo) {
      photoUrl = await this.fileService.saveFile(photo);
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

  async remove(id: string) {
    // delete the image from cloudinary
    const review = await this.prisma.reviews.findFirst({
      where: {
        id
      }
      , select: {
        photo: true
      }
    })
    if (review?.photo) {
      const urlParts = review.photo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
    }
    return this.prisma.reviews.delete({
      where: {
        id
      }
    })
  }
}
