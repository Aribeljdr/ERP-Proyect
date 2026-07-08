'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['present', 'absent', 'late', 'permit']

interface AttendanceModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function AttendanceModal({ open, onClose, onSave, item }: AttendanceModalProps) {
  const [form, setForm] = useState({ employeeName: '', date: '', checkIn: '', checkOut: '', status: 'present' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        employeeName: item.employeeName || '',
        date: item.date || '',
        checkIn: item.checkIn || '',
        checkOut: item.checkOut || '',
        status: item.status || 'present',
      })
    } else {
      setForm({ employeeName: '', date: '', checkIn: '', checkOut: '', status: 'present' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.employeeName || !form.date) return
    setSaving(true)
    const payload = { ...form }
    try {
      const url = item
        ? `http://localhost:4000/api/v1/attendance/${item.id}`
        : 'http://localhost:4000/api/v1/attendance'
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar registro' : 'Nuevo registro'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Empleado</label>
              <input value={form.employeeName} onChange={e => set('employeeName', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Fecha</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Entrada</label>
              <input type="time" value={form.checkIn} onChange={e => set('checkIn', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Salida</label>
              <input type="time" value={form.checkOut} onChange={e => set('checkOut', e.target.value)}
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
              {saving ? 'Guardando…' : item ? 'Actualizar' : 'Crear registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
