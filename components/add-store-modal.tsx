"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, MapPin, Phone, Mail, Lock, Plus, ImageIcon, X, Eye, EyeOff } from "lucide-react"
import type { Store as StoreType } from "@/types/store"

const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  location: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  managerCode: z.string().min(6, "Manager code must be at least 6 characters"),
  logo: z.string().optional(),
})

type StoreFormData = z.infer<typeof storeSchema>

interface AddStoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (store: Omit<StoreType, "id">) => void
}

export function AddStoreModal({ open, onOpenChange, onSubmit }: AddStoreModalProps) {
  const [previewImage, setPreviewImage] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  })

  const handleFormSubmit = (data: StoreFormData) => {
    onSubmit({
      ...data,
      logo: previewImage || "/placeholder.svg?height=40&width=40",
    })
    reset()
    setPreviewImage("")
    onOpenChange(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[553px] bg-(--color-modal-bg) text-white border border-(--color-modal-border) rounded-[18px] p-0 font-[family-name:--font-onest]">
        <DialogHeader className="px-[29px] pt-[30px] pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold capitalize">Create New Store</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-6 w-6" strokeWidth={1.8} />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-[30px] pb-[30px] space-y-[12px]">
          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center border border-dashed border-(--color-input-border) rounded-lg py-[48px] bg-(--color-input-bg)">
            {previewImage ? (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Preview"
                className="w-24 h-24 rounded-lg object-cover mb-4"
              />
            ) : (
              <ImageIcon className="w-[39px] h-[30px] text-white mb-[20px]" strokeWidth={1.5} />
            )}
            <p className="text-xl font-normal mb-[8px]">
              Drop your image here or{" "}
              <label htmlFor="image-upload" className="text-[#5B9FFF] cursor-pointer hover:underline">
                Browse
              </label>
            </p>
            <p className="text-[17px] font-normal text-(--color-text-gray)">Supports JPG. JPEG, PNG</p>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Store Name */}
          <div className="space-y-2">
            <div className="relative bg-(--color-input-bg) rounded-lg">
              <User className="absolute left-[19px] top-1/2 -translate-y-1/2 w-[13px] h-[19px] text-(--color-text-gray)" strokeWidth={1} />
              <Input
                {...register("name")}
                placeholder="Store Name"
                className="pl-[52px] pr-4 h-[73px] bg-transparent border-0 text-white text-lg font-normal placeholder:text-(--color-text-gray) focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 pl-4">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <div className="relative bg-(--color-input-bg) rounded-lg">
              <MapPin className="absolute left-[17px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-(--color-text-gray)" strokeWidth={1.5} />
              <Input
                {...register("location")}
                placeholder="Address"
                className="pl-[52px] pr-4 h-[71px] bg-transparent border-0 text-white text-lg font-normal placeholder:text-(--color-text-gray) focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.location && <p className="text-xs text-red-400 pl-4">{errors.location.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <div className="relative bg-(--color-input-bg) rounded-lg">
              <Phone className="absolute left-[19px] top-1/2 -translate-y-1/2 w-[20px] h-[21px] text-(--color-text-gray)" strokeWidth={1.5} />
              <Input
                {...register("phone")}
                placeholder="Phone Number"
                className="pl-[52px] pr-4 h-[73px] bg-transparent border-0 text-white text-lg font-normal placeholder:text-(--color-text-gray) focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-400 pl-4">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="relative bg-(--color-input-bg) rounded-lg">
              <Mail className="absolute left-[17px] top-1/2 -translate-y-1/2 w-[18px] h-[20px] text-(--color-text-gray)" strokeWidth={0} fill="currentColor" />
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="pl-[52px] pr-4 h-[66px] bg-transparent border-0 text-white text-lg font-normal placeholder:text-(--color-text-gray) focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 pl-4">{errors.email.message}</p>}
          </div>

          {/* Store's code */}
          <div className="space-y-2">
            <div className="relative bg-(--color-input-bg) rounded-lg">
              <Lock className="absolute left-[19px] top-1/2 -translate-y-1/2 w-[14px] h-[18px] text-(--color-text-gray)" strokeWidth={1.5} />
              <Input
                {...register("managerCode")}
                type={showPassword ? "text" : "password"}
                placeholder="Store's code"
                className="pl-[52px] pr-12 h-[66px] bg-transparent border-0 text-white text-lg font-normal placeholder:text-(--color-text-gray) focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--color-text-gray) hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.managerCode && <p className="text-xs text-red-400 pl-4">{errors.managerCode.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full h-[64px] bg-(--color-red-primary) hover:bg-(--color-red-primary)/90 text-white text-xl font-semibold rounded-xl mt-[16px]"
          >
            <Plus className="w-[22px] h-[22px] mr-2" strokeWidth={1.5} />
            Create New Store
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}