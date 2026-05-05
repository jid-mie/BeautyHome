<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Booking;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $bookings = Booking::with(['customer', 'bookingDetails.service', 'staff'])
                ->orderBy('booking_id', 'desc')
                ->get();
                
            return response()->json([
                'status' => 'success',
                'data' => $bookings
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'nullable|string|in:pending,confirmed,in_progress,completed,cancelled',
            'staff_id' => 'nullable|exists:staffs,staff_id',
        ]);

        try {
            // Tự động chuyển trạng thái thành 'confirmed' khi gán nhân viên
            if (isset($validated['staff_id']) && $booking->status === Booking::STATUS_PENDING) {
                $validated['status'] = Booking::STATUS_CONFIRMED;
            }
            
            $booking->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Lịch hẹn đã được cập nhật thành công',
                'data' => $booking->load(['customer', 'staff'])
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
