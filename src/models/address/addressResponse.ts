export interface AddressResponseInfo {
  id: number;
  nickName: string;
  addressName: string;
  phone: string;
  isDefault: boolean;
}

export interface AddressResponse {
  statusCode: number;
  massage: string;
  data: AddressResponseInfo[];
}
