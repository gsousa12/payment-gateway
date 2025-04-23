import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/auth-service.interface';
import { Merchant } from '@prisma/client';
import { MerchantEntity } from '../../domain/entities/merchant.entity';
import { AuthRepository } from '@modules/identity/infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthHelper } from '../helpers/auth.helper';
import { EmailService } from '@modules/email/application/email.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepository,
    private readonly authHelper: AuthHelper,
    private readonly emailService: EmailService,
  ) {}
  async signup(merchantRequest: MerchantEntity): Promise<Merchant> {
    const { existRegisteredEmail, existRegisteredTaxId } = await this.authRepository.verifyExistMerchant(
      merchantRequest.email,
      merchantRequest.taxId,
    );
    if (existRegisteredEmail) {
      throw new BadRequestException('There is already a registered merchant with that email');
    }
    if (existRegisteredTaxId) {
      throw new BadRequestException('There is already a registered merchant with that taxId');
    }

    merchantRequest.password = await this.authHelper.generateUserTemporaryPassword();
    const plainPassword = merchantRequest.password;
    merchantRequest.password = await this.authHelper.hashPassword(merchantRequest.password);

    const createdMerchant = await this.authRepository.create(merchantRequest);

    await this.emailService.sendUserTemporaryPasswordEmail(
      plainPassword,
      merchantRequest.email,
      merchantRequest.name,
    );

    return createdMerchant;
  }
}
