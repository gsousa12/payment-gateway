import { CustomerInfo, Product } from '@common/utils/types';

export class PaymentEntity {
  id: string;
  customerInfo: CustomerInfo;
  products: Product[];
  paymentMethod: string;
  returnUrl: string;
  sucessUrl: string;
  paymentUrl: string;
}
