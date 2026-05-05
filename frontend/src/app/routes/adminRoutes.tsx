import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { lazyRoute } from '../../shared/components/LazyRoute';

const AdminLayout = lazy(() => import('../../layouts/AdminLayout'));
const AdminDashboardPage = lazy(() => import('../../pages/admin/AdminDashboardPage'));
const AdminServicePage = lazy(() => import('../../pages/admin/AdminServicePage'));
const AdminBookingPage = lazy(() => import('../../pages/admin/AdminBookingPage'));
const AdminStaffPage = lazy(() => import('../../pages/admin/AdminStaffPage'));
const AdminCategoryPage = lazy(() => import('../../pages/admin/AdminCategoryPage'));
const AdminCustomerPage = lazy(() => import('../../pages/admin/AdminCustomerPage'));
const AdminPaymentPage = lazy(() => import('../../pages/admin/AdminPaymentPage'));
const AdminLoginPage = lazy(() => import('../../features/auth/pages/AdminLoginPage'));

export const adminRoutes: RouteObject = {
  path: '/admin',
  children: [
    {
      path: 'login',
      element: lazyRoute(AdminLoginPage),
    },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />,
      children: [
        {
          element: lazyRoute(AdminLayout),
          children: [
            { path: 'dashboard', element: lazyRoute(AdminDashboardPage) },
            { path: 'services', element: lazyRoute(AdminServicePage) },
            { path: 'bookings', element: lazyRoute(AdminBookingPage) },
            { path: 'staff', element: lazyRoute(AdminStaffPage) },
            { path: 'categories', element: lazyRoute(AdminCategoryPage) },
            { path: 'customers', element: lazyRoute(AdminCustomerPage) },
            { path: 'payments', element: lazyRoute(AdminPaymentPage) },
            { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          ],
        },
      ],
    },
  ],
};
