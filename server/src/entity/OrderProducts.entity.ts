import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, { cascade: true, })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { cascade: true, })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
