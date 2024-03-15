import { ProductInfo, ProductResponse } from 'models/product/productInfo';
import axiosClient from './axiosClient';

const productApi = {
  getProduct(id: number): Promise<ProductResponse> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  getAllProduct(): Promise<ProductResponse> {
    const url = `/product`;
    return axiosClient.get(url);
  },
  getProductPagination(page: number, pageSize: number): Promise<ProductResponse> {
    const url = `/product?pageNumber=${page}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  getFilterProduct(filter: string, page: number, pageSize: number): Promise<ProductResponse> {
    const url = `/product?productName=${filter}&pageNumber=${page}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  createProduct(data: ProductInfo | FormData): Promise<ProductResponse> {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  deleteProduct(productId: number): Promise<void> {
    const url = `/product/${productId}`;
    return axiosClient.delete(url);
  },
  updateProduct(productId: number, data: ProductInfo): Promise<void> {
    const url = `/product/${productId}`;
    return axiosClient.put(url, data);
  },
};

export default productApi;
