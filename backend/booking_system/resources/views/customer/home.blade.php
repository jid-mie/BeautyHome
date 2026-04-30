@extends('customer.layout')

@section('title','Trang chủ')

@section('content')

<style>
    .hero-section {
        padding: 70px 0;
    }

    .hero-title {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.2;
    }

    .hero-desc {
        font-size: 16px;
        color: #6c757d;
        margin-top: 15px;
        max-width: 500px;
    }

    .hero-btn {
        margin-top: 25px;
        padding: 10px 18px;
        border-radius: 8px;
        font-weight: 600;
    }

    .hero-image {
        border-radius: 18px;
        width: 100%;
        object-fit: cover;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    .section-title {
        font-size: 22px;
        font-weight: 800;
        margin-bottom: 5px;
    }

    .section-subtitle {
        color: #6c757d;
        margin-bottom: 30px;
    }

    .feature-card {
        border: none;
        border-radius: 14px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        padding: 20px;
        height: 100%;
        transition: 0.2s;
    }

    .feature-card:hover {
        transform: translateY(-3px);
    }

    .feature-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: #f2f4f7;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        font-size: 18px;
    }

    .review-card {
        border: none;
        border-radius: 14px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        padding: 18px;
        height: 100%;
    }

    .review-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
    }

    .rating-star {
        color: #f4b400;
        font-size: 14px;
    }

    .footer {
        margin-top: 60px;
        padding: 40px 0;
        border-top: 1px solid #ddd;
        color: #6c757d;
        font-size: 14px;
    }

    .footer-title {
        font-weight: 800;
        color: black;
        margin-bottom: 10px;
    }

    .footer a {
        text-decoration: none;
        color: #6c757d;
    }

    .footer a:hover {
        color: black;
    }
</style>

{{-- HERO --}}
<div class="hero-section">
    <div class="row align-items-center">

        <div class="col-md-6">
            <div class="hero-title">
                Làm đẹp tại nhà - <br>
                Tiện lợi, chuyên nghiệp
            </div>

            <div class="hero-desc">
                Đặt lịch dễ dàng, dịch vụ chất lượng cao mang spa đến tận
                không gian sống của bạn.
            </div>

            <a href="{{ route('customer.services.index') }}" class="btn btn-dark hero-btn">
                Đặt lịch ngay →
            </a>
        </div>

        <div class="col-md-6 text-center">
            <img class="hero-image"
                 src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg"
                 alt="Spa Image">
        </div>

    </div>
</div>

{{-- FEATURE SERVICES --}}
<div class="text-center mt-5 mb-4">
    <div class="section-title">Dịch vụ nổi bật</div>
    <div class="section-subtitle">Chọn các dịch vụ nổi bật cho bạn</div>
</div>

<div class="row g-4">

    <div class="col-md-4">
        <div class="feature-card">
            <div class="feature-icon">💆</div>
            <h5 class="fw-bold">Chăm sóc da chuyên sâu</h5>
            <p class="text-muted">
                Dịch vụ chăm sóc da tại spa, phục hồi làn da sáng khỏe tự nhiên.
            </p>
            <a href="{{ route('customer.services.index') }}" class="fw-bold text-dark">
                Xem thêm →
            </a>
        </div>
    </div>

    <div class="col-md-4">
        <div class="feature-card">
            <div class="feature-icon">🧖</div>
            <h5 class="fw-bold">Massage trị liệu</h5>
            <p class="text-muted">
                Giúp thư giãn và giảm stress, hỗ trợ tuần hoàn máu.
            </p>
            <a href="{{ route('customer.services.index') }}" class="fw-bold text-dark">
                Xem thêm →
            </a>
        </div>
    </div>

    <div class="col-md-4">
        <div class="feature-card">
            <div class="feature-icon">💄</div>
            <h5 class="fw-bold">Trang điểm sự kiện</h5>
            <p class="text-muted">
                Trang điểm chuyên nghiệp cho tiệc cưới, sự kiện quan trọng.
            </p>
            <a href="{{ route('customer.services.index') }}" class="fw-bold text-dark">
                Xem thêm →
            </a>
        </div>
    </div>

</div>

{{-- CUSTOMER REVIEWS --}}
<div class="text-center mt-5 mb-4">
    <div class="section-title">Khách hàng nói gì về chúng tôi</div>
    <div class="section-subtitle">Một vài đánh giá nổi bật từ khách hàng</div>
</div>

<div class="row g-4">

    <div class="col-md-4">
        <div class="review-card">
            <div class="d-flex align-items-center gap-2 mb-2">
                <img class="review-avatar"
                     src="https://randomuser.me/api/portraits/women/45.jpg">
                <div>
                    <div class="fw-bold">Mai Anh</div>
                    <div>
                        <span class="rating-star">★★★★★</span>
                    </div>
                </div>
            </div>
            <p class="text-muted mb-0">
                "Dịch vụ rất chuyên nghiệp, nhân viên nhiệt tình. Mình rất hài lòng!"
            </p>
        </div>
    </div>

    <div class="col-md-4">
        <div class="review-card">
            <div class="d-flex align-items-center gap-2 mb-2">
                <img class="review-avatar"
                     src="https://randomuser.me/api/portraits/men/41.jpg">
                <div>
                    <div class="fw-bold">Lan Phương</div>
                    <div>
                        <span class="rating-star">★★★★★</span>
                    </div>
                </div>
            </div>
            <p class="text-muted mb-0">
                "Đặt lịch nhanh, dịch vụ đến đúng giờ, trải nghiệm như spa tại nhà."
            </p>
        </div>
    </div>

    <div class="col-md-4">
        <div class="review-card">
            <div class="d-flex align-items-center gap-2 mb-2">
                <img class="review-avatar"
                     src="https://randomuser.me/api/portraits/women/30.jpg">
                <div>
                    <div class="fw-bold">Hương Ly</div>
                    <div>
                        <span class="rating-star">★★★★☆</span>
                    </div>
                </div>
            </div>
            <p class="text-muted mb-0">
                "Rất tiện lợi và chất lượng tốt. Mình sẽ tiếp tục sử dụng dịch vụ."
            </p>
        </div>
    </div>

</div>

{{-- FOOTER --}}
<div class="footer">
    <div class="row">

        <div class="col-md-4">
            <div class="footer-title">BEAUTYHOME</div>
            <p>
                Nâng tầm trải nghiệm làm đẹp tại nhà bằng dịch vụ chuyên nghiệp.
            </p>
            <small>© 2026 BeautyHome</small>
        </div>

        <div class="col-md-4">
            <div class="footer-title">Links</div>
            <p class="mb-1"><a href="#">Privacy Policy</a></p>
            <p class="mb-1"><a href="#">Terms of Service</a></p>
            <p class="mb-1"><a href="#">Contact Us</a></p>
        </div>

        <div class="col-md-4">
            <div class="footer-title">Social</div>
            <p class="mb-1"><a href="#">Instagram</a></p>
            <p class="mb-1"><a href="#">Pinterest</a></p>
        </div>

    </div>
</div>

@endsection