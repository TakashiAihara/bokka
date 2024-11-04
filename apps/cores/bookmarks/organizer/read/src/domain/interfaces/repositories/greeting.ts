import type { Greeting } from '@domain/models/greeting';

export interface IGreetingRepository {
  getGreeting(): Greeting;
}

export const IGreetingRepository = Symbol('IGreetingRepository');
