import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '../api/bookingApi';
import { CreateBookingRequest } from '../types';

export const useBookings = (status?: string) => {
  return useQuery({
    queryKey: ['bookings', status],
    queryFn: () => bookingApi.getMyBookings(status),
    refetchInterval: 30000, // Tự động cập nhật mỗi 30 giây
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingApi.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
