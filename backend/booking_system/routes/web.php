<?php

use Illuminate\Support\Facades\Route;

// ========== IMPORT ADMIN CONTROLLERS ==========
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\FeedbackController as AdminFeedbackController;
use App\Http\Controllers\Admin\NotificationController as AdminNotificationController;

// ========== IMPORT CUSTOMER CONTROLLERS ==========
use App\Http\Controllers\Customer\AuthController as CustomerAuthController;
use App\Http\Controllers\Customer\ServiceController as CustomerServiceController;
use App\Http\Controllers\Customer\BookingController as CustomerBookingController;
use App\Http\Controllers\Customer\PaymentController as CustomerPaymentController;
use App\Http\Controllers\Customer\FeedbackController as CustomerFeedbackController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\NotificationController as CustomerNotificationController;

// ========== IMPORT STAFF CONTROLLERS ==========
use App\Http\Controllers\Staff\AuthController as StaffAuthController;
use App\Http\Controllers\Staff\BookingController as StaffBookingController;
use App\Http\Controllers\Staff\ProfileController as StaffProfileController;
use App\Http\Controllers\Staff\NotificationController as StaffNotificationController;


// ================== ROUTE TRANG CHỦ ==================
Route::get('/', function () {
    return view('welcome');
});


// ================== ADMIN ROUTES ==================
Route::prefix('admin')->name('admin.')->group(function () {

    // Login Admin
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    // Middleware Admin (sau này bạn tạo middleware admin_auth)
    Route::middleware(['admin_auth'])->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // CRUD
        Route::resource('/categories', CategoryController::class);
        Route::resource('/services', ServiceController::class);
        Route::resource('/staffs', StaffController::class);

        // Customer chỉ xem danh sách
        Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');

        // Booking
        Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{id}', [AdminBookingController::class, 'show'])->name('bookings.show');
        Route::post('/bookings/{id}/assign-staff', [AdminBookingController::class, 'assignStaff'])->name('bookings.assignStaff');
        Route::post('/bookings/{id}/update-status', [AdminBookingController::class, 'updateStatus'])->name('bookings.updateStatus');

        // Payment
        Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');
        Route::post('/payments/{id}/update-status', [AdminPaymentController::class, 'updateStatus'])->name('payments.updateStatus');

        // Feedback
        Route::get('/feedbacks', [AdminFeedbackController::class, 'index'])->name('feedbacks.index');

        // Notification
        Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/{id}/read', [AdminNotificationController::class, 'markAsRead'])->name('notifications.read');
    });
});


// ================== CUSTOMER ROUTES ==================
Route::prefix('customer')->name('customer.')->group(function () {

    // Login Customer
    Route::get('/register', [CustomerAuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [CustomerAuthController::class, 'register'])->name('register.submit');

    Route::get('/login', [CustomerAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [CustomerAuthController::class, 'login'])->name('login.submit');

    Route::post('/logout', [CustomerAuthController::class, 'logout'])->name('logout');

    // Middleware Customer
    Route::middleware(['customer_auth'])->group(function () {
    
        // Profile
        Route::get('/profile', [CustomerProfileController::class, 'index'])->name('profile.index');
        Route::post('/profile/update', [CustomerProfileController::class, 'update'])->name('profile.update');

        // Services
        Route::get('/services', [CustomerServiceController::class, 'index'])->name('services.index');
        Route::get('/services/{id}', [CustomerServiceController::class, 'show'])->name('services.show');

        // Cart
        Route::get('/cart', [CustomerBookingController::class, 'cart'])->name('cart.index');
        Route::post('/cart/add', [CustomerBookingController::class, 'addToCart'])->name('cart.add');
        Route::post('/cart/remove/{id}', [CustomerBookingController::class, 'removeFromCart'])->name('cart.remove');

        // Booking
        Route::get('/bookings', [CustomerBookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/create', [CustomerBookingController::class, 'create'])->name('bookings.create');
        Route::post('/bookings/store', [CustomerBookingController::class, 'store'])->name('bookings.store');
        Route::post('/bookings/{id}/cancel', [CustomerBookingController::class, 'cancel'])->name('bookings.cancel');

        // Payment
        Route::get('/payments', [CustomerPaymentController::class, 'index'])->name('payments.index');
        Route::get('/payments/{booking_id}', [CustomerPaymentController::class, 'show'])->name('payments.show');
        Route::post('/payments/{booking_id}/pay', [CustomerPaymentController::class, 'pay'])->name('payments.pay');
        
        // Feedback
        Route::get('/feedback/create/{booking_id}', [CustomerFeedbackController::class, 'create'])->name('feedback.create');
        Route::post('/feedback/store', [CustomerFeedbackController::class, 'store'])->name('feedback.store');
        Route::get('/feedback/show/{booking_id}', [CustomerFeedbackController::class, 'show'])->name('feedback.show');
        // Notification
        Route::get('/notifications', [CustomerNotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/{id}/read', [CustomerNotificationController::class, 'markAsRead'])->name('notifications.read');
    });
});


// ================== STAFF ROUTES ==================
Route::prefix('staff')->name('staff.')->group(function () {

    // Login Staff
    Route::get('/login', [StaffAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [StaffAuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [StaffAuthController::class, 'logout'])->name('logout');

    // Middleware Staff
    Route::middleware(['staff_auth'])->group(function () {

        // Profile
        Route::get('/profile', [StaffProfileController::class, 'index'])->name('profile.index');
        Route::post('/profile/update', [StaffProfileController::class, 'update'])->name('profile.update');

        // Job Market & Booking
        Route::get('/job-market', [StaffBookingController::class, 'jobMarket'])->name('jobMarket');
        Route::post('/bookings/{id}/accept', [StaffBookingController::class, 'acceptBooking'])->name('bookings.accept');
        Route::get('/bookings', [StaffBookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{id}', [StaffBookingController::class, 'show'])->name('bookings.show');
        Route::post('/bookings/{id}/update-status', [StaffBookingController::class, 'updateStatus'])->name('bookings.updateStatus');

        // Notification
        Route::get('/notifications', [StaffNotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/{id}/read', [StaffNotificationController::class, 'markAsRead'])->name('notifications.read');
    });
});