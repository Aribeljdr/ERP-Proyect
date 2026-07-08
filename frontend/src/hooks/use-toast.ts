'use client'

import { useState, useCallback, useRef } from 'react'

interface Toast {
  message: string
  title?: string
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  const showToast = useCallback((title: string, message: string) => {
    setToast({ title, message })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setToast(null)
    }, 2600)
  }, [])

  return { toast, showToast }
}
