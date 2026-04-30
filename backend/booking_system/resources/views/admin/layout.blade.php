<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title','Admin - Booking System')</title>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <style>
        body {
            background: #f5f6fa;
        }
        .sidebar {
            height: 100vh;
            background: #343a40;
            padding-top: 20px;
        }
        .sidebar a {
            color: #fff;
            display: block;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 8px;
            margin: 4px 10px;
            transition: 0.2s;
        }
        .sidebar a:hover {
            background: #495057;
        }
        .sidebar .active {
            background: #0d6efd;
        }
        .topbar {
            background: white;
            padding: 12px 20px;
            border-bottom: 1px solid #ddd;
        }
        .content {
            padding: 20px;
        }
    </style>
</head>

<body>
<div class="container-fluid">
    <div class="row">

        <!-- SIDEBAR -->
        <div class="col-2 sidebar">
            <h5 class="text-center text-white mb-4 fw-bold">BEAUTYHOME - ADMIN</h5>

            <a href="{{ route('admin.dashboard') }}"
               class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                <i class="bi bi-speedometer2 me-2"></i> Trang tổng quan
            </a>

            <a href="{{ route('admin.categories.index') }}"
               class="{{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                <i class="bi bi-tags me-2"></i> Danh mục
            </a>

            <a href="{{ route('admin.services.index') }}"
               class="{{ request()->routeIs('admin.services.*') ? 'active' : '' }}">
                <i class="bi bi-scissors me-2"></i> Dịch vụ
            </a>

            <a href="{{ route('admin.staffs.index') }}"
               class="{{ request()->routeIs('admin.staffs.*') ? 'active' : '' }}">
                <i class="bi bi-person-badge me-2"></i> Nhân viên
            </a>

            <a href="{{ route('admin.customers.index') }}"
               class="{{ request()->routeIs('admin.customers.*') ? 'active' : '' }}">
                <i class="bi bi-people me-2"></i> Khách hàng
            </a>

            <a href="{{ route('admin.bookings.index') }}"
               class="{{ request()->routeIs('admin.bookings.*') ? 'active' : '' }}">
                <i class="bi bi-calendar-check me-2"></i> Lịch đặt
            </a>

            <a href="{{ route('admin.payments.index') }}"
               class="{{ request()->routeIs('admin.payments.*') ? 'active' : '' }}">
                <i class="bi bi-credit-card me-2"></i> Thanh toán
            </a>

            <a href="{{ route('admin.feedbacks.index') }}"
               class="{{ request()->routeIs('admin.feedbacks.*') ? 'active' : '' }}">
                <i class="bi bi-star-fill me-2"></i> Đánh giá
            </a>

            <a href="{{ route('admin.notifications.index') }}"
               class="{{ request()->routeIs('admin.notifications.*') ? 'active' : '' }}">
                <i class="bi bi-bell me-2"></i> Thông báo
            </a>

            <hr class="text-white">

            <form action="{{ route('admin.logout') }}" method="POST" class="px-3">
                @csrf
                <button class="btn btn-danger w-100">
                    <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                </button>
            </form>
        </div>

        <!-- MAIN -->
        <div class="col-10 p-0">
            <div class="topbar d-flex justify-content-between align-items-center">
                <h5 class="m-0 fw-bold">@yield('title', 'Admin')</h5>
                <span>Xin chào: <b>{{ session('admin_name') }}</b></span>
            </div>

            <div class="content">
                <!-- ALERT -->
                @if(session('success'))
                    <div class="alert alert-success">{{ session('success') }}</div>
                @endif

                @if(session('error'))
                    <div class="alert alert-danger">{{ session('error') }}</div>
                @endif

                @yield('content')
            </div>
        </div>

    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>