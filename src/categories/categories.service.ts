import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categories.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.categories.findMany({
      include: {
        ProjectsCategories: {
          include: {
            project: {
              select: {
                id: true,
                title: true,
                photo: true,
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
      include: {
        ProjectsCategories: {
          include: {
            project: {
              select: {
                id: true,
                title: true,
                photo: true,
                description: true,
                description_ar: true,
                link_behance: true,
                link_live: true,
              }
            }
          }
        }
      }
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.categories.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`, error);

    }
  }

  async remove(id: string) {
    try {
      // First delete related ProjectsCategories
      await this.prisma.projectsCategories.deleteMany({
        where: { categoryId: id }
      });

      // Then delete the category
      return await this.prisma.categories.delete({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`, error);
    }
  }

  // Additional utility methods
  async getProjectsInCategory(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
      include: {
        ProjectsCategories: {
          include: {
            project: true
          }
        }
      }
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category.ProjectsCategories.map(pc => pc.project);
  }
}
