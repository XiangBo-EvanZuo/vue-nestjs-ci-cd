/*
 * @Author: your name
 * @Date: 2022-04-26 18:30:50
 * @LastEditTime: 2022-04-29 19:44:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-app/src/app.controller.ts
 */
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, CONTEXT, RequestContext } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private client: ClientProxy,
    @Inject(CONTEXT) private readonly ctx: RequestContext,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/math/wordcount')
  wordCount(
    @Body() { text }: { text: string },
  ): Observable<{ [key: string]: number }> {
    this.client.emit('math:wordcount_log', text);
    console.log('before send');
    const newObservable = this.client.send('math:wordcount-old', text);
    console.log('after send');
    // newObservable.pipe(
    //   tap((num) => console.log(num)),
    //   map((num) => num),
    // );
    newObservable.subscribe((data) => {
      console.log('subscribe', data);
      console.log('第一个math微服务之后我再掉另一个微服务中。。。');
    });
    // console.log(this.ctx);

    return newObservable;
  }

  // ms-math => ms-math-interflow
  @Post('/math/mirco-wordcount')
  microWordCount(
    @Body() { text }: { text: string },
  ): Observable<{ [key: string]: number }> {
    this.client.emit('math:wordcount_log', text);
    console.log('before send mirco');
    const newObservable = this.client.send('math:wordcount', text);
    console.log('after send mirco');
    // newObservable.pipe(
    //   tap((num) => console.log(num)),
    //   map((num) => num),
    // );
    newObservable.subscribe((data) => {
      console.log('subscribe', data);
      console.log('第一个math微服务之后我再掉另一个微服务中。。。');
    });
    // console.log(this.ctx);

    return newObservable;
  }
}
