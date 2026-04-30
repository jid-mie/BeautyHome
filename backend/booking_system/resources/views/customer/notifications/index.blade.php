@extends('customer.layout')

@section('title', 'Thông báo')

@section('content')

<h3 class="fw-bold mb-3">Thông báo của bạn</h3>

<div class="card shadow-sm">
    <div class="card-body">

        @if($notifications->count() == 0)
            <div class="alert alert-info text-center">
                Bạn chưa có thông báo nào.
            </div>
        @else
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th width="60">ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th width="140">Trạng thái</th>
                        <th width="180">Ngày tạo</th>
                        <th width="120">Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($notifications as $noti)
                        <tr>
                            <td>{{ $noti->notification_id }}</td>

                            <td class="fw-bold">
                                {{ $noti->title }}
                            </td>

                            <td>
                                {{ $noti->content }}
                            </td>

                            <td>
                                @if($noti->is_read == 0)
                                    <span class="badge bg-warning text-dark">Chưa đọc</span>
                                @else
                                    <span class="badge bg-success">Đã đọc</span>
                                @endif
                            </td>

                            <td>
                                {{ $noti->created_at }}
                            </td>

                            <td>
                                @if($noti->is_read == 0)
                                    <form action="{{ route('customer.notifications.read', $noti->notification_id) }}" method="POST">
                                        @csrf
                                        <button class="btn btn-sm btn-primary">
                                            Đánh dấu đã đọc
                                        </button>
                                    </form>
                                @else
                                    <button class="btn btn-sm btn-secondary" disabled>
                                        Đã đọc
                                    </button>
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