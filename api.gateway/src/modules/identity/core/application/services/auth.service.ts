import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/auth-service.interface';
import { Merchant } from '@prisma/client';
import { MerchantEntity } from '../../domain/entities/merchant.entity';
import { AuthRepository } from '@modules/identity/infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthHelper } from '../helpers/auth.helper';
import { EmailService } from '@common/services/email/email.service';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepository,
    private readonly authHelper: AuthHelper,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(merchantRequest: MerchantEntity): Promise<Merchant> {
    const { existRegisteredEmail, existRegisteredTaxId } = await this.authRepository.verifyExistMerchant(
      merchantRequest.email,
      merchantRequest.taxId,
    );
    if (existRegisteredEmail) {
      throw new BadRequestException('There is already a registered user with that email');
    }
    if (existRegisteredTaxId) {
      throw new BadRequestException('There is already a registered user with that taxId');
    }

    // merchantRequest.password = await this.authHelper.generateUserTemporaryPassword();
    merchantRequest.password = '123456';
    const plainPassword = merchantRequest.password;
    merchantRequest.password = await this.authHelper.hashPassword(merchantRequest.password);

    merchantRequest.apiKey = await this.authHelper.generateApiKey();

    const createdMerchant = await this.authRepository.create(merchantRequest);

    // await this.emailService.sendUserTemporaryPasswordEmail(
    //   plainPassword,
    //   merchantRequest.email,
    //   merchantRequest.name,
    // );

    return createdMerchant;
  }

  async login(request: LoginRequestDto, res: Response): Promise<void> {
    const merchant = await this.validateMerchant(request.email, request.password);

    const payload = {
      sub: merchant.id,
      name: merchant.name,
      email: merchant.email,
      taxId: merchant.taxId,
      isActive: merchant.isActive,
    };
    const access_token = this.jwtService.sign(payload);
    await this.authHelper.implementsCookies(access_token, res);
  }

  async validateMerchant(email: string, password: string): Promise<Merchant> {
    const merchant = await this.authRepository.findMerchantByEmail(email);
    if (!merchant) {
      throw new NotFoundException('There is no registered user with that email');
    }
    const isValidPassword = await this.authHelper.comparePassword(password, merchant.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }
    return merchant;
  }

  async logout(res: Response): Promise<void> {
    await this.authHelper.clearCookies(res);
  }

  // Fazer validação da api key hasheada futuramente
  async validateApiKey(apiKey: string): Promise<Merchant | null> {
    return await this.authRepository.findMerchantByApiKey(apiKey);
  }
}
