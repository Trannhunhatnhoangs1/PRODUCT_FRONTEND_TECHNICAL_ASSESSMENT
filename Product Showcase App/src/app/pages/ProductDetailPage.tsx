import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star, Package, ShoppingCart, Heart, Sparkles, BadgeCheck, TrendingUp } from "lucide-react";
import { api, Product } from "../services/api";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true);
      const data = await api.getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError("Không thể tải thông tin sản phẩm");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="relative">
            <Package className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
            <Sparkles className="w-6 h-6 text-indigo-500 absolute top-0 right-0 animate-ping" />
          </div>
          <p className="text-gray-600 font-medium">Đang tải thông tin sản phẩm...</p>
          <p className="text-xs text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold mb-2">{error || "Không tìm thấy sản phẩm"}</p>
          <p className="text-sm text-gray-500 mb-6">Sản phẩm không tồn tại hoặc đã bị xóa</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/products")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:text-blue-600" />
        </div>
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          {/* Product Image */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  ID #{product.id}
                </p>
              </div>
              {product.rating >= 4 && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-full shadow-lg">
                  <p className="text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Best Seller
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm rounded-full font-semibold">
                  {product.category}
                </span>
                <BadgeCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 font-medium">{product.brand}</p>
            </div>

            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-lg text-gray-900">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">/ 5.0</span>
              <span className="text-sm text-gray-600 ml-auto">(128 đánh giá)</span>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Mô tả sản phẩm
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Giá bán</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {product.price.toLocaleString("vi-VN")} ₫
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Tình trạng</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
                  <p className={`text-lg font-bold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full border-2 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isFavorite 
                    ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-300 text-red-600" 
                    : "bg-white border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-600" : ""}`} />
                {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t-2 border-gray-200 p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BadgeCheck className="w-6 h-6 text-blue-600" />
            Thông tin chi tiết
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-sm text-gray-500 font-medium mb-2">ID sản phẩm</p>
              <p className="font-bold text-gray-900 text-lg">#{product.id}</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-sm text-gray-500 font-medium mb-2">Thương hiệu</p>
              <p className="font-bold text-gray-900 text-lg">{product.brand}</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-sm text-gray-500 font-medium mb-2">Danh mục</p>
              <p className="font-bold text-gray-900 text-lg">{product.category}</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-sm text-gray-500 font-medium mb-2">Đánh giá trung bình</p>
              <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                {product.rating.toFixed(1)} / 5.0
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}