import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Exclude, classToPlain } from "class-transformer";

import { FoodRecord } from "./FoodRecord";

export const DefaultCalorieLimit = 2100;
export const MonthlyExpenseLimit = 1000;

@Entity()
@Unique("UQ_USERNAME", ["username"])
@Unique("UQ_EMAIL", ["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password_hash: string;

  @Column({ default: DefaultCalorieLimit })
  calorie_limit: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => FoodRecord, (record) => record.user)
  records: FoodRecord[];

  toJSON() {
    return classToPlain(this);
  }
}
