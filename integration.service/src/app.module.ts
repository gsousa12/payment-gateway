import { GatewayService } from '@modules/gateway/core/application/services/gateway.service';
import { GatewayModule } from '@modules/gateway/gateway.module';
import { PaymentListener } from '@modules/rabbitmq/listener/rabbitmq.listener';
import { RabbitMQModule } from '@modules/rabbitmq/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RabbitMQModule, GatewayModule],
  controllers: [PaymentListener],
  providers: [],
})
export class AppModule {}
