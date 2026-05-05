import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { lazyRoute } from '../../shared/components/LazyRoute';

const StaffLayout = lazy(() => import('../../layouts/StaffLayout'));
const StaffBookingPage = lazy(() => import('../../pages/staff/StaffBookingPage'));
const StaffCalendarPage = lazy(() => import('../../pages/staff/StaffCalendarPage'));
const StaffProfilePage = lazy(() => import('../../pages/staff/StaffProfilePage'));

export const staffRoutes: RouteObject = {
  path: '/staff',
  element: <ProtectedRoute allowedRoles={['staff']} />,
  children: [
    {
      element: lazyRoute(StaffLayout),
      children: [
        { path: 'jobs', element: lazyRoute(StaffBookingPage) },
        { path: 'bookings', element: lazyRoute(StaffCalendarPage) },
        { path: 'profile', element: lazyRoute(StaffProfilePage) },
        { index: true, element: <Navigate to="/staff/jobs" replace /> },
      ],
    },
  ],
};
