import { ProductInfo } from "models/product/productInfo";

export interface ShoppingCartInfo {
    shoppingCartItems: ProductInfo[];
  }

export interface ShoppingCartResponse {
    statusCode: number;
    massage: string;
    data: ShoppingCartInfo;
}