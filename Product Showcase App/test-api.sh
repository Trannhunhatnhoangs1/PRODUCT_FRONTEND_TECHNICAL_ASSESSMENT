#!/bin/bash

echo "🧪 Testing Product Showcase Mock API..."
echo ""

API_URL="http://localhost:3001/api"

# Test 1: Health check - Get all products
echo "Test 1: GET /api/product"
response=$(curl -s -w "\n%{http_code}" $API_URL/product)
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 200 ]; then
    product_count=$(echo "$body" | jq '. | length')
    echo "✅ Success - Found $product_count products"
else
    echo "❌ Failed - Status code: $status_code"
fi
echo ""

# Test 2: Get single product
echo "Test 2: GET /api/product/1"
response=$(curl -s -w "\n%{http_code}" $API_URL/product/1)
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 200 ]; then
    product_name=$(echo "$body" | jq -r '.name')
    echo "✅ Success - Product: $product_name"
else
    echo "❌ Failed - Status code: $status_code"
fi
echo ""

# Test 3: Login
echo "Test 3: POST /api/login"
response=$(curl -s -w "\n%{http_code}" -X POST $API_URL/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}')
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

if [ "$status_code" -eq 200 ]; then
    token=$(echo "$body" | jq -r '.token')
    username=$(echo "$body" | jq -r '.user.username')
    echo "✅ Success - Logged in as $username"
    echo "   Token: ${token:0:30}..."
else
    echo "❌ Failed - Status code: $status_code"
fi
echo ""

# Test 4: Logout
echo "Test 4: POST /api/logout"
response=$(curl -s -w "\n%{http_code}" -X POST $API_URL/logout)
status_code=$(echo "$response" | tail -n 1)

if [ "$status_code" -eq 200 ]; then
    echo "✅ Success - Logged out"
else
    echo "❌ Failed - Status code: $status_code"
fi
echo ""

echo "✨ API Testing Complete!"