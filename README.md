# 🌸 BeautyHome - Hệ Thống Đặt Lịch Làm Đẹp Chuyên Nghiệp

BeautyHome là một nền tảng quản lý đặt lịch toàn diện dành cho các spa, salon và trung tâm làm đẹp. Dự án được thiết kế với kiến trúc hiện đại, tách biệt hoàn toàn giữa Frontend và Backend, hỗ trợ đa vai trò người dùng và sẵn sàng triển khai trên môi trường Docker.

## 🚀 Tính Năng Nổi Bật

- **Đa Vai Trò (Multi-role)**: Quản trị viên (Admin), Nhân viên (Staff), và Khách hàng (Customer).
- **Quản Lý Phiên Độc Lập**: Cho phép đăng nhập đồng thời nhiều vai trò trên cùng một trình duyệt mà không bị xung đột dữ liệu.
- **Đặt Lịch Thông Minh**: Quy trình đặt lịch mượt mà cho khách hàng và bảng điều hành chuyên nghiệp cho nhân viên.
- **Bảo Mật**: Tích hợp Laravel Sanctum, quản lý thiết bị đăng nhập và bảo mật phiên.
- **Dockerized**: Sẵn sàng chạy ngay lập tức với Docker Compose.
- **CI/CD**: Tích hợp sẵn GitHub Actions để tự động hóa kiểm thử và xây dựng.

## 🛠 Công Nghệ Sử Dụng

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

### Backend
- **Framework**: Laravel 10+
- **Database**: MySQL 8.0
- **Auth**: Laravel Sanctum
- **Pattern**: Service - Repository (Modular Architecture)

## 📦 Hướng Dẫn Cài Đặt

### 1. Sử dụng Docker (Khuyến nghị)
Yêu cầu: Đã cài đặt Docker và Docker Compose.

```bash
# Clone dự án
git clone https://github.com/jid-mie/BeautyHomeBeautyHome.git
cd BeautyHomeBeautyHome

# Khởi chạy toàn bộ hệ thống
docker-compose up -d --build
```
Hệ thống sẽ khả dụng tại:
- Frontend: `http://localhost:80`
- Backend API: `http://localhost:80/api`

### 2. Cài đặt thủ công (Local Development)

#### Backend:
```bash
cd backend/booking_system
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

#### Frontend:
```bash
cd frontend
cp .env.example .env # Chỉnh sửa VITE_API_BASE_URL thành http://localhost:8000/api
npm install
npm run dev
```

## ☁️ Triển Khai (Deployment)

Dự án đã được tối ưu hóa để triển khai trên:
- **Frontend**: [Vercel](https://vercel.com/) (Xem file `vercel.json`).
- **Backend**: [Render](https://render.com/) hoặc bất kỳ dịch vụ hỗ trợ Docker/PHP nào.

### Cấu hình Root Directory:
- Vercel: `frontend`
- Render: `backend/booking_system`

## 📂 Cấu Trúc Thư Mục

- `frontend/`: Chứa toàn bộ mã nguồn React.
- `backend/booking_system/`: Chứa mã nguồn Laravel.
- `.github/workflows/`: Quy trình CI/CD tự động.
- `docker-compose.yml`: Cấu hình container cho toàn bộ hệ thống.

---
© 2026 BeautyHome Team. Designed with ❤️ for Beauty Services.
