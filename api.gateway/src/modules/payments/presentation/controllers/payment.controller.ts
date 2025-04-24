import { Audit } from '@common/logs/decorators/audit-log.decorator';
import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { CreatePaymentRequestDto } from '@modules/payments/core/application/dtos/request/create-payment.request.dto';
import { PaymentService } from '@modules/payments/core/application/services/payment.service';
import { PaymentMapper } from '@modules/payments/core/domain/mappers/payment.mapper';
import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';

@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Audit('create-payment')
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() request: CreatePaymentRequestDto, @Request() req) {
    const merchantId = Number(req.user.sub || req.user.id);
    try {
      const paymentRequest = await PaymentMapper.toMapperCreatePaymentRequest(request);
      const payment = await this.paymentService.createPayment(paymentRequest, merchantId);
      const response = await PaymentMapper.toMapperCreatePaymentResponse(payment);
      return CreateApiResponse('Payment created successfully', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }
}
