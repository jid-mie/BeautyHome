<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'full_name' => 'Nguyễn Thị A',
                'email' => 'customer_a@example.com',
                'phone' => '0901234567',
                'password' => Hash::make('password'),
                'address' => '123 Quận 1, TP.HCM',
            ],
            [
                'full_name' => 'Trần Văn B',
                'email' => 'customer_b@example.com',
                'phone' => '0907654321',
                'password' => Hash::make('password'),
                'address' => '456 Quận 7, TP.HCM',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
