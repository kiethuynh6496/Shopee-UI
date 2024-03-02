import { AddressRequest, AddressResponse } from 'models';
import axiosClient, { config } from './axiosClient';

export const addressApi = {
  createAddress(addressData: AddressRequest, token: string): Promise<AddressResponse> {
    const url = `/addresses`;
    return axiosClient.post(url, addressData, config(token));
  },

  getAddresses(token: string): Promise<AddressResponse[]> {
    const url = `/addresses`;
    return axiosClient.get(url, config(token));
  },

  getAddress(addressId: number): Promise<AddressResponse> {
    const url = `/addresses/${addressId}`;
    return axiosClient.get(url);
  },

  updateAddress(addressId: number, addressData: AddressRequest): Promise<void> {
    const url = `/addresses/${addressId}`;
    return axiosClient.put(url, addressData);
  },
};
