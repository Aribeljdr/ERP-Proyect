# Orbit ERP

Sistema ERP moderno construido con Next.js (frontend) + NestJS (backend) + PostgreSQL.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + shadcn/ui |
| Backend | NestJS + TypeORM |
| Base de Datos | PostgreSQL 16 |
| Gráficos | Recharts + SVG inline |
| Iconos | Lucide React |

## Módulos Implementados

- **Dashboard** — KPIs, gráficos de ingresos, actividad reciente, reuniones
- **CRM** — Gestión de clientes con tabla, filtros, búsqueda y paginación
- **Proyectos (Kanban)** — Tablero drag & drop con 4 columnas
- **10+ módulos adicionales** preparados para implementación futura

## Inicio Rápido

### 1. Base de Datos (Docker)
```bash
docker compose up -d
```

### 2. Backend
```bash
cd backend
npm install
npm run start:dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Poblar datos de prueba
```bash
cd backend
npm run seed
```

## Credenciales por Defecto

- **Email:** maria@orbiterp.com
- **Password:** admin123

## Puertos

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Prefix: `/api/v1`
- pgAdmin: http://localhost:5050 (admin@orbiterp.com / admin123)
- PostgreSQL: localhost:5432 (orbit / orbit_secret_2026)

## Diseño

El diseño replica fielmente el sistema Orbit ERP original con:
- Sidebar colapsable con 6 grupos de navegación
- Barra superior con búsqueda, tema oscuro/claro y selector de organización
- Paleta de comandos (⌘K)
- Notificaciones toast
- Tema claro/oscuro con persistencia en localStorage
- Gráficos SVG inline (área, dona, barras) con gradientes
