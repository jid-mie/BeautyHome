@extends('admin.layout')

@section('title', 'Sửa dịch vụ')

@section('content')
<h2 class="fw-bold mb-3">Sửa dịch vụ</h2>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $err)
                <li>{{ $err }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('admin.services.update', $service->service_id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label class="form-label">Danh mục</label>
        <select name="category_id" class="form-control">
            @foreach($categories as $cat)
                <option value="{{ $cat->category_id }}"
                    {{ $service->category_id == $cat->category_id ? 'selected' : '' }}>
                    {{ $cat->category_name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label class="form-label">Tên dịch vụ</label>
        <input type="text" name="service_name" class="form-control"
               value="{{ $service->service_name }}" required>
    </div>

    <div class="mb-3">
        <label class="form-label">Giá</label>
        <input type="number" name="price" class="form-control"
               value="{{ $service->price }}" required>
    </div>

    <div class="mb-3">
        <label class="form-label">Thời gian (phút)</label>
        <input type="number" name="duration" class="form-control"
               value="{{ $service->duration }}" required>
    </div>

    <div class="mb-3">
        <label class="form-label">Mô tả</label>
        <textarea name="description" class="form-control">{{ $service->description }}</textarea>
    </div>

    <div class="mb-3">
        <label class="form-label">Ảnh hiện tại</label><br>
        @if($service->image)
            <img src="{{ asset('uploads/services/' . $service->image) }}" width="120" class="mb-2">
        @else
            <p class="text-muted">Chưa có ảnh</p>
        @endif
    </div>

    <div class="mb-3">
        <label class="form-label">Chọn ảnh mới (nếu muốn thay)</label>
        <input type="file" name="image" class="form-control">
    </div>

    <div class="mb-3">
        <label class="form-label">Trạng thái</label>
        <select name="status" class="form-control">
            <option value="1" {{ $service->status == 1 ? 'selected' : '' }}>Hoạt động</option>
            <option value="0" {{ $service->status == 0 ? 'selected' : '' }}>Ẩn</option>
        </select>
    </div>

    <button class="btn btn-success">Cập nhật</button>
    <a href="{{ route('admin.services.index') }}" class="btn btn-secondary">Quay lại</a>
</form>
@endsection