import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createExperienceDto: CreateExperienceDto, company_logo?: Express.Multer.File) {
    let company_logoUrl = null;
    if (company_logo) {
      company_logoUrl = await this.cloudinaryService.uploadImage(company_logo);
    }
    const result = await this.prisma.experiences.create({
      data: {
        ...createExperienceDto,
        company_logo: company_logoUrl,
      },
    });
    return result;
  }

  findAll() {
    return this.prisma.experiences.findMany()
  }

  findOne(id: string) {
    return this.prisma.experiences.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto, company_logo?: Express.Multer.File) {
    let company_logoUrl = null;
    if (company_logo) {
      company_logoUrl = await this.cloudinaryService.uploadImage(company_logo);
    }
    const result = await this.prisma.experiences.update({
      where: { id },
      data: {
        ...(company_logoUrl ? { company_logo: company_logoUrl } : {}),
        ...updateExperienceDto,
      },
    });
    return result;
  }

  remove(id: string) {
    return this.prisma.experiences.delete({
      where: {
        id
      }
    })
  }
}
