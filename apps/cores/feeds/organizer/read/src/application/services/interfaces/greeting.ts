export interface IGreetingService {
  getGreeting(): string;
}

export const IGreetingService = Symbol('IGreetingService');
