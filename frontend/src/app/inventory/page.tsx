'use client'

import { useState } from 'react'
import { InventoryTable } from '@/components/inventory/inventory-table'
import { InventoryModal } from '@/components/inventory/inventory-modal'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Plus, Filter } from 'lucide-react'

export default function InventoryPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (e: any) => { setEditItem(e); setModalOpen(true) }
  const handleDelete = (e: any) => setDeleteItem(e)
  const confirmDelete = async () => {
    if (!deleteItem) return
    await fetch(`http://localhost:4000/api/v1/inventory/${deleteItem.id}`, { method: 'DELETE' })
    setDeleteItem(null)
    setRefreshKey(k => k + 1)
  }
  const handleSave = () => setRefreshKey(k => k + 1)
  const handleClose = () => { setModalOpen(false); setEditItem(null) }
  const handleNew = () => { setEditItem(null); setModalOpen(true) }

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="flex items-center justify-between mb-[18px] flex-wrap gap-3">
        <div className="text-[20px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>Inventario</div>
        <div className="flex gap-2.5">
          <button className="btn-ghost h-10"><Filter className="w-[15px] h-[15px]" />Filtros</button>
          <button className="btn-primary h-10" onClick={handleNew}><Plus className="w-4 h-4" strokeWidth={2.2} />Nuevo producto</button>
        </div>
      </div>
      <InventoryTable key={refreshKey} onEdit={handleEdit} onDelete={handleDelete} />
      <InventoryModal open={modalOpen} onClose={handleClose} onSave={handleSave} item={editItem} />
      <ConfirmDialog
        open={!!deleteItem}
        title="Eliminar producto"
        message={`¿Eliminar "${deleteItem?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  )
}
