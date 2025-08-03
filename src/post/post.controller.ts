// src/post/post.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PostResponseDto } from './dto/post-response.dto';
import { ParamIdDto } from './dto/param-id.dto';
import { plainToInstance } from 'class-transformer';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    type: [PostResponseDto],
    description: 'List of all posts',
  })
  async findAll() {
    const posts = await this.postService.findAll();
    return plainToInstance(PostResponseDto, posts, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiOkResponse({
    type: PostResponseDto,
    description: 'The post has been found',
  })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async findOne(@Param() dto: ParamIdDto) {
    const post = await this.postService.findOne(dto.id);
    if (!post) throw new NotFoundException('Post not found');
    return plainToInstance(PostResponseDto, post, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiOkResponse({
    type: PostResponseDto,
    description: 'The post has been successfully created',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto);
    return plainToInstance(PostResponseDto, post, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a post' })
  @ApiOkResponse({ description: 'Post deleted successfully' })
  @HttpCode(HttpStatus.OK)
  softDelete(@Param() dto: ParamIdDto) {
    return this.postService.softDelete(dto.id);
  }
}
