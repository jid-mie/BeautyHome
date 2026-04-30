@extends('customer.layout')

@section('title', 'Đặt lịch')

@section('content')

<h3 class="fw-bold mb-3">Đặt lịch dịch vụ</h3>

<div class="card shadow-sm p-4">
    <div class="alert alert-info">
        Bạn đang đặt lịch cho các dịch vụ trong giỏ hàng.
        <a href="{{ route('customer.cart.index') }}" class="fw-bold">Xem lại giỏ hàng</a>
    </div>

    <form action="{{ route('customer.bookings.store') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label>Ngày đặt</label>
            <input type="date" name="booking_date" class="form-control" value="{{ old('booking_date') }}">
            @error('booking_date') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label>Giờ đặt</label>
            <input type="time" name="booking_time" class="form-control" value="{{ old('booking_time') }}">
            @error('booking_time') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label>Địa chỉ</label>
            <input type="text" name="address" class="form-control" value="{{ old('address') }}">
            @error('address') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label>Ghi chú</label>
            <textarea name="note" class="form-control">{{ old('note') }}</textarea>
        </div>

        <button class="btn btn-success">Xác nhận đặt lịch</button>
        <a href="{{ route('customer.services.index') }}" class="btn btn-secondary">Quay lại</a>
    </form>
</div>

@endsection