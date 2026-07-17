import { openDB, IDBPDatabase } from 'idb';

type StoreName =
  | 'kpis' | 'activities' | 'meetings' | 'clients' | 'kanbanCards'
  | 'salesOrders' | 'invoices' | 'purchaseOrders' | 'products' | 'tickets'
  | 'campaigns' | 'emailTemplates' | 'landingPages' | 'employees'
  | 'payrollRecords' | 'attendanceRecords' | 'expenses' | 'treasuryMovements'
  | 'journalEntries' | 'documents';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB('orbit-erp-db', 1, {
      upgrade(db) {
        for (const store of [
          'kpis', 'activities', 'meetings', 'clients', 'kanbanCards',
          'salesOrders', 'invoices', 'purchaseOrders', 'products', 'tickets',
          'campaigns', 'emailTemplates', 'landingPages', 'employees',
          'payrollRecords', 'attendanceRecords', 'expenses', 'treasuryMovements',
          'journalEntries', 'documents',
        ]) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
          }
        }
      },
    });
  }
  return dbPromise;
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await getDb();
  return db.getAll(store);
}

export async function getById<T>(store: StoreName, id: number): Promise<T | undefined> {
  const db = await getDb();
  return db.get(store, id);
}

export async function create<T extends Record<string, unknown>>(store: StoreName, data: T): Promise<number> {
  const db = await getDb();
  return db.add(store, { ...data, id: undefined }) as Promise<number>;
}

export async function update<T extends Record<string, unknown>>(store: StoreName, id: number, data: T): Promise<void> {
  const db = await getDb();
  await db.put(store, { ...data, id });
}

export async function remove(store: StoreName, id: number): Promise<void> {
  const db = await getDb();
  await db.delete(store, id);
}

export async function getCount(store: StoreName): Promise<number> {
  const db = await getDb();
  return db.count(store);
}

export async function query<T>(store: StoreName, predicate: (item: T) => boolean): Promise<T[]> {
  const all = await getAll<T>(store);
  return all.filter(predicate);
}

async function isSeeded(): Promise<boolean> {
  const db = await getDb();
  const count = await db.count('kpis');
  return count > 0;
}

