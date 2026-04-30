import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { selectIsAuthenticated, fetchCurrentUser } from '../../features/auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
                className="btn-primary px-8 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                Tài khoản
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
