import { IdentityModule } from '@modules/identity/identity.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLogSchema } from '@common/logs/schemas/audit-log.schema';
import { AuditLogService } from '@common/logs/services/audit-logs.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { PaymentsModule } from '@modules/payments/payments.module';
import { ApiKeyGuard } from '@common/guards/api-key.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: 'AuditLog', schema: AuditLogSchema }]),
    IdentityModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [
    AuditLogService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
