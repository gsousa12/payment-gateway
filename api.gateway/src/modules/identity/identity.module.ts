import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './core/application/services/auth.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY, CUSTOMER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { AuthHelper } from './core/application/helpers/auth.helper';
import { EmailService } from '@common/services/email/email.service';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/application/strategies/jwt.strategy';
import { CustomerController } from './presentation/controllers/customer.controller';
import { CustomerService } from './core/application/services/customer.service';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { CustomerHelper } from './core/application/helpers/customer.helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController, CustomerController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
    AuthService,
    CustomerService,
    BcryptAdapter,
    AuthHelper,
    CustomerHelper,
    EmailService,
    PrismaService,
    JwtStrategy,
  ],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class IdentityModule {}
