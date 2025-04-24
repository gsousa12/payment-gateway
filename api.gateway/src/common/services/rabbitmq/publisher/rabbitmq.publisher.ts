import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQPublisher {
  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  async publishPayment(payload: any) {
    await this.client.connect();
    return this.client.emit('payment_created', payload);
  }
}
