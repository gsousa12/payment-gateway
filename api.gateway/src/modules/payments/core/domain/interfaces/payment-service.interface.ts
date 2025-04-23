import { Payment } from '@prisma/client';
import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentService {
  createPayment(paymentRequest: PaymentEntity, merchantId: number): Promise<Payment>;
}
