<?php

namespace App\Http\Controllers\API\Staff;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Danh sách lịch hẹn được phân công cho nhân viên.
     */
    public function index(Request $request)
    {
        $staff = $request->user();
        
        $bookings = Booking::with(['customer', 'bookingDetails.service'])
            ->where('staff_id', $staff->getKey())
            ->orderBy('booking_id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    /**
     * Cập nhật trạng thái lịch hẹn (Confirmed, In Progress, Completed).
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:confirmed,in_progress,completed,cancelled'
        ]);

        $booking = Booking::where('staff_id', $request->user()->getKey())
            ->where('booking_id', $id)
            ->firstOrFail();

        $booking->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật trạng thái thành công.',
            'data' => $booking
        ]);
    }
}
