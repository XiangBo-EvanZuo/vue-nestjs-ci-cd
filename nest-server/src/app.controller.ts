/*
 * @Author: your name
 * @Date: 2022-04-01 13:13:11
 * @LastEditTime: 2022-04-03 12:01:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/nest-server/src/app.controller.ts
 */
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/data')
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/initData')
  getInitData(): string {
    return this.appService.getInitData();
  }
}
