import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../../services/components/ServiceCard';
import { useServices } from '../../services/hooks/useServices';
import { Loader2 } from 'lucide-react';

const FeaturedServices: React.FC = () => {
  const { data: response, isLoading } = useServices();

  const services = (response?.success ? response.data : []).slice(0, 3);

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <section id="featured-services" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              Dịch vụ phổ biến nhất
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-primary leading-tight">
              Trải nghiệm <br />
              <span className="font-bold italic">sự tinh túy.</span>
            </h2>
          </div>
          <Link 
            to="/services" 
            className="group flex items-center space-x-3 text-primary font-bold tracking-widest uppercase text-xs border-b border-primary/10 pb-2 hover:border-secondary transition-all"
          >
            <span>Khám phá tất cả</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {services.map((service) => (
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
      </div>
    </section>
  );
};

export default FeaturedServices;
