import { Merchant } from '@prisma/client';
import { SignupRequestDto } from '../../application/dtos/request/singup.request.dto';
import { MerchantEntity } from '../entities/merchant.entity';
import { SingupResponseDto } from '../../application/dtos/response/singup.response.dto';

export class AuthMapper {
  static async toMapperSingupRequest(request: SignupRequestDto): Promise<MerchantEntity> {
    const merchant = new MerchantEntity();
    merchant.name = request.name;
    merchant.email = request.email;
    merchant.taxId = request.taxId;
    return merchant;
  }

  static toMapperSingupResponse(merchant: Merchant): SingupResponseDto {
    const response = new SingupResponseDto();
    response.name = merchant.name;
    response.email = merchant.email;
    response.taxId = merchant.taxId;
    return response;
  }
}
