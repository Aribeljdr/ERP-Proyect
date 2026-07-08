'use client'

import { DONUT_SEGMENTS } from '@/lib/mock-data'

export function DonutChart() {
  const segs = DONUT_SEGMENTS
  const r = 54, cx = 70, cy = 70, C = 2 * Math.PI * r
  let off = 0
  const circles = segs.map((s, i) => {
    const len = (s.pct / 100) * C
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="18" stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>`
    off += len
    return el
  }).join('')
  const inner = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--hover,#F1F5F9)" stroke-width="18"/>${circles}`

  return (
    <div className="relative flex items-center justify-center" style={{ width: '140px', height: '140px', margin: '6px auto 12px' }}>
      <svg viewBox="0 0 140 140" width={140} height={140} dangerouslySetInnerHTML={{ __html: inner }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-bold tracking-tight" style={{ color: 'var(--text,#0F172A)' }}>$284K</span>
        <span className="text-[11px]" style={{ color: 'var(--muted,#64748B)' }}>Total</span>
      </div>
    </div>
  )
}
