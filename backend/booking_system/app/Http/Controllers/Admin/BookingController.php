<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Staff;
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
    $bookings = Booking::with(['customer','bookingDetails.service','staff'])
    ->orderBy('booking_date', 'desc')
    ->orderBy('booking_time', 'desc')
    ->get();

    return view('admin.bookings.index', compact('bookings'));
    }

    public function show($id)
    {
        $booking = Booking::with(['bookingDetails.service'])->findOrFail($id);
        $staffs = Staff::all();

        return view('admin.bookings.show', compact('booking', 'staffs'));
    }

    public function assignStaff(Request $request, $id)
    {
        $request->validate(['staff_id' => 'required']);
        $booking = Booking::findOrFail($id);

        try {
            $this->bookingService->checkStaffCollision($request->staff_id, $booking->booking_date, $booking->booking_time);
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        $booking->update([
            'staff_id' => $request->staff_id,
            'status' => $booking->status == 0 ? 1 : $booking->status // Đổi thành Đã xác nhận nếu đang Chờ xác nhận
        ]);

        return redirect()->back()->with('success', 'Phân công nhân viên thành công!');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
        'status' => 'required|integer|min:0|max:4'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update([
        'status' => (int)$request->status
        ]);

        return redirect()->back()->with('success', 'Cập nhật trạng thái thành công!');
    }
}