import { ProductInfo } from 'models/product/productInfo';

export interface ShoppingCartItems {
  itemId: number;
  item: ProductInfo;
  quantity: number;
}

export interface ShoppingCartInfo {
  id: number;
  userId: string;
  shoppingCartItems: ShoppingCartItems[];
}

export interface ShoppingCartResponse {
  statusCode: number;
  massage: string;
  data: ShoppingCartInfo;
}
