import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  MapPin,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useStaffBookings } from '../../features/staff/hooks/useStaff';

const StaffCalendarPage: React.FC = () => {
  const { data: response, isLoading } = useStaffBookings();
  const bookings = response?.data || [];

  const [currentDate, setCurrentDate] = useState(new Date());

  // Logic lịch
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  // Padding cho các ngày trống của tháng trước
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push(d);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter((b: any) => b.booking_date === dateStr);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lịch làm việc</h1>
          <p className="text-slate-500 font-medium mt-1">Theo dõi lộ trình công việc của bạn theo thời gian.</p>
        </div>

        <div className="flex items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <span className="px-6 font-bold text-slate-900 min-w-[140px] text-center">
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-7 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-5 bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
          <div className="grid grid-cols-7 mb-8">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} className="aspect-square" />;
              
              const dayBookings = getBookingsForDay(day);
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

              return (
                <div 
                  key={day} 
                  className={`aspect-square relative flex flex-col items-center justify-center rounded-3xl transition-all border group cursor-pointer ${
                    isToday ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <span className={`text-lg font-bold ${isToday ? 'text-white' : 'text-slate-700'}`}>{day}</span>
                  {dayBookings.length > 0 && (
                    <div className="mt-1 flex space-x-1">
                      {dayBookings.slice(0, 3).map((_: any, i: number) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white/50' : 'bg-emerald-500'}`} />
                      ))}
                    </div>
                  )}
                  
                  {/* Tooltip on hover */}
                  {dayBookings.length > 0 && (
                    <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 w-48 bg-slate-900 text-white p-3 rounded-2xl text-[10px] shadow-2xl">
                        <p className="font-bold mb-2">Lịch ngày {day}:</p>
                        {dayBookings.map((b: any, i: number) => (
                          <div key={i} className="mb-2 text-white/70 last:mb-0">
                            <p>• {b.booking_time.substring(0,5)} - {b.booking_details?.[0]?.service?.service_name}</p>
                            <p className="pl-3 text-[8px] text-emerald-400 opacity-80 flex items-center"><MapPin size={8} className="mr-1" /> {b.address || 'Tại spa'}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
              <CalendarIcon size={18} className="mr-3 text-primary" />
              Sắp tới
            </h3>
            
            <div className="space-y-6">
              {bookings.filter((b: any) => b.status === 'confirmed' || b.status === 'in_progress').slice(0, 3).map((b: any) => (
                <div key={b.booking_id} className="relative pl-6 border-l-2 border-emerald-500/20">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{b.booking_date}</p>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{b.booking_details?.[0]?.service?.service_name}</h4>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock size={12} className="mr-2" />
                    {b.booking_time.substring(0,5)}
                  </div>
                </div>
              ))}
              
              {bookings.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4 italic">Không có lịch sắp tới</p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white">
            <h3 className="font-bold mb-4 text-emerald-400">Ghi chú</h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Luôn kiểm tra lịch trình vào buổi sáng để chuẩn bị vật tư chu đáo nhất cho khách hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCalendarPage;
