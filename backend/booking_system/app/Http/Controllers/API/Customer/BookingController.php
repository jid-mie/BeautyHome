<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\CQRS\Commands\Bookings\CreateBookingCommand;
use App\CQRS\Handlers\Bookings\CreateBookingHandler;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use Throwable;

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
        $validated = $request->validate([
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required|date_format:H:i',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
            'services' => 'required|array|min:1',
            'services.*' => 'required|integer|distinct|exists:services,service_id',
        ]);

        try {
            $command = new CreateBookingCommand(
                $validated,
                $request->user()->customer_id,
                $validated['services']
            );

            $booking = $handler->handle($command);

            return response()->json([
                'success' => true,
                'data' => $booking,
                'message' => 'Đặt lịch thành công!'
            ]);
        } catch (InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Throwable $e) {
            Log::error('Failed to create booking.', [
                'customer_id' => $request->user()->customer_id,
                'exception' => $e,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Không thể đặt lịch vào lúc này. Vui lòng thử lại sau.'
            ], 500);
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

        if ($booking->status !== Booking::STATUS_PENDING) {
            return response()->json(['success' => false, 'message' => 'Chỉ có thể hủy lịch khi đang chờ xác nhận.'], 400);
        }

        $booking->update(['status' => Booking::STATUS_CANCELLED]);

        return response()->json([
            'success' => true,
            'message' => 'Hủy lịch thành công.'
        ]);
    }
}
