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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'src/post/dto/param-id.dto';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create profile' })
  @ApiOkResponse({ type: ProfileResponseDto })
  async create(@Body() dto: CreateProfileDto): Promise<ProfileResponseDto> {
    const profile = await this.profileService.create(dto);
    return plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiOkResponse({ type: [ProfileResponseDto] })
  async findAll(): Promise<ProfileResponseDto[]> {
    const profiles = await this.profileService.findAll();
    return plainToInstance(ProfileResponseDto, profiles, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by ID' })
  @ApiOkResponse({ type: ProfileResponseDto })
  async findOne(@Param() dto: ParamIdDto): Promise<ProfileResponseDto> {
    const profile = await this.profileService.findOne(dto.id);
    return plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiOkResponse({ type: ProfileResponseDto })
  async update(@Param() dto: ParamIdDto, @Body() updateDto: UpdateProfileDto) {
    const profile = await this.profileService.update(dto.id, updateDto);
    return plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile' })
  @ApiOkResponse({ description: 'Profile deleted successfully' })
  async remove(@Param() dto: ParamIdDto) {
    await this.profileService.remove(dto.id);
    return { message: 'Profile deleted successfully' };
  }
}
