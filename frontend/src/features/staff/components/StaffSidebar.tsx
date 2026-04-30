import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { selectCurrentUser, fetchCurrentUser } from '../../auth/authSlice';
import { logout } from '../../auth/authSlice';
import { 
  Calendar, 
  User, 
  LogOut, 
  Clock,
  Sparkles,
  Inbox
} from 'lucide-react';

const StaffSidebar: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  const menuItems = [
    { icon: Inbox, label: 'Việc làm mới', path: '/staff/jobs' },
    { icon: Calendar, label: 'Lịch của tôi', path: '/staff/bookings' },
    { icon: User, label: 'Hồ sơ cá nhân', path: '/staff/profile' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-80 h-screen bg-slate-900 flex flex-col p-8 sticky top-0">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-16 px-4">
        <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
          <Sparkles size={24} />
        </div>
        <span className="text-2xl font-bold text-white tracking-tighter italic">BeautyStaff</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/10 text-emerald-400' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-emerald-400' : 'group-hover:scale-110 transition-transform'} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="mb-6 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
          {user?.full_name?.charAt(0) || 'S'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{user?.full_name || 'Nhân viên'}</p>
          <p className="text-[10px] text-white/40 font-medium truncate">{user?.email}</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Trạng thái</span>
          <div className={`w-2 h-2 rounded-full ${(user?.status === 1 || user?.status === '1') ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
        </div>
        <p className="text-sm font-bold text-white">
          {(user?.status === 1 || user?.status === '1') ? 'Sẵn sàng nhận việc' : 'Tạm dừng hoạt động'}
        </p>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm tracking-wide">Đăng xuất</span>
      </button>
    </div>
  );
};

export default StaffSidebar;
