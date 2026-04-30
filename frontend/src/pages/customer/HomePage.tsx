import React from 'react';
import Hero from '../../features/home/components/Hero';
import FeaturedServices from '../../features/home/components/FeaturedServices';
import Testimonials from '../../features/home/components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedServices />
      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
           <div className="order-2 md:order-1">
              <div className="relative rounded-[60px] overflow-hidden shadow-2xl shadow-primary/5 transition-transform duration-700 hover:rotate-1">
                <img 
                  src="/images/home/why-choose-us.png" 
                  className="w-full h-full object-cover" 
                  alt="Quality Service" 
                />
              </div>
           </div>

           <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                Tại sao là BeautyHome?
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-primary leading-tight mb-10">
                Đẳng cấp Spa <br />
                <span className="font-bold italic">trong tầm tay bạn.</span>
              </h2>
              <div className="space-y-10">
                 <div className="flex items-start">
                    <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mr-6 shrink-0 shadow-sm transition-transform hover:scale-110">
                       <span className="text-2xl">✨</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Chuyên Phục Vụ Tại Nhà</h4>
                       <p className="text-primary/60 font-light leading-relaxed">Tiết kiệm thời gian di chuyển, tận hưởng không gian riêng tư và thoải mái nhất.</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mr-6 shrink-0 shadow-sm transition-transform hover:scale-110">
                       <span className="text-2xl">🌿</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Sản Phẩm Cao Cấp</h4>
                       <p className="text-primary/60 font-light leading-relaxed">Chúng tôi chỉ sử dụng các dòng mỹ phẩm hữu cơ, an toàn tuyệt đối cho làn da của bạn.</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mr-6 shrink-0 shadow-sm transition-transform hover:scale-110">
                       <span className="text-2xl">👩‍⚕️</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Chuyên Gia Tay Nghề Cao</h4>
                       <p className="text-primary/60 font-light leading-relaxed">Đội ngũ kỹ thuật viên được đào tạo bài bản, có chứng chỉ hành nghề và tận tâm.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default HomePage;
