import React from 'react';
import { 
  Loader2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  MoreVertical,
  User
} from 'lucide-react';
import { useStaffBookings, useUpdateBookingStatus } from '../../features/staff/hooks/useStaff';

const StaffBookingPage: React.FC = () => {
  const { data: response, isLoading } = useStaffBookings();
  const allBookings = response?.data || [];
  
  // Lọc lấy các việc đang hoạt động (chưa hoàn thành hoặc chưa hủy)
  const activeBookings = allBookings.filter((b: any) => 
    ['pending', 'confirmed', 'in_progress'].includes(b.status)
  );
  
  // Các việc đã xong hoặc đã hủy
  const historyBookings = allBookings.filter((b: any) => 
    ['completed', 'cancelled'].includes(b.status)
  );
  const updateStatus = useUpdateBookingStatus();

  const handleUpdateStatus = (id: number, currentStatus: string) => {
    let nextStatus = '';
    if (currentStatus === 'confirmed') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'completed';

    if (nextStatus) {
      updateStatus.mutate({ id, status: nextStatus as any });
    }
  };

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Việc làm của tôi</h1>
        <p className="text-slate-500 font-medium mt-1">Danh sách các lịch hẹn bạn đã được phân công thực hiện.</p>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="space-y-12">
          {/* Active Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary mr-3" />
              Công việc hiện tại ({activeBookings.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeBookings.map((b: any) => (
                <div key={b.booking_id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                  {/* Card Content ... Same as before */}
                  <div className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        b.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                        b.status === 'confirmed' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {b.status === 'confirmed' ? 'Đã nhận' : b.status === 'in_progress' ? 'Đang làm' : 'Chờ Admin'}
                      </span>
                      <p className="text-xs font-bold text-slate-300">#{b.booking_id}</p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {b.booking_details?.[0]?.service?.service_name || 'Dịch vụ'}
                    </h3>
                    
                    <div className="mt-6 space-y-3 pb-6 border-b border-slate-50">
                      <div className="flex items-center text-slate-500 font-medium text-sm">
                        <User size={16} className="mr-3 text-slate-300" />
                        {b.customer?.full_name}
                      </div>
                      <div className="flex items-center text-slate-500 font-medium text-sm">
                        <Calendar size={16} className="mr-3 text-slate-300" />
                        {b.booking_date}
                      </div>
                      <div className="flex items-center text-slate-500 font-medium text-sm">
                        <Clock size={16} className="mr-3 text-slate-300" />
                        {b.booking_time}
                      </div>
                      <div className="flex items-start text-slate-500 font-medium text-sm">
                        <MapPin size={16} className="mr-3 text-slate-300 mt-1" />
                        <span className="flex-1 leading-relaxed">{b.address || 'Tại spa'}</span>
                      </div>
                    </div>

                    {b.note && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-2xl">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ghi chú từ khách</p>
                         <p className="text-xs text-slate-600 italic">"{b.note}"</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto p-8 pt-4">
                    {['confirmed', 'in_progress'].includes(b.status) && (
                      <button 
                        disabled={updateStatus.isPending}
                        onClick={() => handleUpdateStatus(b.booking_id, b.status)}
                        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${
                          b.status === 'in_progress' 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20'
                        }`}
                      >
                        {updateStatus.isPending ? (
                          <Loader2 size={18} className="animate-spin mr-2" />
                        ) : b.status === 'in_progress' ? (
                          <><CheckCircle2 size={18} className="mr-2" /> Hoàn thành việc</>
                        ) : (
                          <><PlayCircle size={18} className="mr-2" /> Bắt đầu thực hiện</>
                        )}
                      </button>
                    )}
                    {b.status === 'pending' && (
                      <div className="w-full py-4 bg-orange-50 text-orange-600 rounded-2xl font-bold text-sm flex items-center justify-center">
                        <AlertCircle size={18} className="mr-2" /> Chờ xác nhận
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {activeBookings.length === 0 && (
                <div className="col-span-full py-16 text-center bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">Hiện tại không có công việc mới.</p>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          {historyBookings.length > 0 && (
            <div className="space-y-6 pt-12 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-400 flex items-center">
                <div className="w-2 h-2 rounded-full bg-slate-300 mr-3" />
                Lịch sử hoàn thành
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {historyBookings.map((b: any) => (
                  <div key={b.booking_id} className={`bg-white rounded-3xl border border-slate-100 p-6 shadow-sm transition-all ${b.status === 'cancelled' ? 'border-rose-100 bg-rose-50/10' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                       <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                         b.status === 'completed' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'
                       }`}>
                         {b.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                       </span>
                       <span className="text-[10px] text-slate-300 font-bold">#{b.booking_id}</span>
                    </div>
                    <h4 className="font-bold text-slate-700 text-sm mb-4 truncate">{b.booking_details?.[0]?.service?.service_name}</h4>
                    <div className="space-y-2 text-[10px] text-slate-500">
                       <div className="flex items-center"><User size={12} className="mr-2 opacity-30" /> {b.customer?.full_name}</div>
                       <div className="flex items-center"><Calendar size={12} className="mr-2 opacity-30" /> {b.booking_date}</div>
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
