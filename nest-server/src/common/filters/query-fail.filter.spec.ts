/*
 * @Author: your name
 * @Date: 2022-04-18 11:06:22
 * @LastEditTime: 2022-04-18 11:25:10
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/common/filters/query-fail.filter.spec.ts
 */
import { QueryFailedErrorFilter } from './query-fail.filter';

describe('DemoFilter', () => {
  it('should be defined', () => {
    expect(new QueryFailedErrorFilter()).toBeDefined();
  });
});
