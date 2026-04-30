import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Clock,
  User,
  Loader2,
  CheckCircle2,
  XCircle,
  PlayCircle,
  AlertCircle,
  Hash,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { useAdminBookings, useUpdateBooking, useAdminStaff } from '../../features/admin/hooks/useAdmin';

const AdminBookingPage: React.FC = () => {
  const { data: response, isLoading } = useAdminBookings();
  const { data: staffResponse } = useAdminStaff();
  const updateBooking = useUpdateBooking();
  
  const bookings = response?.data || [];
  const staffList = staffResponse?.data || [];
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [updatingId, setUpdatingId] = React.useState<any>(null);

  const filteredBookings = bookings.filter((b: any) => 
    b.customer?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.booking_id.toString().includes(searchTerm)
  );

  const handleStatusChange = (id: any, status: string) => {
    setUpdatingId(id);
    updateBooking.mutate({ id, data: { status } }, {
      onSettled: () => setUpdatingId(null)
    });
  };

  const handleStaffAssign = (id: any, staff_id: any) => {
    setUpdatingId(id);
    updateBooking.mutate({ id, data: { staff_id } }, {
      onSettled: () => setUpdatingId(null)
    });
  };

  const getStatusStyle = (status: string) => {
    const s = status?.toString().toLowerCase();
    switch (s) {
      case 'completed': case '3': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': case '0': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'confirmed': case '1': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'in_progress': case '2': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'cancelled': case '4': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusLabel = (status: string) => {
    const s = status?.toString().toLowerCase();
    switch (s) {
      case 'completed': case '3': return 'Hoàn thành';
      case 'pending': case '0': return 'Chờ duyệt';
      case 'confirmed': case '1': return 'Đã xác nhận';
      case 'in_progress': case '2': return 'Đang làm';
      case 'cancelled': case '4': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quản lý lịch hẹn</h1>
          <p className="text-slate-500 font-medium mt-1">Theo dõi và điều phối tất cả yêu cầu dịch vụ.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên khách hoặc mã đơn..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
          />
        </div>
        <button className="flex items-center px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all">
          <Calendar size={18} className="mr-2" /> Chọn ngày
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Calendar size={32} className="text-slate-200" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không có lịch hẹn nào</h3>
            <p className="text-slate-400 font-medium max-w-xs">Hãy thử đổi bộ lọc hoặc kiểm tra lại hệ thống đặt lịch.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đơn hàng</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khách hàng</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dịch vụ</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phân công</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b: any) => (
                  <tr key={b.booking_id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 relative">
                    <td className="px-8 py-6">
                      <div className="flex items-center text-slate-400">
                        <Hash size={14} className="mr-1" />
                        <span className="text-sm font-bold">#{b.booking_id}</span>
                        {updatingId === b.booking_id && <Loader2 size={14} className="ml-2 animate-spin text-primary" />}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary text-xs font-bold mr-3 border border-slate-100">
                          {b.customer?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{b.customer?.full_name || 'Khách vãng lai'}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tight">{b.customer?.phone || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-slate-600 text-sm font-bold">
                        <Calendar size={14} className="mr-2 text-primary/40" />
                        {b.booking_date}
                      </div>
                      <div className="flex items-center text-slate-400 text-xs mt-1 font-medium">
                        <Clock size={14} className="mr-2 text-slate-300" />
                        {b.booking_time}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 max-w-[150px] truncate">
                          {b.booking_details?.[0]?.service?.service_name || 'Dịch vụ lẻ'}
                        </span>
                        {b.booking_details?.length > 1 && (
                          <span className="text-[10px] text-primary font-bold">+{b.booking_details.length - 1} dịch vụ khác</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="relative group/select">
                        <select 
                          value={b.staff_id || ''}
                          onChange={(e) => handleStaffAssign(b.booking_id, e.target.value)}
                          className="appearance-none bg-slate-50 border-none rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-500 outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer w-full"
                        >
                          <option value="">Chưa gán</option>
                          {staffList.map((s: any) => (
                            <option key={s.staff_id} value={s.staff_id}>{s.full_name}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(b.status)}`}>
                        {getStatusLabel(b.status)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {b.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(b.booking_id, 'confirmed')}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                            title="Xác nhận"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button 
                            onClick={() => handleStatusChange(b.booking_id, 'completed')}
                            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                            title="Hoàn thành"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}
                        {b.status !== 'completed' && b.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleStatusChange(b.booking_id, 'cancelled')}
                            className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors"
                            title="Hủy lịch"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingPage;
