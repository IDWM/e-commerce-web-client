import { axiosClient } from '@/clients';
import { ApiResponse, LoginRequest, LoginResponse } from '@/models';

export const authClient = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);

    return response.data;
  },
};
