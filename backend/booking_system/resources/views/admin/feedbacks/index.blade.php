@extends('admin.layout')

@section('title', 'Quản lý đánh giá')

@section('content')

<h3 class="fw-bold mb-3">Danh sách đánh giá</h3>

<div class="card shadow-sm">
    <div class="card-body">

        @if($feedbacks->count() == 0)
            <div class="alert alert-info text-center">
                Chưa có đánh giá nào.
            </div>
        @else
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th width="60">ID</th>
                        <th>Khách hàng</th>
                        <th>Dịch vụ</th>
                        <th width="140">Đánh giá</th>
                        <th>Nhận xét</th>
                        <th width="160">Ngày tạo</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($feedbacks as $fb)
                        <tr>
                            <td>{{ $fb->feedback_id }}</td>

                            <td>
                                {{ $fb->customer->full_name ?? 'Không rõ' }}
                            </td>

                            <td>
                                @if($fb->booking && $fb->booking->bookingDetails)
                                    @foreach($fb->booking->bookingDetails as $detail)
                                        {{ $detail->service->service_name ?? 'Không rõ' }}@if(!$loop->last), @endif
                                    @endforeach
                                @else
                                    Không rõ
                                @endif
                            </td>

                            <td>
                                @for($i=1; $i<=5; $i++)
                                    @if($i <= $fb->rating)
                                        <span style="color: gold; font-size: 18px;">★</span>
                                    @else
                                        <span style="color: gray; font-size: 18px;">★</span>
                                    @endif
                                @endfor
                                <span class="text-muted">({{ $fb->rating }}/5)</span>
                            </td>

                            <td>
                                {{ $fb->comment ?? 'Không có nhận xét' }}
                            </td>

                            <td>
                                {{ $fb->created_at }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>

            </table>
        @endif

    </div>
</div>

@endsection