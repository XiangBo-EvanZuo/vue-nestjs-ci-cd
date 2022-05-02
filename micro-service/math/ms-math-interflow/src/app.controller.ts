/*
 * @Author: your name
 * @Date: 2022-04-26 18:06:25
 * @LastEditTime: 2022-04-29 19:18:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-math/src/app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('math:mirco-wordcount')
  wordCount(text: string): Promise<{ [key: string]: number }> {
    return this.appService.calculateWordCount(text);
  }

  @Get()
  helloWorld() {
    return 'hellow';
  }

  @EventPattern('math:mirco-wordcount_log')
  wordCountLog(text: string): void {
    console.log(text);
  }
}

