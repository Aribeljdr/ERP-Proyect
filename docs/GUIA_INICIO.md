# Guía de Inicio Rápido

## Requisitos

- Node.js 20+
- PostgreSQL 16+
- npm

## Instalación

```bash
# 1. Backend
cd backend
npm install

# 2. Frontend
cd ../frontend
npm install
```

## Base de Datos

```bash
# Crear la base de datos en PostgreSQL
psql -U postgres -c "CREATE DATABASE orbit_erp;"
```

## Seed (poblar datos de prueba)

```bash
cd backend
npm run seed
```

## Ejecutar

### Backend (puerto 4000)
```bash
cd backend
npm run start:dev
```

### Frontend (puerto 3000)
```bash
cd frontend
npx next dev -p 3000
```

## Credenciales

| Usuario              | Password  | Rol            |
|----------------------|-----------|----------------|
| maria@orbiterp.com   | admin123  | Administrador  |

## Comandos Útiles

```bash
# Re-poblar base de datos
cd backend && npm run seed

# Compilar backend
cd backend && npm run build

# Compilar frontend
cd frontend && npm run build
```

## Estructura de Rutas

Todas las rutas frontend usan el App Router de Next.js 14. Cada carpeta dentro de `app/` corresponde a una ruta. Las páginas son `page.tsx` y los componentes se encuentran en `components/`.
