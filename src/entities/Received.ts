import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("receiveds")
export default class Received {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  value: number;

  @Column({ nullable: false })
  date: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.receiveds)
  user: User;
}
