/*
 * @Author: your name
 * @Date: 2022-04-10 18:10:26
 * @LastEditTime: 2022-04-20 18:14:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/coffees/coffees.controller.ts
 */
import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@ApiTags('coffees')
@UseGuards(AuthGuard())
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @Get()
  findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
    @GetUser() user: User,
  ): Promise<Coffee> {
    console.log(protocol);
    return this.coffeesService.findAll(paginationQuery, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Coffee> {
    console.log(id);
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(
    @Body() createCoffeeDto: CreateCoffeeDto,
    @GetUser() user: User,
  ): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
    @GetUser() user: User,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }
}
