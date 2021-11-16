import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique("UQ_USERNAME", ["username"])
@Unique("UQ_EMAIL", ["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
