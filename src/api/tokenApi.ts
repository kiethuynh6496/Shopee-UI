import { TokenResponse } from 'models/authentication/tokenResponse';
import axiosClient from './axiosClient';

const tokenApi = {
  refreshToken(refreshToken: string | null): Promise<TokenResponse> {
    const url = `/token/refresh`;
    return axiosClient.post(url, refreshToken);
  },
};

export default tokenApi;
