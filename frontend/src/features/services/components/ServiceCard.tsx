import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  duration?: string;
  description?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, category, price, image, duration, description }) => {
  return (
    <Link to={`/services/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] bg-surface mb-6 transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(22,40,57,0.1)]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary rounded-full text-[10px] font-bold tracking-widest uppercase">
            {category}
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-primary tracking-tight transition-colors duration-300">
            {title}
          </h3>
          <span className="text-xl font-light text-primary">{price}</span>
        </div>
        
        {description && (
          <p className="text-primary/60 text-sm font-light leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center text-primary text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">
          <span>Xem chi tiết</span>
          <ChevronRight size={14} className="ml-1 text-primary/40" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
