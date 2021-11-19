import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class FoodRecord {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  calories: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
