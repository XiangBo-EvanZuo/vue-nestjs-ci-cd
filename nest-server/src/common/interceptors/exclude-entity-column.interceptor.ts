/*
 * @Author: your name
 * @Date: 2022-04-20 18:27:44
 * @LastEditTime: 2022-04-20 18:29:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/common/interceptors/exclude-entity-column.interceptor.ts
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(map(data => classToPlain(data)));
  }
}
