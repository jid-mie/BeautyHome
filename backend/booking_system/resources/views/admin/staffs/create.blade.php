@extends('admin.layout')

@section('title', 'Thêm nhân viên')

@section('content')

<h3 class="mb-3">Thêm nhân viên</h3>

<form action="{{ route('admin.staffs.store') }}" method="POST" class="card p-4 shadow-sm bg-white">
    @csrf

    <div class="mb-3">
        <label class="form-label">Họ tên</label>
        <input type="text" name="full_name" value="{{ old('full_name') }}" class="form-control">
        @error('full_name')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" name="email" value="{{ old('email') }}" class="form-control">
        @error('email')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Số điện thoại</label>
        <input type="text" name="phone" value="{{ old('phone') }}" class="form-control">
        @error('phone')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input type="password" name="password" class="form-control">
        @error('password')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Địa chỉ</label>
        <input type="text" name="address" value="{{ old('address') }}" class="form-control">
        @error('address')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Kỹ năng</label>
        <input type="text" name="skill" value="{{ old('skill') }}" class="form-control">
        @error('skill')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Trạng thái</label>
        <select name="status" class="form-control">
            <option value="1" {{ old('status') == 1 ? 'selected' : '' }}>Hoạt động</option>
            <option value="0" {{ old('status') == 0 ? 'selected' : '' }}>Ngưng</option>
        </select>
        @error('status')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <div class="d-flex gap-2">
        <button class="btn btn-success">Lưu</button>
        <a href="{{ route('admin.staffs.index') }}" class="btn btn-secondary">Quay lại</a>
    </div>
</form>

@endsection