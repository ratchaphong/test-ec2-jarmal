import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create new category
   * SQL:
   * INSERT INTO "Category" ("id", "name") VALUES (gen_random_uuid(), $name);
   */
  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  /**
   * Get all categories with posts
   * SQL:
   * SELECT * FROM "Category"
   * LEFT JOIN "_PostCategories" ON "Category"."id" = "_PostCategories"."B";
   */
  findAll() {
    return this.prisma.category.findMany({ include: { posts: true } });
  }

  /**
   * Get category by id with posts
   * SQL:
   * SELECT c.*, p.*
   * FROM "Category" c
   * LEFT JOIN "_PostCategories" pc ON c."id" = pc."B"
   * LEFT JOIN "Post" p ON pc."A" = p."id"
   * WHERE c."id" = $id;
   */
  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  /**
   * Update category
   * SQL:
   * UPDATE "Category" SET "name" = $name WHERE "id" = $id;
   */
  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  /**
   * Delete category
   * SQL:
   * DELETE FROM "Category" WHERE "id" = $id;
   */
  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.delete({ where: { id } });
  }
}
