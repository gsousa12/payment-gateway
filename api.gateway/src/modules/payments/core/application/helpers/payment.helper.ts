import { Product } from '@common/utils/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentHelper {
  getAmount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
}
