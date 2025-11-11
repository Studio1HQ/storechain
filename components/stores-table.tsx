"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Store } from "@/types/store"

interface StoresTableProps {
  stores: Store[]
  onView: (store: Store) => void
  onEdit: (store: Store) => void
  onDelete: (store: Store) => void
}

export function StoresTable({ stores, onView, onEdit, onDelete }: StoresTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(stores.length / itemsPerPage)

  const paginatedStores = stores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Logo</TableHead>
            <TableHead className="font-semibold text-gray-700">Store Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Address</TableHead>
            <TableHead className="font-semibold text-gray-700">Phone Number</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStores.map((store) => (
            <TableRow key={store.id} className="border-b border-gray-100 hover:bg-gray-50">
              <TableCell>
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-gray-900">{store.name}</TableCell>
              <TableCell className="text-gray-600">{store.location}</TableCell>
              <TableCell className="text-gray-600">{store.phone}</TableCell>
              <TableCell className="text-gray-600">{store.email}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={() => onView(store)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => onEdit(store)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(store)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            className={cn("h-8 w-8", currentPage === page && "bg-red-600 hover:bg-red-700 text-white")}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
