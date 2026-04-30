import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-24">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-16">
        <div className="col-span-2">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">BeautyHome</h2>
          <p className="text-white/60 max-w-sm leading-relaxed mb-10 text-lg">
            Mang đẳng cấp Spa đến tận nhà bạn. Chúng tôi cam kết mang lại trải nghiệm làm đẹp chuyên nghiệp, tin cậy và thư giãn tuyệt đối.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-xl tracking-tight">Khám phá</h4>
          <ul className="space-y-4 text-white/50 text-lg">
            <li><Link to="/services" className="hover:text-white transition-colors">Dịch vụ</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Tin tức & Mẹo</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-xl tracking-tight">Liên hệ</h4>
          <ul className="space-y-6 text-white/50 text-lg">
            <li className="flex items-start">
              <MapPin className="mr-4 mt-1 text-secondary" size={20} />
              <span>123 Beauty Street, Quận 1, TP. HCM</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-4 text-secondary" size={20} />
              <span>support@beautyhome.vn</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-4 text-secondary" size={20} />
              <span>0123 456 789</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-sm tracking-wide">
        <p>© 2026 BeautyHome. Tất cả quyền được bảo lưu.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Chính sách bảo mật</a>
          <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
