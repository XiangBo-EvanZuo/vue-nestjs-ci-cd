/*
 * @Author: your name
 * @Date: 2022-04-22 15:46:29
 * @LastEditTime: 2022-04-22 15:50:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/config.schema.ts
 */

import * as Joi from '@hapi/joi';

export default {
  envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
    JWT_SECRET: Joi.string().required(),
  }),
};