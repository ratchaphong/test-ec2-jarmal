// src/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all posts that are not soft-deleted.
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE "deletedAt" IS NULL;
   */
  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { deletedAt: null },
    });
  }

  /**
   * Get a post by ID.
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE "id" = $1;
   */
  async findOne(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  /**
   * Creates a new post in the database.
   * Equivalent SQL:
   *
   * INSERT INTO "Post" (id, title, content, published, authorId, createdAt, updatedAt)
   * VALUES (gen_random_uuid(), ..., NOW(), NOW());
   */
  async create(data: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  /**
   * Soft deletes a post by setting `deletedAt` to current timestamp.
   * Equivalent SQL:
   *
   * UPDATE "Post"
   * SET "deletedAt" = NOW()
   * WHERE "id" = $1;
   */
  async softDelete(id: string): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Get all published posts.
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE "published" = true AND "deletedAt" IS NULL;
   */
  async findPublished(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        published: true,
        deletedAt: null,
      },
    });
  }

  /**
   * Get all posts by specific author.
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE "authorId" = $1 AND "deletedAt" IS NULL;
   */
  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        authorId,
        deletedAt: null,
      },
    });
  }

  /**
   * Find posts that match given text in title or content.
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE ("title" = $1 OR "content" = $1)
   *   AND "deletedAt" IS NULL;
   */
  async searchByText(text: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        deletedAt: null,
        OR: [{ title: { contains: text } }, { content: { contains: text } }],
      },
    });
  }

  /**
   * Get the latest post (not soft-deleted).
   * Equivalent SQL:
   *
   * SELECT * FROM "Post"
   * WHERE "deletedAt" IS NULL
   * ORDER BY "createdAt" DESC
   * LIMIT 1;
   */
  async findLatest(): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get all posts including categories.
   * Equivalent SQL:
   *
   * SELECT p.*, c.*
   * FROM "Post" p
   * LEFT JOIN "_PostCategories" pc ON pc."A" = p."id"
   * LEFT JOIN "Category" c ON c."id" = pc."B"
   * WHERE p."deletedAt" IS NULL;
   */
  async findAllWithCategories(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { deletedAt: null },
      include: { categories: true },
    });
  }

  /**
   * Get all posts with pagination (limit & offset).
   * Equivalent SQL:
   *
   * SELECT *
   * FROM "Post"
   * WHERE "deletedAt" IS NULL
   * ORDER BY "createdAt" DESC
   * LIMIT $1 OFFSET $2;
   */
  async findAllWithPaginated(page: number, limit: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  /**
   * Get posts ordered by number of comments (desc).
   * Equivalent SQL:
   *
   * SELECT p.*, COUNT(c."id") as "commentCount"
   * FROM "Post" p
   * LEFT JOIN "Comment" c ON c."postId" = p."id"
   * WHERE p."deletedAt" IS NULL
   * GROUP BY p."id"
   * ORDER BY "commentCount" DESC;
   */

  /**
   * Get all unpublished posts.
   * Equivalent SQL:
   *
   * SELECT *
   * FROM "Post"
   * WHERE "published" = false
   *   AND "deletedAt" IS NULL;
   */
  async findUnpublishedPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { published: false, deletedAt: null },
    });
  }

  /**
   * Toggle publish status of a post.
   * Equivalent SQL:
   *
   * UPDATE "Post"
   * SET "published" = NOT "published",
   *     "updatedAt" = NOW()
   * WHERE "id" = $1;
   */
  async togglePublish(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id, deletedAt: null },
    });

    if (!post) {
      throw new NotFoundException('Post not found or has been deleted.');
    }

    return this.prisma.post.update({
      where: { id },
      data: { published: !post.published, updatedAt: new Date() },
    });
  }

  /**
   * Get all soft-deleted posts.
   * Equivalent SQL:
   *
   * SELECT *
   * FROM "Post"
   * WHERE "deletedAt" IS NOT NULL;
   */
  async findSoftDeletedPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { deletedAt: 'desc' },
    });
  }
}
