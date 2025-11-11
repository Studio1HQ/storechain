"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, MapPin, Phone, Mail, Lock, Crop } from "lucide-react"
import type { Store as StoreType } from "@/types/store"

const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  location: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  managerCode: z.string().min(6, "Manager code must be at least 6 characters"),
})

type StoreFormData = z.infer<typeof storeSchema>

interface EditStoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  store: StoreType
  onSubmit: (store: StoreType) => void
}

export function EditStoreModal({ open, onOpenChange, store, onSubmit }: EditStoreModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(store.logo)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      location: store.location,
      phone: store.phone,
      email: store.email,
      managerCode: store.managerCode,
    },
  })

  useEffect(() => {
    reset({
      name: store.name,
      location: store.location,
      phone: store.phone,
      email: store.email,
      managerCode: store.managerCode,
    })
    setPreviewImage(store.logo)
  }, [store, reset])

  const handleFormSubmit = (data: StoreFormData) => {
    onSubmit({
      ...store,
      ...data,
      logo: previewImage,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Branch</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Logo Preview */}
          <div className="relative bg-white rounded-lg p-4">
            <img src={previewImage || "/placeholder.svg"} alt={store.name} className="w-full h-32 object-contain" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
              >
                <Crop className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Store Name */}
          <div className="space-y-2">
            <div className="relative">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input {...register("name")} className="pl-10 bg-gray-800 border-gray-700 text-white" />
            </div>
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input {...register("location")} className="pl-10 bg-gray-800 border-gray-700 text-white" />
            </div>
            {errors.location && <p className="text-xs text-red-400">{errors.location.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input {...register("phone")} className="pl-10 bg-gray-800 border-gray-700 text-white" />
            </div>
            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input {...register("email")} type="email" className="pl-10 bg-gray-800 border-gray-700 text-white" />
            </div>
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>

          {/* Manager's Secret Code */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                {...register("managerCode")}
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
              >
                👁️
              </button>
            </div>
            {errors.managerCode && <p className="text-xs text-red-400">{errors.managerCode.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Update Branch
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
