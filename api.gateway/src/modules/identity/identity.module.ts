import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './core/application/services/auth.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { AuthHelper } from './core/application/helpers/auth.helper';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
    AuthHelper,
  ],
})
export class IdentityModule {}
