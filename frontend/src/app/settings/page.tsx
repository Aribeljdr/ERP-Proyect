'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

const SECTIONS = [
  { key: 'company', label: 'Empresa' },
  { key: 'preferences', label: 'Preferencias' },
  { key: 'notifications', label: 'Notificaciones' },
  { key: 'security', label: 'Seguridad' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('company')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="text-[20px] font-bold tracking-tight mb-[18px]" style={{ color: 'var(--text)' }}>Configuración</div>
      <div className="flex gap-1 p-1 rounded-xl border mb-6" style={{ background: 'var(--card,#fff)', borderColor: 'var(--border,#E2E8F0)' }}>
        {SECTIONS.map(s => (
          <button key={s.key} onClick={() => setTab(s.key)}
            className="px-4 py-1.5 rounded-[9px] text-[13px] font-medium transition-all cursor-pointer"
            style={{ background: tab === s.key ? '#2563EB' : 'transparent', color: tab === s.key ? '#fff' : 'var(--muted)' }}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border p-6" style={{ background: 'var(--card,#fff)', borderColor: 'var(--border,#E2E8F0)' }}>
        {tab === 'company' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nombre de la empresa</label><input defaultValue="Orbit ERP" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>RUT</label><input defaultValue="76.123.456-7" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            </div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Dirección</label><input defaultValue="Av. Providencia 1234, Santiago" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Teléfono</label><input defaultValue="+56 2 2123 4567" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Email</label><input defaultValue="contacto@orbiterp.com" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            </div>
          </div>
        )}
        {tab === 'preferences' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Moneda</label><select className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}><option>CLP</option><option>USD</option><option>EUR</option></select></div>
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Idioma</label><select className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}><option>Español</option><option>English</option><option>Português</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Zona horaria</label><select className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}><option>América/Santiago (UTC-4)</option><option>América/México (UTC-6)</option><option>América/Argentina (UTC-3)</option></select></div>
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Formato fecha</label><select className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
            </div>
          </div>
        )}
        {tab === 'notifications' && (
          <div className="space-y-4">
            {['Notificaciones por email', 'Alertas de stock bajo', 'Reportes automáticos', 'Notificaciones de tickets'].map((n, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
                <span className="text-[13.5px]" style={{ color: 'var(--text)' }}>{n}</span>
              </label>
            ))}
          </div>
        )}
        {tab === 'security' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Usuario actual</label><input defaultValue="maria@orbiterp.com" disabled className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--muted)' }} /></div>
              <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Rol</label><input defaultValue="Administrador" disabled className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--muted)' }} /></div>
            </div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Nueva contraseña</label><input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
            <div><label className="block text-[12.5px] font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Confirmar contraseña</label><input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-[10px] text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} /></div>
          </div>
        )}
        <div className="flex justify-end mt-6 pt-4" style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
          <button onClick={handleSave} className="btn-primary h-10"><Save className="w-4 h-4" strokeWidth={2.2} />{saved ? 'Guardado ✓' : 'Guardar cambios'}</button>
        </div>
      </div>
    </div>
  )
}
