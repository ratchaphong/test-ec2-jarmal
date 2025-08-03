import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'How to use NestJS with Prisma' })
  title: string;

  @ApiProperty({ example: 'Here is the full guide...' })
  content?: string;

  @ApiProperty({ example: '1d2c3b4a-5e6f-7g8h-9i0j-k1l2m3n4o5p6' })
  authorId: string;

  @ApiProperty({
    example: [
      'c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6',
      'z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4',
    ],
  })
  categoryIds?: string[];
}
