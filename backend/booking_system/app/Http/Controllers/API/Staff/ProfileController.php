<?php

namespace App\Http\Controllers\API\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Lấy thông tin cá nhân của nhân viên.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $data = $user->toArray();
        
        // Trả về full URL cho avatar
        if ($user->avatar) {
            $data['avatar'] = url('uploads/avatars/' . $user->avatar);
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    /**
     * Cập nhật thông tin cá nhân.
     */
    public function update(Request $request)
    {
        $staff = $request->user();

        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'skill' => 'nullable|string',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $data = $request->only(['full_name', 'phone', 'address', 'skill']);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $staff->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin thành công.',
            'data' => $staff
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $staff = $request->user();

        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ nếu có
            if ($staff->avatar && file_exists(public_path('uploads/avatars/' . $staff->avatar))) {
                unlink(public_path('uploads/avatars/' . $staff->avatar));
            }

            $imageName = 'staff_' . $staff->staff_id . '_' . time() . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('uploads/avatars'), $imageName);

            $staff->update(['avatar' => $imageName]);

            return response()->json([
                'success' => true,
                'avatar_url' => url('uploads/avatars/' . $imageName),
                'message' => 'Cập nhật avatar thành công.'
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Không tìm thấy file ảnh.'], 400);
    }
}
