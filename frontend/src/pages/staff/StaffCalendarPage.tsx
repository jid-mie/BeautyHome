import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  User, 
  MapPin,
  Calendar as CalendarIcon,
  Loader2,
  CheckCircle2,
  PlayCircle,
  AlertCircle
} from 'lucide-react';
import { useStaffBookings, useUpdateBookingStatus } from '../../features/staff/hooks/useStaff';
import { 
  format, 
  addDays, 
  startOfToday, 
  isSameDay, 
  isValid,
  parseISO,
  eachDayOfInterval,
  subDays
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { StaffBooking, StaffBookingStatus } from '../../features/staff/types';

const safeDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const date = parseISO(dateStr);
  return isValid(date) ? date : null;
};

const safeTimeLabel = (time?: string | null) => time?.slice(0, 5) || '--:--';

const getServiceName = (booking: StaffBooking) =>
  booking.booking_details?.[0]?.service?.service_name || 'Dịch vụ Spa';

const StaffCalendarPage: React.FC = () => {
  const { data: response, isLoading } = useStaffBookings();
  const bookings: StaffBooking[] = response?.data || [];
  const updateStatus = useUpdateBookingStatus();
  
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  // Tạo danh sách 21 ngày (7 ngày trước, hôm nay, 13 ngày sau)
  const dateRange = useMemo(() => {
    return eachDayOfInterval({
      start: subDays(startOfToday(), 3),
      end: addDays(startOfToday(), 14)
    });
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => {
        const bookingDate = safeDate(booking.booking_date);
        return bookingDate ? isSameDay(bookingDate, selectedDate) : false;
      })
      .sort((a, b) => safeTimeLabel(a.booking_time).localeCompare(safeTimeLabel(b.booking_time)));
  }, [bookings, selectedDate]);

  const handleUpdateStatus = (id: number, currentStatus: StaffBookingStatus) => {
    let nextStatus: StaffBookingStatus | null = null;
    if (currentStatus === 'confirmed') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'completed';

    if (nextStatus) {
      updateStatus.mutate({ id, status: nextStatus });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
            <CalendarIcon size={28} className="mr-3 text-primary" />
            Lịch làm việc
          </h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý các ca hẹn theo khung giờ trong ngày.</p>
        </div>
        
        <div className="bg-slate-50 p-1 rounded-2xl flex items-center border border-slate-100">
           <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200/50 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Đang trực tuyến</span>
           </div>
        </div>
      </div>

      {/* Horizontal Date Picker */}
      <div className="relative group">
        <div className="flex space-x-4 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth">
          {dateRange.map((date, i) => {
            const isSelected = isSameDay(date, selectedDate);
            const isTodayDate = isSameDay(date, startOfToday());
            
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-20 py-6 rounded-[32px] flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 -translate-y-1' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                } ${isTodayDate && !isSelected ? 'ring-2 ring-primary ring-inset' : ''}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest mb-2">
                  {format(date, 'EEE', { locale: vi })}
                </span>
                <span className="text-2xl font-black">{format(date, 'd')}</span>
                {isSelected && (
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Shadow Indicators for scroll */}
        <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Selected Date Summary */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {isSameDay(selectedDate, startOfToday()) ? 'Hôm nay,' : ''} {format(selectedDate, 'dd MMMM, yyyy', { locale: vi })}
        </h2>
        <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm">
           <Clock size={16} />
           <span>{filteredBookings.length} Ca hẹn</span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative before:absolute before:left-8 md:before:left-12 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-50">
        {isLoading ? (
          <div className="py-20 flex justify-center w-full">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div key={b.booking_id} className="relative pl-20 md:pl-32 group">
              {/* Timeline Time Indicator */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-colors ${
                   b.status === 'in_progress' ? 'bg-primary' : 
                   b.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'
                }`} />
                <span className="mt-2 text-sm font-black text-slate-900 bg-white px-2 py-1 rounded-lg shadow-sm border border-slate-100">
                  {safeTimeLabel(b.booking_time)}
                </span>
              </div>

              {/* Appointment Card */}
              <div className={`bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 ${
                b.status === 'in_progress' ? 'ring-2 ring-primary/20 bg-primary/[0.02]' : ''
              }`}>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      b.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                      b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                      b.status === 'completed' ? 'bg-slate-100 text-slate-400' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {b.status === 'confirmed' ? 'Đã xác nhận' : 
                       b.status === 'in_progress' ? 'Đang thực hiện' : 
                       b.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                    </span>
                    <span className="text-[10px] font-black text-slate-200">#{b.booking_id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {getServiceName(b)}
                  </h3>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                      <User size={16} className="mr-2 text-slate-300" />
                      {b.customer?.full_name}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                      <MapPin size={16} className="mr-2 text-slate-300" />
                      <span className="truncate max-w-[200px]">{b.address || 'Tại Salon'}</span>
                    </div>
                  </div>
                  
                  {b.note && (
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-start space-x-3">
                       <AlertCircle size={14} className="mt-0.5 text-slate-400 flex-shrink-0" />
                       <p className="text-xs text-slate-500 italic">"{b.note}"</p>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-auto">
                  {['confirmed', 'in_progress'].includes(b.status) && (
                    <button 
                      disabled={updateStatus.isPending}
                      onClick={() => handleUpdateStatus(b.booking_id, b.status)}
                      className={`w-full md:w-56 py-4 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${
                        b.status === 'in_progress' 
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200' 
                          : 'bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-200'
                      }`}
                    >
                      {updateStatus.isPending ? (
                        <Loader2 size={18} className="animate-spin mr-2" />
                      ) : b.status === 'in_progress' ? (
                        <><CheckCircle2 size={18} className="mr-2" /> Hoàn thành</>
                      ) : (
                        <><PlayCircle size={18} className="mr-2" /> Bắt đầu</>
                      )}
                    </button>
                  )}
                  {b.status === 'completed' && (
                    <div className="w-full md:w-56 py-4 rounded-2xl bg-slate-50 text-slate-400 font-bold text-sm flex items-center justify-center border border-slate-100">
                      <CheckCircle2 size={18} className="mr-2" /> Đã xong
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center bg-slate-50/50 rounded-[48px] border border-dashed border-slate-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Clock size={32} className="text-slate-200" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Trống lịch</h3>
             <p className="text-slate-400 font-medium px-8">Bạn không có ca hẹn nào vào ngày {format(selectedDate, 'dd/MM')}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffCalendarPage;
