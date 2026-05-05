import React from 'react';
import { 
  Loader2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  User,
  History,
  CalendarDays
} from 'lucide-react';
import { useStaffBookings, useUpdateBookingStatus } from '../../features/staff/hooks/useStaff';
import { format, isToday, isTomorrow, isValid, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { StaffBooking, StaffBookingStatus } from '../../features/staff/types';

const UNKNOWN_DATE_GROUP = 'unknown-date';

const safeDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const date = parseISO(dateStr);
  return isValid(date) ? date : null;
};

const safeTimeLabel = (time?: string | null) => time?.slice(0, 5) || '--:--';

const getServiceName = (booking: StaffBooking) =>
  booking.booking_details?.[0]?.service?.service_name || 'Dịch vụ Spa';

const StaffBookingPage: React.FC = () => {
  const { data: response, isLoading } = useStaffBookings();
  const allBookings: StaffBooking[] = response?.data || [];
  
  // Lọc lấy các việc đang hoạt động (chưa hoàn thành hoặc chưa hủy)
  const activeBookings = allBookings.filter((booking) => 
    ['pending', 'confirmed', 'in_progress'].includes(booking.status)
  );
  
  // Các việc đã xong hoặc đã hủy
  const historyBookings = allBookings.filter((booking) => 
    ['completed', 'cancelled'].includes(booking.status)
  );
  
  const updateStatus = useUpdateBookingStatus();

  const handleUpdateStatus = (id: number, currentStatus: StaffBookingStatus) => {
    let nextStatus: StaffBookingStatus | null = null;
    if (currentStatus === 'confirmed') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'completed';

    if (nextStatus) {
      updateStatus.mutate({ id, status: nextStatus });
    }
  };

  // Logic nhóm theo ngày, giữ nhóm riêng cho booking thiếu/sai ngày.
  const groupBookingsByDate = (bookings: StaffBooking[]) => {
    const groups: Record<string, StaffBooking[]> = {};
    
    bookings.forEach((booking) => {
      const date = safeDate(booking.booking_date) ? booking.booking_date as string : UNKNOWN_DATE_GROUP;
      if (!groups[date]) groups[date] = [];
      groups[date].push(booking);
    });
    
    const sortedDates = Object.keys(groups).sort((a, b) => {
      if (a === UNKNOWN_DATE_GROUP) return 1;
      if (b === UNKNOWN_DATE_GROUP) return -1;
      return a.localeCompare(b);
    });
    sortedDates.forEach((date) => {
      groups[date].sort((a, b) => safeTimeLabel(a.booking_time).localeCompare(safeTimeLabel(b.booking_time)));
    });
    
    return { sortedDates, groups };
  };

  const { sortedDates, groups } = groupBookingsByDate(activeBookings);

  const getDateLabel = (dateStr: string) => {
    const date = safeDate(dateStr);
    if (!date) return 'Chưa có ngày';
    if (isToday(date)) return 'Hôm nay';
    if (isTomorrow(date)) return 'Ngày mai';
    return format(date, 'EEEE, dd/MM', { locale: vi });
  };

  return (
    <div className="p-4 md:p-8 space-y-10 bg-[#FBFBFD] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              Lịch trình của tôi
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Kế hoạch công việc</h1>
          <p className="text-slate-400 font-medium mt-2">Theo dõi và thực hiện các dịch vụ theo khung giờ đã đặt.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest animate-pulse">Đang đồng bộ lịch...</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Active Bookings Grouped by Date */}
          <div className="space-y-12">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3">
                    <CalendarDays size={18} className="text-primary" />
                    <h2 className="text-lg font-bold text-slate-800 capitalize">
                      {getDateLabel(date)}
                    </h2>
                    <span className="text-slate-300 font-medium">/</span>
                    <span className="text-slate-400 text-sm font-bold">
                      {safeDate(date) ? format(safeDate(date)!, 'dd/MM/yyyy') : 'Chưa có ngày'}
                    </span>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {groups[date].map((b) => (
                    <div 
                      key={b.booking_id} 
                      className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
                    >
                      {/* Time Indicator Sidebar */}
                      <div className={`md:w-32 flex flex-col items-center justify-center p-6 text-center border-b md:border-b-0 md:border-r border-slate-50 transition-colors duration-500 ${
                        b.status === 'in_progress' ? 'bg-primary/5' : 'bg-slate-50/30'
                      }`}>
                        <Clock size={20} className={`mb-2 ${b.status === 'in_progress' ? 'text-primary animate-pulse' : 'text-slate-300'}`} />
                        <span className="text-xl font-black text-slate-900 leading-none">
                          {safeTimeLabel(b.booking_time)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          Bắt đầu
                        </span>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                              b.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                              b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                              'bg-orange-50 text-orange-600'
                            }`}>
                              {b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'in_progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                            </span>
                            {b.status === 'in_progress' && (
                              <span className="flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-[8px] font-bold uppercase animate-pulse">
                                Live
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-black text-slate-200">#{b.booking_id}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">
                          {getServiceName(b)}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-50">
                          <div className="flex items-center text-slate-500 font-medium text-sm bg-slate-50/50 p-3 rounded-2xl">
                            <User size={16} className="mr-3 text-primary/40" />
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Khách hàng</span>
                              <span className="text-slate-700">{b.customer?.full_name}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-slate-500 font-medium text-sm bg-slate-50/50 p-3 rounded-2xl">
                            <MapPin size={16} className="mr-3 text-primary/40" />
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Địa điểm</span>
                              <span className="text-slate-700 truncate max-w-[150px]">{b.address || 'Tại Salon'}</span>
                            </div>
                          </div>
                        </div>

                        {b.note && (
                          <div className="mt-4 flex items-start space-x-3 text-slate-400">
                            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                            <p className="text-xs italic leading-relaxed">"{b.note}"</p>
                          </div>
                        )}
                        
                        <div className="mt-6">
                          {['confirmed', 'in_progress'].includes(b.status) && (
                            <button 
                              disabled={updateStatus.isPending}
                              onClick={() => handleUpdateStatus(b.booking_id, b.status)}
                              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${
                                b.status === 'in_progress' 
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200' 
                                  : 'bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-200'
                              }`}
                            >
                              {updateStatus.isPending ? (
                                <Loader2 size={18} className="animate-spin mr-2" />
                              ) : b.status === 'in_progress' ? (
                                <><CheckCircle2 size={18} className="mr-2" /> Hoàn thành dịch vụ</>
                              ) : (
                                <><PlayCircle size={18} className="mr-2" /> Bắt đầu ngay</>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {activeBookings.length === 0 && (
              <div className="py-24 text-center bg-white rounded-[48px] border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar size={32} className="text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Thảnh thơi rồi!</h3>
                <p className="text-slate-400 font-medium">Hiện tại bạn không có lịch hẹn nào sắp tới.</p>
              </div>
            )}
          </div>

          {/* History Section - Collapsible or simpler list */}
          {historyBookings.length > 0 && (
            <div className="space-y-8 pt-12 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-300 flex items-center">
                  <History size={20} className="mr-3" />
                  Đã hoàn thành gần đây
                </h2>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  {historyBookings.length} công việc
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
                {historyBookings.slice(0, 8).map((b) => (
                  <div key={b.booking_id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                         b.status === 'completed' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'
                       }`}>
                         {b.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                       </span>
                       <span className="text-[10px] text-slate-200 font-black">#{b.booking_id}</span>
                    </div>
                    <h4 className="font-bold text-slate-700 text-sm mb-3 truncate">{getServiceName(b)}</h4>
                    <div className="space-y-2 text-[10px] text-slate-400 font-medium">
                       <div className="flex items-center"><User size={12} className="mr-2 opacity-40" /> {b.customer?.full_name}</div>
                       <div className="flex items-center"><Calendar size={12} className="mr-2 opacity-40" /> {safeDate(b.booking_date) ? format(safeDate(b.booking_date)!, 'dd/MM/yyyy') : 'Chưa có ngày'}</div>
                       <div className="flex items-center"><Clock size={12} className="mr-2 opacity-40" /> {safeTimeLabel(b.booking_time)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffBookingPage;
