export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  address: string;
  status: BookingStatus;
  price: string;
  image: string;
  userId: string;
}

export interface CreateBookingRequest {
  serviceId: string;
  date: string;
  time: string;
  address: string;
  note?: string;
  name: string;
  phone: string;
}
