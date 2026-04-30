@extends('customer.layout')

@section('title', 'Giỏ hàng dịch vụ')

@section('content')

<h3 class="fw-bold mb-3">Giỏ hàng của bạn</h3>

<div class="card shadow-sm p-4">
    @if($services->isEmpty())
        <div class="alert alert-info">Giỏ hàng của bạn đang trống!</div>
        <a href="{{ route('customer.services.index') }}" class="btn btn-primary">Xem dịch vụ</a>
    @else
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Tên dịch vụ</th>
                    <th>Thời gian (phút)</th>
                    <th>Giá tiền</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach($services as $sv)
                    <tr>
                        <td>{{ $sv->service_name }}</td>
                        <td>{{ $sv->duration }}</td>
                        <td>{{ number_format($sv->price) }} VNĐ</td>
                        <td>
                            <form action="{{ route('customer.cart.remove', $sv->service_id) }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit" class="btn btn-danger btn-sm">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" class="text-end fw-bold">Tổng cộng:</td>
                    <td colspan="2" class="fw-bold text-danger">{{ number_format($total) }} VNĐ</td>
                </tr>
            </tfoot>
        </table>

        <div class="text-end">
            <a href="{{ route('customer.bookings.create') }}" class="btn btn-success">Tiến hành đặt lịch</a>
        </div>
    @endif
</div>

@endsection
