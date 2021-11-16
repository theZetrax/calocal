import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "@app/models/entity/User";

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_date: Date;
}
