<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Khách hàng')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <style>
        body {
            background: #f5f6fa;
            font-family: Arial, sans-serif;
        }

        .navbar-brand {
            font-weight: 800;
            letter-spacing: 1px;
        }

        .nav-link {
            font-weight: 600;
            color: #333 !important;
        }

        .nav-link:hover {
            color: #0d6efd !important;
        }

        .nav-link.active {
            color: #0d6efd !important;
            border-bottom: 2px solid #0d6efd;
        }

        .icon-btn {
            font-size: 18px;
            color: #333;
            padding: 8px 10px;
            border-radius: 10px;
            transition: 0.2s;
        }

        .icon-btn:hover {
            background: #f0f0f0;
        }

        .main-container {
            padding-top: 25px;
            padding-bottom: 40px;
        }
    </style>
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
    <div class="container-fluid">

        <!-- LOGO -->
        <a class="navbar-brand" href="{{ route('customer.services.index') }}">
            BEAUTYHOME
        </a>

        <!-- Toggle mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCustomer">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="navbarCustomer">

            <!-- Menu center -->
            <ul class="navbar-nav mx-auto gap-3">

                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('customer.services.*') ? 'active' : '' }}"
                       href="{{ route('customer.services.index') }}">
                        Dịch vụ
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('customer.bookings.*') ? 'active' : '' }}"
                       href="{{ route('customer.bookings.index') }}">
                        Lịch đã đặt
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('customer.cart.*') ? 'active' : '' }}"
                       href="{{ route('customer.cart.index') }}">
                        Giỏ hàng
                        @if(session()->has('cart') && count(session('cart')) > 0)
                            <span class="badge bg-danger rounded-pill">{{ count(session('cart')) }}</span>
                        @endif
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('customer.payments.*') ? 'active' : '' }}"
                       href="{{ route('customer.payments.index') }}">
                        Thanh toán
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">
                        Hỗ trợ
                    </a>
                </li>

            </ul>

            <!-- Icons right -->
            <div class="d-flex align-items-center gap-2">

                <!-- Notifications -->
                <a href="{{ route('customer.notifications.index') }}" class="icon-btn" title="Thông báo">
                    <i class="bi bi-bell"></i>
                </a>

                <!-- Profile -->
                <a href="{{ route('customer.profile.index') }}" class="icon-btn" title="Tài khoản">
                    <i class="bi bi-person"></i>
                </a>

                <!-- Logout -->
                <form action="{{ route('customer.logout') }}" method="POST" class="d-inline">
                    @csrf
                    <button class="btn btn-outline-danger btn-sm fw-bold">
                        Đăng xuất
                    </button>
                </form>

            </div>

        </div>
    </div>
</nav>

<div class="container main-container">

    <!-- ALERT -->
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    @yield('content')
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>