@extends('admin.layout')

@section('title', 'Danh mục')

@section('content')
<h2 class="fw-bold mb-3">Danh sách danh mục</h2>

<a href="{{ route('admin.categories.create') }}" class="btn btn-primary mb-3">+ Thêm danh mục</a>

<table class="table table-bordered table-hover">
    <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th width="200">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @foreach($categories as $cat)
        <tr>
            <td>{{ $cat->category_id }}</td>
            <td>{{ $cat->category_name }}</td>
            <td>{{ $cat->description }}</td>
            <td>
                <a href="{{ route('admin.categories.edit', $cat->category_id) }}" class="btn btn-warning btn-sm">Sửa</a>

                <form action="{{ route('admin.categories.destroy', $cat->category_id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Bạn có chắc muốn xóa?')">Xóa</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection