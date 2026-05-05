import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';
import { LazyRoute } from '../../shared/components/LazyRoute';

const StaffLayout = lazy(() => import('../../layouts/StaffLayout'));
const StaffBookingPage = lazy(() => import('../../pages/staff/StaffBookingPage'));
const StaffCalendarPage = lazy(() => import('../../pages/staff/StaffCalendarPage'));
const StaffProfilePage = lazy(() => import('../../pages/staff/StaffProfilePage'));

export const staffRoutes: RouteObject = {
  path: '/staff',
  element: <ProtectedRoute allowedRoles={['staff']} />,
  children: [
    {
      element: <LazyRoute component={StaffLayout} />,
      children: [
        { path: 'jobs', element: <LazyRoute component={StaffBookingPage} /> },
        { path: 'bookings', element: <LazyRoute component={StaffCalendarPage} /> },
        { path: 'profile', element: <LazyRoute component={StaffProfilePage} /> },
        { index: true, element: <Navigate to="/staff/jobs" replace /> },
      ],
    },
  ],
};
