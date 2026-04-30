<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feedback;
use App\Models\Booking;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        $completedBooking = Booking::where('status', 'completed')->first();

        if ($completedBooking) {
            Feedback::create([
                'booking_id' => $completedBooking->booking_id,
                'customer_id' => $completedBooking->customer_id,
                'rating' => 5,
                'comment' => 'Dịch vụ rất tuyệt vời, nhân viên nhiệt tình!',
                'created_at' => now(),
            ]);
        }
    }
}
