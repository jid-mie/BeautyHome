<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index()
    {
        $customer = Customer::findOrFail(session('customer_id'));
        return view('customer.profile.index', compact('customer'));
    }

    public function update(Request $request)
    {
        $customer = Customer::findOrFail(session('customer_id'));

        $request->validate([
            'full_name' => 'required|max:100',
            'phone'     => 'required|max:20',
            'address'   => 'nullable|max:255',
            'password'  => 'nullable|min:6'
        ]);

        $data = [
            'full_name' => $request->full_name,
            'phone'     => $request->phone,
            'address'   => $request->address
        ];

        // nếu có nhập password mới thì cập nhật
        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $customer->update($data);

        // update lại session name cho menu
        session(['customer_name' => $customer->full_name]);

        return redirect()->back()->with('success', 'Cập nhật thông tin thành công!');
    }
}