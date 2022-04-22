/*
 * @Author: your name
 * @Date: 2022-04-10 20:17:29
 * @LastEditTime: 2022-04-22 17:39:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/nest-server/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CommonModule } from './common/common.module';
import { LoggerModule } from './logger/logger.module';
import validateEnvSchemaConfig from './config.schema'
@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot(validateEnvSchemaConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get<number>('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    CoffeeRatingModule,
    CommonModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
