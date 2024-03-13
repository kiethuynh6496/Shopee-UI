import { ProductInfo } from 'models/product/productInfo';
import { date } from 'yup';

export interface OrderCreateResponseInfo {
  nickName: string;
  addressName: string;
  phone: string;
  orderItems: {
    item: ProductInfo;
    quantity: number;
  };
  total: number;
  orderStatus: string;
  createdDate: Date;
}

export interface OrderCreateResponse {
  statusCode: number;
  massage: string;
  data: OrderCreateResponseInfo;
}
