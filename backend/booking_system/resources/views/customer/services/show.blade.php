@extends('customer.layout')

@section('title', 'Chi tiết dịch vụ')

@section('content')

<div class="card shadow-sm p-4 mb-4">
    <h3 class="fw-bold text-primary">{{ $service->service_name }}</h3>

    <p class="mt-3">
        <b>Mô tả:</b><br>
        {{ $service->description }}
    </p>

    <p>
        <b>Giá:</b>
        <span class="text-danger fw-bold">{{ number_format($service->price) }} VNĐ</span>
    </p>

    <p>
        <b>Thời gian thực hiện:</b> {{ $service->duration }} phút
    </p>

    <p>
        <b>Đánh giá trung bình:</b>
        @php
            $rounded = round($avgRating);
        @endphp

        @if($avgRating)
            @for($i=1; $i<=5; $i++)
                @if($i <= $rounded)
                    <span style="color: gold; font-size: 20px;">★</span>
                @else
                    <span style="color: gray; font-size: 20px;">★</span>
                @endif
            @endfor
            <span class="text-muted">({{ number_format($avgRating, 1) }}/5)</span>
        @else
            <span class="text-muted">Chưa có đánh giá</span>
        @endif
    </p>

        <form action="{{ route('customer.cart.add') }}" method="POST" class="d-inline-block">
            @csrf
            <input type="hidden" name="service_id" value="{{ $service->service_id }}">
            <button type="submit" class="btn btn-success">
                Thêm vào giỏ hàng
            </button>
        </form>

        <a href="{{ route('customer.services.index') }}" class="btn btn-secondary">
            Quay lại
        </a>
    </div>
</div>

{{-- DANH SÁCH ĐÁNH GIÁ --}}
<div class="card shadow-sm p-4">
    <h5 class="fw-bold mb-3">📌 Đánh giá của khách hàng</h5>

    @if($feedbacks->count() == 0)
        <p class="text-muted">Chưa có đánh giá nào cho dịch vụ này.</p>
    @else
        @foreach($feedbacks as $fb)
            <div class="border rounded p-3 mb-3 bg-light">

                <div class="d-flex justify-content-between">
                    <b>{{ $fb->customer->full_name ?? 'Ẩn danh' }}</b>
                    <small class="text-muted">{{ $fb->created_at }}</small>
                </div>

                <div>
                    @for($i=1; $i<=5; $i++)
                        @if($i <= $fb->rating)
                            <span style="color: gold;">★</span>
                        @else
                            <span style="color: gray;">★</span>
                        @endif
                    @endfor
                </div>

                <p class="mt-2 mb-0">
                    {{ $fb->comment ?? 'Không có nhận xét' }}
                </p>

            </div>
        @endforeach
    @endif
</div>

@endsection