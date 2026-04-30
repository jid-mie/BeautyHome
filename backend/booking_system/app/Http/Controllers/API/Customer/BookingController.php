<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\CQRS\Commands\Bookings\CreateBookingCommand;
use App\CQRS\Handlers\Bookings\CreateBookingHandler;
use Exception;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['bookingDetails.service', 'staff'])
            ->where('customer_id', $request->user()->customer_id)
            ->orderBy('booking_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    public function store(Request $request, CreateBookingHandler $handler)
    {
        $request->validate([
            'booking_date' => 'required|date',
            'booking_time' => 'required',
            'address' => 'required|string',
            'note' => 'nullable|string',
            'services' => 'required|array', // Mảng các service_id
        ]);

        try {
            $command = new CreateBookingCommand(
                $request->all(),
                $request->user()->customer_id,
                $request->services
            );

            $booking = $handler->handle($command);

            return response()->json([
                'success' => true,
                'data' => $booking,
                'message' => 'Đặt lịch thành công!'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function cancel(Request $request, $id)
    {
        $booking = Booking::where('customer_id', $request->user()->customer_id)
            ->where('booking_id', $id)
            ->first();

        if (!$booking) {
            return response()->json(['success' => false, 'message' => 'Lịch đặt không tồn tại.'], 404);
        }

        if ($booking->status != 0) {
            return response()->json(['success' => false, 'message' => 'Chỉ có thể hủy lịch khi đang chờ xác nhận.'], 400);
        }

        $booking->update(['status' => 4]); // 4 = Cancelled

        return response()->json([
            'success' => true,
            'message' => 'Hủy lịch thành công.'
        ]);
    }
}
