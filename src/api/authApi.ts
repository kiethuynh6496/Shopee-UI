import { AuthInformation, LoginResponse } from 'models';
import axiosClient from './axiosClient';
import { LogoutResponse } from 'models/authentication/logoutResponse';

const authApi = {
  login(body: AuthInformation): Promise<LoginResponse> {
    const url = `/auth/login`;
    return axiosClient.post(url, body);
  },
  register(body: AuthInformation): Promise<AuthInformation> {
    const url = `/auth/register`;
    return axiosClient.post(url, body);
  },
  logout(): Promise<LogoutResponse> {
    const url = `/auth/logout`;
    return axiosClient.post(url);
  },
};

export default authApi;
