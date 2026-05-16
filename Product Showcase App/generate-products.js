const categories = ['Điện thoại', 'Laptop', 'Tablet', 'Đồng hồ', 'Tai nghe', 'Loa', 'Camera', 'Ti vi', 'Máy giặt', 'Tủ lạnh'];
const brands = ['Samsung', 'Apple', 'Xiaomi', 'Sony', 'LG', 'Dell', 'HP', 'Asus', 'Lenovo', 'Huawei'];
const adjectives = ['Pro', 'Max', 'Ultra', 'Plus', 'Premium', 'Elite', 'Advanced', 'Smart', 'Next Gen', 'Superior'];

const products = [];
for (let i = 1; i <= 120; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  products.push({
    id: i,
    name: `${brand} ${category} ${adj} ${i}`,
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=product${i}`,
    description: `Sản phẩm ${category.toLowerCase()} cao cấp từ ${brand}, mang đến trải nghiệm tuyệt vời với công nghệ tiên tiến và thiết kế hiện đại. Phù hợp cho mọi nhu cầu sử dụng hàng ngày.`,
    price: Math.floor(Math.random() * 50000000) + 1000000,
    category: category,
    brand: brand,
    stock: Math.floor(Math.random() * 100),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
  });
}

console.log(JSON.stringify(products, null, 2));
