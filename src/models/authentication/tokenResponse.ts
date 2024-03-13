import { LoginResponseInformation } from "./loginResponseInfo";

export interface TokenResponse {
  statusCode: number;
  massage: string;
  data: LoginResponseInformation;
}