import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  method: string; // e.g., 'credit_card', 'paypal'

  // Possible values: 'pending', 'completed', 'failed', 'cancelled', 'refunded'
  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
