import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileService } from 'src/common/services/file.service';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) { }

  async create(createProjectDto: CreateProjectDto, photo?: Express.Multer.File) {
    const { categoryIds, ...projectData } = createProjectDto;

    let photoUrl = null;
    if (photo) {
      photoUrl = await this.fileService.saveFile(photo);
    }

    return this.prisma.projects.create({
      data: {
        ...projectData,
        photo: photoUrl,
        ProjectsCategories: {
          create: categoryIds.map(categoryId => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      },
      include: {
        ProjectsCategories: {
          include: {
            category: true
          }
        }
      }
    });
  }


  async findAll() {
    return this.prisma.projects.findMany({
      include: {
        ProjectsCategories: {
          include: {
            category: true
          }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.projects.findUnique({
      where: { id },
      include: {
        ProjectsCategories: {
          include: {
            category: true
          }
        }
      }
    });
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    photo?: Express.Multer.File
  ) {
    const { categoryIds, ...projectData } = updateProjectDto;

    let photoUrl = null;
    if (photo) {
      // Get the current project to check if there's an existing photo
      const currentProject = await this.prisma.projects.findUnique({
        where: { id },
        select: { photo: true }
      });

      // If there's an existing photo, you might want to delete it from Cloudinary
      if (currentProject?.photo) {
        const urlParts = currentProject.photo.split('/'); // Split the URL
        const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
        const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

        await this.fileService.deleteFile(filePath); // Ensure correct path
      }

      // Upload new photo
      photoUrl = await this.fileService.saveFile(photo);
    }

    // First, delete existing category relationships
    await this.prisma.projectsCategories.deleteMany({
      where: { projectId: id }
    });

    // Then update the project and create new category relationships
    return this.prisma.projects.update({
      where: { id },
      data: {
        ...projectData,
        ...(photoUrl ? { photo: photoUrl } : {}),
        ProjectsCategories: {
          create: categoryIds.map(categoryId => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      },
      include: {
        ProjectsCategories: {
          include: {
            category: true
          }
        }
      }
    });
  }


  async remove(id: string) {
    // Get the project to get the photo URL
    const project = await this.prisma.projects.findUnique({
      where: { id },
      select: { photo: true }
    });

    // If there's a photo, delete it from Cloudinary
    if (project?.photo) {
      const urlParts = project.photo.split('/'); // Split the URL
      const fileName = urlParts[urlParts.length - 1]; // Get the file name with extension
      const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // Full path

      await this.fileService.deleteFile(filePath); // Ensure correct path
    }

    // Delete related ProjectsCategories
    await this.prisma.projectsCategories.deleteMany({
      where: { projectId: id }
    });

    // Then delete the project
    return this.prisma.projects.delete({
      where: { id }
    });
  }
}
