// src/user/dto/user-response.dto.ts
import { Post, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { PostResponseDto } from 'src/post/dto/post-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProfileResponseDto } from './profile-response.dto';

@Exclude()
export class UserResponseDto implements User {
  @ApiProperty({ description: 'รหัสผู้ใช้', example: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'ชื่อผู้ใช้', example: 'John Doe' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'อีเมลผู้ใช้', example: 'john@example.com' })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'วันที่สร้าง',
    example: '2025-08-01T10:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  //   Optional relation
  @ApiProperty({ type: () => ProfileResponseDto, required: false })
  @Expose()
  @Type(() => ProfileResponseDto)
  profile?: ProfileResponseDto;

  @ApiProperty({ type: () => [PostResponseDto], required: false })
  @Expose()
  @Type(() => PostResponseDto)
  posts: Post[];
}
