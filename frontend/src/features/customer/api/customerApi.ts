import apiClient from '../../../services/apiClient';
import { CustomerProfile, UpdateProfileRequest, Address } from '../types';

interface BackendProfile {
  customer_id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  created_at: string;
}

const getAvatarUrl = (avatar: string | null): string | undefined => {
  if (!avatar) return undefined;
  if (avatar.startsWith('http')) return avatar;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const origin = baseUrl.replace('/api', '');
  return `${origin}/uploads/avatars/${avatar}`;
};

export const customerApi = {
  getProfile: async (): Promise<CustomerProfile> => {
    const response = await apiClient.get<{ success: boolean; data: BackendProfile }>('/customer/profile');
    const b = response.data.data;
    
    return {
      id: b.customer_id.toString(),
      name: b.full_name,
      email: b.email,
      phone: b.phone || '',
      avatar: getAvatarUrl(b.avatar),
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

  uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post('/customer/profile/avatar', formData, {
      headers: { 'Content-Type': undefined as any },
    });
    return response.data;
  },
};
