'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['paid', 'pending', 'cancelled']

interface PayrollModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  item?: any
}

export function PayrollModal({ open, onClose, onSave, item }: PayrollModalProps) {
  const [form, setForm] = useState({ employeeName: '', period: '', grossSalary: '', deductions: '', netPay: '', status: 'pending' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        employeeName: item.employeeName || '',
        period: item.period || '',
        grossSalary: String(item.grossSalary || ''),
        deductions: String(item.deductions || ''),
        netPay: String(item.netPay || ''),
        status: item.status || 'pending',
      })
    } else {
      setForm({ employeeName: '', period: '', grossSalary: '', deductions: '', netPay: '', status: 'pending' })
    }
  }, [item, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.employeeName || !form.period || !form.grossSalary) return
    setSaving(true)
    const payload = { ...form, grossSalary: parseFloat(form.grossSalary), deductions: parseFloat(form.deductions) || 0, netPay: parseFloat(form.netPay) || 0 }
    try {
      const url = item
        ? `http://localhost:4000/api/v1/payroll/${item.id}`
        : 'http://localhost:4000/api/v1/payroll'
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
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{item ? 'Editar nómina' : 'Nuevo registro'}</div>
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
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Periodo</label>
              <input value={form.period} onChange={e => set('period', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Salario Bruto</label>
              <input type="number" step="0.01" value={form.grossSalary} onChange={e => set('grossSalary', e.target.value)} required
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Deducciones</label>
              <input type="number" step="0.01" value={form.deductions} onChange={e => set('deductions', e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Sueldo Neto</label>
              <input type="number" step="0.01" value={form.netPay} onChange={e => set('netPay', e.target.value)}
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
