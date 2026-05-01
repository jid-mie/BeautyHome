import apiClient from '../../../services/apiClient';
import { Booking, CreateBookingRequest, BookingStatus } from '../types';

interface BackendBooking {
  booking_id: number;
  booking_date: string;
  booking_time: string;
  address: string;
  status: number;
  total_amount: string | number;
  booking_details: Array<{
    service: {
      service_name: string;
      image: string;
    };
  }>;
}

const mapStatus = (status: any): BookingStatus => {
  const s = status?.toString();
  switch (s) {
    case '0': return 'pending';
    case '1': return 'confirmed';
    case '2': return 'in_progress';
    case '3': return 'completed';
    case '4': return 'cancelled';
    default: return 'pending';
  }
};

export const bookingApi = {
  getMyBookings: async (status?: string): Promise<Booking[]> => {
    const response = await apiClient.get<{ success: boolean; data: BackendBooking[] }>('/customer/bookings');
    
    if (!response.data.success) return [];

    const bookings = response.data.data.map(b => ({
      id: `BK${b.booking_id}`,
      serviceId: 'N/A',
      serviceTitle: b.booking_details.length > 1 
        ? `${b.booking_details[0].service.service_name} (+${b.booking_details.length - 1} khác)`
        : b.booking_details[0]?.service.service_name || 'Dịch vụ lẻ',
      date: b.booking_date,
      time: b.booking_time,
      address: b.address,
      status: mapStatus(b.status),
      price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(b.total_amount)),
      image: b.booking_details[0]?.service.image || '/images/home/service-facial.png',
      userId: 'N/A'
    }));

    // Lọc dữ liệu phía Frontend nếu cần (hoặc truyền query vào API nếu backend hỗ trợ)
    if (status && status !== 'all') {
      if (status === 'upcoming') {
        return bookings.filter(b => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress');
      }
      return bookings.filter(b => b.status === status);
    }

    return bookings;
  },

  createBooking: async (data: CreateBookingRequest): Promise<any> => {
    // Map frontend request to backend validation rules
    const backendData = {
      booking_date: data.date,
      booking_time: data.time,
      address: data.address,
      note: data.note,
      services: [data.serviceId], // Backend expects an array
      // Full name and phone can be handled by backend profile or passed extra
      full_name: data.name,
      phone: data.phone
    };
    const response = await apiClient.post('/customer/bookings/store', backendData);
    return response.data;
  },

  cancelBooking: async (id: string | number): Promise<void> => {
    const numericId = typeof id === 'string' ? id.replace('BK', '') : id;
    await apiClient.post(`/customer/bookings/${numericId}/cancel`);
  },
};
