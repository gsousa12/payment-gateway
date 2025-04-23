import { PrismaService } from '@common/services/prisma/prisma.service';
import { CustomerEntity } from '@modules/identity/core/domain/entities/customer.entity';
import { ICustomerRepository } from '@modules/identity/core/domain/interfaces/customer-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createCustomer(customer: CustomerEntity, merchantId: number): Promise<Customer> {
    return await this.prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        taxId: customer.taxId,
        merchantId: merchantId,
        createdAt: new Date(),
      },
    });
  }

  async verifyExistCustomer(
    email: string,
    taxId: string,
    merchantId: number,
  ): Promise<{ existRegisteredEmail: boolean; existRegisteredTaxId: boolean }> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        merchantId: merchantId,
        OR: [{ email }, { taxId }],
      },
      select: {
        email: true,
        taxId: true,
      },
    });

    return {
      existRegisteredEmail: customer?.email === email,
      existRegisteredTaxId: customer?.taxId === taxId,
    };
  }
}
