<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Notification;
use App\Services\BookingService;
use Exception;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }
    public function index()
    {
        $bookings = Booking::where('staff_id', session('staff_id'))
    ->with(['customer', 'bookingDetails.service'])
    ->orderBy('booking_date', 'desc')
    ->orderBy('booking_time', 'desc')
    ->get();

        return view('staff.bookings.index', compact('bookings'));
    }

    public function show($id)
    {
        $booking = Booking::with(['customer', 'bookingDetails.service'])->findOrFail($id);

        // staff chỉ xem booking của mình
        if ($booking->staff_id != session('staff_id')) {
            return redirect()->route('staff.bookings.index')->with('error', 'Bạn không có quyền xem booking này!');
        }

        return view('staff.bookings.show', compact('booking'));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $booking = Booking::findOrFail($id);

        if ($booking->staff_id != session('staff_id')) {
            return redirect()->back()->with('error', 'Bạn không có quyền cập nhật booking này!');
        }

        $booking->update([
            'status' => $request->status
        ]);

        // 🔔 Thông báo cho customer khi staff cập nhật trạng thái
        Notification::create([
            'user_type' => 'customer',
            'user_id' => $booking->customer_id,
            'title' => 'Cập nhật trạng thái booking',
            'content' => 'Booking ID ' . $booking->booking_id . ' đã được cập nhật trạng thái.',
            'is_read' => 0,
            'created_at' => now()
        ]);

        return redirect()->back()->with('success', 'Cập nhật trạng thái thành công!');
    }

    public function jobMarket()
    {
        $bookings = Booking::whereNull('staff_id')
            ->where('status', 0)
            ->with(['customer', 'bookingDetails.service'])
            ->orderBy('booking_date', 'asc')
            ->orderBy('booking_time', 'asc')
            ->get();

        return view('staff.bookings.job_market', compact('bookings'));
    }

    public function acceptBooking($id)
    {
        $booking = Booking::findOrFail($id);

        try {
            $this->bookingService->acceptBookingByStaff($booking, session('staff_id'));
        } catch (Exception $e) {
            return redirect()->route('staff.jobMarket')->with('error', $e->getMessage());
        }

        return redirect()->route('staff.bookings.index')->with('success', 'Bạn đã nhận lịch thành công!');
    }
}