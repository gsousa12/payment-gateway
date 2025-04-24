import { Module } from '@nestjs/common';
import { PaymentRepository } from './infrastructure/repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PaymentService } from './core/application/services/payment.service';
import { PaymentsController } from './presentation/controllers/payment.controller';
import { PaymentHelper } from './core/application/helpers/payment.helper';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { RabbitMQModule } from '@common/services/rabbitmq/rabbitmq.module';
import { RabbitMQPublisher } from '@common/services/rabbitmq/publisher/rabbitmq.publisher';
import { ConfigModule } from '@nestjs/config';
import { PublisherService } from '@common/services/rabbitmq/publisher/publisher.service';

@Module({
  imports: [RabbitMQModule, ConfigModule],
  controllers: [PaymentsController],
  providers: [
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentRepository,
    },
    PaymentService,
    PaymentHelper,
    PrismaService,
    RabbitMQPublisher,
    PublisherService,
  ],
})
export class PaymentsModule {}
