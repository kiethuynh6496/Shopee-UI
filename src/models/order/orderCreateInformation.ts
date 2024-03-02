export interface OrderCreateInformation {
  id?: string;
  currency: string;
  productInformation: {
    productId: number;
    quantity: number;
  };
  qrcodeLink?: string;
  qrContent?: string;
}
