import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Technology',
    description: 'The display name of the category',
  })
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;
}
