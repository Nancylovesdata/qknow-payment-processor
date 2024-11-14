import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentDto } from './dtos/payment.dto';

const PAYMENT_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // Method to create a new payment with a default status of 'pending'
  async createPayment(data: PaymentDto): Promise<Payment> {
    const { amount, currency, method } = data;
    const payment = this.paymentRepository.create({
      amount,
      currency,
      method,
      status: PAYMENT_STATUSES.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  // Method to retrieve a payment by its ID
  async getPayment(id: string): Promise<Payment | undefined> {
    return this.paymentRepository.findOne({ where: { paymentId: id } });
  }

  async updatePaymentStatus(
    id: string,
    status: string,
  ): Promise<Payment | undefined> {
    const payment = await this.getPayment(id);
    if (!payment) return undefined;

    // Check if the provided status is valid
    if (!Object.values(PAYMENT_STATUSES).includes(status)) {
      throw new Error(`Invalid status value: ${status}`);
    }

    // Update the status
    payment.status = status;
    return this.paymentRepository.save(payment);
  }
}
