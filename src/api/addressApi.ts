import { AddressRequest, AddressResponse, AddressResponseInfo } from 'models';
import axiosClient from './axiosClient';

export const addressApi = {
  getAddress(): Promise<AddressResponse> {
    const url = `/address/get-address`;
    return axiosClient.get(url);
  },

  createAddress(addressData: AddressRequest): Promise<void> {
    const url = `/address/create-address`;
    return axiosClient.post(url, addressData);
  },

  updateDefaultAddress(id: Number): Promise<AddressResponseInfo> {
    const url = `/address/set-default-address?id=${id}`;
    return axiosClient.patch(url);
  },

  deleteAddress(id: Number): Promise<AddressResponse> {
    const url = `/address/delete-address?id=${id}`;
    return axiosClient.delete(url);
  },
};
