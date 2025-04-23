import { RequestLoggerMiddleware } from '@common/logs/middleware/request-logger.middleware';
import { RequestLogSchema } from '@common/logs/schemas/request-log.schema';
import { IdentityModule } from '@modules/identity/identity.module';
import { RequestLogService } from '@common/logs/services/request-logs.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: 'RequestLog', schema: RequestLogSchema }]),
    IdentityModule,
  ],
  controllers: [],
  providers: [RequestLogService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
