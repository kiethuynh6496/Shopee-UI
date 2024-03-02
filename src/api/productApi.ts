import { ProductInfo, ProductResponse } from 'models/product/productInfo';
import axiosClient, { config } from './axiosClient';

const productApi = {
  getProduct(id: number): Promise<ProductResponse> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  getAllProduct(): Promise<ProductResponse> {
    const url = `/product`;
    return axiosClient.get(url);
  },
  getAllPrivateProduct(token: string): Promise<ProductInfo[]> {
    const url = `/product/private`;
    return axiosClient.get(url, config(token));
  },
  createProduct(token: string, data: ProductInfo | FormData): Promise<ProductInfo> {
    const url = `/product`;
    return axiosClient.post(url, data, config(token));
  },
  deleteProduct(token: string, productId: number): Promise<void> {
    const url = `/product/${productId}`;
    return axiosClient.delete(url, config(token));
  },
  updateProduct(token: string, productId: number, data: ProductInfo): Promise<void> {
    const url = `/product/${productId}`;
    return axiosClient.put(url, data, config(token));
  },
};

export default productApi;
