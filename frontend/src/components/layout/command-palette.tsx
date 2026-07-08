'use client'

import { useRef, useEffect } from 'react'
import * as Icons from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard: Icons.LayoutDashboard,
  Users: Icons.Users,
  TrendingUp: Icons.TrendingUp,
  FileText: Icons.FileText,
  ShoppingCart: Icons.ShoppingCart,
  Package: Icons.Package,
  FolderKanban: Icons.FolderKanban,
  TicketCheck: Icons.TicketCheck,
  Banknote: Icons.Banknote,
  BarChart3: Icons.BarChart3,
  UsersRound: Icons.UsersRound,
  File: Icons.File,
  BarChart4: Icons.BarChart4,
  Settings: Icons.Settings,
}

interface CommandPaletteProps {
  isOpen: boolean
  query: string
  onQueryChange: (q: string) => void
  onNavigate: (key: string) => void
  onClose: () => void
}

export function CommandPalette({ isOpen, query, onQueryChange, onNavigate, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  if (!isOpen) return null

  const filtered = query
    ? NAV_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_ITEMS

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] animate-fade-in"
      style={{ background: 'rgba(2,6,23,.5)', backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-[min(600px,92vw)] animate-pop-in overflow-hidden rounded-[16px]"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 60px rgba(2,6,23,.4)',
        }}
      >
        <div
          className="flex items-center gap-3 px-[18px] py-4 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <Icons.Search className="w-[19px] h-[19px] text-muted" />
          <input
            ref={inputRef}
            autoFocus
            placeholder="Escribe un comando o busca…"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent font-inherit text-[15px]"
            style={{ color: 'var(--text)' }}
          />
          <kbd
            className="font-inherit text-[11px] px-1.5 py-0.5 rounded-[6px]"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            ESC
          </kbd>
        </div>
        <div className="max-h-[340px] overflow-y-auto p-2">
          <div className="text-[11px] font-semibold tracking-wider uppercase px-3 pb-1.5" style={{ color: '#94A3B8' }}>
            Navegación
          </div>
          {filtered.map(item => {
            const IconComp = iconMap[item.icon]
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 border-none bg-transparent rounded-[10px] cursor-pointer text-left transition-all hover:bg-hover"
              >
                <span
                  className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 text-muted"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  {IconComp && <IconComp className="w-4 h-4" />}
                </span>
                <span className="flex-1 text-[13.5px] font-medium" style={{ color: 'var(--text)' }}>
                  {item.label}
                </span>
                <Icons.ArrowUpRight className="w-[15px] h-[15px] text-[#94A3B8]" />
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-[13.5px]" style={{ color: 'var(--muted)' }}>
              Sin resultados para &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
