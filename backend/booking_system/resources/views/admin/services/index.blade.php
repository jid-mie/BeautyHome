@extends('admin.layout')

@section('title', 'Dịch vụ')

@section('content')
<h2 class="fw-bold mb-3">Danh sách dịch vụ</h2>

<a href="{{ route('admin.services.create') }}" class="btn btn-primary mb-3">+ Thêm dịch vụ</a>

<table class="table table-bordered table-hover">
    <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Tên dịch vụ</th>
            <th>Giá</th>
            <th>Thời gian</th>
            <th>Ảnh</th>
            <th>Trạng thái</th>
            <th width="200">Hành động</th>
        </tr>
    </thead>

    <tbody>
        @foreach($services as $sv)
        <tr>
            <td>{{ $sv->service_id }}</td>
            <td>{{ $sv->service_name }}</td>
            <td>{{ number_format($sv->price) }} VNĐ</td>
            <td>{{ $sv->duration }} phút</td>
            <td>
                @if($sv->image)
                    <img src="{{ asset('uploads/services/' . $sv->image) }}" width="80">
                @endif
            </td>
            <td>
                {{ $sv->status == 1 ? 'Hoạt động' : 'Ẩn' }}
            </td>
            <td>
                <a href="{{ route('admin.services.edit', $sv->service_id) }}" class="btn btn-warning btn-sm">Sửa</a>

                <form action="{{ route('admin.services.destroy', $sv->service_id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Bạn chắc chắn muốn xóa?')">Xóa</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection