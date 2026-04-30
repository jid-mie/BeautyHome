@extends('staff.layout')

@section('title','Booking Staff')

@section('content')

<h3 class="fw-bold mb-3">📌 Booking được phân công</h3>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-bordered table-hover align-middle">
            <thead class="table-primary">
                <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Dịch vụ</th>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>Trạng thái</th>
                    <th width="120">Chi tiết</th>
                </tr>
            </thead>

            <tbody>
                @forelse($bookings as $booking)
                    <tr>
                        <td>{{ $booking->booking_id }}</td>

                        <td>{{ $booking->customer->full_name ?? 'Không rõ' }}</td>

                        <td>
                            @foreach($booking->bookingDetails as $detail)
                                <div>- {{ $detail->service->service_name ?? 'Không rõ' }}</div>
                            @endforeach
                        </td>

                        <td>{{ $booking->booking_date }}</td>
                        <td>{{ $booking->booking_time }}</td>

                        <td>
                            @if($booking->status == 0)
                                <span class="badge bg-warning text-dark">Chờ xác nhận</span>
                            @elseif($booking->status == 1)
                                <span class="badge bg-info text-dark">Đã xác nhận</span>
                            @elseif($booking->status == 2)
                                <span class="badge bg-primary">Đang thực hiện</span>
                            @elseif($booking->status == 3)
                                <span class="badge bg-success">Hoàn thành</span>
                            @elseif($booking->status == 4)
                                <span class="badge bg-danger">Đã hủy</span>
                            @else
                                <span class="badge bg-secondary">Không rõ</span>
                            @endif
                        </td>

                        <td>
                            <a href="{{ route('staff.bookings.show', $booking->booking_id) }}" class="btn btn-sm btn-primary">
                                Xem
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center text-muted">
                            Chưa có booking nào được phân công.
                        </td>
                    </tr>
                @endforelse
            </tbody>

        </table>

    </div>
</div>

@endsection