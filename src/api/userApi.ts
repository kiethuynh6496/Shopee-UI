import { UserResponse } from 'models/user/userInformation';
import axiosClient from './axiosClient';

const userApi = {
  getUserDetail(): Promise<UserResponse> {
    const url = `/auth/current-user`;
    return axiosClient.get(url);
  },
};

export default userApi;
