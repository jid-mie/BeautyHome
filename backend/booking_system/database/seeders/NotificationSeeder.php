<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use App\Models\Customer;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $customer = Customer::first();

        if ($customer) {
            Notification::create([
                'user_type' => 'customer',
                'user_id' => $customer->customer_id,
                'title' => 'Chào mừng bạn!',
                'content' => 'Chào mừng bạn đã gia nhập BeautyHome. Hãy đặt lịch ngay nhé!',
                'is_read' => 0,
                'created_at' => now(),
            ]);
        }
    }
}
