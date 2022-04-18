/*
 * @Author: your name
 * @Date: 2022-04-18 11:22:23
 * @LastEditTime: 2022-04-18 11:54:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/common/filters/error-code.configs.ts
 */
export const errorCodeMap = {
  '23505': [
    {
      name: 'name',
      errorMessage: '用户名已经存在'
    },
    {
      name: 'description',
      errorMessage: 'description已经存在'
    }
  ],
};