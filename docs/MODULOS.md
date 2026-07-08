# Módulos del Sistema

## 1. Generales

| Ruta        | Descripción    | Backend | Frontend | CRUD |
|-------------|----------------|---------|----------|------|
| `/dashboard` | Panel principal | ✓      | ✓        | —    |

## 2. Ventas

| Ruta         | Descripción       | Backend | Frontend | CRUD |
|--------------|-------------------|---------|----------|------|
| `/crm`       | CRM · Clientes    | ✓       | ✓        | ✓    |
| `/sales`     | Órdenes de venta  | ✓       | ✓        | ✓    |
| `/invoicing` | Facturación       | ✓       | ✓        | ✓    |

## 3. Operaciones

| Ruta         | Descripción     | Backend | Frontend | CRUD |
|--------------|-----------------|---------|----------|------|
| `/purchases` | Compras         | ✓       | ✓        | ✓    |
| `/inventory` | Inventario      | ✓       | ✓        | ✓    |
| `/projects`  | Kanban proyectos| ✓       | ✓        | —    |
| `/tickets`   | Tickets/soporte | ✓       | ✓        | ✓    |

## 4. Marketing

| Ruta              | Descripción       | Backend | Frontend | CRUD |
|-------------------|-------------------|---------|----------|------|
| `/campaigns`      | Campañas          | ✓       | ✓        | ✓    |
| `/email-templates`| Plantillas email  | ✓       | ✓        | ✓    |
| `/landing-pages`  | Landing pages     | ✓       | ✓        | ✓    |

## 5. Finanzas

| Ruta         | Descripción      | Backend | Frontend | CRUD |
|--------------|------------------|---------|----------|------|
| `/expenses`  | Gastos           | ✓       | ✓        | ✓    |
| `/treasury`  | Tesorería        | ✓       | ✓        | ✓    |
| `/accounting`| Contabilidad     | ✓       | ✓        | ✓    |

## 6. Equipo

| Ruta         | Descripción    | Backend | Frontend | CRUD |
|--------------|----------------|---------|----------|------|
| `/employees` | Empleados      | ✓       | ✓        | ✓    |
| `/payroll`   | Nómina         | ✓       | ✓        | ✓    |
| `/attendance`| Asistencia     | ✓       | ✓        | ✓    |
| `/docs`      | Documentos     | ✓       | ✓        | ✓    |

## 7. Sistema

| Ruta       | Descripción    | Backend | Frontend | CRUD |
|------------|----------------|---------|----------|------|
| `/reports` | Reportes       | —       | ✓        | —    |
| `/settings`| Configuración  | —       | ✓        | —    |

**Total: 20 módulos** (17 con backend completo + 3 páginas de sistema)

> Todos los módulos con backend incluyen CRUD completo (GET/POST/PUT/DELETE), modal de creación/edición con formularios, diálogo de confirmación para eliminación, tabla con paginación y filtros, y esqueleto de carga tipo shimmer (1s mínimo) al navegar.
