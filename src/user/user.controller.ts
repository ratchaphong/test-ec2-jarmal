import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'src/post/dto/param-id.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'User created successfully',
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return plainToInstance(UserResponseDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserResponseDto, users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ type: UserResponseDto })
  async findOne(@Param() dto: ParamIdDto): Promise<UserResponseDto> {
    const user = await this.userService.findOne(dto.id);
    return plainToInstance(UserResponseDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserResponseDto })
  async update(@Param() dto: ParamIdDto, @Body() updateDto: UpdateUserDto) {
    const user = await this.userService.update(dto.id, updateDto);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  async remove(@Param() dto: ParamIdDto) {
    await this.userService.remove(dto.id);
    return { message: 'User deleted successfully' };
  }
}
