import { IGreetingRepository } from '@domain/interfaces/repositories/greeting';
import type { Greeting } from '@domain/models/greeting';
import { Inject, Injectable } from '@nestjs/common';
import type { IGreetingService } from './interfaces/greeting';

@Injectable()
export class GreetingService implements IGreetingService {
  constructor(
    @Inject(IGreetingRepository)
    private readonly greetingRepository: IGreetingRepository,
  ) {}

  getGreeting(): string {
    const greeting: Greeting = this.greetingRepository.getGreeting();
    return greeting.message;
  }
}
