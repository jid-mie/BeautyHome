<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::where('user_type', 'customer')
            ->where('user_id', $request->user()->customer_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $notifications]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::where('notification_id', $id)
            ->where('user_id', $request->user()->customer_id)
            ->first();

        if ($notification) {
            $notification->update(['is_read' => 1]);
        }

        return response()->json(['success' => true, 'message' => 'Đã đánh dấu đã đọc.']);
    }
}
