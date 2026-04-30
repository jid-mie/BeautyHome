@extends('customer.layout')

@section('title', 'Thông tin cá nhân')

@section('content')

<h3 class="fw-bold mb-3">👤 Thông tin cá nhân</h3>

<div class="card shadow-sm p-4">
    <form action="{{ route('customer.profile.update') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label class="form-label">Họ tên</label>
            <input type="text" name="full_name" value="{{ old('full_name', $customer->full_name) }}" class="form-control">
            @error('full_name') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label class="form-label">Email (không sửa)</label>
            <input type="email" value="{{ $customer->email }}" class="form-control" disabled>
        </div>

        <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="text" name="phone" value="{{ old('phone', $customer->phone) }}" class="form-control">
            @error('phone') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" name="address" value="{{ old('address', $customer->address) }}" class="form-control">
            @error('address') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <div class="mb-3">
            <label class="form-label">Mật khẩu mới (để trống nếu không đổi)</label>
            <input type="password" name="password" class="form-control">
            @error('password') <small class="text-danger">{{ $message }}</small> @enderror
        </div>

        <button class="btn btn-success">Cập nhật</button>
    </form>
</div>

@endsection