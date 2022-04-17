/*
 * @Author: your name
 * @Date: 2022-04-10 18:10:26
 * @LastEditTime: 2022-04-17 17:14:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/app.service.ts
 */
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

  getVersion(): string {
    return '17:14'
  }
}