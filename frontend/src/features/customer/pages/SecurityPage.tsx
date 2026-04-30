import React from 'react';
import { Shield, Key, Smartphone, AlertTriangle } from 'lucide-react';
import SessionManager from '../../auth/components/SessionManager';

const SecurityPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Bảo mật tài khoản</h1>
        <p className="text-primary/40 font-medium mt-1">Quản lý mật khẩu và các phiên đăng nhập của bạn.</p>
      </div>

      <div className="grid gap-8">
        {/* Password Change Card */}
        <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/5 flex items-center justify-between group hover:bg-primary/10 transition-all cursor-pointer">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
              <Key size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">Thay đổi mật khẩu</h3>
              <p className="text-sm text-primary/40 font-medium">Cập nhật mật khẩu định kỳ để bảo vệ tài khoản tốt hơn.</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-white rounded-full text-xs font-bold text-primary uppercase tracking-widest shadow-sm">
            Thay đổi
          </div>
        </div>

        {/* 2FA Placeholder */}
        <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/5 flex items-center justify-between opacity-60">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Smartphone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">Xác thực 2 lớp (2FA)</h3>
              <p className="text-sm text-primary/40 font-medium">Tính năng đang được phát triển.</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-white/50 rounded-full text-[10px] font-bold text-primary/40 uppercase tracking-widest">
            Sắp ra mắt
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-primary/5">
        <SessionManager />
      </div>

      <div className="p-8 bg-red-50 rounded-[32px] border border-red-100 flex items-start space-x-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-500 shadow-sm flex-shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-red-900 mb-1">Khu vực nguy hiểm</h4>
          <p className="text-sm text-red-700/70 leading-relaxed mb-4">
            Xóa tài khoản sẽ gỡ bỏ toàn bộ dữ liệu, lịch sử đặt lịch và các ưu đãi hiện có. Hành động này không thể hoàn tác.
          </p>
          <button className="text-red-500 font-bold text-sm hover:underline">Xóa tài khoản của tôi</button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
