<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            CategorySeeder::class,
            ServiceSeeder::class,
            CustomerSeeder::class,
            StaffSeeder::class,
            BookingSeeder::class,
            FeedbackSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
