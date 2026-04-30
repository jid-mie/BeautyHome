import React from 'react';
import LoginForm from '../components/LoginForm';
import { Sparkles, ShieldCheck } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-white/5 rounded-3xl border border-white/10 mb-6 backdrop-blur-xl">
            <ShieldCheck className="text-secondary" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tighter italic mb-2">BeautyHome <span className="text-secondary font-light not-italic text-2xl ml-2">Admin</span></h1>
          <p className="text-slate-400 font-medium">Hệ thống quản trị và điều hành tập trung</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <LoginForm isDark />
        </div>
        
        <p className="text-center mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 BeautyHome Security Protocol
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
