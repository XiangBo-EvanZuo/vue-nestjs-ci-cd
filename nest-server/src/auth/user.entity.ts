/*
 * @Author: your name
 * @Date: 2022-04-18 19:14:18
 * @LastEditTime: 2022-04-19 18:39:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-server/src/auth/user.entity.ts
 */
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0, nullable: true })
  sex?: number;

  @OneToMany(
    type => Coffee,
    coffee => coffee.user,
    {
      eager: false,
    },
  )
  coffee: Coffee;

  @OneToMany(
    type => Flavor,
    flavor => flavor.user,
    {
      eager: false,
    },
  )
  flavor: Flavor;
}
