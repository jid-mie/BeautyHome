<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Customer;
use App\Models\Staff;
use App\Models\Service;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $customer = Customer::first();
        $staffC = Staff::where('email', 'staff_c@beautyhome.com')->first();
        $staffD = Staff::where('email', 'staff_d@beautyhome.com')->first();
        $services = Service::all();

        if (!$customer || !$staffC || $services->isEmpty()) {
            return;
        }

        // --- Jobs for Staff C ---
        // 1. Hoàn thành
        $b1 = Booking::create([
            'customer_id' => $customer->customer_id,
            'staff_id' => $staffC->staff_id,
            'total_amount' => $services[0]->price,
            'booking_date' => Carbon::yesterday()->format('Y-m-d'),
            'booking_time' => '09:00:00',
            'status' => 'completed',
        ]);
        BookingDetail::create(['booking_id' => $b1->booking_id, 'service_id' => $services[0]->service_id, 'price' => $services[0]->price]);

        // 2. Đã xác nhận (Sẵn sàng để bắt đầu)
        $b2 = Booking::create([
            'customer_id' => $customer->customer_id,
            'staff_id' => $staffC->staff_id,
            'total_amount' => $services[1]->price,
            'booking_date' => Carbon::today()->format('Y-m-d'),
            'booking_time' => '14:00:00',
            'status' => 'confirmed',
        ]);
        BookingDetail::create(['booking_id' => $b2->booking_id, 'service_id' => $services[1]->service_id, 'price' => $services[1]->price]);

        // 3. Đang thực hiện
        $b3 = Booking::create([
            'customer_id' => $customer->customer_id,
            'staff_id' => $staffC->staff_id,
            'total_amount' => $services[2]->price,
            'booking_date' => Carbon::today()->format('Y-m-d'),
            'booking_time' => '16:30:00',
            'status' => 'in_progress',
        ]);
        BookingDetail::create(['booking_id' => $b3->booking_id, 'service_id' => $services[2]->service_id, 'price' => $services[2]->price]);

        // --- Jobs for Staff D ---
        if ($staffD) {
            $b4 = Booking::create([
                'customer_id' => $customer->customer_id,
                'staff_id' => $staffD->staff_id,
                'total_amount' => $services[3]->price,
                'booking_date' => Carbon::tomorrow()->format('Y-m-d'),
                'booking_time' => '10:00:00',
                'status' => 'confirmed',
            ]);
            BookingDetail::create(['booking_id' => $b4->booking_id, 'service_id' => $services[3]->service_id, 'price' => $services[3]->price]);
        }
    }
}
