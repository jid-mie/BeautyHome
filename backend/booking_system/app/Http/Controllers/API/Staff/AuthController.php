<?php

namespace App\Http\Controllers\API\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Staff;
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

        $staff = Staff::where('email', $request->email)->first();

        if (!$staff || !Hash::check($request->password, $staff->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập Nhân viên không chính xác.'],
            ]);
        }

        $deviceName = $request->header('User-Agent') ?: 'Unknown Device';
        $token = $staff->createToken($deviceName, ['staff'])->plainTextToken;

        $staff->role = 'staff';
        
        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => $staff,
            'message' => 'Đăng nhập Nhân viên thành công.'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Đã đăng xuất Nhân viên.']);
    }
}
