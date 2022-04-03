/*
 * @Author: your name
 * @Date: 2022-04-01 13:13:11
 * @LastEditTime: 2022-04-03 19:27:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/nest-server/src/app.service.ts
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  time = 0;
  getHello(): string {
    this.time++;
    return 'Hello World!-ci/cd' + this.time;
  }

  getInitData(): string {
    return `${this.time}`;
  }

  updateWebHooks(): string {
    return `updateWebHooks`;
  }
}
