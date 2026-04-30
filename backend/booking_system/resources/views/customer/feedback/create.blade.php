@extends('customer.layout')

@section('title','Đánh giá dịch vụ')

@section('content')

<h3 class="fw-bold mb-3">Đánh giá dịch vụ</h3>

<div class="card shadow-sm p-4">

    <h5 class="mb-3 text-primary">
        Dịch vụ: 
        <b>
            @foreach($booking->bookingDetails as $detail)
                {{ $detail->service->service_name ?? 'Không rõ' }}@if(!$loop->last), @endif
            @endforeach
        </b>
    </h5>

    <form action="{{ route('customer.feedback.store') }}" method="POST">
        @csrf

        <input type="hidden" name="booking_id" value="{{ $booking->booking_id }}">
        <input type="hidden" name="rating" id="ratingInput" value="0">

        <div class="mb-3">
            <label class="fw-bold">Chọn số sao:</label>

            <div class="d-flex align-items-center gap-2 mt-2">
                <div id="starRating" style="font-size: 32px; cursor: pointer;">
                    <span class="star text-secondary" data-value="1">★</span>
                    <span class="star text-secondary" data-value="2">★</span>
                    <span class="star text-secondary" data-value="3">★</span>
                    <span class="star text-secondary" data-value="4">★</span>
                    <span class="star text-secondary" data-value="5">★</span>
                </div>

                <span class="badge bg-warning text-dark fs-6" id="ratingText">Chưa chọn</span>
            </div>

            @error('rating')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label class="fw-bold">Nhận xét:</label>
            <textarea name="comment" class="form-control" rows="4" placeholder="Nhập nhận xét của bạn...">{{ old('comment') }}</textarea>

            @error('comment')
                <div class="text-danger mt-2">{{ $message }}</div>
            @enderror
        </div>
        

        <button type="submit" class="btn btn-success">
            Gửi đánh giá
        </button>

        <a href="{{ route('customer.bookings.index') }}" class="btn btn-secondary">
            Quay lại
        </a>

    </form>

</div>

<script>
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("ratingInput");
    const ratingText = document.getElementById("ratingText");

    function updateStars(rating) {
        stars.forEach(star => {
            let value = star.getAttribute("data-value");

            if (value <= rating) {
                star.classList.remove("text-secondary");
                star.classList.add("text-warning");
            } else {
                star.classList.remove("text-warning");
                star.classList.add("text-secondary");
            }
        });

        if (rating == 0) {
            ratingText.innerText = "Chưa chọn";
        } else {
            ratingText.innerText = rating + " sao";
        }
    }

    stars.forEach(star => {
        star.addEventListener("click", function() {
            let rating = this.getAttribute("data-value");
            ratingInput.value = rating;
            updateStars(rating);
        });

        star.addEventListener("mouseover", function() {
            let rating = this.getAttribute("data-value");
            updateStars(rating);
        });

        star.addEventListener("mouseout", function() {
            updateStars(ratingInput.value);
        });
    });
</script>

@endsection