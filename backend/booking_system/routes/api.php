<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\API\AuthController; // Customer Auth
use App\Http\Controllers\API\Customer\ServiceController as CustomerService;
use App\Http\Controllers\API\Customer\ProfileController as CustomerProfile;
use App\Http\Controllers\API\Customer\BookingController as CustomerBooking;
use App\Http\Controllers\API\Customer\PaymentController as CustomerPayment;
use App\Http\Controllers\API\Customer\FeedbackController as CustomerFeedback;
use App\Http\Controllers\API\Customer\NotificationController as CustomerNotification;

use App\Http\Controllers\API\Staff\AuthController as StaffAuth;
use App\Http\Controllers\API\Staff\BookingController as StaffBooking;
use App\Http\Controllers\API\Staff\ProfileController as StaffProfile;

use App\Http\Controllers\API\Admin\AuthController as AdminAuth;
use App\Http\Controllers\API\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\API\Admin\StaffController as AdminStaff;
use App\Http\Controllers\API\Admin\ServiceController as AdminService;
use App\Http\Controllers\API\Admin\BookingController as AdminBooking;
use App\Http\Controllers\API\Admin\CustomerController as AdminCustomer;
use App\Http\Controllers\API\Admin\PaymentController as AdminPayment;
use App\Http\Controllers\API\Admin\FeedbackController as AdminFeedback;
use App\Http\Controllers\API\Admin\SettingController as AdminSetting;
use App\Http\Controllers\API\Admin\CategoryController as AdminCategory;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/services', [CustomerService::class, 'index']);
Route::get('/services/{id}', [CustomerService::class, 'show']);

// Auth Customer
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Auth Staff
Route::post('/staff/login', [StaffAuth::class, 'login']);

// Auth Admin
Route::post('/admin/login', [AdminAuth::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // --- CUSTOMER ROUTES ---
    Route::prefix('customer')->middleware('abilities:customer')->group(function () {
        Route::get('/profile', [CustomerProfile::class, 'index']);
        Route::post('/profile/update', [CustomerProfile::class, 'update']);
        Route::post('/profile/avatar', [CustomerProfile::class, 'uploadAvatar']);
        
        Route::get('/bookings', [CustomerBooking::class, 'index']);
        Route::post('/bookings/store', [CustomerBooking::class, 'store']);
        Route::post('/bookings/{id}/cancel', [CustomerBooking::class, 'cancel']);

        Route::get('/payments', [CustomerPayment::class, 'index']);
        Route::post('/payments/{booking_id}/pay', [CustomerPayment::class, 'pay']);

        Route::post('/feedback/store', [CustomerFeedback::class, 'store']);
        
        Route::get('/notifications', [CustomerNotification::class, 'index']);
        Route::post('/notifications/{id}/read', [CustomerNotification::class, 'markAsRead']);

        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // --- STAFF ROUTES ---
    Route::prefix('staff')->middleware('abilities:staff')->group(function () {
        Route::get('/bookings', [StaffBooking::class, 'index']);
        Route::post('/bookings/{id}/update-status', [StaffBooking::class, 'updateStatus']);
        Route::get('/profile', [StaffProfile::class, 'index']);
        Route::post('/profile/update', [StaffProfile::class, 'update']);
        Route::post('/profile/avatar', [StaffProfile::class, 'uploadAvatar']);
        Route::post('/logout', [StaffAuth::class, 'logout']);
    });

    // --- ADMIN ROUTES ---
    Route::prefix('admin')->middleware('abilities:admin')->group(function () {
        Route::get('/profile', [AdminAuth::class, 'profile']);
        Route::get('/dashboard', [AdminDashboard::class, 'index']);
        Route::get('/staff', [AdminStaff::class, 'index']);
        Route::post('/staff', [AdminStaff::class, 'store']);
        Route::put('/staff/{id}', [AdminStaff::class, 'update']);
        Route::delete('/staff/{id}', [AdminStaff::class, 'destroy']);
        Route::get('/services', [AdminService::class, 'index']);
        Route::post('/services', [AdminService::class, 'store']);
        Route::put('/services/{id}', [AdminService::class, 'update']);
        Route::delete('/services/{id}', [AdminService::class, 'destroy']);
        Route::get('/bookings', [AdminBooking::class, 'index']);
        Route::put('/bookings/{id}', [AdminBooking::class, 'update']);
        Route::get('/customers', [AdminCustomer::class, 'index']);
        Route::get('/payments', [AdminPayment::class, 'index']);
        Route::get('/feedback', [AdminFeedback::class, 'index']);
        Route::get('/categories', [AdminCategory::class, 'index']);
        Route::post('/categories', [AdminCategory::class, 'store']);
        Route::put('/categories/{id}', [AdminCategory::class, 'update']);
        Route::delete('/categories/{id}', [AdminCategory::class, 'destroy']);
        Route::post('/logout', [AdminAuth::class, 'logout']);
    });

    // --- SHARED AUTH ROUTES ---
    Route::get('/auth/sessions', [AuthController::class, 'sessions']);
    Route::delete('/auth/sessions/{id}', [AuthController::class, 'revokeSession']);

});
