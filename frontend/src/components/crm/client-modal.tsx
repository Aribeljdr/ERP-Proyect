'use client'
import { api } from '@/lib/api'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['active', 'lead', 'pending', 'inactive']

interface ClientModalProps {
  open: boolean; onClose: () => void; onSave: () => void; client?: any
}

export function ClientModal({ open, onClose, onSave, client }: ClientModalProps) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'lead', value: '', owner: '', ownerName: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || '', company: client.company || '', email: client.email || '', phone: client.phone || '',
        status: client.status || 'lead', value: String(client.value || ''), owner: client.owner || '', ownerName: client.ownerName || '',
      })
    } else {
      setForm({ name: '', company: '', email: '', phone: '', status: 'lead', value: '', owner: '', ownerName: '' })
    }
  }, [client, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    setSaving(true)
    try {
      const initials = form.name.split(' ').map((s: string) => s[0]).join('').slice(0, 2).toUpperCase()
      const colors = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#0EA5E9', '#14B8A6']
      const payload = { ...form, value: parseFloat(form.value) || 0, initials, avColor: colors[Math.floor(Math.random() * colors.length)], progress: 0 }
      if (client) {
        await api.crm.update(client.id, payload)
      } else {
        await api.crm.create(payload)
      }
      onSave(); onClose()
    } finally { setSaving(false) }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(2px)' }}>
      <div className="w-full max-w-md rounded-2xl p-0 overflow-hidden" style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', boxShadow: '0 25px 60px rgba(0,0,0,.15)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border,#E8EDF3)' }}>
          <div className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{client ? 'Editar cliente' : 'Nuevo cliente'}</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover"><X className="w-4 h-4" style={{ color: 'var(--muted)' }} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nombre *</label><input value={form.name} onChange={e => set('name', e.target.value)} required className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Empresa</label><input value={form.company} onChange={e => set('company', e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>TelÃ©fono</label><input value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Estado</label><select value={form.status} onChange={e => set('status', e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Valor</label><input type="number" value={form.value} onChange={e => set('value', e.target.value)} className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Responsable</label><input value={form.owner} onChange={e => set('owner', e.target.value)} placeholder="AL" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nombre resp.</label><input value={form.ownerName} onChange={e => set('ownerName', e.target.value)} placeholder="A. LÃ³pez" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
            <button type="submit" disabled={saving} className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#2563EB' }}>{saving ? 'Guardandoâ€¦' : client ? 'Actualizar' : 'Crear cliente'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
