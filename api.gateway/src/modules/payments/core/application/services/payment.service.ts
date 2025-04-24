import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPaymentService } from '../../domain/interfaces/payment-service.interface';
import { PaymentRepository } from '@modules/payments/infrastructure/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { Payment } from '@prisma/client';
import { PaymentHelper } from '../helpers/payment.helper';
import { ConfigService } from '@nestjs/config';
import { PublisherService } from '@common/services/rabbitmq/publisher/publisher.service';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: PaymentRepository,
    private readonly paymentHelper: PaymentHelper,
    private readonly configService: ConfigService,
    private readonly publisherService: PublisherService,
  ) {}

  async createPayment(paymentRequest: PaymentEntity, merchantId: number): Promise<Payment> {
    const customerId = await this.paymentRepository.getCustomerIdByEmail(paymentRequest.customerInfo.email);
    if (!customerId) {
      throw new BadRequestException('There is no customer with this email');
    }

    paymentRequest.id = this.paymentHelper.generatePaymentId();

    const gatewayBaseUrl = this.configService.get<string>('GATEWAY_BASE_URL');
    paymentRequest.paymentUrl = `${gatewayBaseUrl}/${paymentRequest.id}`;

    const amount = this.paymentHelper.getAmount(paymentRequest.products);

    const payment = await this.paymentRepository.createPayment(
      paymentRequest,
      customerId,
      merchantId,
      amount,
    );

    await this.publisherService.publishPayment(payment);

    return payment;
  }
}
