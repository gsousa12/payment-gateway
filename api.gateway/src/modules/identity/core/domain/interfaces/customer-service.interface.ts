import { Customer } from '@prisma/client';
import { CustomerEntity } from '../entities/customer.entity';

export interface ICustomerService {
  createCustomer(customerRequest: CustomerEntity, merchantId: number): Promise<Customer>;
}
