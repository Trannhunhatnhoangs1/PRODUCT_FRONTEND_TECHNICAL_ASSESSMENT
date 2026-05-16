#!/bin/bash

# Start development environment
echo "🚀 Starting Product Showcase Development Environment..."

# Check if mockoon-cli is installed
if ! command -v mockoon-cli &> /dev/null; then
    echo "📦 Installing Mockoon CLI..."
    npm install -g @mockoon/cli
fi

# Kill any process running on port 3001
echo "🧹 Cleaning up ports..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Start Mock API in background
echo "🔧 Starting Mock API on port 3001..."
mockoon-cli start --data mockoon-data.json --port 3001 &
MOCKOON_PID=$!

# Wait for API to be ready
echo "⏳ Waiting for Mock API to start..."
sleep 3

# Check if API is running
if curl -s http://localhost:3001/api/products > /dev/null; then
    echo "✅ Mock API is ready!"
else
    echo "❌ Failed to start Mock API"
    kill $MOCKOON_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "📝 Quick Info:"
echo "   - Mock API: http://localhost:3001/api"
echo "   - Frontend: Will start in Figma Make preview"
echo "   - Login: admin / password"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Keep script running
wait $MOCKOON_PID
