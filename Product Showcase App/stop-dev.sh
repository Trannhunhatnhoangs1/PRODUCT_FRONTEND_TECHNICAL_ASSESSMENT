#!/bin/bash

echo "🛑 Stopping Product Showcase Development Environment..."

# Kill processes on port 3001 (Mock API)
echo "🧹 Stopping Mock API..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "✅ All services stopped!"
