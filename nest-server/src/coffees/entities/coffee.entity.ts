/*
 * @Author: your name
 * @Date: 2022-04-10 18:10:26
 * @LastEditTime: 2022-04-21 11:20:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/coffees/entities/coffee.entity.ts
 */
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    _type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors: Flavor[];

  @ManyToOne(
    _type => User,
    user => user.coffee,
    {
      eager: true,
    },
  )
  user: User;
}
