// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
  };
}

// --- Mock data (fallback khi Mockoon chưa chạy) ---
const CATEGORIES = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Thể thao", "Mỹ phẩm", "Đồ chơi", "Thực phẩm"];
const BRANDS = ["Samsung", "Apple", "Sony", "LG", "Nike", "Adidas", "Unilever", "Vinamilk", "Casio", "Canon"];
const ADJECTIVES = ["Cao cấp", "Thông minh", "Hiện đại", "Bền vững", "Nhỏ gọn", "Chuyên nghiệp", "Đa năng", "Siêu mỏng"];
const NOUNS = ["Pro", "Max", "Lite", "Ultra", "Plus", "Elite", "Edition", "Series"];

function generateMockProducts(): Product[] {
  return Array.from({ length: 120 }, (_, i) => {
    const id = i + 1;
    const category = CATEGORIES[i % CATEGORIES.length];
    const brand = BRANDS[i % BRANDS.length];
    const adj = ADJECTIVES[i % ADJECTIVES.length];
    const noun = NOUNS[i % NOUNS.length];
    const seed = `product-${id}-${brand.toLowerCase()}`;
    return {
      id,
      name: `${brand} ${adj} ${noun} ${id}`,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1f4d9,ffd5dc,ffdfbf`,
      description: `${adj} ${category.toLowerCase()} từ ${brand}. Sản phẩm số ${id} với thiết kế ${adj.toLowerCase()}, phù hợp cho mọi nhu cầu sử dụng hàng ngày. Chất lượng ${brand} đảm bảo độ bền và hiệu năng tối ưu.`,
      price: Math.round((49000 + (id * 37891) % 9500000) / 1000) * 1000,
      category,
      brand,
      stock: (id * 13) % 200,
      rating: Math.round(((id * 7) % 20 + 30)) / 10,
    };
  });
}

const MOCK_PRODUCTS = generateMockProducts();

// --- API service ---
class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch {
      const { username, password } = credentials;
      if (username === "admin" && password === "password") {
        const mockData: LoginResponse = {
          token: "mock-jwt-token-" + Date.now(),
          user: { id: 1, username: "admin", name: "Admin User" },
        };
        localStorage.setItem("token", mockData.token);
        return mockData;
      }
      throw new Error("Sai tên đăng nhập hoặc mật khẩu");
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: this.getHeaders(),
      });
    } catch {
      // ignore network error on logout
    } finally {
      localStorage.removeItem("token");
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      // Ensure we return an array
      return Array.isArray(data) ? data : MOCK_PRODUCTS;
    } catch (error) {
      console.warn("API failed, using mock data:", error);
      return MOCK_PRODUCTS;
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    } catch (error) {
      console.warn("API failed, using mock data for product:", id, error);
      // Fallback to mock data
      const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));
      if (!product) {
        // If product not found in mock data, throw a more specific error
        throw new Error(`Product with ID ${id} not found in mock data`);
      }
      return product;
    }
  }
}

export const api = new ApiService();