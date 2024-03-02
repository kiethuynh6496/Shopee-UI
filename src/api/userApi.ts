import { UserInformation } from 'models/user/userInformation';
import axiosClient, { config } from './axiosClient';

const userApi = {
  getUserDetail(token:string): Promise<UserInformation> {
    const url = `/users/user-details`;
    return axiosClient.get(url, config(token));
  },
};

export default userApi;
