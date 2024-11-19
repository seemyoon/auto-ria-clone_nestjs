import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfig } from './configs/config.type';
import { HTTP } from './constants/common.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on ${HTTP}${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running  on ${HTTP}${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}

void bootstrap();
