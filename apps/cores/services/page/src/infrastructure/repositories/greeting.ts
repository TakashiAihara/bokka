import type { IGreetingRepository } from '@domain/interfaces/repositories/greeting';
import { Greeting } from '@domain/models/greeting';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetingRepository implements IGreetingRepository {
  getGreeting(): Greeting {
    return new Greeting('Hello World!');
  }
}
