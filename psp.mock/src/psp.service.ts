import { Injectable } from '@nestjs/common';

@Injectable()
export class PspService {
  simulateAnalysis(payment: any): any {
    // 80% chance de aprovação
    const approved = Math.random() > 0.2;

    const fakeQRCodeData = `pix://payment?id=${payment.id}&amount=${payment.amount}&merchant=${payment.merchantId}&key=00020126360014BR.GOV.BCB.PIX0111+5599999999995204000053039865802BR5920Merchant Fictício6009Sao Paulo62100506abcde6304`;

    const result = {
      status: approved ? 'APPROVED' : 'REJECTED',
      qrCode: approved ? fakeQRCodeData : null,
      reason: approved ? null : 'Transaction declined by PSP',
      processedAt: new Date().toISOString(),
    };

    return result;
  }
}
