<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        $staffs = [
            [
                'full_name' => 'Lê Thị C (Kỹ thuật viên)',
                'email' => 'staff_c@beautyhome.com',
                'phone' => '0911111111',
                'password' => Hash::make('password'),
                'address' => '789 Quận Bình Thạnh, TP.HCM',
                'skill' => 'Chăm sóc da, Massage',
                'status' => 1
            ],
            [
                'full_name' => 'Phạm Văn D (Nail Artist)',
                'email' => 'staff_d@beautyhome.com',
                'phone' => '0922222222',
                'password' => Hash::make('password'),
                'address' => '321 Quận Phú Nhuận, TP.HCM',
                'skill' => 'Làm móng, Nối mi',
                'status' => 1
            ],
        ];

        foreach ($staffs as $staff) {
            Staff::create($staff);
        }
    }
}
