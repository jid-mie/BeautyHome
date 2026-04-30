import React from 'react';
import { 
  CreditCard, 
  Search, 
  Download, 
  Filter, 
  DollarSign, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdminPayments } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';

const AdminPaymentPage: React.FC = () => {
  const { data: response, isLoading } = useAdminPayments();
  const payments = response?.data || [];

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quản lý giao dịch</h1>
          <p className="text-slate-500 font-medium mt-1">Theo dõi dòng tiền và trạng thái thanh toán từ khách hàng.</p>
        </div>
        <button className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
          <Download size={18} className="mr-2" /> Xuất file CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tổng thu nhập</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">45.000.000đ</h3>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Clock size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang chờ</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">12.500.000đ</h3>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <AlertCircle size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giao dịch lỗi</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">0đ</h3>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-bold text-slate-900">Giao dịch gần đây</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Tìm mã giao dịch..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none w-48" />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400"><Filter size={14} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã GD</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khách hàng</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phương thức</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Số tiền</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i}><td colSpan={6} className="px-8 py-4"><Skeleton className="w-full h-8 rounded-lg" /></td></tr>
                ))
              ) : (
                payments.map((p: any) => (
                  <tr key={p.payment_id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">#PAY-{p.payment_id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary text-[10px] font-bold mr-3">
                          {p.booking?.customer?.full_name?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{p.booking?.customer?.full_name || 'Khách vãng lai'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-xs font-bold text-slate-500">
                        <CreditCard size={14} className="mr-2 text-primary" />
                        {p.payment_method === 1 ? 'Chuyển khoản' : 'Tiền mặt'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.amount)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit ${
                        p.status === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {p.status === 1 ? <CheckCircle2 size={10} className="mr-1" /> : <Clock size={10} className="mr-1" />}
                        {p.status === 1 ? 'Thành công' : 'Chờ xử lý'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(p.created_at).toLocaleString('vi-VN')}
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

export default AdminPaymentPage;
