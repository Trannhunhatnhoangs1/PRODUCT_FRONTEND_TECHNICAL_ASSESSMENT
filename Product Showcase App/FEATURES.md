# Product Showcase - Tính năng & Kiến trúc

## Tổng quan
Ứng dụng trưng bày sản phẩm full-stack với React, TypeScript, Tailwind CSS, và Mock API.

## Các màn hình

### 1. Màn hình Đăng nhập (`/login`)
- Form đăng nhập với username và password
- Validation và error handling
- Auto-redirect về `/products` nếu đã đăng nhập
- Hiển thị demo credentials
- Responsive design
- **API**: `POST /api/login`

### 2. Màn hình Danh sách sản phẩm (`/products`)
- Hiển thị grid sản phẩm (responsive: 1-4 cột)
- **120 sản phẩm** với thông tin đầy đủ
- **Tìm kiếm realtime** theo:
  - Tên sản phẩm
  - Mô tả
  - Danh mục
  - Thương hiệu
- **Bộ lọc nâng cao**:
  - Danh mục (10 loại)
  - Thương hiệu (10 brands)
  - Khoảng giá (min-max)
  - Đánh giá tối thiểu (1-5 sao)
- Hiển thị số lượng sản phẩm phù hợp
- Card sản phẩm với:
  - Hình ảnh (DiceBear avatars)
  - Tên & thương hiệu
  - Mô tả (truncated)
  - Giá (VND format)
  - Đánh giá (sao)
  - Tồn kho
- **API**: `GET /api/products`

### 3. Màn hình Chi tiết sản phẩm (`/products/:id`)
- Hiển thị đầy đủ thông tin sản phẩm
- Layout 2 cột (image + details)
- Thông tin chi tiết:
  - Hình ảnh lớn
  - Tên, thương hiệu, danh mục
  - Mô tả đầy đủ
  - Giá & tồn kho
  - Đánh giá chi tiết với số sao
  - ID sản phẩm
- Action buttons:
  - Thêm vào giỏ hàng (disabled nếu hết hàng)
  - Yêu thích
- Nút quay lại danh sách
- **API**: `GET /api/products/:id`

### 4. Header & Navigation
- Logo và tên ứng dụng
- Nút đăng xuất
- Sticky header
- Responsive (mobile: chỉ icon)

## Authentication & Authorization

### Protected Routes
- Tất cả routes ngoại trừ `/login` yêu cầu authentication
- Auto-redirect về `/login` nếu chưa đăng nhập
- Auto-redirect về `/products` nếu đã đăng nhập vào `/login`

### Token Management
- Lưu JWT token trong `localStorage`
- Gửi token trong header `Authorization: Bearer <token>`
- Xóa token khi logout
- **APIs**:
  - Login: `POST /api/login`
  - Logout: `POST /api/logout`

## Dữ liệu sản phẩm

### Cấu trúc Product
```typescript
interface Product {
  id: number;
  name: string;
  image: string;           // DiceBear API URL
  description: string;
  price: number;          // VND
  category: string;       // 10 categories
  brand: string;          // 10 brands
  stock: number;          // 0-100
  rating: number;         // 3.0-5.0
}
```

### Thống kê
- **Tổng số**: 120 sản phẩm
- **Danh mục**: 10 loại (Điện thoại, Laptop, Tablet, Đồng hồ, Tai nghe, Loa, Camera, Ti vi, Máy giặt, Tủ lạnh)
- **Thương hiệu**: 10 brands (Samsung, Apple, Xiaomi, Sony, LG, Dell, HP, Asus, Lenovo, Huawei)

## API Architecture

### Mock API với Mockoon
- **Port**: 3001
- **Base URL**: `http://localhost:3001/api`
- **CORS**: Enabled
- **Response delay**: 100-500ms (realistic)

### Endpoints
| Method | Endpoint | Description | Response Time |
|--------|----------|-------------|---------------|
| POST | `/api/login` | Đăng nhập | 500ms |
| POST | `/api/logout` | Đăng xuất | 200ms |
| GET | `/api/products` | Danh sách sản phẩm | 300ms |
| GET | `/api/products/:id` | Chi tiết sản phẩm | 200ms |

