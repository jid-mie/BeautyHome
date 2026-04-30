import React from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout 
      title="Chào mừng quay lại" 
      subtitle="Vui lòng nhập thông tin của bạn để tiếp tục."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
