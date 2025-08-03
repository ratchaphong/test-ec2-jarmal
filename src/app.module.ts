import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, PostModule, UserModule, ProfileModule, CategoryModule],
})
export class AppModule {}
