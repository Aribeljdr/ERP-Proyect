'use client'

import { KanbanBoard } from '@/components/kanban/kanban-board'
import { Plus } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div style={{ animation: 'fadeIn .3s ease' }}>
      <div className="flex items-center justify-between mb-[18px]">
        <div className="flex items-center gap-2.5">
          <span className="text-[13px]" style={{ color: 'var(--muted,#64748B)' }}>Tablero</span>
          <span
            className="text-[13px] font-semibold px-3 py-1.5 rounded-[9px]"
            style={{
              color: 'var(--text,#0F172A)',
              background: 'var(--card,#fff)',
              border: '1px solid var(--border,#E2E8F0)',
            }}
          >
            Rediseño App Móvil
          </span>
          <div className="flex ml-1.5">
            {['AL', 'JM', 'SR'].map((init, i) => (
              <div
                key={init}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                style={{
                  background: i === 0 ? '#2563EB' : i === 1 ? '#22C55E' : '#F59E0B',
                  border: '2px solid var(--bg,#F8FAFC)',
                  marginLeft: i > 0 ? '-8px' : '0',
                }}
              >
                {init}
              </div>
            ))}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10.5px] font-semibold"
              style={{
                background: 'var(--hover,#F1F5F9)',
                border: '2px solid var(--bg,#F8FAFC)',
                marginLeft: '-8px',
                color: 'var(--muted,#64748B)',
              }}
            >
              +5
            </div>
          </div>
        </div>

        <button className="btn-primary h-10">
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          Nueva tarea
        </button>
      </div>

      <KanbanBoard />
    </div>
  )
}
