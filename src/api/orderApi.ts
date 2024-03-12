import {
  OrderCreateInformation,
  OrderGetInformation,
  OrderStatus,
  OrderAddressRequest,
} from 'models';
import axiosClient from './axiosClient';

const orderApi = {
  createOrder(data: OrderCreateInformation): Promise<OrderCreateInformation> {
    const url = `/order`;
    return axiosClient.post(url, data);
  },
  getOrder(id: number): Promise<OrderGetInformation> {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
  updateOrderStatus(id: number, data: OrderStatus): Promise<OrderStatus> {
    const url = `/order/${id}/status`;
    return axiosClient.patch(url, data);
  },
  deleteOrder(id: number): Promise<void> {
    const url = `/order/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
