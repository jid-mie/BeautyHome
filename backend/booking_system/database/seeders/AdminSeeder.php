<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'password' => Hash::make('password'),
            'full_name' => 'System Administrator',
            'email' => 'admin@beautyhome.com',
        ]);
    }
}
