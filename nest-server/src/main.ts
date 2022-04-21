/*
 * @Author: your name
 * @Date: 2022-03-16 17:08:50
 * @LastEditTime: 2022-04-20 18:33:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /iluvcoffee/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/exclude-entity-column.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
    new TransformInterceptor(),
  );

  if (process.env.NODE_ENV === 'test') {
      const options = new DocumentBuilder()
        .setTitle('ILuvCoffee')
        .setDescription('Coffee Application')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document);
  }

  // configs
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
