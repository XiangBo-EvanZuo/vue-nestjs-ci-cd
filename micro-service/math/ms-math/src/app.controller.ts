/*
 * @Author: your name
 * @Date: 2022-04-26 18:06:25
 * @LastEditTime: 2022-04-29 21:02:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-math/src/app.controller.ts
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE_INTERFLOW') private client: ClientProxy,
  ) {}

  @MessagePattern('math:wordcount-old')
  wordCount(text: string): Promise<{ [key: string]: number }> {
    return this.appService.calculateWordCount(text);
  }

  @Get()
  helloWorld() {
    return 'hellow';
  }

  @EventPattern('math:wordcount_log')
  wordCountLog(text: string): void {
    console.log(text);
  }

  // micro

  @MessagePattern('math:wordcount')
  microWordCount(text: string): Observable<{ [key: string]: number }> {
    return this.client.send('math:mirco-wordcount', text);
  }

  @EventPattern('math:wordcount_log')
  microWordCountLog(text: string): void {
    this.client.emit('math:mirco-wordcount_log', text);
  }
}

