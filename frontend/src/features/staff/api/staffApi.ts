import apiClient from '../../../services/apiClient';
import { StaffBookingStatus, StaffBookingsResponse } from '../types';

export const staffApi = {
  getMyBookings: async (): Promise<StaffBookingsResponse> => {
    const response = await apiClient.get<StaffBookingsResponse>('/staff/bookings');
    return response.data;
  },

  updateBookingStatus: async (id: number, status: StaffBookingStatus) => {
    const response = await apiClient.post(`/staff/bookings/${id}/update-status`, { status });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/staff/profile');
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post('/staff/profile/avatar', formData, {
      headers: { 'Content-Type': undefined as any },
    });
    return response.data;
  },
};
