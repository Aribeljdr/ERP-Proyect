'use client'

import { REVENUE_DATA, REVENUE_LABELS } from '@/lib/mock-data'

export function AreaChart() {
  const data = REVENUE_DATA
  const labels = REVENUE_LABELS
  const w = 720, h = 200, pad = 14
  const min = 30, max = 96
  const n = data.length

  const pts = data.map((v, i) => [
    (i / (n - 1)) * w,
    h - ((v - min) / (max - min)) * (h - pad * 2) - pad,
  ] as [number, number])

  let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1)
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    d += ` C${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  const area = d + ` L${w} ${h} L0 ${h} Z`

  const last = pts[pts.length - 1]
  const grid = [0.25, 0.5, 0.75]
    .map(g => `<line x1="0" y1="${(h * g).toFixed(0)}" x2="${w}" y2="${(h * g).toFixed(0)}" stroke="var(--border,#E2E8F0)" stroke-width="1" stroke-dasharray="3 5"/>`)
    .join('')

  const inner = `
    <defs>
      <linearGradient id="obGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2563EB" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${grid}
    <path d="${area}" fill="url(#obGrad)"/>
    <path d="${d}" fill="none" stroke="#2563EB" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="5" fill="#fff" stroke="#2563EB" stroke-width="3"/>
  `

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }} preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: inner }} />
      <div className="flex justify-between mt-2 px-0.5">
        {labels.map((l, i) => (
          <span key={i} className="text-[11px]" style={{ color: 'var(--muted,#94A3B8)' }}>{l}</span>
        ))}
      </div>
    </div>
  )
}
