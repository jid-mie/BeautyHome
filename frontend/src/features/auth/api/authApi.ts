import apiClient from '../../../services/apiClient';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/login', data);
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/register', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
  },

  getSessions: async (): Promise<any> => {
    const response = await apiClient.get('/auth/sessions');
    return response.data;
  },

  revokeSession: async (id: number): Promise<void> => {
    await apiClient.delete(`/auth/sessions/${id}`);
  },
  
  getAdminProfile: async (): Promise<any> => {
    const response = await apiClient.get('/admin/profile');
    return response.data;
  },
};
