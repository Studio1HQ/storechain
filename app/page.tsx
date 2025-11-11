"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { StoresTable } from "@/components/stores-table"
import { AddStoreModal } from "@/components/add-store-modal"
import { EditStoreModal } from "@/components/edit-store-modal"
import { DeleteStoreModal } from "@/components/delete-store-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Store } from "@/types/store"

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [stores, setStores] = useState<Store[]>([
    {
      id: "1",
      name: "Downtown Store",
      location: "123 Main St, Downtown City",
      phone: "(555) 123-4567",
      email: "downtown@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Uptown Store",
      location: "456 High St, Uptown City",
      phone: "(555) 234-5678",
      email: "uptown@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Suburb Store",
      location: "789 Suburb Ln, Suburb City",
      phone: "(555) 345-6789",
      email: "suburb@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Eastside Store",
      location: "101 East St, Eastside City",
      phone: "(555) 456-7890",
      email: "eastside@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Westside Store",
      location: "202 West Ave, Westside City",
      phone: "(555) 567-8901",
      email: "westside@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Northside Store",
      location: "303 North Rd, Northside City",
      phone: "(555) 678-9012",
      email: "northside@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Southside Store",
      location: "404 South Blvd, Southside City",
      phone: "(555) 789-0123",
      email: "southside@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "Central Store",
      location: "505 Central St, City",
      phone: "(555) 890-1234",
      email: "central@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      name: "Riverbank Store",
      location: "606 River Rd, Riverbank City",
      phone: "(555) 901-2345",
      email: "riverbank@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      name: "Hilltop Store",
      location: "707 Hilltop Dr, Hilltop City",
      phone: "(555) 112-2334",
      email: "hilltop@example.com",
      managerCode: "******",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleAddStore = (store: Omit<Store, "id">) => {
    const newStore: Store = {
      ...store,
      id: String(stores.length + 1),
    }
    setStores([...stores, newStore])
    setIsAddModalOpen(false)
  }

  const handleEditStore = (updatedStore: Store) => {
    setStores(stores.map((s) => (s.id === updatedStore.id ? updatedStore : s)))
    setIsEditModalOpen(false)
    setSelectedStore(null)
  }

  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter((s) => s.id !== storeId))
    setIsDeleteModalOpen(false)
    setSelectedStore(null)
  }

  const handleView = (store: Store) => {
    setSelectedStore(store)
    setIsViewModalOpen(true)
  }

  const handleEdit = (store: Store) => {
    setSelectedStore(store)
    setIsEditModalOpen(true)
  }

  const handleDelete = (store: Store) => {
    setSelectedStore(store)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Store
            </Button>
          </div>

          <StoresTable stores={stores} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </main>

      <AddStoreModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddStore} />

      {selectedStore && (
        <>
          <EditStoreModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            store={selectedStore}
            onSubmit={handleEditStore}
          />

          <DeleteStoreModal
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            store={selectedStore}
            onConfirm={() => handleDeleteStore(selectedStore.id)}
          />
        </>
      )}
    </div>
  )
}
