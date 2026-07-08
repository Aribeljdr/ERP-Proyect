'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['active', 'inactive', 'on_leave']

interface EmployeesModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function EmployeesModal({ open, onClose, onSave, item }: EmployeesModalProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', position: '', department: '', status: 'active', salary: '', hireDate: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        firstName: item.firstName || '',
        lastName: item.lastName || '',
        email: item.email || '',
        position: item.position || '',
        department: item.department || '',
        status: item.status || 'active',
        salary: String(item.salary || ''),
        hireDate: item.hireDate || '',
      })
    } else {
      setForm({ firstName: '', lastName: '', email: '', position: '', department: '', status: 'active', salary: '', hireDate: '' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email) return
    setSaving(true)
    const payload = { ...form, salary: parseFloat(form.salary) || 0 }
    try {
      const url = item
        ? `http://localhost:4000/api/v1/employees/${item.id}`
        : 'http://localhost:4000/api/v1/employees'
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar empleado' : 'Nuevo empleado'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover transition-all"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nombre</label>
              <input value={form.firstName} onChange={e => set('firstName', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Apellido</label>
              <input value={form.lastName} onChange={e => set('lastName', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
              className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Puesto</label>
              <input value={form.position} onChange={e => set('position', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Departamento</label>
              <input value={form.department} onChange={e => set('department', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Salario</label>
              <input type="number" step="0.01" value={form.salary} onChange={e => set('salary', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Fecha contratación</label>
              <input type="date" value={form.hireDate} onChange={e => set('hireDate', e.target.value)}
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
              {saving ? 'Guardando…' : item ? 'Actualizar' : 'Crear empleado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
