import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAdmin: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
