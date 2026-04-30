@extends('staff.layout')

@section('title','Chi tiết lịch đặt')

@section('content')

<h3 class="fw-bold mb-3">Chi tiết Lịch đặt #{{ $booking->booking_id }}</h3>

<div class="card shadow-sm p-4">

    <p><b>Khách hàng:</b> {{ $booking->customer->full_name ?? 'Không rõ' }}</p>
    <p><b>Dịch vụ:</b> 
        <ul>
            @foreach($booking->bookingDetails as $detail)
                <li>{{ $detail->service->service_name ?? 'Không rõ' }} ({{ number_format($detail->price) }} VNĐ)</li>
            @endforeach
        </ul>
    </p>
    <p><b>Tổng tiền:</b> <span class="text-danger fw-bold">{{ number_format($booking->total_amount) }} VNĐ</span></p>
    <p><b>Ngày:</b> {{ $booking->booking_date }}</p>
    <p><b>Giờ:</b> {{ $booking->booking_time }}</p>
    <p><b>Địa chỉ:</b> {{ $booking->address }}</p>
    <p><b>Ghi chú:</b> {{ $booking->note }}</p>

    <hr>

    <form action="{{ route('staff.bookings.updateStatus', $booking->booking_id) }}" method="POST">
        @csrf

        <label class="fw-bold mb-2">Cập nhật trạng thái:</label>

        <select name="status" class="form-control mb-3">
            <option value="1" {{ $booking->status == 1 ? 'selected' : '' }}>Đã xác nhận</option>
            <option value="2" {{ $booking->status == 2 ? 'selected' : '' }}>Đang thực hiện</option>
            <option value="3" {{ $booking->status == 3 ? 'selected' : '' }}>Hoàn thành</option>
            <option value="4" {{ $booking->status == 4 ? 'selected' : '' }}>Đã hủy</option>
        </select>

        <button class="btn btn-success">Cập nhật</button>
        <a href="{{ route('staff.bookings.index') }}" class="btn btn-secondary">Quay lại</a>
    </form>

</div>

@endsection