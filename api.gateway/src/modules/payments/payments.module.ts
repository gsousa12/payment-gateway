import { Module } from '@nestjs/common';
import { PaymentRepository } from './infrastructure/repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PaymentService } from './core/application/services/payment.service';
import { PaymentsController } from './presentation/controllers/payment.controller';
import { PaymentHelper } from './core/application/helpers/payment.helper';
import { PrismaService } from '@common/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentRepository,
    },
    PaymentService,
    PaymentHelper,
    PrismaService,
  ],
})
export class PaymentsModule {}