export async function seedDatabase(): Promise<void> {
  if (await isSeeded()) return;
  const db = await getDb();
  const tx = db.transaction([
    'kpis', 'activities', 'meetings', 'clients', 'kanbanCards',
    'salesOrders', 'invoices', 'purchaseOrders', 'products', 'tickets',
    'campaigns', 'emailTemplates', 'landingPages', 'employees',
    'payrollRecords', 'attendanceRecords', 'expenses', 'treasuryMovements',
    'journalEntries', 'documents',
  ], 'readwrite');

  void Promise.all([
    tx.objectStore('kpis').add({ label: 'Ingresos', value: '$284,920', delta: '12.4%', good: true, down: false, icon: 'dollar', accent: '#2563EB', tint: 'rgba(37,99,235,.1)' }),
    tx.objectStore('kpis').add({ label: 'Ventas', value: '1,842', delta: '8.1%', good: true, down: false, icon: 'cart', accent: '#4F46E5', tint: 'rgba(79,70,229,.1)' }),
    tx.objectStore('kpis').add({ label: 'Facturas', value: '326', delta: '3.2%', good: true, down: false, icon: 'invoice', accent: '#0EA5E9', tint: 'rgba(14,165,233,.1)' }),
    tx.objectStore('kpis').add({ label: 'Clientes activos', value: '2,481', delta: '5.7%', good: true, down: false, icon: 'users', accent: '#22C55E', tint: 'rgba(34,197,94,.1)' }),
    tx.objectStore('kpis').add({ label: 'Proyectos', value: '48', delta: '4', good: true, down: false, icon: 'projects', accent: '#8B5CF6', tint: 'rgba(139,92,246,.1)' }),
    tx.objectStore('kpis').add({ label: 'Tickets', value: '19', delta: '14%', good: true, down: true, icon: 'tickets', accent: '#F59E0B', tint: 'rgba(245,158,11,.1)' }),
    tx.objectStore('kpis').add({ label: 'Inventario', value: '94%', delta: '1.2%', good: true, down: false, icon: 'inventory', accent: '#14B8A6', tint: 'rgba(20,184,166,.1)' }),
    tx.objectStore('kpis').add({ label: 'Cobros pendientes', value: '$38,410', delta: '9.4%', good: false, down: false, icon: 'finance', accent: '#EF4444', tint: 'rgba(239,68,68,.1)' }),
    tx.objectStore('activities').add({ who: 'Laura M.', what: 'creó la factura #INV-2041', when: 'Hace 5 min', icon: 'invoice', color: '#2563EB', tint: 'rgba(37,99,235,.1)' }),
    tx.objectStore('activities').add({ who: 'Diego R.', what: 'cerró el trato con Nexus Ltd.', when: 'Hace 22 min', icon: 'check', color: '#22C55E', tint: 'rgba(34,197,94,.1)' }),
    tx.objectStore('activities').add({ who: 'Sistema', what: 'stock bajo en "Teclado Pro"', when: 'Hace 1 h', icon: 'inventory', color: '#F59E0B', tint: 'rgba(245,158,11,.1)' }),
    tx.objectStore('activities').add({ who: 'Ana P.', what: 'agregó 3 nuevos leads', when: 'Hace 2 h', icon: 'users', color: '#4F46E5', tint: 'rgba(79,70,229,.1)' }),
    tx.objectStore('activities').add({ who: 'Carlos V.', what: 'respondió al ticket #882', when: 'Hace 3 h', icon: 'tickets', color: '#0EA5E9', tint: 'rgba(14,165,233,.1)' }),
    tx.objectStore('meetings').add({ time: '09:30', ampm: 'AM', title: 'Sprint planning', sub: 'Equipo de producto · Zoom', color: '#2563EB' }),
    tx.objectStore('meetings').add({ time: '11:00', ampm: 'AM', title: 'Demo cliente Acme', sub: 'Ventas · Sala Marte', color: '#4F46E5' }),
    tx.objectStore('meetings').add({ time: '02:15', ampm: 'PM', title: 'Revisión financiera Q3', sub: 'Finanzas · Presencial', color: '#22C55E' }),
    tx.objectStore('meetings').add({ time: '04:00', ampm: 'PM', title: '1:1 con dirección', sub: 'RRHH · Meet', color: '#F59E0B' }),
  ]);

  const clients = [
    { name: 'Sofía Márquez', company: 'Nexus Technologies', status: 'active', value: 48200, progress: 82, initials: 'SM', avColor: '#2563EB', owner: 'AL', ownerName: 'A. López' },
    { name: 'Ricardo Peña', company: 'Vertex Digital', status: 'lead', value: 12900, progress: 34, initials: 'RP', avColor: '#8B5CF6', owner: 'JM', ownerName: 'J. Moreno' },
    { name: 'Elena Torres', company: 'Bright Labs', status: 'active', value: 96540, progress: 91, initials: 'ET', avColor: '#22C55E', owner: 'SR', ownerName: 'S. Ruiz' },
    { name: 'Marco Díaz', company: 'Quantum SA', status: 'pending', value: 27300, progress: 58, initials: 'MD', avColor: '#F59E0B', owner: 'AL', ownerName: 'A. López' },
    { name: 'Julia Fernández', company: 'Orbit Media', status: 'lead', value: 8750, progress: 22, initials: 'JF', avColor: '#EF4444', owner: 'JM', ownerName: 'J. Moreno' },
    { name: 'Andrés Gómez', company: 'Helix Corp', status: 'active', value: 61120, progress: 76, initials: 'AG', avColor: '#0EA5E9', owner: 'SR', ownerName: 'S. Ruiz' },
    { name: 'Paola Vega', company: 'Delta Systems', status: 'inactive', value: 3400, progress: 12, initials: 'PV', avColor: '#64748B', owner: 'AL', ownerName: 'A. López' },
    { name: 'Tomás Herrera', company: 'Aurora Retail', status: 'active', value: 54880, progress: 68, initials: 'TH', avColor: '#14B8A6', owner: 'JM', ownerName: 'J. Moreno' },
  ];
  for (const c of clients) tx.objectStore('clients').add(c);

  const kanbanCards = [
    { title: 'Investigación de usuarios para onboarding', tag: 'Research', priority: 'Baja', assignee: 'JM', avColor: '#22C55E', comments: 3, due: '12 Jul', progress: 0, columnKey: 'backlog', sortOrder: 0 },
    { title: 'Definir arquitectura de información', tag: 'Diseño', priority: 'Media', assignee: 'AL', avColor: '#2563EB', comments: 1, due: '15 Jul', progress: 0, columnKey: 'backlog', sortOrder: 1 },
    { title: 'Diseñar sistema de componentes en Figma', tag: 'Diseño', priority: 'Alta', assignee: 'SR', avColor: '#F59E0B', comments: 8, due: '08 Jul', progress: 65, columnKey: 'progress', sortOrder: 0 },
    { title: 'Integrar API de pagos con Stripe', tag: 'Backend', priority: 'Alta', assignee: 'AL', avColor: '#2563EB', comments: 5, due: '10 Jul', progress: 40, columnKey: 'progress', sortOrder: 1 },
    { title: 'Revisar flujo de checkout móvil', tag: 'QA', priority: 'Media', assignee: 'JM', avColor: '#22C55E', comments: 2, due: '06 Jul', progress: 90, columnKey: 'review', sortOrder: 0 },
    { title: 'Wireframes de dashboard principal', tag: 'Diseño', priority: 'Media', assignee: 'SR', avColor: '#F59E0B', comments: 4, due: '01 Jul', progress: 100, columnKey: 'done', sortOrder: 0 },
    { title: 'Setup del proyecto y CI/CD', tag: 'DevOps', priority: 'Alta', assignee: 'AL', avColor: '#2563EB', comments: 0, due: '28 Jun', progress: 100, columnKey: 'done', sortOrder: 1 },
  ];
  for (const c of kanbanCards) tx.objectStore('kanbanCards').add(c);

  const salesOrders = [
    { orderNumber: 'ORD-001', clientName: 'Sofía Márquez', clientCompany: 'Nexus Technologies', total: 48200, status: 'completed', itemsCount: 3 },
    { orderNumber: 'ORD-002', clientName: 'Elena Torres', clientCompany: 'Bright Labs', total: 12500, status: 'completed', itemsCount: 2 },
    { orderNumber: 'ORD-003', clientName: 'Andrés Gómez', clientCompany: 'Helix Corp', total: 8700, status: 'pending', itemsCount: 1 },
    { orderNumber: 'ORD-004', clientName: 'Marco Díaz', clientCompany: 'Quantum SA', total: 34000, status: 'completed', itemsCount: 5 },
    { orderNumber: 'ORD-005', clientName: 'Tomás Herrera', clientCompany: 'Aurora Retail', total: 6200, status: 'pending', itemsCount: 2 },
    { orderNumber: 'ORD-006', clientName: 'Ricardo Peña', clientCompany: 'Vertex Digital', total: 18900, status: 'cancelled', itemsCount: 2 },
  ];
  for (const s of salesOrders) tx.objectStore('salesOrders').add(s);

  const invoices = [
    { invoiceNumber: 'INV-001', clientName: 'Sofía Márquez', clientCompany: 'Nexus Technologies', total: 48200, status: 'paid', issuedAt: '2026-06-01', dueAt: '2026-06-15' },
    { invoiceNumber: 'INV-002', clientName: 'Elena Torres', clientCompany: 'Bright Labs', total: 12500, status: 'paid', issuedAt: '2026-06-05', dueAt: '2026-06-20' },
    { invoiceNumber: 'INV-003', clientName: 'Andrés Gómez', clientCompany: 'Helix Corp', total: 8700, status: 'issued', issuedAt: '2026-06-10', dueAt: '2026-06-25' },
    { invoiceNumber: 'INV-004', clientName: 'Marco Díaz', clientCompany: 'Quantum SA', total: 34000, status: 'overdue', issuedAt: '2026-05-15', dueAt: '2026-05-30' },
    { invoiceNumber: 'INV-005', clientName: 'Tomás Herrera', clientCompany: 'Aurora Retail', total: 6200, status: 'issued', issuedAt: '2026-06-12', dueAt: '2026-06-28' },
    { invoiceNumber: 'INV-006', clientName: 'Julia Fernández', clientCompany: 'Orbit Media', total: 8750, status: 'cancelled', issuedAt: '2026-06-08', dueAt: '2026-06-22' },
  ];
  for (const i of invoices) tx.objectStore('invoices').add(i);

  const purchaseOrders = [
    { orderNumber: 'PO-001', supplierName: 'Distribuidora Norte SA', total: 15200, status: 'received', itemsCount: 4 },
    { orderNumber: 'PO-002', supplierName: 'Tecnología Global MX', total: 28400, status: 'pending', itemsCount: 6 },
    { orderNumber: 'PO-003', supplierName: 'Office Depot', total: 3200, status: 'received', itemsCount: 2 },
    { orderNumber: 'PO-004', supplierName: 'Proveedor Industrial XYZ', total: 8900, status: 'pending', itemsCount: 3 },
  ];
  for (const p of purchaseOrders) tx.objectStore('purchaseOrders').add(p);

  const products = [
    { code: 'PRO-001', name: 'Laptop Pro 15"', category: 'Electrónica', stock: 24, minStock: 10, price: 28500 },
    { code: 'PRO-002', name: 'Monitor 27" 4K', category: 'Electrónica', stock: 15, minStock: 8, price: 8900 },
    { code: 'PRO-003', name: 'Teclado Mecánico RGB', category: 'Periféricos', stock: 3, minStock: 10, price: 2450 },
    { code: 'PRO-004', name: 'Mouse Inalámbrico', category: 'Periféricos', stock: 42, minStock: 15, price: 1200 },
    { code: 'PRO-005', name: 'Escritorio Eléctrico', category: 'Muebles', stock: 7, minStock: 5, price: 12500 },
    { code: 'PRO-006', name: 'Silla Ergonómica', category: 'Muebles', stock: 2, minStock: 8, price: 18900 },
    { code: 'PRO-007', name: 'Webcam 4K', category: 'Periféricos', stock: 18, minStock: 6, price: 3200 },
    { code: 'PRO-008', name: 'Hub USB-C', category: 'Accesorios', stock: 55, minStock: 20, price: 850 },
  ];
  for (const p of products) tx.objectStore('products').add(p);

  const tickets = [
    { title: 'Error al generar factura PDF', clientName: 'Sofía Márquez', status: 'open', priority: 'alta', assignedTo: 'A. López', commentsCount: 3 },
    { title: 'Solicitud de nuevo reporte de ventas', clientName: 'Elena Torres', status: 'in_progress', priority: 'media', assignedTo: 'J. Moreno', commentsCount: 5 },
    { title: 'Problema con login de usuario', clientName: 'Marco Díaz', status: 'open', priority: 'alta', assignedTo: 'S. Ruiz', commentsCount: 2 },
    { title: 'Actualizar datos fiscales', clientName: 'Andrés Gómez', status: 'resolved', priority: 'baja', assignedTo: 'A. López', commentsCount: 1 },
    { title: 'Integración con API de pagos fallida', clientName: 'Tomás Herrera', status: 'in_progress', priority: 'alta', assignedTo: 'S. Ruiz', commentsCount: 7 },
    { title: 'Solicitud de capacitación del sistema', clientName: 'Paola Vega', status: 'open', priority: 'baja', assignedTo: 'J. Moreno', commentsCount: 0 },
  ];
  for (const t of tickets) tx.objectStore('tickets').add(t);

  const campaigns = [
    { name: 'Lanzamiento Q3 Productos Beta', type: 'email', status: 'active', sentCount: 2800, openRate: 42.5, clickRate: 18.3, budget: 35000 },
    { name: 'Campaña Redes Sociales Julio', type: 'social', status: 'active', sentCount: 15000, openRate: 28.1, clickRate: 8.7, budget: 12000 },
    { name: 'Email Marketing — Newsletters', type: 'email', status: 'active', sentCount: 8200, openRate: 35.8, clickRate: 12.4, budget: 8000 },
    { name: 'Ads Google — Retargeting', type: 'ads', status: 'draft', sentCount: 0, openRate: 0, clickRate: 0, budget: 25000 },
    { name: 'Campaña Back to School', type: 'social', status: 'completed', sentCount: 22000, openRate: 31.2, clickRate: 9.1, budget: 18000 },
    { name: 'Webinar Automatización ERP', type: 'email', status: 'completed', sentCount: 4200, openRate: 48.9, clickRate: 22.5, budget: 5000 },
  ];
  for (const c of campaigns) tx.objectStore('campaigns').add(c);

  const emailTemplates = [
    { name: 'Bienvenida nuevo cliente', subject: '¡Bienvenido a Orbit ERP!', category: 'onboarding', status: 'active', opensCount: 1840 },
    { name: 'Recordatorio de factura', subject: 'Tu factura está por vencer', category: 'facturación', status: 'active', opensCount: 920 },
    { name: 'Newsletter mensual', subject: 'Novedades de Orbit — Julio 2026', category: 'marketing', status: 'draft', opensCount: 0 },
    { name: 'Recuperación de carrito', subject: 'Completa tu compra pendiente', category: 'ventas', status: 'active', opensCount: 645 },
    { name: 'Encuesta de satisfacción', subject: '¿Qué tal tu experiencia con Orbit?', category: 'customer', status: 'archive', opensCount: 310 },
  ];
  for (const t of emailTemplates) tx.objectStore('emailTemplates').add(t);

  const landingPages = [
    { title: 'Demo Orbit ERP', slug: 'demo-orbit-erp', status: 'published', viewsCount: 3400, conversionRate: 24.5 },
    { title: 'Precios Enterprise', slug: 'precios-enterprise', status: 'published', viewsCount: 2100, conversionRate: 18.2 },
    { title: 'Webinar Automatización', slug: 'webinar-automatizacion', status: 'published', viewsCount: 4800, conversionRate: 31.8 },
    { title: 'Guía Migración ERP', slug: 'guia-migracion-erp', status: 'draft', viewsCount: 0, conversionRate: 0 },
    { title: 'Landing — Oferta Q3', slug: 'oferta-q3', status: 'published', viewsCount: 1200, conversionRate: 12.4 },
  ];
  for (const l of landingPages) tx.objectStore('landingPages').add(l);

  const employees = [
    { firstName: 'Ana', lastName: 'Pérez', email: 'ana@orbiterp.com', position: 'Desarrolladora Senior', department: 'Ingeniería', status: 'active', salary: 65000, hireDate: '2024-03-15' },
    { firstName: 'Carlos', lastName: 'Vega', email: 'carlos@orbiterp.com', position: 'Diseñador UX', department: 'Diseño', status: 'active', salary: 52000, hireDate: '2024-06-01' },
    { firstName: 'Laura', lastName: 'Mendoza', email: 'laura@orbiterp.com', position: 'Product Manager', department: 'Producto', status: 'active', salary: 72000, hireDate: '2023-11-20' },
    { firstName: 'Diego', lastName: 'Ríos', email: 'diego@orbiterp.com', position: 'DevOps Engineer', department: 'Ingeniería', status: 'active', salary: 68000, hireDate: '2024-01-10' },
    { firstName: 'Sofía', lastName: 'Luna', email: 'sofia@orbiterp.com', position: 'Marketing Specialist', department: 'Marketing', status: 'active', salary: 48000, hireDate: '2024-08-05' },
    { firstName: 'Miguel', lastName: 'Torres', email: 'miguel@orbiterp.com', position: 'Soporte Técnico', department: 'Soporte', status: 'on_leave', salary: 35000, hireDate: '2024-09-01' },
    { firstName: 'Elena', lastName: 'Cruz', email: 'elena@orbiterp.com', position: 'HR Manager', department: 'RRHH', status: 'active', salary: 55000, hireDate: '2023-10-15' },
    { firstName: 'Jorge', lastName: 'Navarro', email: 'jorge@orbiterp.com', position: 'Data Analyst', department: 'Datos', status: 'active', salary: 58000, hireDate: '2024-04-22' },
  ];
  for (const e of employees) tx.objectStore('employees').add(e);

  const payrollRecords = [
    { employeeName: 'Ana Pérez', period: 'Junio 2026', grossSalary: 65000, deductions: 12450, netPay: 52550, status: 'paid' },
    { employeeName: 'Carlos Vega', period: 'Junio 2026', grossSalary: 52000, deductions: 9880, netPay: 42120, status: 'paid' },
    { employeeName: 'Laura Mendoza', period: 'Junio 2026', grossSalary: 72000, deductions: 15360, netPay: 56640, status: 'paid' },
    { employeeName: 'Diego Ríos', period: 'Junio 2026', grossSalary: 68000, deductions: 12920, netPay: 55080, status: 'paid' },
    { employeeName: 'Sofía Luna', period: 'Junio 2026', grossSalary: 48000, deductions: 9120, netPay: 38880, status: 'pending' },
    { employeeName: 'Elena Cruz', period: 'Junio 2026', grossSalary: 55000, deductions: 10450, netPay: 44550, status: 'pending' },
  ];
  for (const p of payrollRecords) tx.objectStore('payrollRecords').add(p);

  const attendanceRecords = [
    { employeeName: 'Ana Pérez', date: '2026-07-01', checkIn: '08:55', checkOut: '18:02', status: 'present' },
    { employeeName: 'Carlos Vega', date: '2026-07-01', checkIn: '09:30', checkOut: '18:15', status: 'late' },
    { employeeName: 'Laura Mendoza', date: '2026-07-01', checkIn: '08:50', checkOut: '17:45', status: 'present' },
    { employeeName: 'Diego Ríos', date: '2026-07-01', checkIn: '08:30', checkOut: '17:30', status: 'present' },
    { employeeName: 'Sofía Luna', date: '2026-07-01', checkIn: '09:05', checkOut: '18:00', status: 'present' },
    { employeeName: 'Miguel Torres', date: '2026-07-01', checkIn: undefined, checkOut: undefined, status: 'absent' },
    { employeeName: 'Elena Cruz', date: '2026-07-01', checkIn: '08:40', checkOut: '17:50', status: 'present' },
    { employeeName: 'Jorge Navarro', date: '2026-07-01', checkIn: '09:15', checkOut: '18:20', status: 'late' },
    { employeeName: 'Ana Pérez', date: '2026-07-02', checkIn: '08:58', checkOut: '18:05', status: 'present' },
    { employeeName: 'Carlos Vega', date: '2026-07-02', checkIn: '09:00', checkOut: '18:10', status: 'present' },
  ];
  for (const a of attendanceRecords) tx.objectStore('attendanceRecords').add(a);

  const expenses = [
    { description: 'Servicio AWS — Infraestructura Q3', amount: 12400, category: 'Tecnología', date: '2026-07-01', paymentMethod: 'transfer', status: 'paid' },
    { description: 'Suscripción Office 365 (12 meses)', amount: 3600, category: 'Tecnología', date: '2026-07-02', paymentMethod: 'card', status: 'paid' },
    { description: 'Material de oficina — Julio', amount: 840, category: 'Oficina', date: '2026-07-03', paymentMethod: 'cash', status: 'paid' },
    { description: 'Campaña Google Ads Julio', amount: 8500, category: 'Marketing', date: '2026-07-05', paymentMethod: 'transfer', status: 'pending' },
    { description: 'Consultoría legal — Contratos', amount: 4200, category: 'Servicios', date: '2026-07-06', paymentMethod: 'transfer', status: 'pending' },
    { description: 'Renta oficinas — Julio', amount: 18000, category: 'Inmuebles', date: '2026-07-01', paymentMethod: 'transfer', status: 'paid' },
    { description: 'Capacitación equipo — Curso Cloud', amount: 3200, category: 'Capacitación', date: '2026-07-08', paymentMethod: 'card', status: 'paid' },
  ];
  for (const e of expenses) tx.objectStore('expenses').add(e);

  const treasuryMovements = [
    { concept: 'Pago cliente — Nexus Technologies', type: 'income', amount: 48200, date: '2026-07-01', category: 'Ventas', status: 'completed' },
    { concept: 'Pago cliente — Bright Labs', type: 'income', amount: 12500, date: '2026-07-03', category: 'Ventas', status: 'completed' },
    { concept: 'Renta oficinas Julio', type: 'expense', amount: 18000, date: '2026-07-01', category: 'Inmuebles', status: 'completed' },
    { concept: 'Servicio AWS Infraestructura', type: 'expense', amount: 12400, date: '2026-07-02', category: 'Tecnología', status: 'completed' },
    { concept: 'Pago cliente — Helix Corp', type: 'income', amount: 8700, date: '2026-07-05', category: 'Ventas', status: 'pending' },
    { concept: 'Campaña Google Ads Julio', type: 'expense', amount: 8500, date: '2026-07-05', category: 'Marketing', status: 'pending' },
    { concept: 'Pago cliente — Aurora Retail', type: 'income', amount: 6200, date: '2026-07-07', category: 'Ventas', status: 'pending' },
  ];
  for (const t of treasuryMovements) tx.objectStore('treasuryMovements').add(t);

  const journalEntries = [
    { description: 'Venta ORD-001 — Nexus Technologies', entryType: 'debit', amount: 48200, account: 'Cuentas por Cobrar', date: '2026-07-01', reference: 'ORD-001' },
    { description: 'Venta ORD-001 — Ingreso por venta', entryType: 'credit', amount: 48200, account: 'Ingresos', date: '2026-07-01', reference: 'ORD-001' },
    { description: 'Pago renta oficinas Julio', entryType: 'debit', amount: 18000, account: 'Gastos Operativos', date: '2026-07-01', reference: 'RENT-001' },
    { description: 'Pago renta oficinas Julio', entryType: 'credit', amount: 18000, account: 'Banco', date: '2026-07-01', reference: 'RENT-001' },
    { description: 'Venta ORD-004 — Quantum SA', entryType: 'debit', amount: 34000, account: 'Cuentas por Cobrar', date: '2026-07-02', reference: 'ORD-004' },
    { description: 'Venta ORD-004 — Ingreso por venta', entryType: 'credit', amount: 34000, account: 'Ingresos', date: '2026-07-02', reference: 'ORD-004' },
    { description: 'Pago AWS Infraestructura', entryType: 'debit', amount: 12400, account: 'Gastos Tecnología', date: '2026-07-02', reference: 'AWS-001' },
    { description: 'Pago AWS Infraestructura', entryType: 'credit', amount: 12400, account: 'Banco', date: '2026-07-02', reference: 'AWS-001' },
  ];
  for (const j of journalEntries) tx.objectStore('journalEntries').add(j);

  const documents = [
    { name: 'Contrato Marco Nexus 2026.pdf', type: 'pdf', category: 'Contratos', size: '2.4 MB', uploadedBy: 'Elena Cruz' },
    { name: 'Reporte Financiero Q2.xlsx', type: 'xlsx', category: 'Finanzas', size: '1.1 MB', uploadedBy: 'Jorge Navarro' },
    { name: 'Manual de onboarding.docx', type: 'docx', category: 'RRHH', size: '3.8 MB', uploadedBy: 'Elena Cruz' },
    { name: 'Propuesta Comercial Bright Labs.pdf', type: 'pdf', category: 'Ventas', size: '5.2 MB', uploadedBy: 'A. López' },
    { name: 'Políticas de Seguridad v3.pdf', type: 'pdf', category: 'Legal', size: '0.9 MB', uploadedBy: 'Elena Cruz' },
    { name: 'Backup Base de Datos Julio.sql', type: 'sql', category: 'TI', size: '12.5 MB', uploadedBy: 'Diego Ríos' },
    { name: 'Plantilla Factura Orbit.dotx', type: 'docx', category: 'Plantillas', size: '0.5 MB', uploadedBy: 'Laura Mendoza' },
    { name: 'Dashboard Power BI Ventas.pbix', type: 'pbix', category: 'Reportes', size: '8.7 MB', uploadedBy: 'Jorge Navarro' },
  ];
  for (const d of documents) tx.objectStore('documents').add(d);

  await tx.done;
}
