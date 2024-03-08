export interface LoginResponseInformation {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginResponse {
  statusCode: number;
  massage: string;
  data: LoginResponseInformation;
}
