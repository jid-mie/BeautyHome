@extends('admin.layout')

@section('title', 'Trang tổng quan')

@section('content')
    <div class="row">
        <div class="col-md-4">
            <div class="card shadow-sm p-3">
                <h5>Tổng Booking</h5>
                <h2>{{ $countBooking }}</h2>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card shadow-sm p-3">
                <h5>Tổng Dịch vụ</h5>
                <h2>{{ $countService }}</h2>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card shadow-sm p-3">
                <h5>Tổng Khách hàng</h5>
                <h2>{{ $countCustomer }}</h2>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-8">
            <div class="card shadow-sm p-3">
                <h5 class="fw-bold">Doanh thu theo tháng (Năm {{ date('Y') }})</h5>
                <canvas id="revenueByMonthChart" height="100"></canvas>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow-sm p-3">
                <h5 class="fw-bold">Doanh thu theo nhân viên</h5>
                <canvas id="revenueByStaffChart" height="200"></canvas>
            </div>
        </div>
    </div>

    <!-- Cài đặt Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Dữ liệu Doanh thu theo tháng
        const months = {!! json_encode($months) !!};
        const revenues = {!! json_encode($revenues) !!};

        new Chart(document.getElementById('revenueByMonthChart'), {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Doanh thu (VNĐ)',
                    data: revenues,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Dữ liệu Doanh thu theo nhân viên
        const staffNames = {!! json_encode($staffNames) !!};
        const staffRevenues = {!! json_encode($staffRevenues) !!};

        new Chart(document.getElementById('revenueByStaffChart'), {
            type: 'doughnut',
            data: {
                labels: staffNames,
                datasets: [{
                    label: 'Doanh thu (VNĐ)',
                    data: staffRevenues,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
            }
        });
    </script>
@endsection