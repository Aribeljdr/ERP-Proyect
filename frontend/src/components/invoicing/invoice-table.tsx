'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'
import { TableSkeleton, SummarySkeleton } from '@/components/shared/skeleton'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: 'Pagada', color: '#22C55E', bg: 'rgba(34,197,94,.12)' },
  issued: { label: 'Emitida', color: '#2563EB', bg: 'rgba(37,99,235,.12)' },
  overdue: { label: 'Vencida', color: '#EF4444', bg: 'rgba(239,68,68,.12)' },
  cancelled: { label: 'Anulada', color: '#94A3B8', bg: 'rgba(148,163,184,.14)' },
}

export function InvoiceTable({ onEdit, onDelete }: { onEdit: (e: any) => void; onDelete: (e: any) => void }) {
  const [invoices, setInvoices] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const start = Date.now()
    setLoading(true)
    const res = await api.invoicing.list({ page, limit: 10 })
    setInvoices(res.data)
    setTotal(res.total)
    const sum = await api.invoicing.summary()
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
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Facturas totales</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>{summary.totalInvoices}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Pagadas</div><div className="text-[24px] font-bold text-green-500">{summary.paidInvoices}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Vencidas</div><div className="text-[24px] font-bold text-red-500">{summary.overdueInvoices}</div></div>
          <div><div className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>Monto total</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>${summary.totalAmount.toLocaleString()}</div></div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead><tr style={{ background: 'var(--bg,#F8FAFC)' }}>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Factura</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Cliente</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">EmisiÃ³n</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Vencimiento</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Total</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Estado</th>
            <th className="text-right px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Acciones</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={7} />
            ) : invoices.map((inv: any) => {
              const st = STATUS_MAP[inv.status] || STATUS_MAP.issued
              return (
                <tr key={inv.id} className="hover:bg-hover transition-all" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{inv.invoiceNumber}</td>
                  <td className="px-4 py-3.5">
                    <div className="text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{inv.clientName}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{inv.clientCompany}</div>
                  </td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{inv.issuedAt}</td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: inv.status === 'overdue' ? '#EF4444' : 'var(--text)' }}>{inv.dueAt}</td>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>${Number(inv.total).toLocaleString()}</td>
                  <td className="px-4 py-3.5"><span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>{st.label}</span></td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(inv)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Pencil className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} /></button>
                      <button onClick={() => onDelete(inv)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-[12.5px] text-muted">Mostrando <b style={{ color: 'var(--text)' }}>{invoices.length}</b> de {total} facturas</span>
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
