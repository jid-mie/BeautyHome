import apiClient from '../../../services/apiClient';

export const adminApi = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },
  
  getBookings: async () => {
    const response = await apiClient.get('/admin/bookings');
    return response.data;
  },

  updateBooking: async (id: any, data: any) => {
    const response = await apiClient.put(`/admin/bookings/${id}`, data);
    return response.data;
  },

  createBooking: async (data: any) => {
    const response = await apiClient.post('/admin/bookings', data);
    return response.data;
  },

  getStaff: async () => {
    const response = await apiClient.get('/admin/staff');
    return response.data;
  },

  createStaff: async (data: any) => {
    const response = await apiClient.post('/admin/staff', data);
    return response.data;
  },

  updateStaff: async (id: any, data: any) => {
    const response = await apiClient.put(`/admin/staff/${id}`, data);
    return response.data;
  },

  deleteStaff: async (id: any) => {
    const response = await apiClient.delete(`/admin/staff/${id}`);
    return response.data;
  },

  updateService: async (id: number, data: any) => {
    const response = await apiClient.put(`/admin/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: number) => {
    const response = await apiClient.delete(`/admin/services/${id}`);
    return response.data;
  },

  getCustomers: async () => {
    const response = await apiClient.get('/admin/customers');
    return response.data;
  },

  getPayments: async () => {
    const response = await apiClient.get('/admin/payments');
    return response.data;
  },

  getFeedback: async () => {
    const response = await apiClient.get('/admin/feedback');
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  },

  createCategory: async (data: any) => {
    const response = await apiClient.post('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (id: any, data: any) => {
    const response = await apiClient.put(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: any) => {
    const response = await apiClient.delete(`/admin/categories/${id}`);
    return response.data;
  },

  getServices: async () => {
    const response = await apiClient.get('/admin/services');
    return response.data;
  },

  createService: async (data: any) => {
    const response = await apiClient.post('/admin/services', data);
    return response.data;
  }
};
