export interface Address {
  name: string;
  isDefault: boolean;
}
export interface UserInfor {
  id: string;
  fullName: string;
  email: string;
  birthDay: string;
  phoneNumber: string;
  addresses: Address[];
}

export interface UserResponse {
  statusCode: number;
  massage: string;
  data: UserInfor;
}
