import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './core/application/services/auth.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { AuthHelper } from './core/application/helpers/auth.helper';
import { EmailService } from '@common/services/email/email.service';
import { PrismaService } from '@common/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
    AuthHelper,
    EmailService,
    PrismaService,
  ],
})
export class IdentityModule {}
