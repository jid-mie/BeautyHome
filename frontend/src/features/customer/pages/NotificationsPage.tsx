import React from 'react';
import { Bell, CheckCircle2, Calendar, Gift, Info, Trash2 } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Đặt lịch thành công',
    desc: 'Yêu cầu đặt lịch dịch vụ "Massage Silk" đã được xác nhận vào lúc 08:00 ngày mai.',
    time: '5 phút trước',
    type: 'success',
    icon: <Calendar size={20} />,
    unread: true
  },
  {
    id: 2,
    title: 'Ưu đãi dành riêng cho bạn',
    desc: 'Giảm ngay 20% cho tất cả các dịch vụ chăm sóc da mặt trong tuần này. Đừng bỏ lỡ!',
    time: '2 giờ trước',
    type: 'promo',
    icon: <Gift size={20} />,
    unread: true
  },
  {
    id: 3,
    title: 'Cập nhật hệ thống',
    desc: 'BeautyHome vừa ra mắt tính năng Quản lý phiên đăng nhập mới trong phần Bảo mật.',
    time: 'Hôm qua',
    type: 'info',
    icon: <Info size={20} />,
    unread: false
  }
];

const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Thông báo</h1>
          <p className="text-primary/40 font-medium mt-1">Luôn cập nhật các ưu đãi và trạng thái đặt lịch mới nhất.</p>
        </div>
        <button className="text-secondary font-bold text-sm hover:underline flex items-center">
           <CheckCircle2 size={16} className="mr-2" /> Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((noti) => (
          <div 
            key={noti.id}
            className={`p-8 rounded-[32px] border transition-all flex items-start justify-between group ${
              noti.unread 
                ? 'bg-secondary/5 border-secondary/20 shadow-sm' 
                : 'bg-white border-primary/5 hover:border-primary/10'
            }`}
          >
            <div className="flex items-start space-x-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                noti.type === 'success' ? 'bg-emerald-500 text-white' : 
                noti.type === 'promo' ? 'bg-secondary text-primary' : 
                'bg-primary text-white'
              }`}>
                {noti.icon}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h4 className="font-bold text-primary mr-3 text-lg">{noti.title}</h4>
                  {noti.unread && (
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  )}
                </div>
                <p className="text-primary/60 text-sm leading-relaxed max-w-xl">{noti.desc}</p>
                <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mt-4 block">{noti.time}</span>
              </div>
            </div>
            <button className="p-3 text-primary/10 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
               <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-10 flex justify-center">
        <button className="px-8 py-4 bg-primary/5 text-primary/40 rounded-full font-bold text-sm hover:bg-primary/10 transition-all">
          Xem các thông báo cũ hơn
        </button>
      </div>
    </div>
  );
};

export default NotificationsPage;
