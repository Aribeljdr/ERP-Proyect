'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'
import { TableSkeleton, SummarySkeleton } from '@/components/shared/skeleton'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completada', color: '#22C55E', bg: 'rgba(34,197,94,.12)' },
  pending: { label: 'Pendiente', color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
  cancelled: { label: 'Cancelada', color: '#EF4444', bg: 'rgba(239,68,68,.12)' },
}

export function SalesTable({ onEdit, onDelete }: { onEdit: (e: any) => void; onDelete: (e: any) => void }) {
  const [orders, setOrders] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const start = Date.now()
    setLoading(true)
    const res = await api.sales.list({ page, limit: 10 })
    setOrders(res.data)
    setTotal(res.total)
    const sum = await fetch('http://localhost:4000/api/v1/sales/summary').then(r => r.json())
    setSummary(sum)
    const elapsed = Date.now() - start
    if (elapsed < 1000) await new Promise(r => setTimeout(r, 1000 - elapsed))
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])

  const totalPages = Math.ceil(total / 10)

  return (
    <div style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', borderRadius: '18px', boxShadow: 'var(--elev)', overflow: 'hidden' }}>
      {loading ? (
        <SummarySkeleton />
      ) : summary && (
        <div className="grid grid-cols-4 gap-4 p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Órdenes totales</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>{summary.totalOrders}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Pendientes</div><div className="text-[24px] font-bold text-amber-500">{summary.pendingOrders}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Completadas</div><div className="text-[24px] font-bold text-green-500">{summary.completedOrders}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Ingresos</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>${summary.totalRevenue.toLocaleString()}</div></div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '820px' }}>
          <thead><tr style={{ background: 'var(--bg,#F8FAFC)' }}>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Orden</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Cliente</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Empresa</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Total</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Estado</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Items</th>
            <th className="text-right px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Acciones</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={7} />
            ) : orders.map((o: any) => {
              const st = STATUS_MAP[o.status] || STATUS_MAP.pending
              return (
                <tr key={o.id} className="hover:bg-hover transition-all" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{o.orderNumber}</td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{o.clientName}</td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--muted)' }}>{o.clientCompany}</td>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>${Number(o.total).toLocaleString()}</td>
                  <td className="px-4 py-3.5"><span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>{st.label}</span></td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--muted)' }}>{o.itemsCount}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(o)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Pencil className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} /></button>
                      <button onClick={() => onDelete(o)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-[12.5px] text-muted">Mostrando <b style={{ color: 'var(--text)' }}>{orders.length}</b> de {total} órdenes</span>
        <div className="flex gap-1.5 items-center">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="w-8 h-8 border rounded-lg flex items-center justify-center disabled:opacity-40" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-[13px] font-semibold px-3" style={{ color: 'var(--text)' }}>{page}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
            className="w-8 h-8 border rounded-lg flex items-center justify-center disabled:opacity-40" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
