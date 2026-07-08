'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, FileIcon } from 'lucide-react'
import { TableSkeleton, SummarySkeleton } from '@/components/shared/skeleton'

export function DocsTable({ onEdit, onDelete }: { onEdit: (d: any) => void; onDelete: (d: any) => void }) {
  const [docs, setDocs] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const start = Date.now()
    setLoading(true)
    const [res, sum] = await Promise.all([
      fetch(`http://localhost:4000/api/v1/documents?page=${page}&limit=10`).then(r => r.json()),
      fetch('http://localhost:4000/api/v1/documents/summary').then(r => r.json()),
    ])
    setDocs(res.data); setTotal(res.total); setSummary(sum)
    const elapsed = Date.now() - start
    if (elapsed < 1000) await new Promise(r => setTimeout(r, 1000 - elapsed))
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])
  const totalPages = Math.ceil(total / 10)

  const TYPE_ICONS: Record<string, string> = { pdf: '#EF4444', xlsx: '#22C55E', docx: '#2563EB', sql: '#F59E0B', pbix: '#8B5CF6' }

  return (
    <div style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', borderRadius: '18px', boxShadow: 'var(--elev)', overflow: 'hidden' }}>
      {loading ? (
        <SummarySkeleton />
      ) : summary && (
        <div className="grid grid-cols-4 gap-4 p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div><div className="text-[13px] font-medium text-muted">Total documentos</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>{summary.total}</div></div>
          {summary.byType?.slice(0, 3).map((t: any) => (
            <div key={t.type}><div className="text-[13px] font-medium text-muted capitalize">{t.type}</div><div className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>{t.count}</div></div>
          ))}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead><tr style={{ background: 'var(--bg,#F8FAFC)' }}>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Nombre</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Tipo</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Categoría</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Tamaño</th>
            <th className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Subido por</th>
            <th className="text-right px-4 py-3 text-[11.5px] font-semibold tracking-wider uppercase text-muted">Acciones</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={6} />
            ) : docs.map((d: any) => (
              <tr key={d.id} className="hover:bg-hover transition-all" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
                <td className="px-4 py-3.5 text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>{d.name}</td>
                <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md uppercase" style={{ color: TYPE_ICONS[d.type] || 'var(--muted)', background: 'var(--hover)' }}>{d.type}</span></td>
                <td className="px-4 py-3.5 text-[13px] text-muted">{d.category}</td>
                <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{d.size}</td>
                <td className="px-4 py-3.5 text-[13px]" style={{ color: 'var(--text)' }}>{d.uploadedBy}</td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEdit(d)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover"><Pencil className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} /></button>
                    <button onClick={() => onDelete(d)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-hover"><Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-[12.5px] text-muted">Mostrando <b style={{ color: 'var(--text)' }}>{docs.length}</b> de {total} documentos</span>
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
