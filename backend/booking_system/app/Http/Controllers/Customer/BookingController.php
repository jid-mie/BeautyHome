<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Service;
use App\Models\Notification;
use App\Models\Admin;
use Carbon\Carbon;
use App\Http\Requests\StoreBookingRequest;
use App\Services\BookingService;
use Exception;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }
    public function index()
    {
        $bookings = Booking::where('customer_id', session('customer_id'))
    ->with(['bookingDetails.service', 'feedback'])
    ->orderBy('booking_date', 'desc')
    ->orderBy('booking_time', 'desc')
    ->get();

        return view('customer.bookings.index', compact('bookings'));
    }

    public function cart()
    {
        $cart = session()->get('cart', []);
        $services = Service::whereIn('service_id', $cart)->get();
        $total = $services->sum('price');
        return view('customer.cart.index', compact('services', 'total'));
    }

    public function addToCart(Request $request)
    {
        $cart = session()->get('cart', []);
        if (!in_array($request->service_id, $cart)) {
            $cart[] = $request->service_id;
            session()->put('cart', $cart);
        }
        return redirect()->back()->with('success', 'Đã thêm dịch vụ vào danh sách chọn!');
    }

    public function removeFromCart($id)
    {
        $cart = session()->get('cart', []);
        if (($key = array_search($id, $cart)) !== false) {
            unset($cart[$key]);
            session()->put('cart', array_values($cart));
        }
        return redirect()->back()->with('success', 'Đã xóa dịch vụ khỏi danh sách!');
    }

    public function create()
    {
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('customer.services.index')->with('error', 'Vui lòng chọn ít nhất 1 dịch vụ!');
        }
        return view('customer.bookings.create');
    }

    public function store(StoreBookingRequest $request)
    {
        $cart = session()->get('cart', []);

        try {
            $booking = $this->bookingService->createBookingFromCart(
                $request->validated(),
                session('customer_id'),
                $cart
            );

            // Xóa giỏ hàng
            session()->forget('cart');

        // 🔔 Thông báo cho Admin
        $admins = Admin::all();

foreach ($admins as $admin) {
    Notification::create([
        'user_type'  => 'admin',
        'user_id'    => $admin->admin_id,
        'title'      => 'Có lịch đặt mới',
        'content'    => 'Có khách hàng vừa đặt lịch mới (Booking ID: ' . $booking->booking_id . ')',
        'is_read'    => 0,
        'created_at' => now()
    ]);
}

} catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('customer.bookings.index')->with('success', 'Đặt lịch thành công!');
    }

    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);

        try {
            $this->bookingService->cancelBookingByCustomer($booking, session('customer_id'));
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        // 🔔 Thông báo cho Customer khi hủy
        Notification::create([
            'user_type'  => 'customer',
            'user_id'    => session('customer_id'),
            'title'      => 'Hủy lịch thành công',
            'content'    => 'Bạn đã hủy lịch đặt (Booking ID: ' . $booking->booking_id . ')',
            'is_read'    => 0,
            'created_at' => now()
        ]);

        return redirect()->back()->with('success', 'Hủy lịch thành công!');
    }
}