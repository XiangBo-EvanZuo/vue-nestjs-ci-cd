/*
 * @Author: your name
 * @Date: 2022-04-10 18:10:26
 * @LastEditTime: 2022-04-22 17:29:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/app.service.ts
 */
import { Injectable } from '@nestjs/common';
import { MyLoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(readonly loggerService: MyLoggerService) {
    this.loggerService.setContext(AppService.name);
  }
  time = 0;
  getHello(): string {
    this.time++;
    this.loggerService.verbose('Hello World!-RD-CI/CD - test-nev newnewnew' + this.time)
    return 'Hello World!-RD-CI/CD - test-nev newnewnew' + this.time;
  }

  getInitData(): string {
    this.loggerService.error('test errors');
    return `${this.time}`;
  }

  getVersion(): string {
    return '17:14';
  }
}