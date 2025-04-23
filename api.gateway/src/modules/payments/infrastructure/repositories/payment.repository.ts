import { PrismaService } from '@common/services/prisma/prisma.service';
import { PaymentStatus } from '@common/utils/enum';
import { PaymentEntity } from '@modules/payments/core/domain/entities/payment.entity';
import { IPaymentRepository } from '@modules/payments/core/domain/interfaces/payment-repository.interface';
import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(
    paymentRequest: PaymentEntity,
    customerId: string,
    merchantId: number,
    amount: number,
  ): Promise<Payment> {
    const payment = await this.prisma.payment.create({
      data: {
        id: paymentRequest.id,
        amount: amount,
        status: PaymentStatus.PENDING,
        paymentMethod: paymentRequest.paymentMethod,
        customerId: customerId,
        merchantId: merchantId,
        returnUrl: paymentRequest.returnUrl,
        sucessUrl: paymentRequest.sucessUrl,
        createdAt: new Date(),
      },
    });

    return payment;
  }

  async getCustomerIdByEmail(email: string): Promise<string | null> {
    return this.prisma.customer
      .findFirst({
        where: {
          email,
        },
        select: {
          id: true,
        },
      })
      .then((customer) => {
        if (!customer) {
          return null;
        }
        return customer.id;
      });
  }
}
