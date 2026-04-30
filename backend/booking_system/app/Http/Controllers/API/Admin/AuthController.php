<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập Admin không chính xác.'],
            ]);
        }

        $deviceName = $request->header('User-Agent') ?: 'Unknown Device';
        $token = $admin->createToken($deviceName, ['admin'])->plainTextToken;

        $admin->role = 'admin'; // Gán role để frontend nhận diện
        
        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => $admin,
            'message' => 'Đăng nhập Admin thành công.'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Đã đăng xuất Admin.']);
    }
}
