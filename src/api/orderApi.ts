import {
  OrderCreateInformation,
  OrderGetInformation,
  OrderStatus,
  OrderAddressRequest,
} from 'models';
import axiosClient, { config } from './axiosClient';

const orderApi = {
  createOrder(token: string, data: OrderCreateInformation): Promise<OrderCreateInformation> {
    const url = `/orders`;
    return axiosClient.post(url, data, config(token));
  },
  getOrder(token: string, id: number): Promise<OrderGetInformation> {
    const url = `/orders/${id}`;
    return axiosClient.get(url, config(token));
  },
  updateOrderStatus(token: string, id: number, data: OrderStatus): Promise<OrderStatus> {
    const url = `/orders/${id}/status`;
    return axiosClient.patch(url, data, config(token));
  },
  deleteOrder(token: string, id: number): Promise<void> {
    const url = `/orders/${id}`;
    return axiosClient.delete(url, config(token));
  },
  updateOrderAddress(
    token: string,
    orderId: number,
    data: OrderAddressRequest
  ): Promise<OrderGetInformation> {
    const url = `/orders/${orderId}`;
    return axiosClient.patch(url, data, config(token));
  },
};

export default orderApi;
