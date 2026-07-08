'use client'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(2px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'var(--card,#fff)', border: '1px solid var(--border,#E2E8F0)', boxShadow: '0 25px 60px rgba(0,0,0,.15)' }}>
        <div className="text-[16px] font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</div>
        <div className="text-[13px] mb-5" style={{ color: 'var(--muted)' }}>{message}</div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>Cancelar</button>
          <button onClick={onConfirm}
            className="flex-1 h-10 rounded-[10px] text-[13px] font-semibold text-white" style={{ background: '#EF4444' }}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}
