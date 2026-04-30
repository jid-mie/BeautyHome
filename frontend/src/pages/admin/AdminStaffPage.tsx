import React from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Star, 
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  X,
  Plus,
  Loader2,
  Tag,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useAdminStaff, useCreateStaff, useUpdateStaff, useDeleteStaff, useAdminCategories } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';
import { useForm } from 'react-hook-form';

const AdminStaffPage: React.FC = () => {
  const { data: response, isLoading } = useAdminStaff();
  const { data: categoriesResponse } = useAdminCategories();
  const categories = categoriesResponse?.data || [];
  
  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();
  const deleteStaff = useDeleteStaff();
  
  const staffMembers = response?.data || [];
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingStaff, setEditingStaff] = React.useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<any>(null);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredStaff = staffMembers.filter((staff: any) => 
    staff.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingStaff(null);
    reset({ full_name: '', email: '', phone: '', password: '', category_id: '', status: '1' });
    setIsModalOpen(true);
  };

  const openEditModal = (staff: any) => {
    setEditingStaff(staff);
    setValue('full_name', staff.full_name);
    setValue('email', staff.email);
    setValue('phone', staff.phone || '');
    setValue('category_id', staff.category_id);
    setValue('status', staff.status.toString());
    setValue('password', ''); // Don't fill password
    setIsModalOpen(true);
  };

  const onSubmit = (data: any) => {
    setErrorMessage('');
    if (editingStaff) {
      // If password is empty, remove it from update data
      const updateData = { ...data };
      if (!updateData.password) delete updateData.password;

      updateStaff.mutate({ id: editingStaff.staff_id, data: updateData }, {
        onSuccess: () => {
          setSuccessMessage('Thông tin nhân viên đã được cập nhật!');
          closeModal();
        },
        onError: (error: any) => setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra.')
      });
    } else {
      createStaff.mutate(data, {
        onSuccess: () => {
          setSuccessMessage('Nhân viên đã được tạo thành công!');
          closeModal();
        },
        onError: (error: any) => setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra.')
      });
    }
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMessage('');
      setEditingStaff(null);
      reset();
    }, 1500);
  };

  const handleDelete = (id: any) => {
    deleteStaff.mutate(id, {
      onSuccess: () => {
        setDeleteConfirmId(null);
      }
    });
  };

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quản lý đội ngũ</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý thông tin và hiệu suất của toàn bộ nhân viên.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
        >
          <UserPlus size={18} className="mr-2" /> Thêm nhân viên
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nhân viên theo tên, email..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-slate-900"
          />
        </div>
        <select className="px-6 py-3 bg-slate-50 border-none rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500 outline-none">
          <option>Tất cả trạng thái</option>
          <option>Đang làm việc</option>
          <option>Đang nghỉ</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-[32px]" />
          ))
        ) : filteredStaff.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy nhân viên</h3>
            <p className="text-slate-400 font-medium mt-1">Thử tìm kiếm với từ khóa khác.</p>
          </div>
        ) : (
          filteredStaff.map((staff: any) => (
            <div key={staff.staff_id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-primary text-xl font-bold border-2 border-white shadow-sm overflow-hidden">
                    {staff.avatar ? <img src={staff.avatar} alt="" className="w-full h-full object-cover" /> : staff.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{staff.full_name}</h3>
                    <div className="flex items-center mt-1">
                      <Tag size={12} className="text-primary/60 mr-1" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {staff.category?.category_name || 'Chưa phân loại'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => openEditModal(staff)}
                    className="p-2 text-slate-300 hover:text-primary transition-colors"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(staff.staff_id)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-slate-500 font-medium">
                  <Mail size={14} className="mr-3 text-slate-300" />
                  {staff.email}
                </div>
                <div className="flex items-center text-sm text-slate-500 font-medium">
                  <Phone size={14} className="mr-3 text-slate-300" />
                  {staff.phone || 'Chưa cập nhật'}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="text-amber-400 fill-amber-400 mr-1" size={14} />
                  <span className="text-sm font-bold text-slate-700">4.9</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">(0)</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  staff.status === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                }`}>
                  {staff.status === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingStaff ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Quản lý tài khoản và chuyên môn nhân sự.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              {successMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center text-emerald-600 text-sm font-bold">
                  <ShieldCheck size={18} className="mr-2" /> {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center text-rose-600 text-sm font-bold">
                  <X size={18} className="mr-2" /> {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Chuyên mục chuyên môn</label>
                  <select 
                    {...register('category_id', { required: 'Vui lòng chọn chuyên mục' })}
                    style={{ color: '#0f172a' }}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium appearance-none text-slate-900"
                  >
                    <option value="" style={{ color: '#0f172a' }}>Chọn một chuyên mục...</option>
                    {categories.map((cat: any) => (
                      <option key={cat.category_id} value={cat.category_id} style={{ color: '#0f172a' }}>{cat.category_name}</option>
                    ))}
                  </select>
                  {errors.category_id && <p className="mt-2 text-xs text-rose-500 font-bold">{errors.category_id.message as string}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Họ và tên</label>
                  <input 
                    {...register('full_name', { required: 'Vui lòng nhập tên' })}
                    type="text" placeholder="VD: Nguyễn Văn A"
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                  />
                  {errors.full_name && <p className="mt-2 text-xs text-rose-500 font-bold">{errors.full_name.message as string}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    {...register('email', { required: 'Vui lòng nhập email' })}
                    type="email" placeholder="staff@beautyhome.com"
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                  />
                  {errors.email && <p className="mt-2 text-xs text-rose-500 font-bold">{errors.email.message as string}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                  <input {...register('phone')} type="text" placeholder="090xxxxxxxx" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900" />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Trạng thái</label>
                  <select 
                    {...register('status')}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 appearance-none"
                  >
                    <option value="1">Đang làm việc</option>
                    <option value="0">Tạm nghỉ / Khóa</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {editingStaff ? 'Mật khẩu mới (Để trống nếu không đổi)' : 'Mật khẩu ban đầu'}
                  </label>
                  <input 
                    {...register('password', { required: editingStaff ? false : 'Vui lòng nhập mật khẩu' })}
                    type="password" placeholder="••••••••"
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                  />
                  {errors.password && <p className="mt-2 text-xs text-rose-500 font-bold">{errors.password.message as string}</p>}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors">Hủy bỏ</button>
                <button 
                  type="submit" 
                  disabled={createStaff.isPending || updateStaff.isPending}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {(createStaff.isPending || updateStaff.isPending) ? <Loader2 size={18} className="animate-spin mr-2" /> : <ShieldCheck size={18} className="mr-2" />}
                  {editingStaff ? 'Lưu thay đổi' : 'Tạo nhân viên'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Xác nhận xóa?</h2>
              <p className="text-slate-500 font-medium mt-2">
                Hành động này sẽ xóa vĩnh viễn tài khoản nhân viên. Họ sẽ không thể đăng nhập vào hệ thống nữa.
              </p>
              <div className="flex gap-4 w-full mt-8">
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deleteStaff.isPending}
                  className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all flex items-center justify-center"
                >
                  {deleteStaff.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Xóa nhân sự'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaffPage;
