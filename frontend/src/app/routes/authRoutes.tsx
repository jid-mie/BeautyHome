import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { lazyRoute } from '../../shared/components/LazyRoute';

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage'));

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: lazyRoute(LoginPage),
  },
  {
    path: '/register',
    element: lazyRoute(RegisterPage),
  },
];
