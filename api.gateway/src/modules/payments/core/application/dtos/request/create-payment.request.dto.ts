import { CustomerInfo, Product } from '@common/utils/types';

export class CreatePaymentRequestDto {
  customerInfo: CustomerInfo;
  products: Product[];
  paymentMethod: string;
  returnUrl: string;
  sucessUrl: string;
}
