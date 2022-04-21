/*
 * @Author: your name
 * @Date: 2022-04-10 18:10:26
 * @LastEditTime: 2022-04-21 11:21:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/coffees/entities/flavor.entity.ts
 */
import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    _type => Coffee,
    coffee => coffee.flavors,
  )
  coffees: Coffee[];

  @ManyToOne(
    _type => User,
    user => user.flavor,
    {
      eager: true,
    },
  )
  user: User;
}
