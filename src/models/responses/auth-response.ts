import { ApiResponse } from '@/models';

export interface AuthResponse {
  firtsName: string;
  lastName: string;
  email: string;
  token: string;
}

export type LoginResponse = ApiResponse<AuthResponse>;
