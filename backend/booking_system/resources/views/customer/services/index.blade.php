@extends('customer.layout')

@section('title','Dịch vụ làm đẹp')

@section('content')

<style>
    .page-title {
        font-size: 28px;
        font-weight: 800;
        color: #111;
    }

    .page-subtitle {
        color: #6c757d;
        margin-top: 6px;
        font-size: 14px;
    }

    .breadcrumb-custom {
        font-size: 13px;
        color: #6c757d;
        margin-bottom: 10px;
    }

    .filter-card {
        background: white;
        border-radius: 16px;
        border: 1px solid #eee;
        padding: 18px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    }

    .filter-title {
        font-weight: 800;
        font-size: 14px;
        margin-bottom: 14px;
    }

    .filter-subtitle {
        font-weight: 800;
        font-size: 12px;
        margin-top: 18px;
        margin-bottom: 8px;
        color: #111;
    }

    .filter-card label {
        font-size: 13px;
        color: #444;
    }

    .btn-filter {
        border-radius: 12px;
        font-weight: 700;
        padding: 10px;
    }

    .btn-reset {
        font-weight: 700;
        font-size: 13px;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;
        color: #444;
    }

    .btn-reset:hover {
        color: #0d6efd;
    }

    /* Service Card */
    .service-card {
        border-radius: 18px;
        border: none;
        overflow: hidden;
        background: white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        transition: 0.2s;
        height: 100%;
    }

    .service-card:hover {
        transform: translateY(-4px);
    }

    .service-image {
        width: 100%;
        height: 190px;
        object-fit: cover;
    }

    .service-tag {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(0,0,0,0.75);
        color: white;
        font-size: 11px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 30px;
    }

    .service-body {
        padding: 15px;
    }

    .service-name {
        font-weight: 800;
        font-size: 14px;
        color: #111;
        min-height: 38px;
    }

    .service-meta {
        font-size: 12px;
        color: #6c757d;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .service-price {
        font-weight: 900;
        font-size: 14px;
        margin-top: 10px;
        color: #111;
    }

    .btn-book {
        background: #111;
        color: white;
        font-weight: 800;
        border-radius: 12px;
        padding: 8px 14px;
        font-size: 13px;
        border: none;
    }

    .btn-book:hover {
        background: black;
    }

    .sort-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
    }

    .sort-box small {
        color: #6c757d;
    }

    .sort-select {
        border-radius: 12px;
        font-weight: 700;
        font-size: 13px;
        padding: 8px 12px;
    }

    .pagination .page-link {
        border-radius: 10px;
        margin: 0 4px;
        font-weight: 700;
        color: #111;
    }

    .pagination .active .page-link {
        background: #111 !important;
        border-color: #111 !important;
        color: white !important;
    }
</style>

<div class="breadcrumb-custom">
    Trang chủ > <b>Dịch vụ</b>
</div>

<div class="mb-4">
    <div class="page-title">Dịch vụ làm đẹp</div>
    <div class="page-subtitle">Chọn dịch vụ phù hợp với bạn</div>
</div>

<div class="row g-4">

    {{-- FILTER --}}
    <div class="col-md-3">
        <div class="filter-card">

            <div class="filter-title">Bộ lọc</div>

            <form method="GET" action="">

                {{-- Danh mục --}}
                <div class="filter-subtitle">DANH MỤC</div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="category[]" value="Spa & Massage">
                    <label class="form-check-label">Spa & Massage</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="category[]" value="Nails & Tay">
                    <label class="form-check-label">Nails & Tay</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="category[]" value="Makeup & Tóc">
                    <label class="form-check-label">Makeup & Tóc</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="category[]" value="Waxing & Chăm sóc da">
                    <label class="form-check-label">Waxing & Chăm sóc da</label>
                </div>

                {{-- Mức giá --}}
                <div class="filter-subtitle">MỨC GIÁ</div>

                <div class="d-flex justify-content-between">
                    <small class="text-muted">100k</small>
                    <small class="text-muted">2M+</small>
                </div>
                <input type="range" class="form-range" min="100000" max="2000000" step="50000">

                {{-- Thời gian --}}
                <div class="filter-subtitle">THỜI GIAN</div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="duration[]" value="60">
                    <label class="form-check-label">Dưới 60 phút</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="duration[]" value="120">
                    <label class="form-check-label">60 - 120 phút</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="duration[]" value="180">
                    <label class="form-check-label">Trên 120 phút</label>
                </div>

                <button class="btn btn-dark w-100 btn-filter mt-3">
                    Áp dụng
                </button>

                <a href="{{ route('customer.services.index') }}" class="btn-reset text-center w-100">
                    Xóa bộ lọc
                </a>

            </form>

        </div>
    </div>

    {{-- SERVICES LIST --}}
    <div class="col-md-9">

        <div class="sort-box">
            <small>Hiển thị {{ $services->count() }} dịch vụ</small>

            <select class="form-select sort-select" style="width: 180px;">
                <option selected>Phổ biến nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
                <option>Đánh giá cao</option>
            </select>
        </div>

        <div class="row g-4">
            @forelse($services as $sv)

                <div class="col-md-6">
                    <div class="service-card">

                        <div class="position-relative">
                            <div class="service-tag">
                                {{ $sv->category->category_name ?? 'DỊCH VỤ' }}
                            </div>

                            <img class="service-image"
                                 src="{{ $sv->image ?? 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg' }}"
                                 alt="Service Image">
                        </div>

                        <div class="service-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div class="service-name">
                                    {{ $sv->service_name }}
                                </div>

                                <div class="fw-bold" style="font-size: 13px;">
                                    ⭐ {{ $sv->rating ?? '4.8' }}
                                </div>
                            </div>

                            <div class="service-meta">
                                <i class="bi bi-clock"></i>
                                {{ $sv->duration ?? '90' }} phút
                            </div>

                            <div class="service-meta">
                                <i class="bi bi-geo-alt"></i>
                                Quận 1, HCM
                            </div>

                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <div class="service-price">
                                    {{ number_format($sv->price) }}đ
                                </div>

                                <form action="{{ route('customer.cart.add') }}" method="POST" style="margin: 0;">
                                    @csrf
                                    <input type="hidden" name="service_id" value="{{ $sv->service_id }}">
                                    <button type="submit" class="btn-book">Thêm vào giỏ</button>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>

            @empty
                <div class="col-12">
                    <div class="alert alert-info">
                        Không có dịch vụ nào.
                    </div>
                </div>
            @endforelse
        </div>

        {{-- PAGINATION --}}
        <div class="mt-4 d-flex justify-content-center">
            {{-- Nếu bạn dùng paginate() thì thay bằng: {{ $services->links() }} --}}
            <nav>
                <ul class="pagination">
                    <li class="page-item disabled"><a class="page-link" href="#">‹</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">›</a></li>
                </ul>
            </nav>
        </div>

    </div>
</div>

@endsection