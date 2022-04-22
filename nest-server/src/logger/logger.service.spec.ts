/*
 * @Author: your name
 * @Date: 2022-04-22 17:11:04
 * @LastEditTime: 2022-04-22 17:22:47
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/logger/logger.service.spec.ts
 */
import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggerService } from './logger.service';

describe('MyLoggerService', () => {
  let service: MyLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLoggerService],
    }).compile();

    service = module.get<MyLoggerService>(MyLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
