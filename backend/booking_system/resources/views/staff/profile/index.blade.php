@extends('staff.layout')

@section('title','Tài khoản Staff')

@section('content')

<h3 class="fw-bold mb-3">👤 Thông tin nhân viên</h3>

<div class="card shadow-sm p-4">
    <form action="{{ route('staff.profile.update') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label>Họ tên</label>
            <input type="text" name="full_name" value="{{ old('full_name', $staff->full_name) }}" class="form-control">
        </div>

        <div class="mb-3">
            <label>Email</label>
            <input type="email" value="{{ $staff->email }}" class="form-control" disabled>
        </div>

        <div class="mb-3">
            <label>Số điện thoại</label>
            <input type="text" name="phone" value="{{ old('phone', $staff->phone) }}" class="form-control">
        </div>

        <div class="mb-3">
            <label>Địa chỉ</label>
            <input type="text" name="address" value="{{ old('address', $staff->address) }}" class="form-control">
        </div>

        <div class="mb-3">
            <label>Mật khẩu mới (nếu muốn đổi)</label>
            <input type="password" name="password" class="form-control">
        </div>

        <button class="btn btn-success">Cập nhật</button>
    </form>
</div>

@endsection