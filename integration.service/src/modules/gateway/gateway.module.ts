import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayService } from './core/application/services/gateway.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}
