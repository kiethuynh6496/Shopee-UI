import { OrderCreateResponse, OrderGetInformation, OrderStatus } from 'models';
import axiosClient from './axiosClient';
import { OrderCreateRequest } from 'models/order/orderCreateRequest';

const orderApi = {
  createOrder(data: OrderCreateRequest): Promise<OrderCreateResponse> {
    const url = `/order?nickName=${data.nickName}&addressName=${data.addressName}&phone=${data.phone}`;
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
};

export default orderApi;
