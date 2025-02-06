import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/common/services/file.service';
import * as path from 'path';
@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) { }

  async create(createExperienceDto: CreateExperienceDto, company_logo?: Express.Multer.File) {
    let company_logoUrl = null;
    if (company_logo) {
      company_logoUrl = await this.fileService.saveFile(company_logo);
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
      company_logoUrl = await this.fileService.saveFile(company_logo);
    }
    const experience = await this.prisma.experiences.findFirst({
      where: {
        id
      }
      , select: {
        company_logo: true
      }
    })
    if (experience?.company_logo) {
      const urlParts = experience.company_logo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
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

  async remove(id: string) {
    // delete the image from cloudinary
    const experience = await this.prisma.experiences.findFirst({
      where: {
        id
      }
      , select: {
        company_logo: true
      }
    })
    if (experience?.company_logo) {
      const urlParts = experience.company_logo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
    }
    return this.prisma.experiences.delete({
      where: {
        id
      }
    })
  }
}
