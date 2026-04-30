@extends('admin.layout')

@section('title', 'Nhân viên')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h3 class="m-0">Danh sách nhân viên</h3>
    <a href="{{ route('admin.staffs.create') }}" class="btn btn-primary">+ Thêm nhân viên</a>
</div>

<table class="table table-bordered table-striped shadow-sm bg-white">
    <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Kỹ năng</th>
            <th>Trạng thái</th>
            <th width="200">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @forelse($staffs as $staff)
            <tr>
                <td>{{ $staff->staff_id }}</td>
                <td>{{ $staff->full_name }}</td>
                <td>{{ $staff->email }}</td>
                <td>{{ $staff->phone }}</td>
                <td>{{ $staff->skill }}</td>
                <td>
                    @if($staff->status == 1)
                        <span class="badge bg-success">Hoạt động</span>
                    @else
                        <span class="badge bg-danger">Ngưng</span>
                    @endif
                </td>
                <td>
                    <a href="{{ route('admin.staffs.edit', $staff->staff_id) }}" class="btn btn-warning btn-sm">
                        Sửa
                    </a>

                    <form action="{{ route('admin.staffs.destroy', $staff->staff_id) }}" method="POST" style="display:inline-block;">
                        @csrf
                        @method('DELETE')
                        <button onclick="return confirm('Bạn chắc chắn muốn xóa nhân viên này?')" class="btn btn-danger btn-sm">
                            Xóa
                        </button>
                    </form>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="7" class="text-center">Chưa có nhân viên nào.</td>
            </tr>
        @endforelse
    </tbody>
</table>

@endsection