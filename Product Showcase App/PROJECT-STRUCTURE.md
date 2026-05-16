# Project Structure

```
product-showcase/
│
├── src/                              # Source code
│   ├── app/                          # Application code
│   │   ├── components/               # React components
│   │   │   ├── figma/               # Figma-specific components
│   │   │   ├── ui/                  # UI components library
│   │   │   └── RootLayout.tsx       # Main layout with header & navigation
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── LoginPage.tsx        # Login screen
│   │   │   ├── ProductListPage.tsx  # Products list with search & filter
│   │   │   └── ProductDetailPage.tsx # Product detail view
│   │   │
│   │   ├── services/                # API & services
│   │   │   └── api.ts               # API client with all endpoints
│   │   │
│   │   ├── App.tsx                  # Root component with RouterProvider
│   │   └── routes.tsx               # React Router configuration
│   │
│   └── styles/                      # Stylesheets
│       ├── fonts.css                # Font imports
│       ├── globals.css              # Global styles
│       ├── index.css                # Entry point CSS
│       ├── tailwind.css             # Tailwind directives
│       └── theme.css                # Theme tokens & variables
│
├── mockoon-data.json                # Mockoon API configuration
├── products-data.json               # 120 products mock data
├── generate-products.js             # Script to generate product data
├── mockoon-product-handler.js       # Mockoon helper script
│
├── Dockerfile                       # Frontend Docker image
├── docker-compose.yml               # Multi-service orchestration
├── nginx.conf                       # Nginx config for SPA
│
├── .env                            # Environment variables (dev)
├── .env.example                    # Environment template
├── .dockerignore                   # Docker build exclusions
├── .gitignore                      # Git exclusions
│
├── start-dev.sh                    # Start development environment
├── stop-dev.sh                     # Stop development services
├── test-api.sh                     # API testing script
│
├── package.json                    # Dependencies & scripts
├── pnpm-lock.yaml                  # Locked dependencies
├── pnpm-workspace.yaml             # pnpm workspace config
│
├── README.md                       # Main documentation
├── QUICKSTART.md                   # Quick start guide
├── FEATURES.md                     # Features & architecture
└── PROJECT-STRUCTURE.md            # This file
```

## Key Directories

### `/src/app`
Application source code với React components, pages, và services.

### `/src/app/pages`
Các màn hình chính của ứng dụng:
- **LoginPage**: Authentication
- **ProductListPage**: Product grid với search & filter
- **ProductDetailPage**: Chi tiết sản phẩm

### `/src/app/components`
Reusable components:
- **RootLayout**: Layout wrapper với header
- **figma/**: Figma-specific utilities
- **ui/**: Radix UI components

### `/src/app/services`
Service layer cho API calls và business logic.

## Key Files

### Application Files
- `src/app/App.tsx` - Root component
- `src/app/routes.tsx` - Routing configuration
- `src/app/services/api.ts` - API client

### Mock API Files
- `mockoon-data.json` - Mockoon environment config
- `products-data.json` - Product data (120 items)
- `generate-products.js` - Data generator

### Docker Files
- `Dockerfile` - Multi-stage build for frontend
- `docker-compose.yml` - Services orchestration
- `nginx.conf` - Production web server config

### Development Tools
- `start-dev.sh` - Start all services
- `stop-dev.sh` - Stop all services
- `test-api.sh` - Test API endpoints

### Configuration Files
- `.env` - Environment variables
- `package.json` - NPM dependencies & scripts
- `pnpm-workspace.yaml` - pnpm configuration

### Documentation
- `README.md` - Main documentation
- `QUICKSTART.md` - Getting started guide
- `FEATURES.md` - Feature list & architecture
- `PROJECT-STRUCTURE.md` - This file

## Build Artifacts (Not in Git)

```
├── node_modules/          # Dependencies
├── dist/                  # Production build output
├── .vite/                 # Vite cache
└── *.log                  # Log files
```

## Docker Volumes

When running with Docker Compose:
```
├── mock-api container
│   ├── /data/mockoon-data.json    # Mounted: ./mockoon-data.json
│   └── /data/products-data.json   # Mounted: ./products-data.json
│
└── frontend container
    └── /usr/share/nginx/html      # Built files from Dockerfile
```

## Port Mapping

| Service | Container Port | Host Port | Description |
|---------|---------------|-----------|-------------|
| Frontend | 80 | 8080 | Nginx web server |
| Mock API | 3001 | 3001 | Mockoon API server |

## Environment Variables

### Development (.env)
```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

### Production (Docker)
Set in `docker-compose.yml`:
```yaml
VITE_API_BASE_URL=http://mock-api:3001/api
```

## Scripts Reference

### Package.json Scripts
```json
{
  "build": "vite build",
  "dev:api": "mockoon-cli start --data mockoon-data.json --port 3001",
  "docker:build": "docker-compose build",
  "docker:up": "docker-compose up",
  "docker:down": "docker-compose down"
}
```

### Shell Scripts
- `./start-dev.sh` - Start Mock API + wait for ready
- `./stop-dev.sh` - Kill services on port 3001
- `./test-api.sh` - Test all API endpoints

## Data Flow

```
User Browser
    ↓
React App (localhost:5173 dev / localhost:8080 prod)
    ↓
API Service (src/app/services/api.ts)
    ↓
Mock API (localhost:3001)
    ↓
Mockoon (reads mockoon-data.json + products-data.json)
    ↓
JSON Response
```

## Deployment Flow

### Development
```
Source Code → Vite Dev Server → Browser
              ↑
              └─ Proxy to Mock API (port 3001)
```

### Production (Docker)
```
Source Code → Build (Dockerfile) → Nginx Container → Browser
                                          ↑
Mock Data → Mockoon Container ───────────┘
```

## Tech Stack by Layer

### Presentation Layer
- React 18.3.1
- TypeScript
- Tailwind CSS 4.x
- Lucide Icons

### Application Layer
- React Router 7.13.0
- API Service (fetch)
- State Management (useState, useMemo)

### Data Layer
- Mock API (Mockoon)
- localStorage (auth token)
- JSON data files

### Infrastructure Layer
- Docker & Docker Compose
- Nginx (production)
- Vite (development)
- pnpm (package management)
