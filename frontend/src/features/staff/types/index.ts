export type StaffBookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface StaffBookingCustomer {
  full_name?: string | null;
}

export interface StaffBookingService {
  service_name?: string | null;
}

export interface StaffBookingDetail {
  service?: StaffBookingService | null;
}

export interface StaffBooking {
  booking_id: number;
  booking_date?: string | null;
  booking_time?: string | null;
  status: StaffBookingStatus;
  address?: string | null;
  note?: string | null;
  customer?: StaffBookingCustomer | null;
  booking_details?: StaffBookingDetail[] | null;
}

export interface StaffBookingsResponse {
  success?: boolean;
  data: StaffBooking[];
}
