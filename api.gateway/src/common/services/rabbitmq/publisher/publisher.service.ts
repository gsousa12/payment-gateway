import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from './rabbitmq.publisher';

@Injectable()
export class PublisherService {
  constructor(private readonly publisher: RabbitMQPublisher) {}

  async publishPayment(payment: any) {
    await this.publisher.publishPayment({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      customerId: payment.customerId,
      merchantId: payment.merchantId,
      returnUrl: payment.returnUrl,
      successUrl: payment.sucessUrl,
      paymentUrl: payment.paymentUrl,
      createdAt: payment.createdAt,
    });
  }
}
