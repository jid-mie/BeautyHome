import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { LazyRoute } from '../../shared/components/LazyRoute';

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage'));

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LazyRoute component={LoginPage} />,
  },
  {
    path: '/register',
    element: <LazyRoute component={RegisterPage} />,
  },
];
