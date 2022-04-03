/*
 * @Author: your name
 * @Date: 2022-04-01 13:13:11
 * @LastEditTime: 2022-04-03 11:00:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/nest-server/src/app.controller.ts
 */
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/initData')
  getInitData(): string {
    return this.appService.getInitData();
  }

  @Post('/update')
  updateWebHooks(): string {
    return this.appService.updateWebHooks();
  }
}
