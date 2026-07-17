'use client'
import { api } from '@/lib/api'

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { STATUS_MAP } from '@/lib/constants'
import { TableSkeleton, SummarySkeleton } from '@/components/shared/skeleton'

export function ClientTable({ onEdit, onDelete }: { onEdit: (c: any) => void; onDelete: (c: any) => void }) {
  const [clients, setClients] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const start = Date.now()
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '8' })
    if (tab !== 'all') params.set('status', tab)
    const [res] = await Promise.all([
      api.crm.list({ page, limit: 8 }),
    ])
    setClients(res.data); setTotal(res.total)
    const elapsed = Date.now() - start
    if (elapsed < 1000) await new Promise(r => setTimeout(r, 1000 - elapsed))
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page, tab])

  const totalPages = Math.ceil(total / 8)

  return (
    <div style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', borderRadius: '18px', boxShadow: 'var(--elev)', overflow: 'hidden' }}>
      <div className="flex items-center gap-1 p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        {['all', 'active', 'lead', 'pending', 'inactive'].map(k => (
          <button key={k} onClick={() => { setTab(k); setPage(1) }}
            className="text-[13px] px-3 py-1.5 rounded-[9px] font-medium transition-all cursor-pointer"
            style={{ background: tab === k ? '#2563EB' : 'transparent', color: tab === k ? '#fff' : 'var(--muted)' }}>
            {k === 'all' ? 'Todos' : k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '820px' }}>
          <thead>
            <tr style={{ background: 'var(--bg,#F8FAFC)' }}>
              <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Cliente</th>
              <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Estado</th>
              <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Valor</th>
              <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Email</th>
              <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Responsable</th>
              <th className="text-right px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Acciones</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={5} cols={6} />
          ) : (
            <tbody>
              {clients.map((r: any) => {
                const st = STATUS_MAP[r.status] || STATUS_MAP.active
                return (
                  <tr key={r.id} className="hover:bg-hover transition-all" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center text-white font-semibold text-[13px] flex-shrink-0" style={{ background: r.avColor || '#2563EB' }}>{r.initials || r.name?.slice(0, 2).toUpperCase()}</div>
                        <div>
                          <div className="text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{r.name}</div>
                          <div className="text-xs" style={{ color: 'var(--muted)' }}>{r.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                        <span className="w-[6px] h-[6px] rounded-full" style={{ background: st.color }} />{st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>${Number(r.value).toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{r.email || 'â€”'}</td>
                    <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{r.ownerName || r.owner || 'â€”'}</td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onEdit(r)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover"><Pencil className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} /></button>
                        <button onClick={() => onDelete(r)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover"><Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      {!loading && clients.length === 0 && (
        <div className="py-16 text-center">
          <div className="text-[15px] font-semibold mb-1" style={{ color: 'var(--text)' }}>Sin resultados</div>
          <div className="text-[13px]" style={{ color: 'var(--muted)' }}>No hay clientes que coincidan.</div>
        </div>
      )}
      {total > 0 && (
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-[12.5px] text-muted">Mostrando <b style={{ color: 'var(--text)' }}>{clients.length}</b> de {total} clientes</span>
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
      )}
    </div>
  )
}
