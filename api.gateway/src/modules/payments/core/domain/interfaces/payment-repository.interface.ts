import { Payment } from '@prisma/client';
import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentRepository {
  getCustomerIdByEmail(email: string): Promise<string | null>;
  createPayment(
    paymentRequest: PaymentEntity,
    customerId: string,
    merchantId: number,
    amount: number,
  ): Promise<Payment>;
}
