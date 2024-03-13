import { PaymentMoMoResponse } from 'models/payment/paymentMoMoResponse';
import axiosClient from './axiosClient';

const paymentApi = {
  createMoMoPayment(): Promise<PaymentMoMoResponse> {
    const url = `/payment/momo`;
    return axiosClient.post(url);
  },
};

export default paymentApi;
