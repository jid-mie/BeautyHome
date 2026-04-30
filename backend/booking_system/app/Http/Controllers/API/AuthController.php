<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Staff;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Đăng ký tài khoản khách hàng mới.
     */
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:100',
            'email'     => 'required|string|email|unique:customers,email',
            'phone'     => 'required|string|max:20',
            'password'  => 'required|string|min:6',
            'address'   => 'nullable|string|max:255'
        ]);

        $customer = Customer::create([
            'full_name'  => $request->full_name,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'password'   => Hash::make($request->password),
            'address'    => $request->address,
            'created_at' => now()
        ]);

        $deviceName = $request->header('User-Agent') ?: 'Unknown Device';
        $token = $customer->createToken($deviceName)->plainTextToken;

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => [
                'id'         => $customer->customer_id,
                'customer_id'=> $customer->customer_id,
                'name'       => $customer->full_name,
                'full_name'  => $customer->full_name,
                'email'      => $customer->email,
                'role'       => 'customer',
                'phone'      => $customer->phone,
                'address'    => $customer->address,
            ],
            'message' => 'Đăng ký tài khoản thành công.'
        ]);
    }

    /**
     * Đăng nhập hợp nhất cho tất cả các vai trò (Admin, Staff, Customer).
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $email = $request->email;
        $password = $request->password;
        $deviceName = $request->header('User-Agent') ?: 'Unknown Device';

        // 1. Kiểm tra Admin
        $admin = Admin::where('email', $email)->first();
        if ($admin && Hash::check($password, $admin->password)) {
            $token = $admin->createToken($deviceName, ['admin'])->plainTextToken;
            return $this->authResponse($admin, $token, 'admin');
        }

        // 2. Kiểm tra Staff
        $staff = Staff::where('email', $email)->first();
        if ($staff && Hash::check($password, $staff->password)) {
            $token = $staff->createToken($deviceName, ['staff'])->plainTextToken;
            return $this->authResponse($staff, $token, 'staff');
        }

        // 3. Kiểm tra Customer
        $customer = Customer::where('email', $email)->first();
        if ($customer && Hash::check($password, $customer->password)) {
            $token = $customer->createToken($deviceName, ['customer'])->plainTextToken;
            return $this->authResponse($customer, $token, 'customer');
        }

        throw ValidationException::withMessages([
            'email' => ['Thông tin đăng nhập không chính xác.'],
        ]);
    }

    /**
     * Liệt kê các phiên đăng nhập đang hoạt động.
     */
    public function sessions(Request $request)
    {
        $tokens = $request->user()->tokens()->orderBy('last_used_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $tokens->map(function ($token) use ($request) {
                return [
                    'id' => $token->id,
                    'name' => $token->name,
                    'last_used_at' => $token->last_used_at,
                    'created_at' => $token->created_at,
                    'is_current' => $token->id === $request->user()->currentAccessToken()->id
                ];
            })
        ]);
    }

    /**
     * Đăng xuất một phiên cụ thể.
     */
    public function revokeSession(Request $request, $id)
    {
        $request->user()->tokens()->where('id', $id)->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Đã đăng xuất thiết bị thành công.'
        ]);
    }

    /**
     * Trả về định dạng response chuẩn.
     */
    private function authResponse($user, $token, $role)
    {
        $userData = [
            'id'        => $user->admin_id ?? $user->staff_id ?? $user->customer_id,
            'name'      => $user->username ?? $user->full_name,
            'full_name' => $user->username ?? $user->full_name,
            'email'     => $user->email,
            'role'      => $role,
        ];

        if ($role === 'staff') {
            $userData['staff_id'] = $user->staff_id;
            $userData['skill'] = $user->skill;
            $userData['phone'] = $user->phone;
            $userData['address'] = $user->address;
        } elseif ($role === 'customer') {
            $userData['customer_id'] = $user->customer_id;
            $userData['phone'] = $user->phone;
            $userData['address'] = $user->address;
        } elseif ($role === 'admin') {
            $userData['admin_id'] = $user->admin_id;
        }

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => $userData,
            'message' => 'Đăng nhập thành công.'
        ]);
    }

    /**
     * Đăng xuất.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công.'
        ]);
    }
}
