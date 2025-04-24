import { Payment } from '@prisma/client';
import { CreatePaymentRequestDto } from '../../application/dtos/request/create-payment.request.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { CreatePaymentResponseDto } from '../../application/dtos/response/create-payment.response.dto';

export class PaymentMapper {
  static async toMapperCreatePaymentRequest(request: CreatePaymentRequestDto): Promise<PaymentEntity> {
    const paymentEntity = new PaymentEntity();
    paymentEntity.customerInfo = request.customerInfo;
    paymentEntity.products = request.products;
    paymentEntity.paymentMethod = request.paymentMethod;
    paymentEntity.returnUrl = request.returnUrl;
    paymentEntity.sucessUrl = request.sucessUrl;
    return paymentEntity;
  }

  static async toMapperCreatePaymentResponse(payment: Payment): Promise<CreatePaymentResponseDto> {
    const response = new CreatePaymentResponseDto();
    response.id = payment.id;
    response.amount = payment.amount;
    response.status = payment.status;
    response.paymentMethod = payment.paymentMethod;
    response.customerId = payment.customerId;
    response.merchantId = payment.merchantId;
    response.returnUrl = payment.returnUrl;
    response.successUrl = payment.successUrl;
    response.paymentUrl = payment.paymentUrl;
    response.createdAt = payment.createdAt;
    return response;
  }
}
