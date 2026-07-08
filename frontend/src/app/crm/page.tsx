'use client'

import { useState } from 'react'
import { ClientTable } from '@/components/crm/client-table'
import { ClientModal } from '@/components/crm/client-modal'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Search, Filter, Plus } from 'lucide-react'

export default function CrmPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editClient, setEditClient] = useState<any>(null)
  const [deleteClient, setDeleteClient] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (c: any) => { setEditClient(c); setModalOpen(true) }
  const handleDelete = (c: any) => setDeleteClient(c)
  const confirmDelete = async () => {
    if (!deleteClient) return
    await fetch(`http://localhost:4000/api/v1/crm/${deleteClient.id}`, { method: 'DELETE' })
    setDeleteClient(null); setRefreshKey(k => k + 1)
  }
  const handleSave = () => setRefreshKey(k => k + 1)
  const handleClose = () => { setModalOpen(false); setEditClient(null) }
  const handleNew = () => { setEditClient(null); setModalOpen(true) }

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="flex items-center justify-between mb-[18px] flex-wrap gap-3">
        <div className="flex gap-2.5 ml-auto">
          <div className="h-10 flex items-center gap-2 px-3 rounded-[10px] border" style={{ background: 'var(--card,#fff)', borderColor: 'var(--border,#E2E8F0)' }}>
            <Search className="w-[15px] h-[15px] text-muted" />
            <input placeholder="Buscar cliente…" className="input-orbit" style={{ width: '150px' }} />
          </div>
          <button className="btn-ghost h-10"><Filter className="w-[15px] h-[15px]" />Filtros</button>
          <button className="btn-primary h-10" onClick={handleNew}><Plus className="w-4 h-4" strokeWidth={2.2} />Nuevo cliente</button>
        </div>
      </div>
      <ClientTable key={refreshKey} onEdit={handleEdit} onDelete={handleDelete} />
      <ClientModal open={modalOpen} onClose={handleClose} onSave={handleSave} client={editClient} />
      <ConfirmDialog open={!!deleteClient} title="Eliminar cliente" message={`¿Eliminar a "${deleteClient?.name}"?`} onConfirm={confirmDelete} onCancel={() => setDeleteClient(null)} />
    </div>
  )
}
