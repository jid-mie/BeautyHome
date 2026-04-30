import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { Search, Loader2 } from 'lucide-react';
import { useServices } from '../hooks/useServices';

const categories = ['Tất cả', 'Skincare', 'Massage', 'Nails', 'Hair', 'Makeup'];

const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: response, isLoading, error } = useServices();

  const services = response?.success ? response.data : [];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'Tất cả' || 
      (service.category?.category_name === activeCategory);
    const matchesSearch = service.service_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-red-500 mb-4">Đã xảy ra lỗi khi tải dữ liệu.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-full text-sm"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Dịch vụ của chúng tôi
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-primary leading-tight mb-8">
            Nơi vẻ đẹp <br />
            <span className="font-bold italic">được nuông chiều.</span>
          </h1>
          <p className="text-xl text-primary/60 font-light leading-relaxed">
            Khám phá danh mục các dịch vụ làm đẹp cao cấp được thiết kế riêng để mang lại sự thư giãn và rạng rỡ ngay tại nhà bạn.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 px-2">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                    : 'bg-white text-primary/40 hover:text-primary hover:bg-gray-50 border border-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-primary/5 rounded-full px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-primary/20"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20" size={18} />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.service_id}
                id={service.service_id.toString()}
                title={service.service_name}
                category={service.category?.category_name || 'Khác'}
                price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                image={service.image}
                description={service.description}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-primary/40 text-xl font-light">Không tìm thấy dịch vụ nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
