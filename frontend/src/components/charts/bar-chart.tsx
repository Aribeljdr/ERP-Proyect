'use client'

import { BAR_DATA } from '@/lib/mock-data'

export function BarChart() {
  const max = 100
  return (
    <div className="flex items-end gap-2.5" style={{ height: '160px' }}>
      {BAR_DATA.map((b, i) => {
        const pct = (b.value / max) * 100
        const isMax = b.value === max
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div
              className="w-full rounded-t-lg rounded-b"
              style={{
                height: `${pct}%`,
                minHeight: '4px',
                background: isMax
                  ? 'linear-gradient(180deg,#4F46E5,#2563EB)'
                  : 'linear-gradient(180deg,#93C5FD,#60A5FA)',
                transition: 'height .3s',
              }}
            />
            <span className="text-[11px] font-medium" style={{ color: 'var(--muted,#94A3B8)' }}>
              {b.day}
            </span>
          </div>
        )
      })}
    </div>
  )
}
