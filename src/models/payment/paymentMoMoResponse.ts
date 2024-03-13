export interface MoMoResponse {
  orderId: number;
  paymentMomoURL: string;
}

export interface PaymentMoMoResponse {
  statusCode: number;
  massage: string;
  data: MoMoResponse;
}
