/*
 * @Author: your name
 * @Date: 2022-04-20 18:27:44
 * @LastEditTime: 2022-04-20 18:32:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/common/interceptors/exclude-entity-column.interceptor.spec.ts
 */
import { TransformInterceptor } from './exclude-entity-column.interceptor';

describe('ExcludeEntityColumnInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformInterceptor()).toBeDefined();
  });
});
