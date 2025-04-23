import { Audit } from '@common/logs/decorators/audit-log.decorator';
import { PaymentService } from '@modules/payments/core/application/services/payment.service';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Audit('create-payment')
  @Post('/create-payment')
  @HttpCode(HttpStatus.OK)
  async createPayment() {
    return '';
  }
}
