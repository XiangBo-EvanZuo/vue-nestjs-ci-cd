import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Event } from '../events/entities/event.entity';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto, user: User): Promise<any> {

    const { limit, offset } = paginationQuery;

    const query = this.coffeeRepository.createQueryBuilder('coffee');
    query.where({ user });

    // if (status) {
    //   query.andWhere('task.status = :status', { status });
    // }

    // if (search) {
    //   query.andWhere(
    //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
    //     { search: `%${search}%` },
    //   );
    // }
    if (offset) query.skip(offset - 1);
    if (limit) query.take(limit)
    query.leftJoinAndSelect('coffee.flavors', 'flavors');
    query.leftJoinAndSelect('coffee.user', 'user');



    const tasks = await query.getMany();
    return tasks
    // const { limit, offset } = paginationQuery;

    // return this.coffeeRepository.find({
    //   relations: ['flavors', 'user'],
    //   skip: offset,
    //   take: limit,
    // });
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto, user: User): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name, user)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
      user,
    });

    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto, @GetUser() user: User): Promise<Coffee> {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name, user)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string, user: User): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name, user });
  }
}