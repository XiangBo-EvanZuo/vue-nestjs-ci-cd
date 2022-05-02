/*
 * @Author: your name
 * @Date: 2022-04-28 16:22:43
 * @LastEditTime: 2022-04-29 19:35:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/micro-service/math/ms-math/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3000,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE_INTERFLOW',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8029,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
