import { Product } from '@common/utils/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentHelper {
  getAmount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  generatePaymentId(): string {
    const prefix = 'pay_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';
    const length = 10;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters.charAt(randomIndex);
    }

    return prefix + randomPart;
  }
}
