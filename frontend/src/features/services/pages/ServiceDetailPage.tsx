import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Tag, ChevronRight, Star, ShieldCheck, Zap, Info, Box, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import BookingDrawer from '../../bookings/components/BookingDrawer';
import { useService } from '../hooks/useServices';

interface StepDetail {
  title: string;
  description: string;
  techDetails?: {
    products?: string[];
    equipment?: string;
    origin?: string;
    benefits?: string;
  };
}

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading } = useService(id || '');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const serviceData = response?.data;

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Dịch vụ không tồn tại</h2>
          <Link to="/services" className="text-secondary hover:underline underline-offset-4">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  // Mapping backend data to frontend interface
  const service = {
    id: serviceData.service_id.toString(),
    title: serviceData.service_name,
    category: serviceData.category?.category_name || 'Dịch vụ',
    price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(serviceData.price),
    duration: `${serviceData.duration} phút`,
    image: serviceData.image || '/images/home/service-facial.png',
    description: serviceData.description,
    // Mock steps/benefits since DB doesn't have them yet, but we want a premium look
    benefits: [
      'Tăng sinh Collagen tự nhiên',
      'Làm sạch sâu 99% bụi bẩn',
      'Cấp ẩm tức thì, giúp da căng bóng',
      'Giảm căng thẳng, thư giãn tâm trí'
    ],
    steps: [
      {
        title: 'Tư vấn & Kiểm tra da',
        description: 'Chuyên gia sẽ kiểm tra tình trạng da/cơ thể trước khi thực hiện.',
        techDetails: { 
          products: ['Serum thảo mộc'], 
          benefits: 'Đảm bảo an toàn tuyệt đối.',
          origin: 'Việt Nam',
          equipment: 'Máy soi da chuyên dụng'
        }
      },
      {
        title: 'Thực hiện kỹ thuật chuyên sâu',
        description: 'Tiến hành liệu trình theo tiêu chuẩn BeautyHome.',
        techDetails: { 
          equipment: 'Máy công nghệ cao', 
          benefits: 'Hiệu quả rõ rệt sau 1 lần.',
          origin: 'Hàn Quốc',
          products: ['Tinh chất phục hồi']
        }
      }
    ]
  };

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center space-x-2 text-white/60 text-xs font-bold tracking-widest uppercase mb-8">
              <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <ChevronRight size={12} />
              <Link to="/services" className="hover:text-white transition-colors">Dịch vụ</Link>
              <ChevronRight size={12} />
              <span className="text-white">{service.category}</span>
            </nav>
            
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white leading-[0.9] mb-10">
              {service.title.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === service.title.split(' ').length - 1 ? 'font-bold italic' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center text-white">
                <Clock className="mr-2 text-secondary" size={20} />
                <span className="text-lg font-light">{service.duration}</span>
              </div>
              <div className="flex items-center text-white">
                <Star className="mr-2 text-secondary" size={20} />
                <span className="text-lg font-light">4.9/5 (120 đánh giá)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-20">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-8">Giới thiệu dịch vụ</h2>
              <p className="text-xl text-primary/60 font-light leading-relaxed mb-10">
                {service.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center p-6 bg-white rounded-3xl shadow-sm border border-primary/5">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4 text-secondary">
                      <Zap size={18} />
                    </div>
                    <span className="font-bold text-primary text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-primary tracking-tight">Liệu trình thực hiện</h2>
                <span className="text-xs font-bold text-primary/40 tracking-widest uppercase">Nhấn để xem chi tiết kỹ thuật</span>
              </div>
              
              <div className="space-y-4">
                {service.steps.map((step, i) => (
                  <div 
                    key={i} 
                    className={`group cursor-pointer overflow-hidden transition-all duration-500 border border-primary/5 ${
                      activeStep === i ? 'bg-white shadow-xl rounded-[40px]' : 'bg-white/50 rounded-[32px] hover:bg-white'
                    }`}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                  >
                    <div className="p-8 flex items-start justify-between">
                      <div className="flex items-start">
                        <span className={`text-4xl font-bold mr-8 transition-colors duration-500 ${
                          activeStep === i ? 'text-primary' : 'text-primary/10 group-hover:text-primary/20'
                        }`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                          <p className="text-primary/60 font-medium leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`text-primary/20 transition-transform duration-500 ${activeStep === i ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Detailed Reveal Area */}
                    <div className={`grid transition-all duration-500 ease-in-out ${
                      activeStep === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden">
                        <div className="p-8 pt-0 border-t border-primary/5 mt-2">
                           <div className="grid md:grid-cols-2 gap-8">
                              {step.techDetails?.products && (
                                <div className="space-y-4">
                                  <div className="flex items-center text-primary/80">
                                    <Box size={16} className="mr-2 text-primary/40" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Sản phẩm & Thành phần</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.techDetails.products.map((p, idx) => (
                                      <span key={idx} className="bg-primary/5 px-3 py-1.5 rounded-full text-xs font-medium text-primary">
                                        {p}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {step.techDetails?.equipment && (
                                <div className="space-y-4">
                                  <div className="flex items-center text-primary/80">
                                    <Zap size={16} className="mr-2 text-primary/40" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Thiết bị chuyên dụng</span>
                                  </div>
                                  <p className="text-primary text-sm font-bold bg-primary/5 p-3 rounded-2xl">
                                    {step.techDetails.equipment}
                                  </p>
                                </div>
                              )}

                              {step.techDetails?.origin && (
                                <div className="space-y-4">
                                  <div className="flex items-center text-primary/80">
                                    <MapPin size={16} className="mr-2 text-primary/40" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Nguồn gốc & Xuất xứ</span>
                                  </div>
                                  <p className="text-primary/70 text-sm font-medium">
                                    {step.techDetails.origin}
                                  </p>
                                </div>
                              )}

                              {step.techDetails?.benefits && (
                                <div className="space-y-4">
                                  <div className="flex items-center text-primary/80">
                                    <Star size={16} className="mr-2 text-primary/40" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Cảm nhận dự kiến</span>
                                  </div>
                                  <p className="text-primary/70 text-sm font-medium italic">
                                    "{step.techDetails.benefits}"
                                  </p>
                                </div>
                              )}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-primary text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <span className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-10 block">Đặt lịch tại nhà</span>
                <div className="flex justify-between items-end mb-10">
                  <span className="text-4xl font-bold tracking-tighter">{service.price}</span>
                  <span className="text-white/40 text-sm font-light mb-1">mỗi buổi</span>
                </div>
                
                <div className="space-y-6 mb-12">
                   <div className="flex items-center p-4 bg-white/5 rounded-2xl">
                      <Clock className="text-secondary mr-4" size={20} />
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Thời gian</p>
                        <p className="font-bold">{service.duration}</p>
                      </div>
                   </div>
                   <div className="flex items-center p-4 bg-white/5 rounded-2xl">
                      <ShieldCheck className="text-secondary mr-4" size={20} />
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Đội ngũ</p>
                        <p className="font-bold">Expert Technicians</p>
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-white text-primary px-10 py-5 rounded-full text-lg font-bold hover:bg-white/90 transition-all shadow-xl shadow-black/10 active:scale-95 mb-6"
                >
                  Đặt lịch ngay
                </button>
                <p className="text-center text-white/30 text-xs tracking-wide">
                  Hủy lịch miễn phí trước 24h
                </p>
              </div>
            </div>
            
            {/* Trust badge */}
            <div className="mt-8 flex items-center justify-center space-x-8 text-primary/40">
               <div className="flex flex-col items-center">
                  <div className="mb-2">★★★★★</div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">100% Reliable</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Drawer */}
      {service && (
        <BookingDrawer 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          service={service}
        />
      )}
    </div>
  );
};

export default ServiceDetailPage;
