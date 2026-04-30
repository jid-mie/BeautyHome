import React from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2,
  FolderOpen,
  X,
  Loader2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';
import { useForm } from 'react-hook-form';

const AdminCategoryPage: React.FC = () => {
  const { data: response, isLoading } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const categories = response?.data || [];

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<any>(null);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const openAddModal = () => {
    setEditingCategory(null);
    reset({ category_name: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setValue('category_name', category.category_name);
    setValue('description', category.description || '');
    setIsModalOpen(true);
  };

  const onSubmit = (data: any) => {
    setErrorMessage('');
    if (editingCategory) {
      updateCategory.mutate({ id: editingCategory.category_id, data }, {
        onSuccess: () => {
          setSuccessMessage('Chuyên mục đã được cập nhật thành công!');
          closeModal();
        },
        onError: (error: any) => setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra.')
      });
    } else {
      createCategory.mutate(data, {
        onSuccess: () => {
          setSuccessMessage('Chuyên mục đã được tạo thành công!');
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
      setEditingCategory(null);
      reset();
    }, 1500);
  };

  const handleDelete = (id: any) => {
    deleteCategory.mutate(id, {
      onSuccess: () => {
        setDeleteConfirmId(null);
      }
    });
  };

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quản lý chuyên mục</h1>
          <p className="text-slate-500 font-medium mt-1">Tổ chức các loại hình dịch vụ làm đẹp của bạn.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Thêm chuyên mục
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-[32px]" />)
        ) : (
          categories.map((cat: any) => (
            <div key={cat.category_id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <FolderOpen size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.category_name}</h3>
              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6">
                {cat.description || 'Không có mô tả cho chuyên mục này.'}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  ID: #CAT-{cat.category_id}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(cat)}
                    className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(cat.category_id)}
                    className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
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
                <h2 className="text-2xl font-bold text-slate-900">{editingCategory ? 'Cập nhật chuyên mục' : 'Thêm chuyên mục'}</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Chỉnh sửa thông tin nhóm dịch vụ.</p>
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

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tên chuyên mục</label>
                <input 
                  {...register('category_name', { required: 'Vui lòng nhập tên chuyên mục' })}
                  type="text" placeholder="VD: Chăm sóc da, Làm móng..."
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                />
                {errors.category_name && <p className="mt-2 text-xs text-rose-500 font-bold">{errors.category_name.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mô tả (Tùy chọn)</label>
                <textarea 
                  {...register('description')}
                  placeholder="Mô tả ngắn gọn về chuyên mục này..."
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors">Hủy bỏ</button>
                <button 
                  type="submit" 
                  disabled={createCategory.isPending || updateCategory.isPending}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {(createCategory.isPending || updateCategory.isPending) ? <Loader2 size={18} className="animate-spin mr-2" /> : <ShieldCheck size={18} className="mr-2" />}
                  {editingCategory ? 'Lưu thay đổi' : 'Tạo chuyên mục'}
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
                Hành động này không thể hoàn tác. Các dịch vụ thuộc chuyên mục này có thể bị ảnh hưởng.
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
                  disabled={deleteCategory.isPending}
                  className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all flex items-center justify-center"
                >
                  {deleteCategory.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Xóa ngay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
