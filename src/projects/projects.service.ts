import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createProjectDto: CreateProjectDto, photo?: Express.Multer.File) {
    const { categoryIds, ...projectData } = createProjectDto;

    let photoUrl = null;
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
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
        await this.cloudinaryService.deleteImage(currentProject.photo);
      }

      // Upload new photo
      photoUrl = await this.cloudinaryService.uploadImage(photo);
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
      await this.cloudinaryService.deleteImage(project.photo);
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
