import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResponseDto {
  @ApiProperty({
    example: '4e6c7769-763e-41e1-8a21-20a14c10d570',
    description: 'Unique ID of the category',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Technology',
    description: 'The display name of the category',
  })
  @Expose()
  name: string;
}
