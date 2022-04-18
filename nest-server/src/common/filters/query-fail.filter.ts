/*
 * @Author: your name
 * @Date: 2022-04-18 11:06:22
 * @LastEditTime: 2022-04-18 11:56:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/common/filters/demo.filter.ts
 */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { errorCodeMap } from './error-code.configs';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter<T extends QueryFailedError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = 409;
    const exceptionResponse = exception;
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, any>); // casting to Record<string, unknown> prevents errors from casting to type of object
    const res = errorCodeMap[error.code]?.find(item => error.detail.includes(item.name));
    if (res) {
      response.status(status).json({
        status,
        message: res.errorMessage,
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(status).json({
        status,
        ...error,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
