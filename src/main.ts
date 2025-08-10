// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('DATABASE_URL', process.env.DATABASE_URL);

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog API with NestJS + Prisma')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // <--- http://localhost:4000/swagger

  await app.listen(4000);
}
bootstrap();
