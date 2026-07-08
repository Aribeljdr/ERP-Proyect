'use client'

import { useState, useEffect, useCallback } from 'react'
import { NAV_ITEMS } from '@/lib/constants'

export function useCmdPalette(onNavigate: (key: string) => void) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
        setQuery('')
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = query
    ? NAV_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_ITEMS

  const navigate = useCallback((key: string) => {
    onNavigate(key)
    setIsOpen(false)
    setQuery('')
  }, [onNavigate])

  return { isOpen, setIsOpen, query, setQuery, filtered, navigate }
}
