import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GatewayService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async notifyPaymentResult(paymentId: string, pspResponse: any) {
    const gatewayBaseUrl = this.configService.get<string>('GATEWAY_BASE_URL');
    if (!gatewayBaseUrl) {
      throw new Error('GATEWAY_BASE_URL is not defined in the configuration');
    }
  }

  async pspIntegration(paymentPayload: any): Promise<any> {
    const pspBaseUrl = this.configService.get<string>('PSP_BASE_URL');
    if (!pspBaseUrl) {
      throw new Error('PSP_BASE_URL is not defined in the configuration');
    }

    const url = `${pspBaseUrl}/psp/simulate`;

    try {
      const response = await axios.post(url, paymentPayload);
      return {
        pspResponse: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        pspResponse: null,
      };
    }
  }
}
