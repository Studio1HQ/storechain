"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Store } from "@/types/store"

interface DeleteStoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  store: Store
  onConfirm: () => void
}

export function DeleteStoreModal({ open, onOpenChange, store, onConfirm }: DeleteStoreModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-800">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">This is an irreversible action.</h3>
            <p className="text-sm text-gray-400">Are you sure you want to delete "{store.name}"?</p>
          </div>

          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-gray-700 text-white hover:bg-gray-800"
              onClick={() => onOpenChange(false)}
            >
              No
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
