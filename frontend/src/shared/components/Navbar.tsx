import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { selectIsAuthenticated, selectCurrentUser, fetchCurrentUser } from '../../features/auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);

  const getInitial = () => {
    const name = currentUser?.full_name || currentUser?.name || currentUser?.email || '';
    return name.charAt(0).toUpperCase() || 'U';
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none">
      <div className="mx-auto max-w-6xl relative pointer-events-auto">
        {/* The "Seamless Silk" Background Layer */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isScrolled 
              ? 'bg-surface/80 backdrop-blur-xl rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 opacity-100 scale-100' 
              : 'bg-transparent opacity-0 scale-[0.98]'
          }`}
        />

        {/* Content Layer (Stable Layout) */}
        <div 
          className={`relative z-10 flex justify-between items-center transition-all duration-500 px-8 py-4 ${
            isScrolled ? 'py-3' : 'py-5'
          }`}
        >
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
            BeautyHome<span className="text-secondary italic">.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {['Trang chủ', 'Dịch vụ', 'Về chúng tôi'].map((item) => (
              <Link 
                key={item}
                to={item === 'Trang chủ' ? '/' : item === 'Dịch vụ' ? '/services' : '/about'} 
                className="group relative text-[13px] font-bold tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-primary/10 mx-2" />
            
            {isAuthenticated ? (
              <Link 
                to="/account/profile" 
                className="group flex items-center space-x-3"
              >
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-secondary/20 group-hover:shadow-xl group-hover:shadow-secondary/30 group-hover:scale-105 transition-all duration-300 ring-2 ring-white/80">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitial()
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                </div>
                <span className="text-[12px] font-bold text-primary/60 group-hover:text-primary transition-colors tracking-wide max-w-[100px] truncate">
                  {currentUser?.full_name || currentUser?.name || 'Tài khoản'}
                </span>
              </Link>
            ) : (
              <div className="flex items-center space-x-8">
                <Link to="/login" className="text-[13px] font-bold tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors">Đăng nhập</Link>
                <Link 
                  to="/register" 
                  className="btn-primary px-10 py-3 rounded-full text-[12px] font-bold tracking-widest uppercase hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                >
                  Bắt đầu ngay
                </Link>
              </div>
            )}
          </div>
          
          <button className="md:hidden text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
