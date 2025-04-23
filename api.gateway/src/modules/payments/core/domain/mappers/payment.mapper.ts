import { CreatePaymentRequestDto } from '../../application/dtos/request/create-payment.request.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentMapper {
  static async toMapperCreatePaymentReques(request: CreatePaymentRequestDto): Promise<PaymentEntity> {
    const paymentEntity = new PaymentEntity();
    paymentEntity.customerInfo = request.customerInfo;
    paymentEntity.products = request.products;
    paymentEntity.paymentMethod = request.paymentMethod;
    paymentEntity.returnUrl = request.returnUrl;
    paymentEntity.sucessUrl = request.sucessUrl;
    return paymentEntity;
  }
}
