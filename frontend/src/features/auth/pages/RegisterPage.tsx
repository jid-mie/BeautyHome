import React from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout 
      title="Tạo tài khoản mới" 
      subtitle="Bắt đầu hành trình làm đẹp của bạn ngay hôm nay."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
