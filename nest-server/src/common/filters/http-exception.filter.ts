import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = 
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>); // casting to Record<string, unknown> prevents errors from casting to type of object
    
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
