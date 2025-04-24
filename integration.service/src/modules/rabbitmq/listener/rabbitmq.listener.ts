import { GatewayService } from '@modules/gateway/core/application/services/gateway.service';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentListener {
  constructor(private readonly gatewayService: GatewayService) {}
  private readonly logger = new Logger(PaymentListener.name);

  @EventPattern('payment_created')
  async handlePaymentCreated(@Payload() payload: any) {
    // Envio ao PSP
    await this.gatewayService.pspIntegration(payload);
  }
}
