@extends('admin.layout')

@section('title', 'Thêm dịch vụ')

@section('content')
<h2 class="fw-bold mb-3">Thêm dịch vụ</h2>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $err)
                <li>{{ $err }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('admin.services.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="mb-3">
        <label class="form-label">Danh mục</label>
        <select name="category_id" class="form-control">
            @foreach($categories as $cat)
                <option value="{{ $cat->category_id }}">{{ $cat->category_name }}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label class="form-label">Tên dịch vụ</label>
        <input type="text" name="service_name" class="form-control">
    </div>

    <div class="mb-3">
        <label class="form-label">Giá</label>
        <input type="number" name="price" class="form-control">
    </div>

    <div class="mb-3">
        <label class="form-label">Thời gian (phút)</label>
        <input type="number" name="duration" class="form-control">
    </div>

    <div class="mb-3">
        <label class="form-label">Mô tả</label>
        <textarea name="description" class="form-control"></textarea>
    </div>

    <div class="mb-3">
        <label class="form-label">Ảnh</label>
        <input type="file" name="image" class="form-control">
    </div>

    <div class="mb-3">
        <label class="form-label">Trạng thái</label>
        <select name="status" class="form-control">
            <option value="1">Hoạt động</option>
            <option value="0">Ẩn</option>
        </select>
    </div>

    <button class="btn btn-success">Lưu</button>
    <a href="{{ route('admin.services.index') }}" class="btn btn-secondary">Quay lại</a>
</form>
@endsection