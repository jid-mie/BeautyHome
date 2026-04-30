import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterForm: React.FC = () => {
  const { registerForm, handleRegister, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = registerForm;

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      {error && (
        <div className="p-4 bg-error-container text-error text-sm rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-primary mb-1">
          Họ và tên
        </label>
        <input
          {...register('full_name')}
          type="text"
          placeholder="Nguyễn Văn A"
          className={`w-full input-standard border ${
            errors.full_name ? 'border-error' : 'border-transparent'
          }`}
        />
        {errors.full_name && (
          <p className="mt-1 text-xs text-error">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">
          Số điện thoại
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="0901234567"
          className={`w-full input-standard border ${
            errors.phone ? 'border-error' : 'border-transparent'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="email@example.com"
          className={`w-full input-standard border ${
            errors.email ? 'border-error' : 'border-transparent'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">
          Mật khẩu
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className={`w-full input-standard border ${
            errors.password ? 'border-error' : 'border-transparent'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">
          Xác nhận mật khẩu
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className={`w-full input-standard border ${
            errors.confirmPassword ? 'border-error' : 'border-transparent'
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Đang xử lý...' : 'Đăng ký'}
      </button>

      <div className="text-center mt-6">
        <p className="text-sm text-secondary">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
