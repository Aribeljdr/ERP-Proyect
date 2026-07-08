'use client'

import { useState } from 'react'
import { ExpensesTable } from '@/components/expenses/expenses-table'
import { ExpenseModal } from '@/components/expenses/expense-modal'
import { ConfirmDialog } from '@/components/expenses/confirm-dialog'
import { Plus, Filter } from 'lucide-react'

export default function ExpensesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editExpense, setEditExpense] = useState<any>(null)
  const [deleteExpense, setDeleteExpense] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (e: any) => { setEditExpense(e); setModalOpen(true) }
  const handleDelete = (e: any) => setDeleteExpense(e)
  const confirmDelete = async () => {
    if (!deleteExpense) return
    await fetch(`http://localhost:4000/api/v1/expenses/${deleteExpense.id}`, { method: 'DELETE' })
    setDeleteExpense(null)
    setRefreshKey(k => k + 1)
  }
  const handleSave = () => setRefreshKey(k => k + 1)
  const handleClose = () => { setModalOpen(false); setEditExpense(null) }
  const handleNew = () => { setEditExpense(null); setModalOpen(true) }

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', animation: 'fadeIn .3s ease' }}>
      <div className="flex items-center justify-between mb-[18px] flex-wrap gap-3">
        <div className="text-[20px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>Gastos</div>
        <div className="flex gap-2.5">
          <button className="btn-ghost h-10"><Filter className="w-[15px] h-[15px]" />Filtros</button>
          <button className="btn-primary h-10" onClick={handleNew}><Plus className="w-4 h-4" strokeWidth={2.2} />Nuevo gasto</button>
        </div>
      </div>
      <ExpensesTable key={refreshKey} onEdit={handleEdit} onDelete={handleDelete} />
      <ExpenseModal open={modalOpen} onClose={handleClose} onSave={handleSave} expense={editExpense} />
      <ConfirmDialog
        open={!!deleteExpense}
        title="Eliminar gasto"
        message={`¿Eliminar "${deleteExpense?.description}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteExpense(null)}
      />
    </div>
  )
}