### Mockoon Configuration
- File: `mockoon-data.json`
- Data file: `products-data.json`
- Templating: Handlebars helpers
- Dynamic product filtering by ID

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1023px (2 columns)
- **Desktop**: 1024px - 1279px (3 columns)
- **Large Desktop**: ≥ 1280px (4 columns)

### Mobile-First Features
- Collapsible filters
- Simplified navigation
- Touch-friendly buttons
- Optimized images
- Stacked layouts

## Docker Architecture

### Services
1. **Frontend** (Nginx)
   - Port: 8080
   - Base image: `nginx:alpine`
   - Build: Multi-stage (Node.js builder → Nginx)
   - Config: Custom nginx.conf for SPA

2. **Mock API** (Mockoon CLI)
   - Port: 3001
   - Image: `mockoon/cli:latest`
   - Volumes: mockoon-data.json, products-data.json
   - Health check: GET /api/products

### Network
- Bridge network: `product-network`
- Service discovery: DNS-based
- Frontend → API: `http://mock-api:3001/api`

### Docker Files
- `Dockerfile`: Multi-stage frontend build
- `docker-compose.yml`: Orchestration
- `nginx.conf`: SPA routing & caching
- `.dockerignore`: Build optimization

## Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Routing**: React Router 7.13.0
- **Icons**: Lucide React
- **Build**: Vite 6.3.5

### Backend (Mock)
- **API**: Mockoon CLI
- **Format**: JSON
- **Templating**: Handlebars

### DevOps
- **Container**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (production)
- **Package Manager**: pnpm

## Performance Optimizations

### Frontend
- Code splitting by route
- Lazy loading components
- Image optimization (SVG avatars)
- Tailwind CSS purging
- Gzip compression (Nginx)
- Cache headers for static assets

### API
- Realistic latency simulation
- CORS pre-configured
- JSON file-based data (fast reads)
- No database overhead

## Development Workflow

### Local Development
```bash
# Terminal 1: Mock API
pnpm run dev:api

# Terminal 2: Frontend (auto-starts in Figma Make)
# Check preview panel
```

### Production Deployment
```bash
# Build and start
docker-compose up --build

# Verify
curl http://localhost:3001/api/products
curl http://localhost:8080
```

## Testing

### Manual Testing
- Script: `test-api.sh`
- Tests all 4 API endpoints
- Validates response codes
- Checks data integrity

### API Testing
```bash
./test-api.sh
```

## Security Features

### Frontend
- XSS Protection headers
- Content Security Policy
- HTTPS upgrade (Nginx)
- Input sanitization
- Protected routes

### API
- CORS configuration
- Token validation
- Request/response logging
- Rate limiting ready

## Future Enhancements

### Potential Features
- [ ] Shopping cart functionality
- [ ] Product reviews & ratings
- [ ] Image gallery for products
- [ ] Pagination for product list
- [ ] Sort options (price, rating, name)
- [ ] User profile management
- [ ] Wishlist persistence
- [ ] Real-time stock updates
- [ ] Admin dashboard
- [ ] Analytics integration

### Technical Improvements
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment
- [ ] Redis caching
- [ ] Real database (PostgreSQL)
- [ ] GraphQL API
- [ ] WebSocket for real-time updates

## Troubleshooting

### Common Issues

#### Mock API không khởi động
- Kiểm tra port 3001
- Cài đặt Mockoon CLI: `npm install -g @mockoon/cli`
- Check logs: `docker-compose logs mock-api`

#### Frontend không connect API
- Verify `.env` file: `VITE_API_BASE_URL=http://localhost:3001/api`
- Check API health: `curl http://localhost:3001/api/products`
- CORS issues: Check browser console

#### Docker build fails
- Clear cache: `docker system prune -a`
- Check disk space
- Rebuild: `docker-compose build --no-cache`

## License
MIT
