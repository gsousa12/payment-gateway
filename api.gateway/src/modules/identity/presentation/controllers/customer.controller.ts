import { ApiKeyGuard } from '@common/guards/api-key.guard';
import { Audit } from '@common/logs/decorators/audit-log.decorator';
import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { CreateCustomerRequestDto } from '@modules/identity/core/application/dtos/request/create-customer.request.dto';
import { CustomerService } from '@modules/identity/core/application/services/customer.service';
import { CustomerMapper } from '@modules/identity/core/domain/mappers/customer.mapper';
import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(ApiKeyGuard)
  @Audit('create-customer')
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createCustomer(@Body() request: CreateCustomerRequestDto, @Request() req) {
    try {
      const merchantId = Number(req.user.sub || req.user.id);

      const customerRequest = await CustomerMapper.toMapperCreateCustomerRequest(request);
      const customer = await this.customerService.createCustomer(customerRequest, +merchantId);
      const response = await CustomerMapper.toMapperCreateCustomerResponse(customer);
      return CreateApiResponse('Customer created successfully', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }
}
