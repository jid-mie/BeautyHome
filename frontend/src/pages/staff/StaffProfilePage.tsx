import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, MapPin, Briefcase, Check, Edit2, Loader2, Lock } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { selectCurrentUser, fetchCurrentUser } from '../../features/auth/authSlice';

import { Link } from 'react-router-dom';
import SessionManager from '../../features/auth/components/SessionManager';

const StaffProfilePage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <User size={32} className="text-slate-200" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy thông tin</h2>
        <p className="text-slate-500 mb-8 max-w-xs">Vui lòng đăng nhập lại để xem và cập nhật hồ sơ của bạn.</p>
        <Link 
          to="/login" 
          className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg transition-all"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hồ sơ Nhân viên</h1>
          <p className="text-slate-500 font-medium mt-1">Thông tin cá nhân và kỹ năng chuyên môn của bạn.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
            isEditing 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isEditing ? (
            <><Check size={18} className="mr-2" /> Lưu thay đổi</>
          ) : (
            <><Edit2 size={18} className="mr-2" /> Chỉnh sửa</>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-200 mb-6 relative group overflow-hidden border-2 border-dashed border-slate-200">
               <User size={64} />
               {isEditing && (
                 <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 size={24} />
                 </div>
               )}
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{user.full_name || user.name}</h3>
            <p className="text-emerald-500 font-bold text-sm uppercase tracking-widest mt-2">Kỹ thuật viên</p>
            
            <div className="w-full mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Trạng thái</span>
                <span className={`flex items-center font-bold ${
                  (user.status === 1 || user.status === '1') ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                   <div className={`w-2 h-2 rounded-full mr-2 ${
                     (user.status === 1 || user.status === '1') ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                   }`} />
                   {(user.status === 1 || user.status === '1') ? 'Đang hoạt động' : 'Tạm nghỉ / Khóa'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Mã nhân viên</span>
                <span className="text-slate-900 font-bold">#STF-{user.id}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white">
            <div className="flex items-center mb-4">
              <Lock size={18} className="text-emerald-400 mr-3" />
              <h4 className="font-bold">Bảo mật</h4>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Bạn nên thay đổi mật khẩu định kỳ 3 tháng một lần để bảo vệ tài khoản.
            </p>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all">
              Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    defaultValue={user.full_name || user.name}
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border-none rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-700 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel" 
                    defaultValue={user.phone}
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border-none rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-700 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Email cá nhân</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    disabled
                    className="w-full bg-slate-50 border-none rounded-3xl pl-12 pr-6 py-4 font-bold text-slate-700 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Địa chỉ</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    defaultValue={user.address}
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border-none rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-700 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Kỹ năng & Chuyên môn</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-6 text-slate-300" size={18} />
                <textarea 
                  rows={4}
                  defaultValue={user.skill}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 border-none rounded-3xl pl-12 pr-6 py-5 focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-700 disabled:opacity-60 resize-none"
                  placeholder="Mô tả các kỹ năng chuyên môn của bạn..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
             {isEditing && (
               <button 
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
               >
                 Hủy bỏ
               </button>
             )}
          </div>
        </div>
      </div>

      {/* Session Management Section */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
        <SessionManager />
      </div>
    </div>
  );
};

export default StaffProfilePage;
