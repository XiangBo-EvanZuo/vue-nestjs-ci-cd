/*
 * @Author: your name
 * @Date: 2022-04-26 18:30:50
 * @LastEditTime: 2022-05-04 12:19:52
 * @LastEditors: Evan Zuo v_wangxiangbo01@baidu.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-app/src/app.controller.ts
 */
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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

  // @Get('/demo')
  // execute(): Observable<number> {
  //   const pattern = { cmd: 'sum' };
  //   const data = [1, 2, 3, 4, 5];
  //   console.log('sent')
  //   return this.client.send<number>(pattern, data);
  // }

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

  @Get('/demo')
  demo(@Query('text') text: string) {
    this.client.emit('demo:6379', 'success');
    console.log('send');
    return this.client.send('demo:string', text || 'no text');
  }

  @Get('/demo1')
  execute(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, data);
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
