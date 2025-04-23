import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from '../../domain/interfaces/customer-service.interface';
import { CUSTOMER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { CustomerRepository } from '@modules/identity/infrastructure/repositories/customer.repository';
import { CustomerHelper } from '../helpers/customer.helper';
import { Customer } from '@prisma/client';
import { CustomerEntity } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: CustomerRepository,
    private readonly customerHelper: CustomerHelper,
  ) {}

  async createCustomer(customerRequest: CustomerEntity, merchantId: number): Promise<Customer> {
    const { existRegisteredEmail, existRegisteredTaxId } = await this.customerRepository.verifyExistCustomer(
      customerRequest.email,
      customerRequest.taxId,
      merchantId,
    );
    if (existRegisteredEmail) {
      throw new BadRequestException('There is already a registered customer with that email');
    }
    if (existRegisteredTaxId) {
      throw new BadRequestException('There is already a registered customer with that taxId');
    }

    customerRequest.id = await this.customerHelper.generateCustomerId();
    const customer = await this.customerRepository.createCustomer(customerRequest, merchantId);
    return customer;
  }
}
