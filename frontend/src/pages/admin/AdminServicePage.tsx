import React from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2,
  DollarSign,
  Clock,
  Tag,
  Image as ImageIcon,
  X,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Camera
} from 'lucide-react';
import { useAdminServices, useCreateService, useUpdateService, useDeleteService, useAdminCategories } from '../../features/admin/hooks/useAdmin';
import Skeleton from '../../shared/components/ui/Skeleton';
import { useForm } from 'react-hook-form';
import { uploadToCloudinary } from '../../services/cloudinary';

const AdminServicePage: React.FC = () => {
  const { data: response, isLoading } = useAdminServices();
  const { data: categoriesResponse } = useAdminCategories();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  
  const services = response?.data || [];
  const categories = categoriesResponse?.data || [];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<any>(null);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const currentImageUrl = watch('image');

  const filteredServices = services.filter((service: any) => 
    service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingService(null);
    setPreviewImage('');
    reset({ service_name: '', category_id: '', price: '', duration: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setPreviewImage(service.image || '');
    setValue('service_name', service.service_name);
    setValue('category_id', service.category_id);
    setValue('price', service.price);
    setValue('duration', service.duration);
    setValue('description', service.description || '');
    setValue('image', service.image || '');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');
    try {
      const url = await uploadToCloudinary(file);
      setValue('image', url);
      setPreviewImage(url);
      setSuccessMessage('Tải ảnh lên thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Lỗi khi tải ảnh lên Cloudinary.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: any) => {
    setErrorMessage('');
    if (editingService) {
      updateService.mutate({ id: editingService.service_id, data }, {
        onSuccess: () => {
          setSuccessMessage('Dịch vụ đã được cập nhật thành công!');
          closeModal();
        },
        onError: (error: any) => setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra.')
      });
    } else {
      createService.mutate(data, {
        onSuccess: () => {
          setSuccessMessage('Dịch vụ đã được tạo thành công!');
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
      setEditingService(null);
      setPreviewImage('');
      reset();
    }, 1500);
  };

  const handleDelete = (id: any) => {
    deleteService.mutate(id, {
      onSuccess: () => {
        setDeleteConfirmId(null);
      }
    });
  };

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen relative">
      {/* Header remain same */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Danh mục dịch vụ</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý các gói dịch vụ và bảng giá làm đẹp.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Thêm dịch vụ
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm dịch vụ theo tên, chuyên mục..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-slate-900"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 rounded-[32px]" />)
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy dịch vụ</h3>
            <p className="text-slate-400 font-medium mt-1">Thử tìm kiếm với từ khóa khác.</p>
          </div>
        ) : (
          filteredServices.map((service: any) => (
            <div key={service.service_id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-40 bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                {service.image ? (
                  <img src={service.image} alt={service.service_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                    {service.category?.category_name || 'Dịch vụ'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{service.service_name}</h3>
                  <div className="text-primary font-bold text-lg">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5" />
                    {service.duration} phút
                  </div>
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1.5" />
                    ID: #{service.service_id}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex justify-end space-x-2">
                <button onClick={() => openEditModal(service)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-primary hover:bg-primary/5 transition-all"><Edit3 size={16} /></button>
                <button onClick={() => setDeleteConfirmId(service.service_id)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 hover:bg-rose-50 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal with Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingService ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'}</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Cấu hình thông tin dịch vụ làm đẹp.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              {successMessage && <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center text-emerald-600 text-sm font-bold"><ShieldCheck size={18} className="mr-2" /> {successMessage}</div>}
              {errorMessage && <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center text-rose-600 text-sm font-bold"><X size={18} className="mr-2" /> {errorMessage}</div>}

              <div className="grid grid-cols-2 gap-6">
                {/* Upload Image Section */}
                <div className="col-span-2 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-48 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={32} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Chưa có ảnh</p>
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Hình ảnh dịch vụ</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold cursor-pointer hover:shadow-lg transition-all active:scale-95">
                        {isUploading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Camera size={18} className="mr-2" />}
                        {isUploading ? 'Đang tải lên...' : 'Tải ảnh lên'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                      </label>
                      <input 
                        {...register('image')}
                        type="text" 
                        placeholder="Hoặc dán URL ảnh tại đây..."
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-[10px] font-medium text-slate-500 outline-none focus:ring-1 focus:ring-primary/10"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Khuyên dùng ảnh tỷ lệ 4:3, dung lượng dưới 2MB.</p>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tên dịch vụ</label>
                  <input {...register('service_name', { required: 'Vui lòng nhập tên' })} type="text" placeholder="VD: Massage đá nóng..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900" />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Chuyên mục</label>
                  <select {...register('category_id', { required: 'Vui lòng chọn' })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 appearance-none">
                    <option value="">Chọn chuyên mục...</option>
                    {categories.map((cat: any) => (<option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>))}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Giá (VNĐ)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input {...register('price', { required: 'Vui lòng nhập giá' })} type="number" placeholder="500000" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900" />
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Thời gian (phút)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input {...register('duration', { required: 'Vui lòng nhập' })} type="number" placeholder="60" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900" />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mô tả dịch vụ</label>
                  <textarea {...register('description')} rows={3} placeholder="Giới thiệu chi tiết về dịch vụ này..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none" />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all">Hủy bỏ</button>
                <button type="submit" disabled={createService.isPending || updateService.isPending || isUploading} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center">
                  {(createService.isPending || updateService.isPending) ? <Loader2 size={18} className="animate-spin mr-2" /> : <ShieldCheck size={18} className="mr-2" />}
                  {editingService ? 'Lưu thay đổi' : 'Tạo dịch vụ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal remain same */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6"><AlertTriangle size={40} /></div>
              <h2 className="text-2xl font-bold text-slate-900">Xác nhận xóa?</h2>
              <p className="text-slate-500 font-medium mt-2">Dịch vụ này sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
              <div className="flex gap-4 w-full mt-8">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all">Hủy</button>
                <button onClick={() => handleDelete(deleteConfirmId)} disabled={deleteService.isPending} className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all flex items-center justify-center">
                  {deleteService.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Xóa dịch vụ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicePage;
