import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Search, Tag, Loader2, Inbox, X, ShieldCheck, User } from 'lucide-react';
import { useBookings } from '../../bookings/hooks/useBookings';
import { Booking } from '../../bookings/types';

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ duyệt', color: 'text-orange-600', bg: 'bg-orange-50' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-600', bg: 'bg-blue-50' },
  in_progress: { label: 'Đang làm', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  completed: { label: 'Đã hoàn thành', color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-50' },
};

const MyBookingsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { data: bookings, isLoading } = useBookings(activeFilter);

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'upcoming', label: 'Sắp tới' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  const filteredBookings = bookings?.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Lịch sử đặt lịch</h1>
          <p className="text-primary/40 font-medium mt-1">Theo dõi các dịch vụ bạn đã đăng ký.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã hoặc dịch vụ..."
              className="bg-primary/5 border-none rounded-full pl-10 pr-6 py-3 text-sm focus:ring-2 focus:ring-secondary/50 outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-primary/5 pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-6 py-3 text-sm font-bold tracking-wide transition-all relative ${
              activeFilter === f.id ? 'text-primary' : 'text-primary/40 hover:text-primary/60'
            }`}
          >
            {f.label}
            {activeFilter === f.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6 min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-secondary" size={48} />
          </div>
        ) : filteredBookings && filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
          <div 
            key={booking.id}
            className="group bg-white rounded-[32px] border border-primary/5 p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              {/* Service Info */}
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-primary/5 border border-primary/5">
                  <img src={booking.image} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                </div>
                <div className="ml-6 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">{booking.id}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${statusStyles[booking.status]?.bg || 'bg-gray-50'} ${statusStyles[booking.status]?.color || 'text-gray-400'}`}>
                      {statusStyles[booking.status]?.label || 'Không xác định'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary truncate mb-1">{booking.serviceTitle}</h3>
                  <div className="flex items-center text-primary/40 text-sm">
                    <Tag size={12} className="mr-2" />
                    <span>Tổng tiền: {booking.price}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="flex lg:flex-col lg:items-end gap-8 lg:gap-2 flex-shrink-0">
                <div className="flex items-center text-primary/60 whitespace-nowrap">
                  <Calendar size={16} className="mr-2 text-secondary" />
                  <span className="font-bold">{booking.date}</span>
                </div>
                <div className="flex items-center text-primary/60 whitespace-nowrap">
                  <Clock size={16} className="mr-2 text-secondary" />
                  <span className="font-bold">{booking.time}</span>
                </div>
              </div>

              {/* Address */}
              <div className="lg:w-48 flex items-start text-primary/40 text-[13px] leading-relaxed">
                <MapPin size={14} className="mr-2 mt-1 flex-shrink-0" />
                <span className="line-clamp-2">{booking.address || 'Chưa cung cấp địa chỉ'}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 lg:ml-4">
                <button 
                  onClick={() => setSelectedBooking(booking)}
                  className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all group-hover:translate-x-1 duration-300 flex items-center"
                >
                  Chi tiết <ChevronRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-primary/20">
            <Inbox size={64} strokeWidth={1} />
            <p className="mt-4 font-bold tracking-widest uppercase text-xs">Không tìm thấy lịch hẹn nào</p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setSelectedBooking(null)} />
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="relative h-48">
              <img src={selectedBooking.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button 
                onClick={() => setSelectedBooking(null)}
                className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{selectedBooking.id}</span>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedBooking.serviceTitle}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Thời gian</span>
                  <div className="flex items-center font-bold text-primary">
                    <Calendar size={16} className="mr-2 text-secondary" />
                    {selectedBooking.date}
                  </div>
                  <div className="flex items-center font-bold text-primary">
                    <Clock size={16} className="mr-2 text-secondary" />
                    {selectedBooking.time}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Trạng thái</span>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${statusStyles[selectedBooking.status]?.bg} ${statusStyles[selectedBooking.status]?.color}`}>
                    <ShieldCheck size={14} className="mr-2" />
                    {statusStyles[selectedBooking.status]?.label}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Địa điểm thực hiện</span>
                <div className="flex items-start p-4 bg-primary/5 rounded-2xl">
                  <MapPin size={18} className="mr-3 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-sm font-medium text-primary leading-relaxed">
                    {selectedBooking.address || 'Chưa cung cấp địa chỉ chi tiết.'}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest block mb-1">Tổng thanh toán</span>
                  <span className="text-2xl font-bold text-secondary">{selectedBooking.price}</span>
                </div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
