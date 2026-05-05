import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { LazyRoute } from '../../shared/components/LazyRoute';

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
      element: <LazyRoute component={AdminLoginPage} />,
    },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />,
      children: [
        {
          element: <LazyRoute component={AdminLayout} />,
          children: [
            { path: 'dashboard', element: <LazyRoute component={AdminDashboardPage} /> },
            { path: 'services', element: <LazyRoute component={AdminServicePage} /> },
            { path: 'bookings', element: <LazyRoute component={AdminBookingPage} /> },
            { path: 'staff', element: <LazyRoute component={AdminStaffPage} /> },
            { path: 'categories', element: <LazyRoute component={AdminCategoryPage} /> },
            { path: 'customers', element: <LazyRoute component={AdminCustomerPage} /> },
            { path: 'payments', element: <LazyRoute component={AdminPaymentPage} /> },
            { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          ],
        },
      ],
    },
  ],
};
