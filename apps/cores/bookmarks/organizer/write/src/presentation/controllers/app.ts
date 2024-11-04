import { IGreetingService } from '@application/services/interfaces/greeting';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    @Inject(IGreetingService)
    private readonly greetingService: IGreetingService,
  ) {}

  @Get()
  getHello(): string {
    return this.greetingService.getGreeting();
  }
}
