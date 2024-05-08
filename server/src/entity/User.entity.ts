import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { Order } from "./Order.entity";

@Entity({ name: "users" })
@Exclude({ toPlainOnly: true })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  address: string;

  @Column({
    type: "enum",
    enum: ["cash", "credit"],
    nullable: false,
  })
  payment: "cash" | "credit";

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
