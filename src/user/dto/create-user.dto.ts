import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'ชื่อของผู้ใช้',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'อีเมลของผู้ใช้ ต้องเป็นรูปแบบ email ที่ถูกต้อง',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;
}
