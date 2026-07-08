const API_BASE = 'http://localhost:4000/api/v1'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export const api = {
  dashboard: {
    get: () => fetchAPI<any>('/dashboard'),
  },
  crm: {
    list: (params?: { q?: string; status?: string; page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.q) search.set('q', params.q)
      if (params?.status && params.status !== 'all') search.set('status', params.status)
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/crm${qs ? `?${qs}` : ''}`)
    },
    get: (id: string) => fetchAPI<any>(`/crm/${id}`),
    create: (data: any) =>
      fetchAPI<any>('/crm', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      fetchAPI<any>(`/crm/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) =>
      fetchAPI<any>(`/crm/${id}`, { method: 'DELETE' }),
  },
  projects: {
    getBoard: () => fetchAPI<any>('/projects/board'),
    moveCard: (id: string, toColumn: string) =>
      fetchAPI<any>(`/projects/cards/${id}/move`, {
        method: 'PUT',
        body: JSON.stringify({ toColumn }),
      }),
    createCard: (data: any) =>
      fetchAPI<any>('/projects/cards', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateCard: (id: string, data: any) =>
      fetchAPI<any>(`/projects/cards/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteCard: (id: string) =>
      fetchAPI<any>(`/projects/cards/${id}`, { method: 'DELETE' }),
  },
  sales: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/sales${qs ? `?${qs}` : ''}`)
    },
  },
  invoicing: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/invoices${qs ? `?${qs}` : ''}`)
    },
  },
  campaigns: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/campaigns${qs ? `?${qs}` : ''}`)
    },
  },
  emailTemplates: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/email-templates${qs ? `?${qs}` : ''}`)
    },
  },
  landingPages: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/landing-pages${qs ? `?${qs}` : ''}`)
    },
  },
  expenses: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/expenses${qs ? `?${qs}` : ''}`)
    },
  },
  treasury: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/treasury${qs ? `?${qs}` : ''}`)
    },
  },
  documents: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/documents${qs ? `?${qs}` : ''}`)
    },
  },
  employees: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/employees${qs ? `?${qs}` : ''}`)
    },
  },
  payroll: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/payroll${qs ? `?${qs}` : ''}`)
    },
  },
  attendance: {
    list: (params?: { page?: number; limit?: number }) => {
      const search = new URLSearchParams()
      if (params?.page) search.set('page', String(params.page))
      if (params?.limit) search.set('limit', String(params.limit))
      const qs = search.toString()
      return fetchAPI<any>(`/attendance${qs ? `?${qs}` : ''}`)
    },
  },
}
