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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'src/post/dto/param-id.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: CategoryResponseDto })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.categoryService.create(dto);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoryResponseDto] })
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findAll();
    return plainToInstance(CategoryResponseDto, categories, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiOkResponse({ type: CategoryResponseDto })
  async findOne(@Param() dto: ParamIdDto): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findOne(dto.id);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({ type: CategoryResponseDto })
  async update(@Param() dto: ParamIdDto, @Body() updateDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(dto.id, updateDto);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiOkResponse({ description: 'Category deleted successfully' })
  async remove(@Param() dto: ParamIdDto) {
    await this.categoryService.remove(dto.id);
    return { message: 'Category deleted successfully' };
  }
}
