@extends('customer.layout')

@section('title', 'Lịch đã đặt')

@section('content')

<h3 class="fw-bold mb-3">Lịch đã đặt</h3>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-bordered table-hover align-middle">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Dịch vụ</th>
                    <th>Tổng tiền</th>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th width="170">Hành động</th>
                </tr>
            </thead>

            <tbody>
                @forelse($bookings as $booking)
                    <tr>
                        <td>{{ $booking->booking_id }}</td>

                        <td>
                            <ul class="mb-0 ps-3">
                                @foreach($booking->bookingDetails as $detail)
                                    <li>{{ $detail->service->service_name ?? 'Không rõ' }}</li>
                                @endforeach
                            </ul>
                        </td>

                        <td class="fw-bold text-danger">{{ number_format($booking->total_amount) }} VNĐ</td>

                        <td>{{ $booking->booking_date }}</td>
                        <td>{{ $booking->booking_time }}</td>
                        <td>{{ $booking->address }}</td>

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
                            {{-- status = 0: Cho phép hủy --}}
                            @if($booking->status == 0)
                                <form action="{{ route('customer.bookings.cancel', $booking->booking_id) }}" method="POST">
                                    @csrf
                                    <button class="btn btn-sm btn-danger w-100"
                                        onclick="return confirm('Bạn chắc chắn muốn hủy lịch?')">
                                        Hủy lịch
                                    </button>
                                </form>

                            {{-- status = 1 hoặc 2: Không cho hủy --}}
                            @elseif($booking->status == 1 || $booking->status == 2)
                                <button class="btn btn-sm btn-secondary w-100" disabled>
                                    Không thể hủy
                                </button>

                            @elseif($booking->status == 3)

    @if($booking->feedback)
    <a href="{{ route('customer.feedback.show', $booking->booking_id) }}"
       class="btn btn-sm btn-primary w-100">
        Xem đánh giá
    </a>
@else
    <a href="{{ route('customer.feedback.create', $booking->booking_id) }}"
       class="btn btn-sm btn-success w-100">
        Đánh giá
    </a>
@endif

                            {{-- status = 4: Đã hủy --}}
                            @elseif($booking->status == 4)
                                <button class="btn btn-sm btn-danger w-100" disabled>
                                    Đã hủy
                                </button>

                            @else
                                <button class="btn btn-sm btn-secondary w-100" disabled>
                                    Chờ xử lý
                                </button>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center text-muted">
                            Bạn chưa đặt lịch nào.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>

    </div>
</div>

@endsection