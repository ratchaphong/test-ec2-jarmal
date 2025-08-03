// src/profile/dto/profile-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileResponseDto implements Profile {
  @ApiProperty({ example: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'A short bio' })
  @Expose()
  bio: string | null;

  @ApiProperty({ example: 'uuid ของ user ที่เกี่ยวข้อง' })
  @Expose()
  userId: string;
}
