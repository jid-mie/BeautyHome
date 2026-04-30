@extends('staff.layout')

@section('title', 'Chợ công việc')

@section('content')

<h3 class="fw-bold mb-3">Chợ công việc (Lịch chưa ai nhận)</h3>

<div class="card shadow-sm">
    <div class="card-body">
        <table class="table table-bordered table-hover align-middle">
            <thead class="table-dark">
                <tr>
                    <th>Mã Đặt Lịch</th>
                    <th>Khách Hàng</th>
                    <th>Ngày & Giờ</th>
                    <th>Dịch Vụ</th>
                    <th>Tổng Tiền</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @forelse($bookings as $booking)
                    <tr>
                        <td>{{ $booking->booking_id }}</td>
                        <td>
                            <b>{{ $booking->customer->full_name ?? 'N/A' }}</b><br>
                            <small class="text-muted">{{ $booking->address }}</small>
                        </td>
                        <td>
                            <span class="badge bg-info text-dark">{{ $booking->booking_date }}</span>
                            <b>{{ $booking->booking_time }}</b>
                        </td>
                        <td>
                            <ul class="mb-0 ps-3">
                                @foreach($booking->bookingDetails as $detail)
                                    <li>{{ $detail->service->service_name ?? 'N/A' }}</li>
                                @endforeach
                            </ul>
                        </td>
                        <td class="fw-bold text-danger">{{ number_format($booking->total_amount) }} VNĐ</td>
                        <td>
                            <form action="{{ route('staff.bookings.accept', $booking->booking_id) }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-success btn-sm">Nhận lịch</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center text-muted">Hiện tại không có lịch nào đang chờ nhận.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection
