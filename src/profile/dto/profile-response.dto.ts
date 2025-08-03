import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileResponseDto implements Profile {
  @ApiProperty({
    example: 'a3f0e12c-2f30-42b0-97e7-1c2b4e6e73ab',
    description: 'Unique ID of the profile',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'A web developer who loves TypeScript',
    description: 'Short biography of the user',
    required: false,
  })
  @Expose()
  bio: string | null;

  @ApiProperty({
    example: 'b1e2d3c4-1234-4321-98a7-ef1234567890',
    description: 'ID of the user who owns this profile',
  })
  @Expose()
  userId: string;
}
