export interface OrderGetInformation {
  expireTime: string;
  addressId: number;
  id: number;
  productInfo: {
    category: string;
    description: string;
    id: number;
    image: string;
    name: string;
    price: number;
  };
  qrContent: string;
  qrcodeLink: string;
  quantity: number;
  status:
    | 'CANCELED'
    | 'ERROR'
    | 'EXPIRED'
    | 'INITIAL'
    | 'PAID'
    | 'PENDING'
    | 'REFUNDED'
    | 'REFUNDING';
  userId: number;
}
