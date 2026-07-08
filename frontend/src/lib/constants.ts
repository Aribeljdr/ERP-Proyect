export const NAV_GROUPS = [
  {
    label: 'General',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'Ventas',
    items: [
      { key: 'crm', label: 'CRM · Clientes', icon: 'Users', badge: '12' },
      { key: 'sales', label: 'Ventas', icon: 'TrendingUp' },
      { key: 'invoicing', label: 'Facturación', icon: 'FileText' },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { key: 'purchases', label: 'Compras', icon: 'ShoppingCart' },
      { key: 'inventory', label: 'Inventario', icon: 'Package' },
      { key: 'projects', label: 'Proyectos', icon: 'FolderKanban' },
      { key: 'tickets', label: 'Tickets', icon: 'TicketCheck', badge: '5' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { key: 'campaigns', label: 'Campañas', icon: 'Megaphone' },
      { key: 'email-templates', label: 'Plantillas Email', icon: 'Mail' },
      { key: 'landing-pages', label: 'Landing Pages', icon: 'Globe' },
    ],
  },
  {
    label: 'Finanzas',
    items: [
      { key: 'expenses', label: 'Gastos', icon: 'Banknote' },
      { key: 'treasury', label: 'Tesorería', icon: 'Wallet' },
      { key: 'accounting', label: 'Contabilidad', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Equipo',
    items: [
      { key: 'employees', label: 'Empleados', icon: 'UsersRound' },
      { key: 'payroll', label: 'Nómina', icon: 'Wallet' },
      { key: 'attendance', label: 'Asistencia', icon: 'Clock' },
      { key: 'docs', label: 'Documentos', icon: 'File' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { key: 'reports', label: 'Reportes', icon: 'BarChart4' },
      { key: 'settings', label: 'Configuración', icon: 'Settings' },
    ],
  },
]

export const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items)

export const TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  crm: 'CRM · Clientes',
  sales: 'Ventas',
  invoicing: 'Facturación',
  purchases: 'Compras',
  inventory: 'Inventario',
  projects: 'Proyectos',
  tickets: 'Tickets',
  campaigns: 'Campañas',
  'email-templates': 'Plantillas Email',
  'landing-pages': 'Landing Pages',
  expenses: 'Gastos',
  treasury: 'Tesorería',
  accounting: 'Contabilidad',
  employees: 'Empleados',
  payroll: 'Nómina',
  attendance: 'Asistencia',
  docs: 'Documentos',
  reports: 'Reportes',
  settings: 'Configuración',
}

export const CRUMBS: Record<string, string> = {
  dashboard: 'General',
  crm: 'Ventas',
  sales: 'Ventas',
  invoicing: 'Ventas',
  purchases: 'Operaciones',
  inventory: 'Operaciones',
  projects: 'Operaciones',
  tickets: 'Operaciones',
  campaigns: 'Marketing',
  'email-templates': 'Marketing',
  'landing-pages': 'Marketing',
  expenses: 'Finanzas',
  treasury: 'Finanzas',
  accounting: 'Finanzas',
  employees: 'Equipo',
  payroll: 'Equipo',
  attendance: 'Equipo',
  docs: 'Equipo',
  reports: 'Sistema',
  settings: 'Sistema',
}

export const BUILT_VIEWS = ['dashboard', 'crm', 'projects']

export const STATUS_MAP: Record<string, { label: string; color: string; bg: string; prog: string }> = {
  active: { label: 'Activo', color: '#22C55E', bg: 'rgba(34,197,94,.12)', prog: '#22C55E' },
  lead: { label: 'Lead', color: '#2563EB', bg: 'rgba(37,99,235,.12)', prog: '#2563EB' },
  pending: { label: 'Pendiente', color: '#F59E0B', bg: 'rgba(245,158,11,.12)', prog: '#F59E0B' },
  inactive: { label: 'Inactivo', color: '#94A3B8', bg: 'rgba(148,163,184,.14)', prog: '#94A3B8' },
}

export const KANBAN_COLUMNS = [
  { key: 'backlog', title: 'Backlog', color: '#94A3B8' },
  { key: 'progress', title: 'En progreso', color: '#2563EB' },
  { key: 'review', title: 'En revisión', color: '#F59E0B' },
  { key: 'done', title: 'Completado', color: '#22C55E' },
]
