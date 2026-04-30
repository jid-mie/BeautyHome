<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;

class PaymentController extends Controller
{
    // Danh sách booking + trạng thái thanh toán của customer
    public function index()
    {
        $bookings = Booking::where('customer_id', session('customer_id'))
            ->with(['bookingDetails', 'payment'])
            ->orderBy('booking_date', 'desc')
            ->orderBy('booking_time', 'desc')
            ->get();

        return view('customer.payments.index', compact('bookings'));
    }

    // Xem trang thanh toán chi tiết
    public function show($booking_id)
    {
        $booking = Booking::with(['bookingDetails', 'payment'])->findOrFail($booking_id);

        if ($booking->customer_id != session('customer_id')) {
            return redirect()->route('customer.payments.index')
                ->with('error', 'Bạn không có quyền thanh toán lịch hẹn này!');
        }

        if ($booking->status != 3) {
            return redirect()->route('customer.payments.index')
                ->with('error', 'Lịch hẹn chưa hoàn thành nên không thể thanh toán!');
        }

        return view('customer.payments.show', compact('booking'));
    }

    // Xử lý thanh toán
    public function pay(Request $request, $booking_id)
    {
        $request->validate([
            'payment_method' => 'required'
        ]);

        $booking = Booking::with(['bookingDetails', 'payment'])->findOrFail($booking_id);

        if ($booking->customer_id != session('customer_id')) {
            return redirect()->route('customer.payments.index')
                ->with('error', 'Bạn không có quyền thanh toán lịch hẹn này!');
        }

        if ($booking->status != 3) {
            return redirect()->route('customer.payments.index')
                ->with('error', 'Lịch hẹn chưa hoàn thành nên không thể thanh toán!');
        }

        // Nếu đã thanh toán rồi -> không thanh toán lại
        if ($booking->payment && $booking->payment->payment_status == 'paid') {
            return redirect()->route('customer.payments.index')
                ->with('error', 'Lịch hẹn này đã được thanh toán!');
        }

        // Nếu chưa có payment -> tạo mới
        if (!$booking->payment) {
            Payment::create([
                'booking_id' => $booking_id,
                'amount' => $booking->total_amount,
                'payment_method' => $request->payment_method,
                'payment_status' => 'paid',
                'payment_date' => now()
            ]);
        } 
        // Nếu có rồi nhưng chưa paid -> update
        else {
            $booking->payment->update([
                'amount' => $booking->total_amount,
                'payment_method' => $request->payment_method,
                'payment_status' => 'paid',
                'payment_date' => now()
            ]);
        }

        return redirect()->route('customer.payments.index')
            ->with('success', 'Thanh toán thành công!');
    }
}