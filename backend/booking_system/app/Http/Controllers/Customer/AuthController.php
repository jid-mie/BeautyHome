<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return view('customer.auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|max:100',
            'email'     => 'required|email|unique:customers,email',
            'phone'     => 'required|max:20',
            'password'  => 'required|min:6',
            'address'   => 'nullable|max:255'
        ]);

        Customer::create([
            'full_name'  => $request->full_name,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'password'   => Hash::make($request->password),
            'address'    => $request->address,
            'created_at' => now()
        ]);

        return redirect()->route('customer.login')->with('success', 'Đăng ký thành công! Hãy đăng nhập.');
    }

    public function showLoginForm()
    {
        return view('customer.auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return back()->with('error', 'Email hoặc mật khẩu không đúng!');
        }

        session([
            'customer_id' => $customer->customer_id,
            'customer_name' => $customer->full_name
        ]);

        return redirect()->route('customer.services.index');
    }

    public function logout()
    {
        session()->forget(['customer_id', 'customer_name']);
        return redirect()->route('customer.login');
    }
}