import { Merchant } from '@prisma/client';
import { MerchantEntity } from '../entities/merchant.entity';

export interface IAuthRepository {
  create(merchant: MerchantEntity): Promise<Merchant>;

  findMerchantByEmail(email: string): Promise<Merchant | null>;
  verifyExistMerchant(
    email: string,
    taxId: string,
  ): Promise<{ existRegisteredEmail: boolean; existRegisteredTaxId: boolean }>;
  //   activeUser(email: string): Promise<void>;
  findMerchantByApiKey(apiKey: string): Promise<Merchant | null>;
}
