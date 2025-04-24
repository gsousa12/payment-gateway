import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async notifyPaymentResult(paymentId: string, pspResponse: any) {
    const gatewayBaseUrl = this.configService.get<string>('GATEWAY_BASE_URL');
    const url = `${gatewayBaseUrl}/payments/${paymentId}/psp-response`;
    const payload = { pspResponse };

    try {
      const res = await firstValueFrom(this.http.post(url, payload));
      console.log('[GatewayService] Gateway notified successfully:', res.data);
    } catch (err) {
      console.error('[GatewayService] Failed to notify Gateway:', err.message);
    }
  }

  async pspIntegration(paymentPayload: any) {
    const pspBaseUrl = this.configService.get<string>('PSP_BASE_URL');
    if (!pspBaseUrl) {
      throw new Error('PSP_BASE_URL is not defined in the configuration');
    }
    const url = `${pspBaseUrl}/psp/analyze`;
    const payload = paymentPayload;

    try {
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  }
}
