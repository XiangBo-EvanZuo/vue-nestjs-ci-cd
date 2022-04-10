import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    console.log('Hi from the Middleware!');
    console.time('Req - Res Time');
    res.on('finish', () => console.timeEnd('Req - Res Time'));
    next();
  }
}
