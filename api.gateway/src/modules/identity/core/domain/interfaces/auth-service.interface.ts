import { Merchant } from '@prisma/client';
import { MerchantEntity } from '../entities/merchant.entity';

export interface IAuthService {
  signup(merchantRequest: MerchantEntity): Promise<Merchant>;
}
