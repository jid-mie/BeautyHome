import apiClient from '../../../services/apiClient';
import { CustomerProfile, UpdateProfileRequest, Address } from '../types';

interface BackendProfile {
  customer_id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export const customerApi = {
  getProfile: async (): Promise<CustomerProfile> => {
    const response = await apiClient.get<{ success: boolean; data: BackendProfile }>('/customer/profile');
    const b = response.data.data;
    
    return {
      id: b.customer_id.toString(),
      name: b.full_name,
      email: b.email,
      phone: b.phone || '',
      memberSince: new Date(b.created_at).getFullYear().toString(),
      addresses: b.address ? [
        { id: '1', type: 'Mặc định', address: b.address, isDefault: true, userId: b.customer_id.toString() }
      ] : [],
    };
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<any> => {
    // Backend expects full_name, phone, address
    const mappedData = {
      full_name: data.name,
      phone: data.phone,
      address: data.address
    };
    const response = await apiClient.post('/customer/profile/update', mappedData);
    return response.data;
  },

  addAddress: async (data: Omit<Address, 'id' | 'userId'>): Promise<Address> => {
    const response = await apiClient.post<Address>('/customer/profile/update', data);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<void> => {
    // Currently backend doesn't have multiple addresses table, just one address field in customers
    console.warn('Backend currently supports only one primary address in profile update.');
  },
};
