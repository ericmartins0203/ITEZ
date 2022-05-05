import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Expend from "./Expend";
import Received from "./Received";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "float", default: 0 })
  balance: number;

  @OneToMany((type) => Received, (received) => received.user, {
    cascade: true,
  })
  receiveds: Received[];

  @OneToMany((type) => Expend, (expend) => expend.user, {
    cascade: true,
  })
  expends: Expend[];
}
