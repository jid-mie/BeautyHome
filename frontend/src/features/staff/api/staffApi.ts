import apiClient from '../../../services/apiClient';

export const staffApi = {
  getMyBookings: async () => {
    const response = await apiClient.get('/staff/bookings');
    return response.data;
  },

  updateBookingStatus: async (id: number, status: string) => {
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
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
