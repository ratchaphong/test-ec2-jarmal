import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly profilePrisma: ProfileService,
  ) {}

  /**
   * Find user by email or throw error if not found
   * SQL:
   * SELECT * FROM "User" WHERE "email" = $email LIMIT 1;
   */
  async existsByEmail(email: string) {
    const user = this.prisma.user.findFirst({ where: { email } });
    return !!user;
  }

  /**
   * Create new user
   * SQL:
   * INSERT INTO "User" ("id", "name", "email", "createdAt")
   * VALUES (gen_random_uuid(), 'John Doe', 'john@example.com', now());
   */
  // create(dto: CreateUserDto) {
  //   return this.prisma.user.create({ data: dto });
  // }
  async create(dto: CreateUserDto) {
    const exists = await this.existsByEmail(dto.email);
    if (exists) throw new ConflictException('Email is already in use');
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        profile: {
          create: {
            bio: 'Welcome to my profile!',
          },
        },
      },
    });
  }

  // async createUserWithProfile(dto: CreateUserDto) {
  //   return this.prisma.$transaction(async (tx) => {
  //     const user = await tx.user.create({
  //       data: {
  //         name: dto.name,
  //         email: dto.email,
  //       },
  //     });
  //     const profile = await tx.profile.create({
  //       data: {
  //         bio: 'Welcome to my profile!',
  //         userId: user.id,
  //       },
  //     });
  //     return { ...user, profile };
  //   });
  // }
  // async createUserWithProfile(dto: CreateUserDto) {
  //   return this.prisma.$transaction(async (tx) => {
  //     const user = await tx.user.create({
  //       data: {
  //         name: dto.name,
  //         email: dto.email,
  //       },
  //     });
  //     const profile = await this.profilePrisma.create(
  //       {
  //         bio: 'Welcome to my profile!',
  //         userId: user.id,
  //       },
  //       tx,
  //     );
  //     return { ...user, profile };
  //   });
  // }

  /**
   * Get all users with profile and posts
   * SQL:
   * SELECT * FROM "User"
   * LEFT JOIN "Profile" ON "User"."id" = "Profile"."userId"
   * LEFT JOIN "Post" ON "User"."id" = "Post"."authorId";
   */
  findAll() {
    return this.prisma.user.findMany({
      include: { profile: true, posts: true },
    });
  }

  /**
   * Get user by ID with profile and posts
   * SQL:
   * SELECT * FROM "User"
   * LEFT JOIN "Profile" ON "User"."id" = "Profile"."userId"
   * LEFT JOIN "Post" ON "User"."id" = "Post"."authorId"
   * WHERE "User"."id" = $id;
   */
  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, posts: true },
    });
  }

  /**
   * Update user
   * SQL:
   * UPDATE "User"
   * SET "name" = $name, "email" = $email
   * WHERE "id" = $id;
   */
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Delete user
   * SQL:
   * DELETE FROM "User"
   * WHERE "id" = $id;
   */
  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({ where: { id } });
  }

  /**
   * 1. Get all users who have written at least one post
   * SQL:
   * SELECT * FROM "User"
   * WHERE id IN (SELECT "authorId" FROM "Post");
   */

  /**
   * 2. Get all published posts along with their author's name
   * SQL:
   * SELECT p.*, u.name FROM "Post" p
   * JOIN "User" u ON p."authorId" = u.id
   * WHERE p.published = true;
   */

  /**
   * 3. Get all comments for the post titled 'Hello World'
   * SQL:
   * SELECT c.* FROM "Comment" c
   * JOIN "Post" p ON c."postId" = p.id
   * WHERE p.title = 'Hello World';
   */

  /**
   * 4. Get all users with the number of posts they've written
   * SQL:
   * SELECT u.id, u.name, COUNT(p.id) AS post_count
   * FROM "User" u
   * LEFT JOIN "Post" p ON u.id = p."authorId"
   * GROUP BY u.id, u.name;
   */

  /**
   * 5. Get all posts that have no categories
   * SQL:
   * SELECT p.* FROM "Post" p
   * LEFT JOIN "_PostCategories" pc ON p.id = pc."A"
   * WHERE pc."B" IS NULL;
   */

  /**
   * 6. Get categories that have more than 5 posts
   * SQL:
   * SELECT c.name, COUNT(pc."A") as post_count
   * FROM "Category" c
   * JOIN "_PostCategories" pc ON c.id = pc."B"
   * GROUP BY c.name
   * HAVING COUNT(pc."A") > 5;
   */

  /**
   * 7. Get all comments that are replies (i.e., have a parentId)
   * SQL:
   * SELECT * FROM "Comment"
   * WHERE "parentId" IS NOT NULL;
   */

  /**
   * 8. Get top 3 posts with the highest number of comments
   * SQL:
   * SELECT p.*, COUNT(c.id) as comment_count
   * FROM "Post" p
   * LEFT JOIN "Comment" c ON p.id = c."postId"
   * GROUP BY p.id
   * ORDER BY comment_count DESC
   * LIMIT 3;
   */

  /**
   * 9. Update users' names to 'Anonymous' if they have never written a post
   * SQL:
   * UPDATE "User"
   * SET name = 'Anonymous'
   * WHERE id NOT IN (SELECT DISTINCT "authorId" FROM "Post");
   */

  /**
   * 10. Delete comments that have no postId (invalid data)
   * SQL:
   * DELETE FROM "Comment"
   * WHERE "postId" IS NULL;
   */
}
