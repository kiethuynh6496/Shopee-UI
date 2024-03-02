export interface PaymentStripeRequest {
  successUrl: string;
  cancelUrl: string;
  lineItems: [
    {
      quantity: number;
      priceData: {
        currency: string;
        unitAmount: number;
        productData: {
          name: string;
          description: string;
          images: string[];
        };
      };
    }
  ];
}
