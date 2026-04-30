<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
{
    $notifications = Notification::where('user_type', 'staff')
        ->where('user_id', session('staff_id'))
        ->latest()
        ->get();

    return view('staff.notifications.index', compact('notifications'));
}

    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['is_read' => 1]);

        return redirect()->back()->with('success', 'Đã đánh dấu đã đọc!');
    }
}