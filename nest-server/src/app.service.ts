import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  time = 0;
  getHello(): string {
    this.time++;
    return 'Hello World!-RD-CI/CD - test-nev newnewnew' + this.time;
  }

  getInitData(): string {
    return `${this.time}`;
  }
}