<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Service;
use App\Models\Notification;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class BookingService
{
    /**
     * Tạo mới một booking từ giỏ hàng.
     *
     * @param array $data Dữ liệu request đã được validate
     * @param int $customerId ID của khách hàng
     * @param array $cart Session giỏ hàng chứa mảng service_id
     * @return Booking
     * @throws Exception
     */
    public function createBookingFromCart(array $data, int $customerId, array $cart): Booking
    {
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

        // Dùng DB Transaction để đảm bảo tính toàn vẹn dữ liệu
        return DB::transaction(function () use ($data, $customerId, $services, $totalAmount) {
            
            $booking = Booking::create([
                'customer_id'   => $customerId,
                'total_amount'  => $totalAmount,
                'booking_date'  => $data['booking_date'],
                'booking_time'  => $data['booking_time'],
                'address'       => $data['address'],
                'note'          => $data['note'] ?? null,
                'status'        => Booking::STATUS_PENDING
            ]);

            foreach ($services as $srv) {
                BookingDetail::create([
                    'booking_id' => $booking->booking_id,
                    'service_id' => $srv->service_id,
                    'price'      => $srv->price
                ]);
            }

            // Gửi thông báo cho Customer
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

    /**
     * Hủy booking bởi khách hàng
     *
     * @param Booking $booking
     * @param int $customerId
     * @throws Exception
     */
    public function cancelBookingByCustomer(Booking $booking, int $customerId)
    {
        if ($booking->customer_id != $customerId) {
            throw new Exception('Bạn không có quyền hủy lịch này.');
        }

        if ($booking->status !== Booking::STATUS_PENDING) {
            throw new Exception('Chỉ có thể hủy lịch khi đang chờ xác nhận.');
        }

        $booking->update(['status' => Booking::STATUS_CANCELLED]);
    }

    /**
     * Nhận lịch bởi nhân viên (Job Market)
     *
     * @param Booking $booking
     * @param int $staffId
     * @throws Exception
     */
    public function acceptBookingByStaff(Booking $booking, int $staffId)
    {
        if (!is_null($booking->staff_id)) {
            throw new Exception('Lịch này đã có người nhận.');
        }

        $this->checkStaffCollision($staffId, $booking->booking_date, $booking->booking_time);

        $booking->update([
            'staff_id' => $staffId,
            'status'   => Booking::STATUS_CONFIRMED
        ]);
    }

    /**
     * Kiểm tra xem nhân viên có bị trùng lịch không
     */
    public function checkStaffCollision(int $staffId, $date, $time)
    {
        $collision = Booking::where('staff_id', $staffId)
            ->where('booking_date', $date)
            ->where('booking_time', $time)
            ->whereIn('status', [Booking::STATUS_CONFIRMED, Booking::STATUS_IN_PROGRESS])
            ->exists();
            
        if ($collision) {
            throw new Exception("Nhân viên này đã có lịch đặt khác vào đúng thời gian ($time $date).");
        }
    }
}
