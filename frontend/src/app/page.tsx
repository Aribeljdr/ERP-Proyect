'use client'

import { AreaChart } from '@/components/charts/area-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { KPI_DATA, DONUT_SEGMENTS, ACTIVITY_DATA, MEETINGS_DATA } from '@/lib/mock-data'
import * as Icons from 'lucide-react'

const iconMap: Record<string, React.ComponentType<any>> = {
  dollar: Icons.DollarSign,
  cart: Icons.ShoppingCart,
  invoice: Icons.FileText,
  users: Icons.Users,
  projects: Icons.FolderKanban,
  tickets: Icons.TicketCheck,
  inventory: Icons.Package,
  finance: Icons.Banknote,
}

const iconActMap: Record<string, React.ComponentType<any>> = {
  FileText: Icons.FileText,
  CheckCircle: Icons.CheckCircle,
  Package: Icons.Package,
  UserPlus: Icons.UserPlus,
  TicketCheck: Icons.TicketCheck,
}

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="grid gap-4 mb-5"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(224px, 1fr))' }}
      >
        {KPI_DATA.map((k, i) => {
          const IconComp = iconMap[k.icon]
          return (
            <div key={i} className="card-orbit" style={{ padding: '18px 18px 14px' }}>
              <div className="flex items-center justify-between mb-3.5">
                <div
                  className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center"
                  style={{ background: k.tint, color: k.accent }}
                >
                  {IconComp && <IconComp className="w-[19px] h-[19px]" strokeWidth={1.9} />}
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-lg"
                  style={{ color: k.good ? '#16A34A' : '#DC2626', background: k.good ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)' }}
                >
                  {k.down ? (
                    <Icons.ArrowDown className="w-3 h-3" strokeWidth={3} />
                  ) : (
                    <Icons.ArrowUp className="w-3 h-3" strokeWidth={3} />
                  )}
                  {k.delta}
                </div>
              </div>
              <div className="text-[13px] font-medium mb-1" style={{ color: 'var(--muted,#64748B)' }}>{k.label}</div>
              <div className="text-[26px] font-bold tracking-tight" style={{ color: 'var(--text,#0F172A)' }}>{k.value}</div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 mb-5" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
        <div className="card-orbit" style={{ padding: '22px' }}>
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <div className="text-[15px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>Ingresos</div>
              <div className="text-[12.5px] mt-0.5" style={{ color: 'var(--muted,#64748B)' }}>Últimos 12 meses</div>
            </div>
            <div className="flex gap-1 rounded-[9px] p-0.5 border"
              style={{ background: 'var(--bg,#F8FAFC)', borderColor: 'var(--border,#E2E8F0)' }}
            >
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: 'var(--card,#fff)', color: 'var(--text,#0F172A)', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>Año</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg cursor-pointer" style={{ color: 'var(--muted,#64748B)' }}>Trimestre</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg cursor-pointer" style={{ color: 'var(--muted,#64748B)' }}>Mes</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 my-2 mb-1.5">
            <span className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--text,#0F172A)' }}>$284,920</span>
            <span className="text-[13px] font-semibold text-green-500">▲ 12.4%</span>
          </div>
          <AreaChart />
        </div>

        <div className="card-orbit" style={{ padding: '22px' }}>
          <div className="text-[15px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>Ingresos por módulo</div>
          <div className="text-[12.5px] mt-0.5 mb-2" style={{ color: 'var(--muted,#64748B)' }}>Distribución del periodo</div>
          <DonutChart />
          <div className="flex flex-col gap-2">
            {DONUT_SEGMENTS.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-[9px] h-[9px] rounded-sm" style={{ background: d.color }} />
                <span className="flex-1 text-[13px] font-medium" style={{ color: 'var(--text,#0F172A)' }}>{d.label}</span>
                <span className="text-[13px] font-semibold" style={{ color: 'var(--muted,#64748B)' }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="card-orbit" style={{ padding: '22px' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[15px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>Ventas por día</div>
            <span className="text-xs" style={{ color: 'var(--muted,#64748B)' }}>Esta semana</span>
          </div>
          <BarChart />
        </div>

        <div className="card-orbit" style={{ padding: '22px' }}>
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-[15px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>Actividad reciente</div>
            <span className="text-xs font-semibold cursor-pointer text-blue-500">Ver todo</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {ACTIVITY_DATA.map((a, i) => {
              const IconComp = iconActMap[a.icon]
              return (
                <div key={i} className="flex gap-2.5 py-2">
                  <div
                    className="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: a.tint, color: a.color }}
                  >
                    {IconComp && <IconComp className="w-[15px] h-[15px]" strokeWidth={2} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-tight" style={{ color: 'var(--text,#0F172A)' }}>
                      <b className="font-semibold">{a.who}</b> {a.what}
                    </div>
                    <div className="text-[11.5px] mt-0.5" style={{ color: 'var(--muted,#64748B)' }}>{a.when}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card-orbit" style={{ padding: '22px' }}>
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-[15px] font-bold" style={{ color: 'var(--text,#0F172A)' }}>Próximas reuniones</div>
            <Icons.CalendarDays className="w-[17px] h-[17px] text-muted" />
          </div>
          <div className="flex flex-col gap-2.5">
            {MEETINGS_DATA.map((m, i) => (
              <div
                key={i}
                className="flex gap-3 items-center p-[9px] px-2.5 rounded-xl"
                style={{ background: 'var(--bg,#F8FAFC)', border: '1px solid var(--border,#E2E8F0)' }}
              >
                <div
                  className="flex-shrink-0 w-[46px] text-center pr-2.5"
                  style={{ borderRight: `2px solid ${m.color}` }}
                >
                  <div className="text-[15px] font-bold leading-tight" style={{ color: 'var(--text,#0F172A)' }}>{m.time}</div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: 'var(--muted,#64748B)' }}>{m.ampm}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate" style={{ color: 'var(--text,#0F172A)' }}>{m.title}</div>
                  <div className="text-[11.5px]" style={{ color: 'var(--muted,#64748B)' }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
