import { Customer } from '@prisma/client';
import { CustomerEntity } from '../entities/customer.entity';

export interface ICustomerRepository {
  createCustomer(customer: CustomerEntity, merchantId: number): Promise<Customer>;
  verifyExistCustomer(
    email: string,
    taxId: string,
    merchantId: number,
  ): Promise<{ existRegisteredEmail: boolean; existRegisteredTaxId: boolean }>;
}
