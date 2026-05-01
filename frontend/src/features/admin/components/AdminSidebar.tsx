import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { selectCurrentUser, fetchCurrentUser, logout } from '../../auth/authSlice';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Layers,
  Sparkles,
  User
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin/dashboard' },
    { icon: ShoppingBag, label: 'Lịch hẹn', path: '/admin/bookings' },
    { icon: Sparkles, label: 'Dịch vụ', path: '/admin/services' },
    { icon: Layers, label: 'Danh mục', path: '/admin/categories' },
    { icon: Users, label: 'Nhân viên', path: '/admin/staff' },
    { icon: Settings, label: 'Cài đặt', path: '/admin/settings' },
  ];

  return (
    <div className="w-80 h-screen bg-primary flex flex-col p-8 sticky top-0">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-16 px-4">
        <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary">
          <Sparkles size={24} />
        </div>
        <span className="text-2xl font-bold text-white tracking-tighter italic">BeautyHome</span>
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
                  ? 'bg-white/10 text-secondary' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-secondary' : 'group-hover:scale-110 transition-transform'} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="mb-6 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary font-bold">
          {user?.full_name?.charAt(0) || 'A'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{user?.full_name || 'Admin'}</p>
          <p className="text-[10px] text-white/40 font-medium truncate">{user?.email}</p>
        </div>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-white/40 hover:text-rose-400 hover:bg-rose-400/5 transition-all mt-auto group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm tracking-wide">Đăng xuất</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
