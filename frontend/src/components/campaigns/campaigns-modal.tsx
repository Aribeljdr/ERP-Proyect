'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const TYPES = ['email', 'social', 'ads']
const STATUSES = ['active', 'draft', 'completed', 'paused']

interface CampaignsModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function CampaignsModal({ open, onClose, onSave, item }: CampaignsModalProps) {
  const [form, setForm] = useState({ name: '', type: 'email', status: 'draft', sentCount: '', openRate: '', clickRate: '', budget: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || '',
        type: item.type || 'email',
        status: item.status || 'draft',
        sentCount: String(item.sentCount || ''),
        openRate: String(item.openRate || ''),
        clickRate: String(item.clickRate || ''),
        budget: String(item.budget || ''),
      })
    } else {
      setForm({ name: '', type: 'email', status: 'draft', sentCount: '', openRate: '', clickRate: '', budget: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    setSaving(true)
    const payload = { ...form, sentCount: parseInt(form.sentCount) || 0, openRate: parseFloat(form.openRate) || 0, clickRate: parseFloat(form.clickRate) || 0, budget: parseFloat(form.budget) || 0 }
    try {
      const url = item
        ? `http://localhost:4000/api/v1/campaigns/${item.id}`
        : 'http://localhost:4000/api/v1/campaigns'
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar campaña' : 'Nueva campaña'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nombre</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Tipo</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Estado</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Enviados</label>
              <input type="number" value={form.sentCount} onChange={e => set('sentCount', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Apertura %</label>
              <input type="number" step="0.1" value={form.openRate} onChange={e => set('openRate', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>CTR %</label>
              <input type="number" step="0.1" value={form.clickRate} onChange={e => set('clickRate', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Presupuesto</label>
            <input type="number" step="0.01" value={form.budget} onChange={e => set('budget', e.target.value)}
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>
              {saving ? 'Guardando…' : item ? 'Actualizar' : 'Crear campaña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
