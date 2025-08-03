// src/post/dto/post-response.dto.ts
import { Post as PrismaPost } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class PostResponseDto implements PrismaPost {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier for the post',
    example: 'b3e6fbd3-52ff-4a9c-bd84-d8b123456789',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Title of the post',
    example: 'How to use NestJS with Prisma',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'Main content of the post',
    example: 'Here is the full guide on how to integrate Prisma with NestJS...',
    nullable: true,
  })
  content: string | null;

  @Expose()
  @ApiProperty({
    description: 'Publish status of the post',
    example: false,
  })
  published: boolean;

  @Expose()
  @ApiProperty({
    description: 'ID of the user who authored the post',
    example: '1d2c3b4a-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  authorId: string;

  @Expose()
  @ApiProperty({
    description: 'Date when the post was created',
    example: '2025-07-31T09:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Date when the post was last updated',
    example: '2025-07-31T10:00:00.000Z',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Date when the post was soft-deleted (if applicable)',
    example: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
