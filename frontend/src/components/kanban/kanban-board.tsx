'use client'

import { useState, useCallback } from 'react'
import { KANBAN_COLUMNS } from '@/lib/constants'
import { KANBAN_CARDS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

type Card = {
  id: string
  title: string
  tag: string
  priority: string
  assignee: string
  avColor: string
  comments: number
  due: string
  progress: number
}

const PRIO_MAP: Record<string, { c: string; b: string }> = {
  Alta: { c: '#EF4444', b: 'rgba(239,68,68,.12)' },
  Media: { c: '#F59E0B', b: 'rgba(245,158,11,.12)' },
  Baja: { c: '#22C55E', b: 'rgba(34,197,94,.12)' },
}

const TAG_MAP: Record<string, { c: string; b: string }> = {
  Diseño: { c: '#8B5CF6', b: 'rgba(139,92,246,.12)' },
  Research: { c: '#0EA5E9', b: 'rgba(14,165,233,.12)' },
  Backend: { c: '#2563EB', b: 'rgba(37,99,235,.12)' },
  QA: { c: '#F59E0B', b: 'rgba(245,158,11,.12)' },
  DevOps: { c: '#14B8A6', b: 'rgba(20,184,166,.12)' },
}

export function KanbanBoard() {
  const [cards, setCards] = useState<Record<string, Card[]>>(
    JSON.parse(JSON.stringify(KANBAN_CARDS))
  )
  const [dragId, setDragId] = useState('')
  const [dragOverCol, setDragOverCol] = useState('')

  const handleDragStart = useCallback((cardId: string) => {
    setDragId(cardId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragId('')
    setDragOverCol('')
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, colKey: string) => {
    e.preventDefault()
    setDragOverCol(colKey)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, colKey: string) => {
    e.preventDefault()
    if (!dragId) return

    setCards(prev => {
      const updated = { ...prev }
      let card: Card | null = null
      let fromKey = ''

      for (const [col, items] of Object.entries(updated)) {
        const idx = items.findIndex(c => c.id === dragId)
        if (idx >= 0) {
          card = items[idx]
          fromKey = col
          updated[col] = items.filter(c => c.id !== dragId)
          break
        }
      }

      if (!card || fromKey === colKey) {
        setDragId('')
        setDragOverCol('')
        return prev
      }

      if (colKey === 'done') card = { ...card, progress: 100 }
      updated[colKey] = [...(updated[colKey] || []), card]
      return updated
    })

    setDragId('')
    setDragOverCol('')
  }, [dragId])

  return (
    <div className="flex gap-4 items-start overflow-x-auto pb-2" style={{ animation: 'fadeIn .3s ease' }}>
      {KANBAN_COLUMNS.map(col => {
        const colCards = cards[col.key] || []
        return (
          <div
            key={col.key}
            onDragOver={(e) => handleDragOver(e, col.key)}
            onDrop={(e) => handleDrop(e, col.key)}
            className="flex-shrink-0 rounded-[16px] p-3"
            style={{
              width: '300px',
              border: '1px solid var(--border,#E2E8F0)',
              outline: dragOverCol === col.key ? '2px dashed #2563EB' : '',
              outlineOffset: dragOverCol === col.key ? '-2px' : '',
              background: dragOverCol === col.key ? 'rgba(37,99,235,.05)' : 'var(--bg2,rgba(148,163,184,.08))',
            }}
          >
            <div className="flex items-center gap-2 px-1.5 pb-3">
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: col.color }} />
              <span className="text-[13.5px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>{col.title}</span>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  color: 'var(--muted,#64748B)',
                  background: 'var(--card,#fff)',
                  border: '1px solid var(--border,#E2E8F0)',
                  minWidth: '22px',
                  textAlign: 'center',
                }}
              >
                {colCards.length}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 min-h-[60px]">
              {colCards.map(c => {
                const pr = PRIO_MAP[c.priority] || PRIO_MAP.Media
                const tg = TAG_MAP[c.tag] || TAG_MAP.Diseño
                const isDragging = dragId === c.id

                return (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => handleDragStart(c.id)}
                    onDragEnd={handleDragEnd}
                    className="rounded-[13px] p-3.5 cursor-grab transition-all"
                    style={{
                      background: 'var(--card,#fff)',
                      border: '1px solid var(--border,#E2E8F0)',
                      boxShadow: '0 1px 2px rgba(15,23,42,.04)',
                      opacity: isDragging ? 0.4 : 1,
                      transform: isDragging ? 'scale(.98)' : '',
                    }}
                    onMouseEnter={e => { if (!isDragging) { e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,.1)' } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(15,23,42,.04)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[6px]" style={{ background: tg.b, color: tg.c }}>
                        {c.tag}
                      </span>
                      <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-[6px]" style={{ color: pr.c, background: pr.b }}>
                        {c.priority}
                      </span>
                    </div>

                    <div className="text-[13.5px] font-semibold leading-tight mb-3" style={{ color: 'var(--text,#0F172A)' }}>
                      {c.title}
                    </div>

                    {c.progress > 0 && c.progress < 100 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--muted,#64748B)' }}>
                          <span>Progreso</span>
                          <span className="font-semibold">{c.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--hover,#F1F5F9)' }}>
                          <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: col.color }} />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div
                        className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-white text-[10.5px] font-semibold"
                        style={{ background: c.avColor }}
                      >
                        {c.assignee}
                      </div>
                      <div className="flex items-center gap-3" style={{ color: 'var(--muted,#64748B)' }}>
                        <span className="flex items-center gap-1 text-[11.5px]">
                          <Icons.MessageCircle className="w-3 h-3" />
                          {c.comments}
                        </span>
                        <span className="flex items-center gap-1 text-[11.5px]">
                          <Icons.Clock className="w-3 h-3" />
                          {c.due}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

              <button
                className="w-full py-2.5 border border-dashed rounded-[11px] bg-transparent font-inherit text-[12.5px] font-medium cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                style={{ borderColor: 'var(--border,#CBD5E1)', color: 'var(--muted,#64748B)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
              >
                <Icons.Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
