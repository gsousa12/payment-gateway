import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BadRequestException, Inject } from '@nestjs/common';
import { IPaymentService } from '../../domain/interfaces/payment-service.interface';
import { PaymentRepository } from '@modules/payments/infrastructure/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { Payment } from '@prisma/client';
import { PaymentHelper } from '../helpers/payment.helper';

export class PaymentService implements IPaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: PaymentRepository,
    private readonly paymentHelper: PaymentHelper,
  ) {}

  async createPayment(paymentRequest: PaymentEntity, merchantId: number): Promise<Payment> {
    const customerId = await this.paymentRepository.getCustomerIdByEmail(paymentRequest.customerInfo.email);
    if (!customerId) {
      throw new BadRequestException('There is no customer with this email');
    }
    paymentRequest.id = 'pay_12345';
    const amount = this.paymentHelper.getAmount(paymentRequest.products);
    const payment = await this.paymentRepository.createPayment(
      paymentRequest,
      customerId,
      merchantId,
      amount,
    );
    return payment;
  }
}
