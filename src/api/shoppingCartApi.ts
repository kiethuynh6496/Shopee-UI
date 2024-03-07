import { ShoppingCartResponse } from 'models/shoppingCart/shoppingCartInfo';
import axiosClient from './axiosClient';

const shoppingCartApi = {
  getShoppingCart(): Promise<ShoppingCartResponse> {
    const url = `/shoppingcart`;
    return axiosClient.get(url);
  },
  createShoppingCartItem(productId: number, quantity: number): Promise<ShoppingCartResponse> {
    const url = `/shoppingcart/update-item?productId=${productId}&quantity=${quantity}`;
    return axiosClient.post(url);
  },
  deleteShoppingCartItem(productId: number, quantity: number): Promise<ShoppingCartResponse> {
    const url = `/shoppingcart/delete-item?productId=${productId}&quantity=${quantity}`;
    return axiosClient.delete(url);
  },
};

export default shoppingCartApi;
