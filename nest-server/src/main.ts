/*
 * @Author: your name
 * @Date: 2022-04-01 13:13:11
 * @LastEditTime: 2022-04-07 12:50:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/nest-server/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const portMap = {
    production: {
      port: 5000
    },
    test: {
      port: 8023
    },
  }
  const port = portMap[process.env.NODE_ENV]?.port || 5000;
  console.log(process.env.NODE_ENV, 'server running at', port)
  await app.listen(port);
}
bootstrap();
