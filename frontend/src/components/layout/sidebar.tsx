'use client'

import { cn } from '@/lib/utils'
import { NAV_GROUPS } from '@/lib/constants'
import * as Icons from 'lucide-react'
import { useCmdPalette } from '@/hooks/use-cmd-palette'

interface SidebarProps {
  expanded: boolean
  currentView: string
  onNavigate: (key: string) => void
  onToggleCollapse: () => void
  onOpenCmd: () => void
}

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

export function Sidebar({ expanded, currentView, onNavigate, onOpenCmd }: SidebarProps) {
  return (
    <aside
      className="flex flex-col flex-shrink-0 relative z-20 transition-all duration-200"
      style={{
        width: expanded ? '256px' : '76px',
        background: 'var(--sidebar)',
      }}
    >
      <div className="h-16 flex items-center gap-2.5 px-[18px] border-b border-white/10 flex-shrink-0">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center shadow-lg shadow-blue-500/40 flex-shrink-0">
          <Icons.Globe className="w-[18px] h-[18px] text-white" strokeWidth={2.2} />
        </div>
        {expanded && (
          <span className="text-base font-bold text-white tracking-tight whitespace-nowrap">
            Orbit<span className="text-blue-400">ERP</span>
          </span>
        )}
      </div>

      {expanded && (
        <div className="px-3.5 py-3">
          <button
            onClick={onOpenCmd}
            className="w-full h-[38px] border border-white/10 bg-white/5 rounded-[10px] flex items-center gap-2 px-2.5 cursor-pointer text-slate-400 text-[13px] hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Icons.Search className="w-[15px] h-[15px]" />
            <span className="flex-1 text-left">Buscar…</span>
            <kbd className="font-inherit text-[10.5px] bg-white/10 px-1.5 py-0.5 rounded-[5px] text-slate-300">⌘K</kbd>
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-1.5">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            {expanded && (
              <div className="text-[10.5px] font-semibold tracking-wider uppercase text-slate-600 px-2.5 pt-3.5 pb-1.5">
                {group.label}
              </div>
            )}
            {!expanded && <div className="h-3.5" />}
            {group.items.map(item => {
              const active = currentView === item.key
              const IconComp = iconMap[item.icon]
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  title={item.label}
                  className={cn(
                    'w-full h-10 border-none rounded-[10px] flex items-center gap-2.5 cursor-pointer font-inherit text-[13.5px] transition-all duration-150 mb-0.5',
                    expanded ? 'px-2.5' : 'justify-center',
                    active
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-lg shadow-blue-500/40 font-semibold'
                      : 'bg-transparent text-slate-400 font-medium hover:bg-white/10 hover:text-slate-100'
                  )}
                >
                  <span className="flex-shrink-0 flex">
                    {IconComp && <IconComp className="w-[18px] h-[18px]" strokeWidth={1.9} />}
                  </span>
                  {expanded && (
                    <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                  )}
                  {expanded && item.badge && (
                    <span
                      className={cn(
                        'flex-shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full',
                        active ? 'bg-white/30 text-white' : 'bg-blue-500/20 text-blue-400'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="flex-shrink-0 p-3 border-t border-white/10 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-[13px] flex-shrink-0">
          MR
        </div>
        {expanded && (
          <>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-100 truncate">María Reyes</div>
              <div className="text-[11.5px] text-slate-500">Administrador</div>
            </div>
            <button
              title="Cerrar sesión"
              className="flex-shrink-0 w-[30px] h-[30px] border-none bg-transparent rounded-lg flex items-center justify-center text-slate-500 cursor-pointer hover:bg-white/10 hover:text-red-400 transition-all"
            >
              <Icons.LogOut className="w-4 h-4" strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
