@extends('customer.layout')

@section('title','Thanh toán')

@section('content')

<div class="mb-3">
    <small class="text-muted">
        Lịch hẹn > <b>Thanh toán</b>
    </small>
</div>

<h3 class="fw-bold mb-4">💳 Thanh toán dịch vụ</h3>

@if($bookings->count() == 0)
    <div class="alert alert-info">
        Bạn chưa có lịch hẹn nào.
    </div>
@else
    <div class="row g-4">
        @foreach($bookings as $bk)

            @php
                $price = $bk->total_amount;
                $isPaid = ($bk->payment && $bk->payment->payment_status == 'paid');
            @endphp

            <div class="col-md-6">
                <div class="card shadow-sm h-100 border-0">
                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="fw-bold text-primary mb-1">
                                    Booking gồm {{ count($bk->bookingDetails) }} dịch vụ
                                </h5>

                                <small class="text-muted">
                                    Mã booking: <b>#{{ $bk->booking_id }}</b>
                                </small>
                            </div>

                            {{-- Badge trạng thái thanh toán --}}
                            @if($isPaid)
                                <span class="badge bg-success px-3 py-2">Đã thanh toán</span>
                            @else
                                <span class="badge bg-warning text-dark px-3 py-2">Chưa thanh toán</span>
                            @endif
                        </div>

                        <hr>

                        <p class="mb-1">
                            <b>📅 Ngày:</b> {{ \Carbon\Carbon::parse($bk->booking_date)->format('d/m/Y') }}
                        </p>

                        <p class="mb-1">
                            <b>⏰ Giờ:</b> {{ $bk->booking_time }}
                        </p>

                        <p class="mb-1">
                            <b>📍 Địa chỉ:</b> {{ $bk->address }}
                        </p>

                        <p class="mb-2">
                            <b>👩‍🔧 Nhân viên:</b>
                            {{ $bk->staff->full_name ?? 'Chưa phân công' }}
                        </p>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold text-danger fs-5">
                                {{ number_format($price) }} VNĐ
                            </span>

                            {{-- Nút hành động --}}
                            <div>
                                @if($bk->status != 3)
                                    <button class="btn btn-secondary btn-sm" disabled>
                                        Chưa hoàn thành
                                    </button>
                                @else
                                    @if($isPaid)
                                        <a href="{{ route('customer.payments.show', $bk->booking_id) }}"
                                           class="btn btn-outline-success btn-sm">
                                            Xem thanh toán
                                        </a>
                                    @else
                                        <a href="{{ route('customer.payments.show', $bk->booking_id) }}"
                                           class="btn btn-warning btn-sm fw-bold">
                                            Thanh toán ngay
                                        </a>
                                    @endif
                                @endif
                            </div>
                        </div>

                        {{-- Thông tin phương thức --}}
                        <div class="mt-3">
                            @if($bk->payment)
                                <small class="text-muted">
                                    Phương thức: <b>{{ $bk->payment->payment_method }}</b>
                                </small>
                            @else
                                <small class="text-muted">
                                    Phương thức: <i>Chưa chọn</i>
                                </small>
                            @endif
                        </div>

                    </div>
                </div>
            </div>

        @endforeach
    </div>
@endif

@endsection