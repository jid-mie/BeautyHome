import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { loginUser, registerUser, selectAuth, clearError } from '../authSlice';
import { loginSchema, registerSchema, LoginFormValues, RegisterFormValues } from '../types/schemas';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useAppSelector(selectAuth);

  // Login Form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Register Form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'staff') {
        navigate('/staff/jobs');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async (data: LoginFormValues) => {
    await dispatch(loginUser(data));
  };

  const handleRegister = async (data: RegisterFormValues) => {
    await dispatch(registerUser(data));
  };

  return {
    loginForm,
    registerForm,
    loading,
    error,
    handleLogin,
    handleRegister,
  };
};
