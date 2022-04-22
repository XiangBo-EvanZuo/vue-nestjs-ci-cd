import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), AuthModule, LoggerModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
