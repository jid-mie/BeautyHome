import { RouteObject, Navigate } from 'react-router-dom';
import StaffLayout from '../../layouts/StaffLayout';
import StaffBookingPage from '../../pages/staff/StaffBookingPage';
import StaffCalendarPage from '../../pages/staff/StaffCalendarPage';
import StaffProfilePage from '../../pages/staff/StaffProfilePage';
import ProtectedRoute from '../../shared/components/guards/ProtectedRoute';

export const staffRoutes: RouteObject = {
  path: '/staff',
  element: <ProtectedRoute allowedRoles={['staff']} />,
  children: [
    {
      element: <StaffLayout />,
      children: [
        { path: 'jobs', element: <StaffBookingPage /> },
        { path: 'bookings', element: <StaffCalendarPage /> },
        { path: 'profile', element: <StaffProfilePage /> },
        { index: true, element: <Navigate to="/staff/jobs" replace /> },
      ],
    },
  ],
};
