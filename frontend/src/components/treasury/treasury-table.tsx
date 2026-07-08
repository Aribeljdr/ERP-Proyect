'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { TableSkeleton, SummarySkeleton } from '@/components/shared/skeleton'

const TYPE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  income: { label: 'Ingreso', color: '#22C55E', bg: 'rgba(34,197,94,.12)' },
  expense: { label: 'Gasto', color: '#EF4444', bg: 'rgba(239,68,68,.12)' },
}

export function TreasuryTable({ onEdit, onDelete }: { onEdit: (e: any) => void; onDelete: (e: any) => void }) {
  const [movements, setMovements] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const start = Date.now()
    setLoading(true)
    const [res, sum] = await Promise.all([
      fetch(`http://localhost:4000/api/v1/treasury?page=${page}&limit=10`).then(r => r.json()),
      fetch('http://localhost:4000/api/v1/treasury/summary').then(r => r.json()),
    ])
    setMovements(res.data)
    setTotal(res.total)
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
        <SummarySkeleton cards={3} />
      ) : summary && (
        <div className="grid grid-cols-3 gap-4 p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div><div className="text-[13px] font-medium text-muted">Ingresos</div><div className="text-[24px] font-bold text-green-500">${summary.totalIncome.toLocaleString()}</div></div>
          <div><div className="text-[13px] font-medium text-muted">Gastos</div><div className="text-[24px] font-bold text-red-500">${summary.totalExpenses.toLocaleString()}</div></div>
          <div><div className="text-[13px] font-medium text-muted">Balance</div><div className="text-[24px] font-bold" style={{ color: summary.balance >= 0 ? '#22C55E' : '#EF4444' }}>${summary.balance.toLocaleString()}</div></div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '850px' }}>
          <thead><tr style={{ background: 'var(--bg,#F8FAFC)' }}>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Concepto</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Tipo</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Monto</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Categoría</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Fecha</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Estado</th>
            <th className="text-right px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Acciones</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={7} />
            ) : movements.map((m: any) => {
              const tp = TYPE_MAP[m.type] || TYPE_MAP.income
              return (
                <tr key={m.id} className="hover:bg-hover transition-all" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{m.concept}</td>
                  <td className="px-4 py-3.5"><span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: tp.color, background: tp.bg }}>{tp.label}</span></td>
                  <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: m.type === 'income' ? '#22C55E' : '#EF4444' }}>
                    {m.type === 'income' ? '+' : '-'}${Number(m.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-muted">{m.category}</td>
                  <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{m.date}</td>
                  <td className="px-4 py-3.5"><span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full" style={{
                    color: m.status === 'completed' ? '#22C55E' : '#F59E0B',
                    background: m.status === 'completed' ? 'rgba(34,197,94,.12)' : 'rgba(245,158,11,.12)'
                  }}>{m.status === 'completed' ? 'Completado' : 'Pendiente'}</span></td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(m)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Pencil className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} /></button>
                      <button onClick={() => onDelete(m)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-[12.5px] text-muted">Mostrando <b style={{ color: 'var(--text)' }}>{movements.length}</b> de {total} movimientos</span>
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
