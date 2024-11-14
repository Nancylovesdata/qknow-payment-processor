import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); // Enable global validation
  await app.listen(parseInt(process.env.PORT) || 3000); // Default to 3000 if PORT is not set

  Logger.log(`Listening on port ${process.env.PORT || 3000}`, 'Bootstrap');
}

bootstrap();
