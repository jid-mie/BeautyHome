@extends('admin.layout')

@section('title', 'Thanh toán')

@section('content')

<h3 class="fw-bold mb-3">Danh sách thanh toán</h3>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-bordered table-hover align-middle">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Booking ID</th>
                    <th>Số tiền</th>
                    <th>Phương thức</th>
                    <th>Trạng thái</th>
                    <th>Ngày thanh toán</th>
                    <th width="220">Cập nhật trạng thái</th>
                </tr>
            </thead>

            <tbody>
                @forelse($payments as $payment)
                    <tr>
                        <td>{{ $payment->payment_id }}</td>
                        <td>{{ $payment->booking_id }}</td>
                        <td>{{ number_format($payment->amount) }} VNĐ</td>
                        <td>{{ $payment->payment_method }}</td>
                        <td>
                            @if($payment->payment_status == 'paid')
                                <span class="badge bg-success">Đã thanh toán</span>
                            @elseif($payment->payment_status == 'pending')
                                <span class="badge bg-warning text-dark">Chờ xử lý</span>
                            @else
                                <span class="badge bg-danger">Chưa thanh toán</span>
                            @endif
                        </td>
                        <td>{{ $payment->payment_date }}</td>
                        <td>
                            <form action="{{ route('admin.payments.updateStatus', $payment->payment_id) }}" method="POST">
                                @csrf
                                <div class="d-flex gap-2">
                                    <select name="payment_status" class="form-control form-control-sm">
                                        <option value="pending" {{ $payment->payment_status == 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                                        <option value="paid" {{ $payment->payment_status == 'paid' ? 'selected' : '' }}>Đã thanh toán</option>
                                        <option value="unpaid" {{ $payment->payment_status == 'unpaid' ? 'selected' : '' }}>Chưa thanh toán</option>
                                    </select>

                                    <button class="btn btn-sm btn-primary">Lưu</button>
                                </div>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center text-muted">Chưa có thanh toán nào.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

    </div>
</div>

@endsection