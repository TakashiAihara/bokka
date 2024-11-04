export class Greeting {
  constructor(private readonly _message: string) {}

  get message(): string {
    return this._message;
  }

  static createDefault(): Greeting {
    return new Greeting('Hello World!');
  }

  static createCustom(name: string): Greeting {
    return new Greeting(`Hello, ${name}!`);
  }
}
