import React from 'react';
import { 
  Users, 
  Search, 
  UserCheck, 
  History, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { useAdminCustomers } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';

const AdminCustomerPage: React.FC = () => {
  const { data: response, isLoading } = useAdminCustomers();
  const customers = response?.data || [];

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cơ sở dữ liệu khách hàng</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý hồ sơ và lịch sử giao dịch của khách hàng.</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex -space-x-3 px-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
              </div>
            ))}
          </div>
          <div className="pr-4 py-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tổng khách hàng</p>
            <p className="text-sm font-bold text-slate-900">{customers.length}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo tên, email, hoặc số điện thoại..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
          />
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all">Lọc nâng cao</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khách hàng</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Liên hệ</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số đơn hàng</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tham gia lúc</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td className="px-8 py-6"><Skeleton className="w-40 h-10 rounded-xl" /></td>
                    <td className="px-8 py-6"><Skeleton className="w-48 h-10 rounded-xl" /></td>
                    <td className="px-8 py-6"><Skeleton className="w-20 h-6 rounded-lg" /></td>
                    <td className="px-8 py-6"><Skeleton className="w-32 h-6 rounded-lg" /></td>
                    <td className="px-8 py-6"></td>
                  </tr>
                ))
              ) : (
                customers.map((customer: any) => (
                  <tr key={customer.customer_id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary font-bold mr-4 border border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                          {customer.full_name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{customer.full_name}</h4>
                          <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            <MapPin size={10} className="mr-1" />
                            {customer.address || 'Hà Nội, VN'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs font-medium text-slate-600">
                          <Mail size={12} className="mr-2 text-slate-300" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-xs font-medium text-slate-600">
                          <Phone size={12} className="mr-2 text-slate-300" />
                          {customer.phone || 'Chưa cập nhật'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center px-4 py-1.5 bg-slate-100 text-slate-900 rounded-full text-xs font-bold">
                        <History size={12} className="mr-2" />
                        {customer.bookings_count || 0} lần đặt
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar size={14} className="mr-2" />
                        {new Date(customer.created_at).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerPage;
