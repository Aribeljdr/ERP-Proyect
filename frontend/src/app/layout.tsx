'use client'

import { useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Navbar } from '@/components/layout/navbar'
import { CommandPalette } from '@/components/layout/command-palette'
import { Toast } from '@/components/layout/toast'
import { useTheme } from '@/hooks/use-theme'
import { useCmdPalette } from '@/hooks/use-cmd-palette'
import { useToast } from '@/hooks/use-toast'
import '@/styles/globals.css'

const viewFromPath: Record<string, string> = {
  '/': 'dashboard',
  '/crm': 'crm',
  '/sales': 'sales',
  '/invoicing': 'invoicing',
  '/purchases': 'purchases',
  '/inventory': 'inventory',
  '/projects': 'projects',
  '/tickets': 'tickets',
  '/campaigns': 'campaigns',
  '/email-templates': 'email-templates',
  '/landing-pages': 'landing-pages',
  '/expenses': 'expenses',
  '/treasury': 'treasury',
  '/accounting': 'accounting',
  '/employees': 'employees',
  '/payroll': 'payroll',
  '/attendance': 'attendance',
  '/docs': 'docs',
  '/reports': 'reports',
  '/settings': 'settings',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const currentView = viewFromPath[pathname] || 'dashboard'

  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  const navigate = useCallback((key: string) => {
    const path = key === 'dashboard' ? '/' : `/${key}`
    router.push(path)
  }, [router])

  const cmdPalette = useCmdPalette(navigate)

  const toggleCollapse = useCallback(() => {
    setSidebarExpanded(prev => !prev)
  }, [])

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&display=swap" rel="stylesheet" />
        <title>Orbit ERP</title>
      </head>
      <body style={{ margin: 0 }}>
        <div
          style={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          <Sidebar
            expanded={sidebarExpanded}
            currentView={currentView}
            onNavigate={(key) => {
              navigate(key)
              cmdPalette.setIsOpen(false)
            }}
            onToggleCollapse={toggleCollapse}
            onOpenCmd={() => cmdPalette.setIsOpen(true)}
          />

          <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
            <Navbar
              currentView={currentView}
              theme={theme}
              onToggleCollapse={toggleCollapse}
              onToggleTheme={toggleTheme}
              onOpenCmd={() => cmdPalette.setIsOpen(true)}
            />

            <main className="flex-1 overflow-y-auto" style={{ padding: '26px' }}>
              {children}
            </main>
          </div>
        </div>

        <CommandPalette
          isOpen={cmdPalette.isOpen}
          query={cmdPalette.query}
          onQueryChange={cmdPalette.setQuery}
          onNavigate={cmdPalette.navigate}
          onClose={() => cmdPalette.setIsOpen(false)}
        />

        <Toast toast={toast} />
      </body>
    </html>
  )
}
