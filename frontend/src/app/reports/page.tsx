'use client'

import { FileText, BarChart3, Users, TrendingUp, DollarSign, Package } from 'lucide-react'

const REPORTS = [
  { icon: TrendingUp, label: 'Reporte de Ventas', desc: 'Resumen de ventas por período', color: '#2563EB', bg: 'rgba(37,99,235,.1)' },
  { icon: DollarSign, label: 'Reporte Financiero', desc: 'Estado de resultados y balance', color: '#22C55E', bg: 'rgba(34,197,94,.1)' },
  { icon: Users, label: 'Reporte de Clientes', desc: 'Actividad y segmentación de clientes', color: '#8B5CF6', bg: 'rgba(139,92,246,.1)' },
  { icon: Package, label: 'Reporte de Inventario', desc: 'Stock actual y productos críticos', color: '#F59E0B', bg: 'rgba(245,158,11,.1)' },
  { icon: BarChart3, label: 'Reporte de Marketing', desc: 'Rendimiento de campañas', color: '#0EA5E9', bg: 'rgba(14,165,233,.1)' },
  { icon: FileText, label: 'Reporte de Nómina', desc: 'Resumen de nómina por período', color: '#EF4444', bg: 'rgba(239,68,68,.1)' },
]

export default function ReportsPage() {
  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="text-[20px] font-bold tracking-tight mb-[18px]" style={{ color: 'var(--text)' }}>Reportes</div>
      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((r, i) => (
          <button key={i} className="flex items-start gap-4 p-5 rounded-2xl border text-left transition-all hover:shadow-md" style={{ background: 'var(--card,#fff)', borderColor: 'var(--border,#E2E8F0)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: r.bg }}>
              <r.icon className="w-5 h-5" style={{ color: r.color }} />
            </div>
            <div>
              <div className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>{r.label}</div>
              <div className="text-[12.5px] mt-0.5" style={{ color: 'var(--muted)' }}>{r.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
