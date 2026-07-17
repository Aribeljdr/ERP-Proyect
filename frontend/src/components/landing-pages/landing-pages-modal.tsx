'use client'
import { api } from '@/lib/api'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['published', 'draft', 'archived']

interface LandingPagesModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function LandingPagesModal({ open, onClose, onSave, item }: LandingPagesModalProps) {
  const [form, setForm] = useState({ title: '', slug: '', status: 'draft', viewsCount: '', conversionRate: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '',
        slug: item.slug || '',
        status: item.status || 'draft',
        viewsCount: String(item.viewsCount || ''),
        conversionRate: String(item.conversionRate || ''),
      })
    } else {
      setForm({ title: '', slug: '', status: 'draft', viewsCount: '', conversionRate: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) return
    setSaving(true)
    const payload = { ...form, viewsCount: parseInt(form.viewsCount) || 0, conversionRate: parseFloat(form.conversionRate) || 0 }
    try {
      if (item) {
        await api.landingPages.update(item.id, payload)
      } else {
        await api.landingPages.create(payload)
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar pÃ¡gina' : 'Nueva pÃ¡gina'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>TÃ­tulo</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Slug</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} required
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Vistas</label>
              <input type="number" value={form.viewsCount} onChange={e => set('viewsCount', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>ConversiÃ³n %</label>
              <input type="number" step="0.1" value={form.conversionRate} onChange={e => set('conversionRate', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>
              {saving ? 'Guardandoâ€¦' : item ? 'Actualizar' : 'Crear pÃ¡gina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
