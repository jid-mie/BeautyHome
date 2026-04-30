import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  isDark?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isDark }) => {
  const { loginForm, handleLogin, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = loginForm;

  const inputClasses = isDark 
    ? 'w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary/50 outline-none transition-all'
    : `w-full input-standard border ${errors.email ? 'border-error' : 'border-transparent'}`;

  const labelClasses = isDark
    ? 'block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3'
    : 'block text-sm font-medium text-primary mb-2';

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-8">
      {error && (
        <div className={`p-4 text-sm rounded-xl ${isDark ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-error-container text-error'}`}>
          {error}
        </div>
      )}

      <div>
        <label className={labelClasses}>
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="admin@beautyhome.com"
          className={inputClasses}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-rose-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between mb-3">
          <label className={labelClasses}>
            Security Password
          </label>
          {!isDark && (
            <a href="#" className="text-xs text-secondary hover:text-primary transition-colors">
              Quên mật khẩu?
            </a>
          )}
        </div>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className={inputClasses}
        />
        {errors.password && (
          <p className="mt-2 text-xs text-rose-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 ${
          isDark 
            ? 'bg-secondary text-primary hover:bg-secondary/90 shadow-lg shadow-secondary/20' 
            : 'btn-primary'
        }`}
      >
        {loading ? 'Authenticating...' : isDark ? 'Authorize Access' : 'Đăng nhập'}
      </button>

      {!isDark && (
        <div className="text-center mt-8">
          <p className="text-sm text-secondary">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
