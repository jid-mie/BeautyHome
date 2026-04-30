import React, { useState } from 'react';
import { Mail, Phone, User, MapPin, Plus, Trash2, Edit2, Check, Loader2 } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAppDispatch } from '../../../app/store';
import { fetchCurrentUser } from '../../auth/authSlice';

const ProfilePage: React.FC = () => {
  const { profile, isLoading, isUpdating } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Hồ sơ cá nhân</h1>
          <p className="text-primary/40 font-medium mt-1">Cập nhật thông tin và địa chỉ để đặt lịch nhanh hơn.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
            isEditing 
              ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' 
              : 'bg-primary/5 text-primary hover:bg-primary/10'
          }`}
        >
          {isEditing ? (
            <><Check size={18} className="mr-2" /> Lưu thay đổi</>
          ) : (
            <><Edit2 size={18} className="mr-2" /> Chỉnh sửa</>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Basic Info */}
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-[32px] bg-primary/5 border border-primary/5 flex items-center justify-center text-primary/20 relative group overflow-hidden">
               <User size={48} />
               <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                  <Edit2 size={24} />
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">{profile?.name || 'Khách hàng'}</h3>
              <p className="text-primary/40 text-sm font-medium">Thành viên từ {profile?.memberSince}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                <input 
                  type="text" 
                  defaultValue={profile?.name}
                  disabled={!isEditing}
                  className="w-full bg-primary/5 border border-transparent rounded-[24px] pl-12 pr-6 py-5 focus:bg-white focus:border-secondary transition-all font-bold text-primary disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                <input 
                  type="email" 
                  defaultValue={profile?.email}
                  disabled
                  className="w-full bg-primary/5 border border-transparent rounded-[24px] pl-12 pr-6 py-5 font-bold text-primary opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
                <input 
                  type="tel" 
                  placeholder="Chưa cập nhật"
                  defaultValue={profile?.phone}
                  disabled={!isEditing}
                  className="w-full bg-primary/5 border border-transparent rounded-[24px] pl-12 pr-6 py-5 focus:bg-white focus:border-secondary transition-all font-bold text-primary disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-primary">Sổ địa chỉ</h3>
            <button className="text-secondary hover:text-secondary/80 flex items-center font-bold text-sm transition-colors">
              <Plus size={18} className="mr-1" /> Thêm mới
            </button>
          </div>

          <div className="space-y-4">
            {profile?.addresses.map((addr) => (
              <div 
                key={addr.id} 
                className={`p-6 rounded-[32px] border transition-all ${
                  addr.isDefault 
                    ? 'bg-secondary/5 border-secondary/20 ring-1 ring-secondary/10' 
                    : 'bg-white border-primary/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`mt-1 p-2 rounded-xl mr-4 ${addr.isDefault ? 'bg-secondary text-primary' : 'bg-primary/5 text-primary/40'}`}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-primary mr-3">{addr.type}</span>
                        {addr.isDefault && (
                          <span className="bg-primary text-white text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">Mặc định</span>
                        )}
                      </div>
                      <p className="text-sm text-primary/60 leading-relaxed max-w-[200px]">{addr.address}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-primary/20 hover:text-primary transition-colors">
                       <Edit2 size={16} />
                    </button>
                    {!addr.isDefault && (
                      <button className="p-2 text-primary/20 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
