<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Staff;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Stats
        $totalRevenue = Booking::where('status', 'completed')->sum('total_amount');
        $totalBookings = Booking::count();
        $totalStaffCount = Staff::count();
        $totalCustomers = Customer::count();

        // 2. Revenue Chart (7 days)
        $revenueStats = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dayName = Carbon::now()->subDays($i)->isoFormat('dd'); // T2, T3...
            
            $total = Booking::where('status', 'completed')
                ->whereDate('booking_date', $date)
                ->sum('total_amount');
                
            $revenueStats[] = [
                'name' => $dayName,
                'value' => (int)$total,
                'date' => $date
            ];
        }

        // 3. Recent Staff Activity
        $recentStaff = Staff::with('category')
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function($staff) {
                return [
                    'name' => $staff->full_name,
                    'role' => $staff->category->category_name ?? 'Staff',
                    'status' => $staff->status == 1 ? 'Online' : 'Offline',
                    'performance' => rand(85, 99)
                ];
            });

        // 4. Recent Bookings
        $recentBookings = Booking::with(['customer'])
            ->orderBy('booking_id', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'revenue' => (int)$totalRevenue,
                    'bookings' => $totalBookings,
                    'staff' => $totalStaffCount,
                    'customers' => $totalCustomers
                ],
                'revenue_chart' => $revenueStats,
                'recent_staff' => $recentStaff,
                'recent_bookings' => $recentBookings
            ]
        ]);
    }
}
