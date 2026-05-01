import axios from 'axios';
import { storage } from '../shared/utils/storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Đảm bảo dùng HTTPS trong production
  if (import.meta.env.PROD && config.url?.startsWith('http://')) {
    config.url = config.url.replace('http://', 'https://');
  }
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xác định role để điều hướng về trang login đúng
      const path = window.location.pathname;
      let loginPath = '/login';
      
      if (path.startsWith('/admin')) {
        loginPath = '/admin/login';
      } else if (path.startsWith('/staff')) {
        loginPath = '/staff/login';
      }
      
      // Xóa dữ liệu phiên làm việc
      storage.clearAll();
      
      // Chuyển hướng về trang đăng nhập
      if (!window.location.pathname.includes('login')) {
        window.location.href = loginPath;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
