<?php

namespace App\CQRS\Handlers\Bookings;

use App\CQRS\Commands\Bookings\CreateBookingCommand;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Service;
use App\Models\Notification;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateBookingHandler
{
    /**
     * @throws Exception
     */
    public function handle(CreateBookingCommand $command): Booking
    {
        $data = $command->data;
        $customerId = $command->customerId;
        $cart = $command->cart;

        if (empty($cart)) {
            throw new Exception('Giỏ hàng trống, không thể đặt lịch.');
        }

        $bookingDateTime = Carbon::parse($data['booking_date'] . ' ' . $data['booking_time']);
        if ($bookingDateTime->isPast()) {
            throw new Exception('Thời gian đặt lịch không hợp lệ (không được trong quá khứ).');
        }

        $services = Service::whereIn('service_id', $cart)->get();
        if ($services->isEmpty()) {
            throw new Exception('Dịch vụ không tồn tại.');
        }

        $totalAmount = $services->sum('price');

        return DB::transaction(function () use ($data, $customerId, $services, $totalAmount) {
            $booking = Booking::create([
                'customer_id'   => $customerId,
                'total_amount'  => $totalAmount,
                'booking_date'  => $data['booking_date'],
                'booking_time'  => $data['booking_time'],
                'address'       => $data['address'],
                'note'          => $data['note'] ?? null,
                'status'        => 0 // 0 = pending
            ]);

            foreach ($services as $srv) {
                BookingDetail::create([
                    'booking_id' => $booking->booking_id,
                    'service_id' => $srv->service_id,
                    'price'      => $srv->price
                ]);
            }

            Notification::create([
                'user_type' => 'customer',
                'user_id'   => $customerId,
                'title'     => 'Đặt lịch thành công',
                'content'   => 'Bạn đã đặt lịch thành công. Vui lòng chờ xác nhận!',
                'is_read'   => 0,
                'created_at'=> now()
            ]);

            return $booking;
        });
    }
}
