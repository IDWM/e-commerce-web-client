import { apiClient } from '@/clients';

import type { LoginRequest, LoginResponse } from '@/models';

export const authClient = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
