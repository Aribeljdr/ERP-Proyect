'use client'

import * as Icons from 'lucide-react'

interface ToastData {
  title?: string
  message: string
}

interface ToastProps {
  toast: ToastData | null
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null

  return (
    <div
      className="fixed bottom-[26px] right-[26px] z-[110] flex items-center gap-3 rounded-[13px] px-[18px] py-3.5 pl-[15px] animate-toast-in min-w-[280px]"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 32px rgba(2,6,23,.22)',
      }}
    >
      <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(34,197,94,.12)' }}
      >
        <Icons.CheckCircle className="w-[18px] h-[18px] text-green-500" strokeWidth={2.4} />
      </div>
      <div className="flex-1">
        {toast.title && (
          <div className="text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>
            {toast.title}
          </div>
        )}
        <div className="text-[12.5px]" style={{ color: 'var(--muted)' }}>
          {toast.message}
        </div>
      </div>
    </div>
  )
}
