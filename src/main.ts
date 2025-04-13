import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './infrastructure/framework/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
    bufferLogs: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
