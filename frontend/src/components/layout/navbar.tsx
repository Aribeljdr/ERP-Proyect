'use client'

import { CRUMBS, TITLES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

interface NavbarProps {
  currentView: string
  theme: 'light' | 'dark'
  onToggleCollapse: () => void
  onToggleTheme: () => void
  onOpenCmd: () => void
}

export function Navbar({ currentView, theme, onToggleCollapse, onToggleTheme, onOpenCmd }: NavbarProps) {
  const crumb = CRUMBS[currentView] || 'Módulos'
  const title = TITLES[currentView] || 'Módulo'

  return (
    <header className="h-16 flex-shrink-0 flex items-center gap-3.5 px-[22px] relative z-10"
      style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={onToggleCollapse}
        className="w-9 h-9 border flex-shrink-0 rounded-[9px] flex items-center justify-center cursor-pointer text-muted hover:bg-hover hover:text-text transition-all"
        style={{ borderColor: 'var(--border)', background: 'transparent' }}
      >
        <Icons.Menu className="w-[17px] h-[17px]" strokeWidth={2} />
      </button>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: 'var(--muted)' }}>
          <span>Orbit</span>
          <span className="opacity-50">/</span>
          <span>{crumb}</span>
        </div>
        <h1 className="text-[17px] font-bold tracking-tight truncate" style={{ color: 'var(--text)' }}>
          {title}
        </h1>
      </div>

      <div className="flex-1" />

      <button
        onClick={onOpenCmd}
        className="h-[38px] min-w-[230px] border rounded-[10px] flex items-center gap-2 px-3 cursor-pointer text-[13px] transition-all hidden md:flex"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--bg)',
          color: 'var(--muted)',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#2563EB')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <Icons.Search className="w-[15px] h-[15px]" />
        <span className="flex-1 text-left">Buscar en todo…</span>
        <kbd
          className="font-inherit text-[10.5px] px-1.5 py-0.5 rounded-[5px]"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          ⌘K
        </kbd>
      </button>

      <div className="w-px h-[26px]" style={{ background: 'var(--border)' }} />

      <button
        onClick={onToggleTheme}
        title="Cambiar tema"
        className="w-[38px] h-[38px] border rounded-[10px] flex items-center justify-center cursor-pointer text-muted hover:bg-hover hover:text-text transition-all"
        style={{ borderColor: 'var(--border)', background: 'transparent' }}
      >
        {theme === 'dark' ? (
          <Icons.Sun className="w-[18px] h-[18px]" strokeWidth={2} />
        ) : (
          <Icons.Moon className="w-[18px] h-[18px]" strokeWidth={2} />
        )}
      </button>

      <button
        className="w-[38px] h-[38px] border rounded-[10px] flex items-center justify-center cursor-pointer text-muted hover:bg-hover hover:text-text transition-all relative"
        style={{ borderColor: 'var(--border)', background: 'transparent' }}
      >
        <Icons.MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
      </button>

      <button
        className="w-[38px] h-[38px] border rounded-[10px] flex items-center justify-center cursor-pointer text-muted hover:bg-hover hover:text-text transition-all relative"
        style={{ borderColor: 'var(--border)', background: 'transparent' }}
      >
        <Icons.Bell className="w-[18px] h-[18px]" strokeWidth={2} />
        <span className="absolute top-[8px] right-[9px] w-[7px] h-[7px] rounded-full bg-red-500 border-2 border-white dark:border-[#111827]" />
      </button>

      <button
        className="h-[38px] border rounded-[10px] flex items-center gap-2 px-1.5 pl-2.5 cursor-pointer transition-all hover:bg-hover"
        style={{ borderColor: 'var(--border)', background: 'transparent' }}
      >
        <Icons.Monitor className="w-[15px] h-[15px] text-muted" />
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Acme Corp</span>
        <Icons.ChevronDown className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
      </button>
    </header>
  )
}
