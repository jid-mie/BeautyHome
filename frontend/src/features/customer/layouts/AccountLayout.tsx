import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, ShoppingBag, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';

const AccountLayout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { icon: <User size={18} />, label: 'Hồ sơ cá nhân', path: '/account/profile' },
    { icon: <ShoppingBag size={18} />, label: 'Lịch sử đặt lịch', path: '/account/bookings' },
    { icon: <Bell size={18} />, label: 'Thông báo', path: '/account/notifications' },
    { icon: <Shield size={18} />, label: 'Bảo mật', path: '/account/security' },
  ];

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-primary/5 sticky top-32">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-primary tracking-tight">Tài khoản</h2>
                <p className="text-primary/40 text-xs font-bold tracking-widest uppercase mt-2">Quản lý trải nghiệm của bạn</p>
              </div>

              <nav className="space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-4 rounded-2xl transition-all group ${
                        isActive 
                          ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                          : 'text-primary/60 hover:bg-primary/5 hover:text-primary'
                      }`
                    }
                  >
                    <div className="flex items-center">
                      <span className="mr-4">{item.icon}</span>
                      <span className="font-bold text-sm tracking-wide">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-40 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                ))}

                <div className="h-[1px] bg-primary/5 my-6" />

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm tracking-wide group"
                >
                  <LogOut size={18} className="mr-4 group-hover:-translate-x-1 transition-transform" />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-[48px] p-12 shadow-sm border border-primary/5 min-h-[600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
