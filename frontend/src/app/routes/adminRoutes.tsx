import { RouteObject, Navigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import AdminServicePage from '../../pages/admin/AdminServicePage';
import AdminBookingPage from '../../pages/admin/AdminBookingPage';
import AdminStaffPage from '../../pages/admin/AdminStaffPage';
import AdminCategoryPage from '../../pages/admin/AdminCategoryPage';
import AdminCustomerPage from '../../pages/admin/AdminCustomerPage';
import AdminPaymentPage from '../../pages/admin/AdminPaymentPage';
import AdminLoginPage from '../../features/auth/pages/AdminLoginPage';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';

export const adminRoutes: RouteObject = {
  path: '/admin',
  children: [
    {
      path: 'login',
      element: <AdminLoginPage />,
    },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { path: 'dashboard', element: <AdminDashboardPage /> },
            { path: 'services', element: <AdminServicePage /> },
            { path: 'bookings', element: <AdminBookingPage /> },
            { path: 'staff', element: <AdminStaffPage /> },
            { path: 'categories', element: <AdminCategoryPage /> },
            { path: 'customers', element: <AdminCustomerPage /> },
            { path: 'payments', element: <AdminPaymentPage /> },
            { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          ],
        },
      ],
    },
  ],
};
