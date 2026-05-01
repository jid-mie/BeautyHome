<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }

    public function update(Request $request)
    {
        $customer = $request->user();
        
        $request->validate([
            'full_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $data = $request->only(['full_name', 'phone', 'address']);
        
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $customer->update($data);

        return response()->json([
            'success' => true,
            'data' => $customer,
            'message' => 'Cập nhật thông tin thành công.'
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $customer = $request->user();

        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ nếu có
            if ($customer->avatar && file_exists(public_path('uploads/avatars/' . $customer->avatar))) {
                unlink(public_path('uploads/avatars/' . $customer->avatar));
            }

            $imageName = 'customer_' . $customer->customer_id . '_' . time() . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('uploads/avatars'), $imageName);

            $customer->update(['avatar' => $imageName]);

            return response()->json([
                'success' => true,
                'avatar_url' => url('uploads/avatars/' . $imageName),
                'message' => 'Cập nhật avatar thành công.'
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Không tìm thấy file ảnh.'], 400);
    }
}
