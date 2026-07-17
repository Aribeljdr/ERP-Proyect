'use client'
import { api } from '@/lib/api'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const CATEGORIES = ['Contratos', 'Finanzas', 'RRHH', 'Ventas', 'Legal', 'TI', 'Plantillas', 'Reportes']
const TYPES = ['pdf', 'xlsx', 'docx', 'sql', 'pbix']

interface DocModalProps {
  open: boolean; onClose: () => void; onSave: () => void; item?: any
}

export function DocModal({ open, onClose, onSave, item }: DocModalProps) {
  const [form, setForm] = useState({ name: '', type: 'pdf', category: '', size: '', uploadedBy: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({ name: item.name || '', type: item.type || 'pdf', category: item.category || '', size: item.size || '', uploadedBy: item.uploadedBy || '' })
    } else {
      setForm({ name: '', type: 'pdf', category: '', size: '', uploadedBy: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.category) return
    setSaving(true)
    try {
      if (item) {
        await api.documents.update(item.id, form)
      } else {
        await api.documents.create(form)
      }
      onSave(); onClose()
    } finally { setSaving(false) }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(2px)' }}>
      <div className="w-full max-w-md rounded-2xl p-0 overflow-hidden" style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', boxShadow: '0 25px 60px rgba(0,0,0,.15)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border,#E8EDF3)' }}>
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar documento' : 'Nuevo documento'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
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
                {TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Tamaño</label>
              <input value={form.size} onChange={e => set('size', e.target.value)} placeholder="ej: 2.4 MB"
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Categoría</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} required
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
              <option value="">Seleccionar</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Subido por</label>
            <input value={form.uploadedBy} onChange={e => set('uploadedBy', e.target.value)}
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>
              {saving ? 'Guardando…' : item ? 'Actualizar' : 'Crear documento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
