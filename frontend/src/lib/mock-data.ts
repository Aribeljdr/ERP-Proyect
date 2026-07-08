export const KPI_DATA = [
  { label: 'Ingresos', value: '$284,920', delta: '12.4%', good: true, down: false, icon: 'dollar', accent: '#2563EB', tint: 'rgba(37,99,235,.1)' },
  { label: 'Ventas', value: '1,842', delta: '8.1%', good: true, down: false, icon: 'cart', accent: '#4F46E5', tint: 'rgba(79,70,229,.1)' },
  { label: 'Facturas', value: '326', delta: '3.2%', good: true, down: false, icon: 'invoice', accent: '#0EA5E9', tint: 'rgba(14,165,233,.1)' },
  { label: 'Clientes activos', value: '2,481', delta: '5.7%', good: true, down: false, icon: 'users', accent: '#22C55E', tint: 'rgba(34,197,94,.1)' },
  { label: 'Proyectos', value: '48', delta: '4', good: true, down: false, icon: 'projects', accent: '#8B5CF6', tint: 'rgba(139,92,246,.1)' },
  { label: 'Tickets', value: '19', delta: '14%', good: true, down: true, icon: 'tickets', accent: '#F59E0B', tint: 'rgba(245,158,11,.1)' },
  { label: 'Inventario', value: '94%', delta: '1.2%', good: true, down: false, icon: 'inventory', accent: '#14B8A6', tint: 'rgba(20,184,166,.1)' },
  { label: 'Cobros pendientes', value: '$38,410', delta: '9.4%', good: false, down: false, icon: 'finance', accent: '#EF4444', tint: 'rgba(239,68,68,.1)' },
]

export const REVENUE_DATA = [42, 48, 45, 52, 58, 55, 64, 70, 68, 76, 82, 90]
export const REVENUE_LABELS = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export const BAR_DATA = [
  { day: 'Lun', value: 62 },
  { day: 'Mar', value: 88 },
  { day: 'Mié', value: 74 },
  { day: 'Jue', value: 95 },
  { day: 'Vie', value: 100 },
  { day: 'Sáb', value: 54 },
  { day: 'Dom', value: 40 },
]

export const DONUT_SEGMENTS = [
  { label: 'Ventas', pct: 42, color: '#2563EB' },
  { label: 'Servicios', pct: 28, color: '#4F46E5' },
  { label: 'Suscripciones', pct: 18, color: '#22C55E' },
  { label: 'Otros', pct: 12, color: '#F59E0B' },
]

export const ACTIVITY_DATA = [
  { who: 'Laura M.', what: 'creó la factura #INV-2041', when: 'Hace 5 min', icon: 'FileText', color: '#2563EB', tint: 'rgba(37,99,235,.1)' },
  { who: 'Diego R.', what: 'cerró el trato con Nexus Ltd.', when: 'Hace 22 min', icon: 'CheckCircle', color: '#22C55E', tint: 'rgba(34,197,94,.1)' },
  { who: 'Sistema', what: 'stock bajo en "Teclado Pro"', when: 'Hace 1 h', icon: 'Package', color: '#F59E0B', tint: 'rgba(245,158,11,.1)' },
  { who: 'Ana P.', what: 'agregó 3 nuevos leads', when: 'Hace 2 h', icon: 'UserPlus', color: '#4F46E5', tint: 'rgba(79,70,229,.1)' },
  { who: 'Carlos V.', what: 'respondió al ticket #882', when: 'Hace 3 h', icon: 'TicketCheck', color: '#0EA5E9', tint: 'rgba(14,165,233,.1)' },
]

export const MEETINGS_DATA = [
  { time: '09:30', ampm: 'AM', title: 'Sprint planning', sub: 'Equipo de producto · Zoom', color: '#2563EB' },
  { time: '11:00', ampm: 'AM', title: 'Demo cliente Acme', sub: 'Ventas · Sala Marte', color: '#4F46E5' },
  { time: '02:15', ampm: 'PM', title: 'Revisión financiera Q3', sub: 'Finanzas · Presencial', color: '#22C55E' },
  { time: '04:00', ampm: 'PM', title: '1:1 con dirección', sub: 'RRHH · Meet', color: '#F59E0B' },
]

export const KANBAN_CARDS: Record<string, any[]> = {
  backlog: [
    { id: 'k1', title: 'Investigación de usuarios para onboarding', tag: 'Research', priority: 'Baja', assignee: 'JM', avColor: '#22C55E', comments: 3, due: '12 Jul', progress: 0 },
    { id: 'k2', title: 'Definir arquitectura de información', tag: 'Diseño', priority: 'Media', assignee: 'AL', avColor: '#2563EB', comments: 1, due: '15 Jul', progress: 0 },
  ],
  progress: [
    { id: 'k3', title: 'Diseñar sistema de componentes en Figma', tag: 'Diseño', priority: 'Alta', assignee: 'SR', avColor: '#F59E0B', comments: 8, due: '08 Jul', progress: 65 },
    { id: 'k4', title: 'Integrar API de pagos con Stripe', tag: 'Backend', priority: 'Alta', assignee: 'AL', avColor: '#2563EB', comments: 5, due: '10 Jul', progress: 40 },
  ],
  review: [
    { id: 'k5', title: 'Revisar flujo de checkout móvil', tag: 'QA', priority: 'Media', assignee: 'JM', avColor: '#22C55E', comments: 2, due: '06 Jul', progress: 90 },
  ],
  done: [
    { id: 'k6', title: 'Wireframes de dashboard principal', tag: 'Diseño', priority: 'Media', assignee: 'SR', avColor: '#F59E0B', comments: 4, due: '01 Jul', progress: 100 },
    { id: 'k7', title: 'Setup del proyecto y CI/CD', tag: 'DevOps', priority: 'Alta', assignee: 'AL', avColor: '#2563EB', comments: 0, due: '28 Jun', progress: 100 },
  ],
}
