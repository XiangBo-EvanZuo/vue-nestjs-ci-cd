/*
 * @Author: your name
 * @Date: 2022-04-26 18:06:25
 * @LastEditTime: 2022-05-05 20:57:09
 * @LastEditors: Evan Zuo v_wangxiangbo01@baidu.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-math/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  /**
   * This example contains a hybrid application (HTTP + TCP)
   * You can switch to a microservice with NestFactory.createMicroservice() as follows:
   *
   * const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
   *  transport: Transport.TCP,
   *  options: { retryAttempts: 5, retryDelay: 3000 },
   * });
   * await app.listen();
   *
   */
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      url: 'redis://81.70.221.165:6379',
    },
  });

  await app.startAllMicroservices();
  await app.listen(8087);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

