# 🚀 Quick Start Guide - Product Showcase

## 📌 Bạn cần làm GÌ ngay bây giờ?

### ✅ OPTION 1: Chạy Local (Đơn giản nhất - KHUYẾN NGHỊ)

```bash
# Bước 1: Cài Mockoon CLI (nếu chưa có)
npm install -g @mockoon/cli

# Bước 2: Mở 2 terminals

# Terminal 1 - Chạy Mock API:
pnpm dev:api
# → API sẽ chạy tại http://localhost:3001

# Terminal 2 - Chạy Frontend:
pnpm dev
# → Frontend sẽ chạy tại http://localhost:5173
```

**Truy cập:**
- 🌐 Frontend: http://localhost:5173
- 🔌 API: http://localhost:3001/api/products
- 🔑 Login: `admin` / `password`

---

### ✅ OPTION 2: Chạy với Docker (Production mode)

```bash
# Bước 1: Build và start
docker-compose up --build

# Hoặc chạy background:
docker-compose up -d

# Xem logs:
docker-compose logs -f

# Stop:
docker-compose down
```

**Truy cập:**
- 🌐 Frontend: http://localhost:8080
- 🔌 API: http://localhost:3001/api/products

---

## 🔍 Kiểm Tra API Hoạt Động

```bash
# Test API endpoint (ĐÚNG theo đề bài - số ít):
curl http://localhost:3001/api/product

# Kết quả mong đợi: JSON array với 120 sản phẩm
```

**⚠️ LƯU Ý QUAN TRỌNG:**
- Đề bài yêu cầu `/api/product` (số ít), KHÔNG PHẢI `/api/products` (số nhiều)
- Đã fix toàn bộ endpoint cho đúng với yêu cầu

**Nếu thấy "Cannot GET /api":**
- ✅ Đúng rồi! Route `/api` không tồn tại
- ✅ Dùng `/api/product` hoặc `/api/login` thay vào

---

## 🐛 Gặp Lỗi?

### Lỗi: `products.map is not a function`
→ Xem file `/TROUBLESHOOTING.md` phần 1️⃣

### Lỗi: `Cannot GET /api`
→ Đổi URL thành `/api/products` (xem TROUBLESHOOTING.md phần 2️⃣)

### Frontend không chạy ở port 8080
→ Kiểm tra Dockerfile đã được tạo chưa (xem TROUBLESHOOTING.md phần 3️⃣)

---

## 📂 Files Quan Trọng Vừa Được Tạo/Sửa

| File | Trạng thái | Mô tả |
|------|-----------|-------|
| `/Dockerfile` | ✅ MỚI TẠO | Multi-stage build (Node.js + Nginx) |
| `/nginx.conf` | ✅ ĐÃ SỬA | Full config với events + http blocks |
| `/TROUBLESHOOTING.md` | ✅ MỚI TẠO | Hướng dẫn fix lỗi chi tiết |
| `/DECISION_LOG.md` | ✅ MỚI TẠO | Log tất cả quyết định kỹ thuật |
| `/src/app/components/RootLayout.tsx` | ✅ ĐÃ SỬA | Bỏ text "120 sản phẩm" |

---

## 📚 Tài Liệu Đầy Đủ

- `README.md` - Tổng quan dự án
- `QUICKSTART.md` - Hướng dẫn nhanh
- `TROUBLESHOOTING.md` - Khắc phục lỗi (⭐ ĐỌC FILE NÀY)
- `DECISION_LOG.md` - Decision log chi tiết
- `FEATURES.md` - Danh sách tính năng

---

## 🎯 Demo Credentials

**Username:** `admin`  
**Password:** `password`

(Hoặc nhấn nút "Đăng nhập nhanh" ⚡)

---

## 💡 Pro Tips

1. **Development**: Dùng `pnpm dev` + `pnpm dev:api` (nhanh hơn Docker)
2. **Production**: Dùng `docker-compose up` (đúng với production environment)
3. **Debug**: Mở F12 → Network tab để xem API requests

---

**Chúc may mắn! 🚀**