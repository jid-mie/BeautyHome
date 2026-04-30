<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>@yield('title','Staff')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body class="bg-light">

<nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <a class="navbar-brand fw-bold" href="{{ route('staff.bookings.index') }}">Staff Panel</a>

    <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-center">

            <li class="nav-item">
                <a class="nav-link" href="{{ route('staff.jobMarket') }}">
                    <i class="bi bi-shop"></i> Chợ công việc
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="{{ route('staff.bookings.index') }}">
                    <i class="bi bi-calendar-check"></i> Lịch của tôi
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="{{ route('staff.notifications.index') }}">
                    <i class="bi bi-bell"></i> Thông báo
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="{{ route('staff.profile.index') }}" title="Tài khoản">
                    <i class="bi bi-person-circle fs-4"></i>
                </a>
            </li>

            <li class="nav-item ms-2">
                <form action="{{ route('staff.logout') }}" method="POST">
                    @csrf
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-box-arrow-right"></i> Đăng xuất
                    </button>
                </form>
            </li>

        </ul>
    </div>
</nav>

<div class="container mt-4">

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    @yield('content')
</div>

</body>
</html>