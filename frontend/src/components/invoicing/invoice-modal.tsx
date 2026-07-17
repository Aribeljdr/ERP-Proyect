'use client'
import { api } from '@/lib/api'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['paid', 'issued', 'overdue', 'cancelled']

interface InvoiceModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function InvoiceModal({ open, onClose, onSave, item }: InvoiceModalProps) {
  const [form, setForm] = useState({ invoiceNumber: '', clientName: '', clientCompany: '', total: '', status: 'issued', issuedAt: '', dueAt: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        invoiceNumber: item.invoiceNumber || '',
        clientName: item.clientName || '',
        clientCompany: item.clientCompany || '',
        total: String(item.total || ''),
        status: item.status || 'issued',
        issuedAt: item.issuedAt || '',
        dueAt: item.dueAt || '',
      })
    } else {
      setForm({ invoiceNumber: '', clientName: '', clientCompany: '', total: '', status: 'issued', issuedAt: '', dueAt: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.invoiceNumber || !form.clientName || !form.total) return
    setSaving(true)
    const payload = { ...form, total: parseFloat(form.total) }
    try {
      if (item) {
        await api.invoicing.update(item.id, payload)
      } else {
        await api.invoicing.create(payload)
      }
      onSave()
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(2px)' }}>
      <div className="w-full max-w-md rounded-2xl p-0 overflow-hidden" style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', boxShadow: '0 25px 60px rgba(0,0,0,.15)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border,#E8EDF3)' }}>
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar factura' : 'Nueva factura'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>NÂ° Factura</label>
              <input value={form.invoiceNumber} onChange={e => set('invoiceNumber', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Total</label>
              <input type="number" step="0.01" value={form.total} onChange={e => set('total', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Cliente</label>
            <input value={form.clientName} onChange={e => set('clientName', e.target.value)} required
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Empresa</label>
            <input value={form.clientCompany} onChange={e => set('clientCompany', e.target.value)}
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>EmisiÃ³n</label>
              <input type="date" value={form.issuedAt} onChange={e => set('issuedAt', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Vencimiento</label>
              <input type="date" value={form.dueAt} onChange={e => set('dueAt', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Estado</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>
              {saving ? 'Guardandoâ€¦' : item ? 'Actualizar' : 'Crear factura'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
