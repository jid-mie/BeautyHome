import apiClient from '../../../services/apiClient';
import { ServiceResponse } from '../types';

export const serviceApi = {
  getServices: async (): Promise<ServiceResponse> => {
    const response = await apiClient.get<ServiceResponse>('/services');
    return response.data;
  },
  
  getServiceById: async (id: string | number): Promise<{ success: boolean; data: any }> => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  }
};
