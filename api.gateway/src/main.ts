import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AuditLogService } from '@common/logs/services/audit-logs.service';
import { AuditInterceptor } from '@common/logs/interceptors/audit-log.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Logs de auditoria
  const auditLogService = app.get(AuditLogService);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new AuditInterceptor(reflector, auditLogService));

  app.use(cookieParser());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Server running on port: ${port}`);
}
bootstrap();
