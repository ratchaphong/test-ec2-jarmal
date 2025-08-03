import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ParamIdDto {
  @ApiProperty({
    description: 'ID (UUID) of the resource',
    example: 'a60fa709-9f7a-4e5e-b6b7-b71aa8b8f493',
  })
  @IsUUID()
  id: string;
}
