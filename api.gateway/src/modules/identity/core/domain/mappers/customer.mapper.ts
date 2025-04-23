import { Customer } from '@prisma/client';
import { CreateCustomerRequestDto } from '../../application/dtos/request/create-customer.request.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerResponseDto } from '../../application/dtos/response/create-customer.response.dto';

export class CustomerMapper {
  static async toMapperCreateCustomerRequest(request: CreateCustomerRequestDto): Promise<CustomerEntity> {
    const customer = new CustomerEntity();
    customer.name = request.name;
    customer.email = request.email;
    customer.phone = request.phone;
    customer.taxId = request.taxId;
    return customer;
  }
  static async toMapperCreateCustomerResponse(customer: Customer): Promise<CreateCustomerResponseDto> {
    const customerResponse = new CreateCustomerResponseDto();
    customerResponse.id = customer.id;
    customerResponse.name = customer.name;
    customerResponse.email = customer.email;
    customerResponse.phone = customer.phone;
    customerResponse.taxId = customer.taxId;
    return customerResponse;
  }
}
