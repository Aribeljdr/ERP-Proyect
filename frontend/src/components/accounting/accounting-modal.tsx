'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const ENTRY_TYPES = ['debit', 'credit']

interface AccountingModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function AccountingModal({ open, onClose, onSave, item }: AccountingModalProps) {
  const [form, setForm] = useState({ description: '', entryType: 'debit', amount: '', account: '', date: '', reference: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        description: item.description || '',
        entryType: item.entryType || 'debit',
        amount: String(item.amount || ''),
        account: item.account || '',
        date: item.date || '',
        reference: item.reference || '',
      })
    } else {
      setForm({ description: '', entryType: 'debit', amount: '', account: '', date: '', reference: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description || !form.amount || !form.account) return
    setSaving(true)
    const payload = { ...form, amount: parseFloat(form.amount) }
    try {
      const url = item
        ? `http://localhost:4000/api/v1/accounting/${item.id}`
        : 'http://localhost:4000/api/v1/accounting'
      await fetch(url, {
        method: item ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar asiento' : 'Nuevo asiento'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Descripción</label>
            <input value={form.description} onChange={e => set('description', e.target.value)} required
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Tipo</label>
              <select value={form.entryType} onChange={e => set('entryType', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                {ENTRY_TYPES.map(t => <option key={t} value={t}>{t === 'debit' ? 'Debe' : 'Haber'}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Monto</label>
              <input type="number" step="0.01" value={form.amount} onChange={e => set('amount', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Cuenta</label>
              <input value={form.account} onChange={e => set('account', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Fecha</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Referencia</label>
            <input value={form.reference} onChange={e => set('reference', e.target.value)}
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>
              {saving ? 'Guardando…' : item ? 'Actualizar' : 'Crear asiento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
