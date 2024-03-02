import { ShoppingCartResponse } from 'models/shoppingCart/shoppingCartInfo';
import axiosClient, { config } from './axiosClient';

const shoppingCartApi = {
  getShoppingCart(id: number): Promise<ShoppingCartResponse> {
    const url = `/shoppingcart/${id}`;
    return axiosClient.get(url);
  },
  createShoppingCartItem(productId: number, quantity: number): Promise<boolean> {
    const url = `/shoppingcart/update-item?productId=${productId}&quantity=${quantity}`;
    return axiosClient.post(url, {});
  },
  deleteShoppingCartItem(productId: number, quantity: number): Promise<boolean> {
    const url = `/shoppingcart/delete-item?productId=${productId}&quantity=${quantity}`;
    return axiosClient.post(url);
  },
};

export default shoppingCartApi;
