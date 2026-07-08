# Arquitectura del Sistema

## Stack Tecnológico

| Capa        | Tecnología       | Puerto |
|-------------|------------------|--------|
| Frontend    | Next.js 14 (App Router) | 3000   |
| Backend     | NestJS           | 4000   |
| Base Datos  | PostgreSQL       | 5432   |
| ORM         | TypeORM          | —      |

## Estructura del Proyecto

```
proyecto-erp/
├── backend/
│   └── src/
│       ├── database/
│       │   ├── entities/        # Entidades TypeORM (17)
│       │   ├── data-source.ts   # Conexión BD
│       │   └── seed.ts          # Datos de prueba
│       ├── modules/             # Módulos NestJS (17)
│       └── app.module.ts        # Módulo raíz
├── frontend/
│   └── src/
│       ├── app/                 # Rutas Next.js (App Router)
│       ├── components/
│       │   ├── layout/          # Sidebar, Navbar
│       │   ├── shared/          # Skeleton, ConfirmDialog
│       │   ├── charts/          # Gráficos dashboard
│       │   ├── kanban/          # Tablero proyectos
│       │   └── <modulo>/        # table.tsx, modal.tsx
│       ├── hooks/               # useTheme, useToast
│       ├── lib/
│       │   └── constants.ts     # Nav, rutas, STATUS_MAP
│       └── styles/
│           └── globals.css      # Estilos globales y animaciones
└── docs/
    ├── ARQUITECTURA.md
    ├── MODULOS.md
    ├── ENTIDADES.md
    └── GUIA_INICIO.md
```

## Patrón por Módulo

Cada módulo sigue la misma estructura:

### Backend
```
modules/<nombre>/
├── <nombre>.module.ts     # Configura NestJS + TypeORM
├── <nombre>.controller.ts # GET, POST, PUT, DELETE
└── <nombre>.service.ts    # Lógica de negocio + CRUD
```

### Frontend
```
app/<ruta>/page.tsx         # Página (maneja modales y estado)
components/<nombre>/
├── <nombre>-table.tsx      # Tabla con datos y acciones
└── <nombre>-modal.tsx      # Modal para crear/editar
```

## API REST

Todas las rutas bajo `http://localhost:4000/api/v1/`

| Método | Ruta                    | Descripción            |
|--------|------------------------|------------------------|
| GET    | /:module               | Listar (paginado)      |
| GET    | /:module/summary       | Resumen/kpis           |
| POST   | /:module               | Crear                  |
| PUT    | /:module/:id           | Actualizar             |
| DELETE | /:module/:id           | Eliminar               |

## Base de Datos

- Motor: PostgreSQL 16
- Base: `orbit_erp`
- Usuario: `postgres`
- Password: `postgres`
- Sync: `synchronize: true` (TypeORM crea tablas automáticamente)

## Seed

```bash
cd backend && npm run seed
```

Población inicial: 15 tablas, ~80 registros de prueba.
