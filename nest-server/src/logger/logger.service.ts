/*
 * @Author: your name
 * @Date: 2022-04-22 17:11:04
 * @LastEditTime: 2022-04-22 17:21:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/logger/logger.service.ts
 */

// scope选项作为Logger类的配置元数据，并指定一个临时范围，
// 以确保Logger在每个功能模块中都有一个唯一的实例
import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends Logger {}