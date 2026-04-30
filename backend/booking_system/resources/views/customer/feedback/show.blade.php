@extends('customer.layout')

@section('title','Xem đánh giá')

@section('content')

<h3 class="fw-bold mb-3">⭐ Đánh giá của bạn</h3>

<div class="card shadow-sm p-4">

    <h5 class="text-primary mb-3">
        Dịch vụ: 
        <b>
            @foreach($feedback->booking->bookingDetails as $detail)
                {{ $detail->service->service_name ?? 'Không rõ' }}@if(!$loop->last), @endif
            @endforeach
        </b>
    </h5>

    <p class="mb-1">
        <b>Khách hàng:</b>
        {{ $feedback->customer->full_name ?? 'Ẩn danh' }}
    </p>

    <p class="mb-3 text-muted">
        <b>Thời gian đánh giá:</b>
        {{ $feedback->created_at }}
    </p>

    <div class="mb-3">
        <label class="fw-bold">Số sao:</label>
        <div style="font-size: 28px;">
            @for($i=1; $i<=5; $i++)
                @if($i <= $feedback->rating)
                    <span style="color: gold;">★</span>
                @else
                    <span style="color: gray;">★</span>
                @endif
            @endfor
            <span class="text-muted">({{ $feedback->rating }}/5)</span>
        </div>
    </div>

    <div class="mb-3">
        <label class="fw-bold">Nhận xét:</label>
        <p class="border rounded p-3 bg-light">
            {{ $feedback->comment ?? 'Không có nhận xét' }}
        </p>
    </div>

    <a href="{{ route('customer.bookings.index') }}" class="btn btn-secondary">
        Quay lại
    </a>

</div>

@endsection