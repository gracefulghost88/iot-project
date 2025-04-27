process.env.NODE_ENV = 'test';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

class GlobalSetupService {
  private static instance: GlobalSetupService;

  app: NestExpressApplication | undefined;

  status: string = 'not avaliable';

  moduleRef: TestingModule | undefined;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  async init() {
    await this.initApp();
    this.status = 'ready';
  }

  async initApp() {
    const logger = new Logger();
    logger.log(`NODE_ENV=${process.env.NODE_ENV}`);

    this.moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = this.moduleRef.createNestApplication<NestExpressApplication>();

    await this.app.init();
  }

  async teardown() {
    if (this.app) {
      await this.app.close();
    }
  }
}

export const server = GlobalSetupService.getInstance();
