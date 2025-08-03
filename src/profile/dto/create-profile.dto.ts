import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: 'Web developer and TypeScript lover.',
    description: 'Short biography or introduction of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: '2b9f3e3a-8cbe-4d95-b236-7b8a1e3d6a4e',
    description: 'The userId that this profile belongs to.',
  })
  @IsUUID()
  userId: string;
}
