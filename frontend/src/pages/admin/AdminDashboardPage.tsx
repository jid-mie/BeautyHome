import React from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useAdminDashboard } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';

const AdminDashboardPage: React.FC = () => {
  const { data: response, isLoading } = useAdminDashboard();
  const dashboardData = response?.data;

  const stats = [
    { 
      title: 'Tổng doanh thu', 
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dashboardData?.stats?.revenue || 0), 
      icon: TrendingUp, 
      change: '+0%', 
      isUp: true, 
      color: 'bg-emerald-500' 
    },
    { 
      title: 'Tổng lịch hẹn', 
      value: dashboardData?.stats?.bookings || 0, 
      icon: ShoppingBag, 
      change: '+0%', 
      isUp: true, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Khách hàng', 
      value: dashboardData?.stats?.customers || 0, 
      icon: Users, 
      change: '+0%', 
      isUp: true, 
      color: 'bg-orange-500' 
    },
    { 
      title: 'Nhân viên', 
      value: dashboardData?.stats?.staff || 0, 
      icon: BarChart3, 
      change: 'Active', 
      isUp: true, 
      color: 'bg-purple-500' 
    },
  ];

  const chartData = dashboardData?.revenue_chart || [];
  const staffList = dashboardData?.recent_staff || [];

  return (
    <div className="space-y-10 p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tổng quan quản trị</h1>
          <p className="text-slate-500 font-medium mt-1">Dữ liệu phân tích thực tế từ hệ thống.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Xuất báo cáo</button>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">Tạo lịch hẹn</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading 
          ? [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                <Skeleton className="w-10 h-10 rounded-xl mb-4" />
                <Skeleton className="w-24 h-4 mb-2" />
                <Skeleton className="w-32 h-8" />
              </div>
            ))
          : stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-bold ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.isUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            ))
        }
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Biểu đồ doanh thu</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Số liệu 7 ngày gần nhất</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
              <option>Theo tuần</option>
              <option>Theo tháng</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#162839" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#162839" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value: any) => [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value), 'Doanh thu']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#162839" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Staff */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Trạng thái nhân viên</h3>
          <div className="space-y-8">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 rounded-2xl" />)
            ) : staffList.length === 0 ? (
              <p className="text-slate-400 text-sm font-medium text-center py-10">Chưa có nhân viên.</p>
            ) : (
              staffList.map((staff: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary font-bold overflow-hidden border border-slate-100">
                        {staff.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        staff.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-slate-700">{staff.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{staff.performance}%</span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${staff.performance}%` }} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {!isLoading && staffList.length > 0 && (
            <button className="w-full mt-8 py-3 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-colors">
              Xem tất cả
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
