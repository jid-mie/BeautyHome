@extends('staff.layout')

@section('title','Thông báo')

@section('content')

<h3 class="fw-bold mb-3">Thông báo nhân viên</h3>

<div class="card shadow-sm">
    <div class="card-body">

        @if($notifications->count() == 0)
            <div class="alert alert-info text-center">
                Chưa có thông báo nào.
            </div>
        @else
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th width="150">Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($notifications as $noti)
                        <tr>
                            <td>{{ $noti->notification_id }}</td>
                            <td class="fw-bold">{{ $noti->title }}</td>
                            <td>{{ $noti->content }}</td>

                            <td>
                                @if($noti->is_read == 0)
                                    <span class="badge bg-warning text-dark">Chưa đọc</span>
                                @else
                                    <span class="badge bg-success">Đã đọc</span>
                                @endif
                            </td>

                            <td>{{ $noti->created_at }}</td>

                            <td>
                                @if($noti->is_read == 0)
                                    <form action="{{ route('staff.notifications.read', $noti->notification_id) }}" method="POST">
                                        @csrf
                                        <button class="btn btn-sm btn-primary">Đã đọc</button>
                                    </form>
                                @else
                                    <button class="btn btn-sm btn-secondary" disabled>OK</button>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>

            </table>
        @endif

    </div>
</div>

@endsection