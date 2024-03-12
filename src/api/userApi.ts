import { UserResponse, UserUpdateRequest } from 'models/user/userInformation';
import axiosClient from './axiosClient';

const userApi = {
  getUserDetail(): Promise<UserResponse> {
    const url = `/auth/current-user`;
    return axiosClient.get(url);
  },
  updateCurrentUser(data: UserUpdateRequest): Promise<void> {
    const url = `/auth/update-current-user`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
