import { createBrowserRouter } from 'react-router-dom';
import { customerRoutes } from './routes/customerRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { staffRoutes } from './routes/staffRoutes';
import { authRoutes } from './routes/authRoutes';

/**
 * Cấu hình Route tập trung
 * Tách biệt các module: Customer, Admin, Staff, Auth
 */
export const router = createBrowserRouter([
  customerRoutes,
  adminRoutes,
  staffRoutes,
  ...authRoutes,
  
  // Fallback route (404) có thể thêm ở đây
]);
