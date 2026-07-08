'use client'

export function SkeletonBar({ width = '100%', height = 14, radius = 6 }: { width?: string; height?: number; radius?: number }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{ width, height, borderRadius: radius, background: 'var(--hover,#F1F5F9)', position: 'relative', overflow: 'hidden' }}
    />
  )
}

export function SkeletonRow({ cols = 6 }: { cols?: number }) {
  return (
    <tr style={{ borderTop: '1px solid var(--border,#E8EDF3)' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <SkeletonBar width={i === 0 ? '140px' : i === cols - 1 ? '60px' : '80px'} />
        </td>
      ))}
    </tr>
  )
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} cols={cols} />
      ))}
    </tbody>
  )
}

export function SummarySkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-5 border-b" style={{ borderColor: 'var(--border)' }}>
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i}>
          <SkeletonBar width="80px" height={12} />
          <div className="mt-2"><SkeletonBar width="60px" height={22} /></div>
        </div>
      ))}
    </div>
  )
}

const styleId = 'skeleton-shimmer-style'
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    .skeleton-shimmer::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
      animation: shimmer 1.4s ease-in-out infinite;
      transform: translateX(-100%);
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `
  document.head.appendChild(style)
}
