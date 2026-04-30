import { RouteObject } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../pages/customer/HomePage';
import ServicesPage from '../../features/services/pages/ServicesPage';
import ServiceDetailPage from '../../features/services/pages/ServiceDetailPage';
import AccountLayout from '../../features/customer/layouts/AccountLayout';
import ProfilePage from '../../features/customer/pages/ProfilePage';
import MyBookingsPage from '../../features/customer/pages/MyBookingsPage';
import NotificationsPage from '../../features/customer/pages/NotificationsPage';
import SecurityPage from '../../features/customer/pages/SecurityPage';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';

export const customerRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'services', element: <ServicesPage /> },
    { path: 'services/:id', element: <ServiceDetailPage /> },
    {
      element: <ProtectedRoute allowedRoles={['customer']} />,
      children: [
        {
          path: 'account',
          element: <AccountLayout />,
          children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'bookings', element: <MyBookingsPage /> },
            { path: 'notifications', element: <NotificationsPage /> },
            { path: 'security', element: <SecurityPage /> },
            { index: true, element: <ProfilePage /> },
          ],
        },
      ],
    },
  ],
};
