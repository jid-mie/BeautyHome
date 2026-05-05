import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { LazyRoute } from '../../shared/components/LazyRoute';

const MainLayout = lazy(() => import('../../layouts/MainLayout'));
const HomePage = lazy(() => import('../../pages/customer/HomePage'));
const ServicesPage = lazy(() => import('../../features/services/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../../features/services/pages/ServiceDetailPage'));
const AccountLayout = lazy(() => import('../../features/customer/layouts/AccountLayout'));
const ProfilePage = lazy(() => import('../../features/customer/pages/ProfilePage'));
const MyBookingsPage = lazy(() => import('../../features/customer/pages/MyBookingsPage'));
const NotificationsPage = lazy(() => import('../../features/customer/pages/NotificationsPage'));
const SecurityPage = lazy(() => import('../../features/customer/pages/SecurityPage'));

export const customerRoutes: RouteObject = {
  path: '/',
  element: <LazyRoute component={MainLayout} />,
  children: [
    { index: true, element: <LazyRoute component={HomePage} /> },
    { path: 'services', element: <LazyRoute component={ServicesPage} /> },
    { path: 'services/:id', element: <LazyRoute component={ServiceDetailPage} /> },
    {
      element: <ProtectedRoute allowedRoles={['customer']} />,
      children: [
        {
          path: 'account',
          element: <LazyRoute component={AccountLayout} />,
          children: [
            { path: 'profile', element: <LazyRoute component={ProfilePage} /> },
            { path: 'bookings', element: <LazyRoute component={MyBookingsPage} /> },
            { path: 'notifications', element: <LazyRoute component={NotificationsPage} /> },
            { path: 'security', element: <LazyRoute component={SecurityPage} /> },
            { index: true, element: <LazyRoute component={ProfilePage} /> },
          ],
        },
      ],
    },
  ],
};
