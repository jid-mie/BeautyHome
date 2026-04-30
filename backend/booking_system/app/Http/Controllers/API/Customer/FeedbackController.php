<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Booking;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,booking_id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string'
        ]);

        $booking = Booking::find($request->booking_id);
        if ($booking->customer_id != $request->user()->customer_id) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền đánh giá lịch này.'], 403);
        }

        $feedback = Feedback::create([
            'booking_id' => $request->booking_id,
            'customer_id' => $request->user()->customer_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'created_at' => now()
        ]);

        return response()->json(['success' => true, 'data' => $feedback, 'message' => 'Cảm ơn bạn đã đánh giá!']);
    }

    public function show($booking_id)
    {
        $feedback = Feedback::where('booking_id', $booking_id)->first();
        return response()->json(['success' => true, 'data' => $feedback]);
    }
}
