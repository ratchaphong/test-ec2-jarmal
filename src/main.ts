// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog API with NestJS + Prisma')
    .setVersion('1.0')
    // .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // <--- http://localhost:3000/swagger

  await app.listen(3000);
}
bootstrap();
