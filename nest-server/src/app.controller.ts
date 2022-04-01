import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/initData')
  getInitData(): string {
    return this.appService.getInitData();
  }


}
