import React from 'react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Lan Anh',
      role: 'Khách hàng thân thiết',
      text: 'Dịch vụ tại nhà của BeautyHome thực sự thay đổi cách tôi chăm sóc bản thân. Tiết kiệm thời gian và chất lượng như tại Spa 5 sao.',
      avatar: '/images/home/customer-1.png'
    },
    {
      name: 'Minh Quân',
      role: 'Doanh nhân',
      text: 'Tôi rất ấn tượng với sự chuyên nghiệp của các nhân viên. Massage đá nóng là liệu pháp tuyệt vời sau mỗi ngày làm việc căng thẳng.',
      avatar: '/images/home/customer-2.png'
    },
    {
      name: 'Thanh Hằng',
      role: 'Người mẫu',
      text: 'Làn da của tôi luôn rạng rỡ nhờ liệu trình chăm sóc da mặt định kỳ. Rất tiện lợi cho lịch trình bận rộn của tôi.',
      avatar: '/images/home/customer-3.png'
    }
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-light tracking-tighter text-[#162839] mb-16">
          Khách hàng <span className="font-bold">nói gì về chúng tôi</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between">
              <p className="text-lg text-[#162839] font-light italic mb-8 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center">
                <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full mr-4 border-2 border-[#f8f9fa] object-cover" />
                <div>
                  <h4 className="font-bold text-[#162839]">{review.name}</h4>
                  <span className="text-sm text-[#6a5c4e]">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
