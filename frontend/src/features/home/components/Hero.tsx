import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const element = document.getElementById('featured-services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-surface">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Est. 2026 — Maison Minimal
          </span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] text-primary mb-10">
            Beauty <br />
            <span className="font-bold italic">at home.</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary/60 font-light leading-relaxed mb-12 max-w-lg">
            Trải nghiệm dịch vụ làm đẹp đẳng cấp ngay tại nhà. Tinh tế, chuyên nghiệp và thư giãn tuyệt đối.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => navigate('/services')}
              className="btn-primary px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Đặt lịch ngay
            </button>
            <button 
              onClick={scrollToServices}
              className="px-10 py-4 rounded-full text-lg font-semibold text-primary border border-primary/10 hover:bg-white hover:shadow-xl transition-all"
            >
              Khám phá dịch vụ
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative rounded-[60px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]">
            <img 
              src="/images/home/hero.png" 
              alt="Premium Spa Service" 
              className="w-full h-[700px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-4 rounded-[32px] shadow-2xl z-20 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-primary tracking-tighter">4.9</span>
              <div className="flex text-secondary mt-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[10px]">★</span>
                ))}
              </div>
              <span className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">Trusted Experts</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
