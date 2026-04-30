import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      {/* Left Side: Editorial Image */}
      <div className="hidden md:flex md:w-1/2 relative bg-primary overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
          alt="Beauty Sanctuary" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-primary to-transparent">
          <h1 className="text-5xl font-sans font-light tracking-tight mb-4 leading-tight">
            BeautyHome
          </h1>
          <p className="text-xl font-light opacity-80 max-w-md">
            Khám phá vẻ đẹp đích thực của bạn trong không gian thư giãn tuyệt đối.
          </p>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-sans font-bold text-primary mb-4">
              {title}
            </h2>
            <p className="text-secondary text-lg">
              {subtitle}
            </p>
          </div>
          
          <div className="card-editorial p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
