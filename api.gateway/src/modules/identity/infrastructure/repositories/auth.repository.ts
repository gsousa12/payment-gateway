import { PrismaService } from '@common/services/prisma/prisma.service';
import { MerchantEntity } from '@modules/identity/core/domain/entities/merchant.entity';
import { IAuthRepository } from '@modules/identity/core/domain/interfaces/auth-repository.interface';
import { Injectable } from '@nestjs/common';
import { Merchant } from '@prisma/client';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(merchantRequest: MerchantEntity): Promise<Merchant> {
    return await this.prisma.merchant.create({
      data: {
        name: merchantRequest.name,
        email: merchantRequest.email,
        taxId: merchantRequest.taxId,
        password: merchantRequest.password,
        apiKey: merchantRequest.apiKey,
        createdAt: new Date(),
        balance: 0,
        isActive: false,
      },
    });
  }

  async verifyExistMerchant(
    email: string,
    taxId: string,
  ): Promise<{ existRegisteredEmail: boolean; existRegisteredTaxId: boolean }> {
    const merchant = await this.prisma.merchant.findFirst({
      where: {
        OR: [{ email }, { taxId }],
      },
      select: {
        email: true,
        taxId: true,
      },
    });

    return {
      existRegisteredEmail: merchant?.email === email,
      existRegisteredTaxId: merchant?.taxId === taxId,
    };
  }

  //   findUserByEmail(email: string): Promise<UserEntity | null> {
  //     const user = this.prisma.user.findUnique({
  //       where: { email: email },
  //     });
  //     return user;
  //   }

  //   async activeUser(email: string): Promise<void> {
  //     await this.prisma.user.update({
  //       where: { email: email },
  //       data: { isActive: true },
  //     });
  //   }
}
