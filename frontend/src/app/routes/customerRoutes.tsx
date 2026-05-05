import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { lazyRoute } from '../../shared/components/LazyRoute';

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
  element: lazyRoute(MainLayout),
  children: [
    { index: true, element: lazyRoute(HomePage) },
    { path: 'services', element: lazyRoute(ServicesPage) },
    { path: 'services/:id', element: lazyRoute(ServiceDetailPage) },
    {
      element: <ProtectedRoute allowedRoles={['customer']} />,
      children: [
        {
          path: 'account',
          element: lazyRoute(AccountLayout),
          children: [
            { path: 'profile', element: lazyRoute(ProfilePage) },
            { path: 'bookings', element: lazyRoute(MyBookingsPage) },
            { path: 'notifications', element: lazyRoute(NotificationsPage) },
            { path: 'security', element: lazyRoute(SecurityPage) },
            { index: true, element: lazyRoute(ProfilePage) },
          ],
        },
      ],
    },
  ],
};
