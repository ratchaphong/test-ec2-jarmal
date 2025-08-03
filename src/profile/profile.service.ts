import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create new profile
   * SQL:
   * INSERT INTO "Profile" ("id", "bio", "userId") VALUES (gen_random_uuid(), $bio, $userId);
   */
  // create(dto: CreateProfileDto) {
  //   return this.prisma.profile.create({ data: dto });
  // }
  async create(dto: CreateProfileDto, tx?: Prisma.TransactionClient) {
    const prismaClient = tx || this.prisma;
    return prismaClient.profile.create({ data: dto });
  }

  /**
   * Get all profiles with user
   * SQL:
   * SELECT * FROM "Profile" p
   * JOIN "User" u ON p."userId" = u."id";
   */
  findAll() {
    return this.prisma.profile.findMany({ include: { user: true } });
  }

  /**
   * Get profile by id with user
   * SQL:
   * SELECT p.*, u.*
   * FROM "Profile" p
   * LEFT JOIN "User" u ON p."userId" = u."id"
   * WHERE p."id" = $id;
   */
  findOne(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  /**
   * Update profile
   * SQL:
   * UPDATE "Profile" SET "bio" = $bio WHERE "id" = $id;
   */
  async update(id: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.profile.update({ where: { id }, data: dto });
  }

  /**
   * Delete profile
   * SQL:
   * DELETE FROM "Profile" WHERE "id" = $id;
   */
  async remove(id: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.profile.delete({ where: { id } });
  }
}
