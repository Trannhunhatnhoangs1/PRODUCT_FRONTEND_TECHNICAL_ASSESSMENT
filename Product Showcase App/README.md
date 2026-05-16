# Product Showcase Application

> **Version 2.0** - Complete Fix với API endpoints đúng theo đề bài, Dockerfile hoàn chỉnh, và documentation đầy đủ

Ứng dụng trưng bày sản phẩm với React, TypeScript, Tailwind CSS và Mock API sử dụng Mockoon.

---

## ⚡ Quick Start

### Chạy Local (Recommended)

```bash
# Terminal 1: Start Mock API
pnpm install
pnpm dev:api

# Terminal 2: Start Frontend
pnpm dev
```

→ Visit **http://localhost:5173**  
→ Login: `admin` / `password`

### Chạy với Docker

```bash
docker-compose up --build
```

→ Visit **http://localhost:8080**

---

## 🎯 Tính năng

### Các màn hình chính
- **Đăng nhập (Login)**: Form đăng nhập với quick login button ⚡
- **Danh sách sản phẩm**: Hiển thị 120 sản phẩm với tính năng tìm kiếm và lọc
- **Chi tiết sản phẩm**: Xem thông tin chi tiết của từng sản phẩm
- **Đăng xuất (Logout)**: Thu hồi token và quay về trang đăng nhập

### Tính năng nâng cao
- **Tìm kiếm**: Tìm kiếm theo tên, mô tả, danh mục, thương hiệu
- **Lọc sản phẩm**: Lọc theo danh mục, thương hiệu, giá, đánh giá, tồn kho (8 fields)
- **Responsive Design**: Hiển thị tốt trên PC (1280px+) và Mobile
- **Protected Routes**: Bảo vệ routes bằng authentication
- **Mock API Fallback**: App vẫn chạy nếu Mockoon chưa start
- **Modern UI**: Glassmorphism effects, gradient backgrounds, animations

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18.3.1, TypeScript, React Router 7.13.0
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Mock API**: Mockoon CLI
- **Containerization**: Docker, Docker Compose
- **Server**: Nginx Alpine (multi-stage build)

---

## 📡 API Endpoints (ĐÚNG theo đề bài PDF)

Mock API được cấu hình với các endpoints sau (theo đúng đề bài):

### Authentication
- `POST /api/login` - Đăng nhập
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

- `POST /api/logout` - Đăng xuất

### Products
- `GET /api/product` - Lấy danh sách tất cả sản phẩm (120 items)
- `GET /api/product/:id` - Lấy chi tiết sản phẩm theo ID

⚠️ **Lưu ý:** Endpoint là `/api/product` (số ít), không phải `/api/products` (số nhiều)

---

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 20+
- pnpm
- Docker và Docker Compose (cho containerization)

### 1. Chạy với Development Mode (không dùng Docker)

```bash
# Cài đặt dependencies
pnpm install

# Chạy Mock API (terminal 1)
npx mockoon-cli start --data mockoon-data.json --port 3001
npx @mockoon/cli start --data mockoon-data.json --port 3001
# Chạy frontend (terminal 2)
pnpm run dev
```

Truy cập ứng dụng tại: `http://localhost:5173`

### 2. Chạy với Docker Compose (Production)

```bash
# Build và chạy tất cả services
docker-compose up --build

# Hoặc chạy ở background
docker-compose up -d --build
```

Truy cập:
- Frontend: `http://localhost:8080`
- Mock API: `http://localhost:3001/api`

### 3. Dừng Docker Compose

```bash
docker-compose down

# Xóa volumes và images
docker-compose down -v --rmi all
```

## Demo Credentials

Để đăng nhập vào ứng dụng, sử dụng:
- **Username**: `admin`
- **Password**: `password`

(Mock API chấp nhận bất kỳ username/password nào)

## Cấu trúc dự án

```
.
├── src/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── RootLayout.tsx # Layout với header và navigation
│   │   ├── pages/             # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProductListPage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── services/          # API services
│   │   │   └── api.ts
│   │   ├── routes.tsx         # React Router configuration
│   │   └── App.tsx            # Main app component
│   └── styles/                # Tailwind CSS styles
├── mockoon-data.json          # Mockoon API configuration
├── products-data.json         # 120 sản phẩm mock data
├── Dockerfile                 # Frontend Dockerfile
├── docker-compose.yml         # Docker Compose configuration
├── nginx.conf                 # Nginx configuration
└── README.md
```

## Dữ liệu sản phẩm

Ứng dụng có **120 sản phẩm** được generate tự động với:
- Tên sản phẩm
- Hình ảnh (DiceBear API)
- Mô tả
- Giá (VND)
- Danh mục (10 loại)
- Thương hiệu (10 brands)
- Tồn kho
- Đánh giá (1-5 sao)

## Tính năng Responsive

Ứng dụng được tối ưu cho:
- **Desktop** (1280px+): Hiển thị 4 cột sản phẩm
- **Tablet** (768px - 1279px): Hiển thị 2-3 cột
- **Mobile** (<768px): Hiển thị 1 cột

## Troubleshooting

### Mock API không chạy
```bash
# Kiểm tra port 3001 có đang được sử dụng không
lsof -i :3001

# Kill process nếu cần
kill -9 <PID>
```

### Frontend không connect được với Mock API
- Kiểm tra file `.env` có đúng `VITE_API_BASE_URL=http://localhost:3001/api`
- Đảm bảo Mock API đang chạy
- Check CORS headers trong mockoon-data.json

### Docker build lỗi
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

## License

MIT