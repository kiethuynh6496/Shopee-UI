import { AuthInformation, LoginResponse } from 'models';
import axiosClient, { config } from './axiosClient';

const authApi = {
  login(body: AuthInformation): Promise<LoginResponse> {
    const url = `/auth/login`;
    return axiosClient.post(url, body);
  },
  register(body: AuthInformation): Promise<AuthInformation> {
    const url = `/auth/register`;
    return axiosClient.post(url, body);
  },
  logout(token: string): Promise<String> {
    const url = `/auth/logout`;
    return axiosClient.post(url, {}, config(token));
  },
};

export default authApi;
