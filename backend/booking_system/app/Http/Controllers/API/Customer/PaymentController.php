<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::whereHas('booking', function($query) use ($request) {
            $query->where('customer_id', $request->user()->customer_id);
        })->with('booking')->get();

        return response()->json(['success' => true, 'data' => $payments]);
    }

    public function show(Request $request, $booking_id)
    {
        $payment = Payment::where('booking_id', $booking_id)
            ->whereHas('booking', function($query) use ($request) {
                $query->where('customer_id', $request->user()->customer_id);
            })->first();

        return response()->json(['success' => true, 'data' => $payment]);
    }

    public function pay(Request $request, $booking_id)
    {
        $payment = Payment::where('booking_id', $booking_id)->first();
        if (!$payment) return response()->json(['success' => false, 'message' => 'Không tìm thấy thông tin thanh toán.'], 404);

        $payment->update([
            'payment_status' => 'paid',
            'payment_date' => now(),
            'payment_method' => $request->payment_method ?? 'cash'
        ]);

        return response()->json(['success' => true, 'message' => 'Thanh toán thành công.']);
    }
}
