import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("expends")
export default class Expend {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  value: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  type: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.expends)
  user: User;
}
