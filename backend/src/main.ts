import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as experss from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://task-manager-app-test.vercel.app'
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
