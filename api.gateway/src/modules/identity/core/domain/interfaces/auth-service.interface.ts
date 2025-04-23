import { Merchant } from '@prisma/client';
import { MerchantEntity } from '../entities/merchant.entity';
import { LoginRequestDto } from '../../application/dtos/request/login.request.dto';
import { Response } from 'express';

export interface IAuthService {
  signup(merchantRequest: MerchantEntity): Promise<Merchant>;
  login(request: LoginRequestDto, res: Response): Promise<void>;
  validateMerchant(email: string, password: string): Promise<Merchant>;
  validateApiKey(apiKey: string): Promise<Merchant | null>;
}
