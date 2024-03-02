export interface TransactionInfo {
  id: number;
  walletId: number;
  orderInfo: {
    id: number;
    status: string;
    expireTime: string;
    qrcodeLink: string;
    qrContent: string;
    productInfo: {
      id: number;
      name: string;
      description: string;
      image: string;
      price: number;
      category: string;
    };
  };
  type: string;
  credit: string;
  amount: number;
}
