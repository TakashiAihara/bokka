import { GreetingService } from '@application/services/greeting';
import { IGreetingService } from '@application/services/interfaces/greeting';
import { IGreetingRepository } from '@domain/interfaces/repositories/greeting';
import { GreetingRepository } from '@infrastructure/repositories/greeting';
import { Test, type TestingModule } from '@nestjs/testing';
import { AppController } from './app';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: IGreetingService,
          useClass: GreetingService,
        },
        {
          provide: IGreetingRepository,
          useClass: GreetingRepository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
