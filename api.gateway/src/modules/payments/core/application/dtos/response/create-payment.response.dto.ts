export class CreatePaymentResponseDto {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  customerId: string;
  merchantId: number;
  returnUrl: string;
  successUrl: string;
  paymentUrl: string;
  createdAt: Date;
}
