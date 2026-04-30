import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Clock, Calendar, MapPin, User, Phone, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../auth/authSlice';
import { useCreateBooking } from '../hooks/useBookings';
import { CreateBookingRequest } from '../types';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    price: string;
    duration: string;
    image: string;
  };
}

const timeSlots = [
  { id: 'morning', label: 'Sáng', slots: ['08:00', '09:00', '10:00', '11:00'] },
  { id: 'afternoon', label: 'Chiều', slots: ['13:00', '14:00', '15:00', '16:00', '17:00'] },
  { id: 'evening', label: 'Tối', slots: ['18:00', '19:00', '20:00'] },
];

const BookingDrawer: React.FC<BookingDrawerProps> = ({ isOpen, onClose, service }) => {
  const { user } = useSelector(selectAuth);
  const [step, setStep] = useState(1);
  const { mutate: createBooking, isPending: isSubmitting } = useCreateBooking();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: user?.full_name || user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: '',
  });

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
      date: d.getDate(),
      full: d.toISOString().split('T')[0],
    };
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    const bookingData: CreateBookingRequest = {
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
      address: formData.address,
      name: formData.name,
      phone: formData.phone,
      note: formData.note,
    };

    createBooking(bookingData, {
      onSuccess: () => {
        setIsSuccess(true);
      },
    });
  };

  if (!isOpen && !isSuccess) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-primary/5">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              {isSuccess ? 'Đặt lịch thành công' : 'Đặt lịch dịch vụ'}
            </h2>
            {!isSuccess && (
              <p className="text-primary/40 text-xs font-bold tracking-widest uppercase mt-1">
                Bước {step} / 3: {step === 1 ? 'Thời gian' : step === 2 ? 'Thông tin' : 'Xác nhận'}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors"
          >
            <X size={24} className="text-primary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!isSuccess ? (
            <div className="p-8">
              {/* Step 1: Date & Time */}
              <div className={step === 1 ? 'block' : 'hidden'}>
                <h3 className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-6">Chọn ngày thực hiện</h3>
                <div className="flex space-x-3 mb-10 overflow-x-auto pb-4 hide-scrollbar">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`flex-shrink-0 w-16 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                        selectedDate === d.full 
                          ? 'bg-primary text-white shadow-[0_20px_40px_-10px_rgba(22,40,57,0.4)] scale-110 z-10' 
                          : 'bg-primary/5 text-primary hover:bg-primary/10 hover:scale-105'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase opacity-60 mb-2">{d.day}</span>
                      <span className="text-xl font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-6">Chọn khung giờ</h3>
                <div className="space-y-8">
                  {timeSlots.map((group) => (
                    <div key={group.id}>
                      <p className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-4">{group.label}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {group.slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${
                              selectedTime === slot
                                ? 'bg-primary text-white border-primary shadow-[0_15px_30px_-5px_rgba(22,40,57,0.3)] scale-[1.02]'
                                : 'bg-white border-primary/5 text-primary hover:border-primary/20'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Information */}
              <div className={step === 2 ? 'block' : 'hidden'}>
                <div className="space-y-8">
                  <div className="bg-primary/5 p-6 rounded-3xl border border-primary/5">
                    <div className="flex items-center text-primary mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3 text-secondary">
                        <User size={16} />
                      </div>
                      <span className="font-bold">Thông tin liên hệ</span>
                    </div>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-primary/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                      />
                      <input 
                        type="tel" 
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white border border-primary/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-3xl border border-primary/5">
                    <div className="flex items-center text-primary mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3 text-secondary">
                        <MapPin size={16} />
                      </div>
                      <span className="font-bold">Địa chỉ phục vụ</span>
                    </div>
                    <textarea 
                      placeholder="Nhập địa chỉ chi tiết của bạn tại đây..."
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-white border border-primary/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium resize-none"
                    />
                  </div>

                  <div className="bg-primary/5 p-6 rounded-3xl border border-primary/5">
                    <div className="flex items-center text-primary mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3 text-secondary">
                        <AlertCircle size={16} />
                      </div>
                      <span className="font-bold">Ghi chú đặc biệt</span>
                    </div>
                    <textarea 
                      placeholder="Ví dụ: Da mẫn cảm, cần mang thêm tinh dầu..."
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                      className="w-full bg-white border border-primary/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Summary */}
              <div className={step === 3 ? 'block' : 'hidden'}>
                <div className="bg-primary text-white p-8 rounded-[40px] mb-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-6">Xác nhận dịch vụ</p>
                    <h4 className="text-2xl font-bold leading-tight mb-8">{service.title}</h4>
                    
                    <div className="space-y-5 border-t border-white/10 pt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/40">
                          <Clock size={18} className="mr-3" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Thời lượng</span>
                        </div>
                        <span className="font-bold text-lg">{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/40">
                          <Calendar size={18} className="mr-3" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Lịch hẹn</span>
                        </div>
                        <span className="font-bold text-lg text-secondary">{selectedTime}, {selectedDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/40">
                          <MapPin size={18} className="mr-3" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Địa điểm</span>
                        </div>
                        <span className="font-bold text-right max-w-[220px] leading-tight">{formData.address}</span>
                      </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Phương thức: COD</span>
                        <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Tổng thanh toán</span>
                      </div>
                      <span className="text-5xl font-extrabold tracking-tighter text-secondary">{service.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20 flex items-start">
                  <Info size={20} className="text-secondary mr-4 mt-0.5" />
                  <p className="text-sm text-primary/70 leading-relaxed">
                    Bằng việc nhấn xác nhận, bạn đồng ý với điều khoản dịch vụ của BeautyHome. Chuyên gia của chúng tôi sẽ liên hệ trước 30 phút để xác nhận.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 text-secondary animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4 tracking-tight">Cảm ơn bạn!</h3>
              <p className="text-primary/60 text-lg font-medium leading-relaxed max-w-xs mb-12">
                Yêu cầu đặt lịch của bạn đã được tiếp nhận thành công. Chúng tôi sẽ sớm liên hệ xác nhận.
              </p>
              <div className="w-full space-y-4">
                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all"
                >
                  Quay lại trang chủ
                </button>
                <p className="text-xs text-primary/30 font-bold uppercase tracking-widest">Mã đơn hàng: #BH{Math.floor(Math.random() * 10000)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isSuccess && (
          <div className="p-8 border-t border-primary/5 bg-white">
            <div className="flex space-x-4">
              {step > 1 && (
                <button 
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="w-20 flex items-center justify-center bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-all disabled:opacity-50"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {step < 3 ? (
                <button 
                  onClick={handleNext}
                  disabled={
                    (step === 1 && (!selectedDate || !selectedTime)) ||
                    (step === 2 && (!formData.phone || !formData.address))
                  }
                  className="flex-1 bg-primary text-white py-5 rounded-full font-bold flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Tiếp tục
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.phone || !formData.address}
                  className="flex-1 bg-secondary text-primary py-5 rounded-full font-bold flex items-center justify-center hover:brightness-105 transition-all disabled:opacity-50 shadow-xl shadow-secondary/20"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  ) : 'Xác nhận đặt lịch'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingDrawer;
