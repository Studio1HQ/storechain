"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Store,
  Users,
  Package,
  Settings,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Stores", icon: Store, href: "#", active: true },
  { name: "Inventory Management", icon: Users, href: "#" },
  {
    name: "Sales Analytics",
    icon: CreditCard,
    href: "#",
    hasDropdown: true,
  },
  { name: "Add New Store", icon: Package, href: "#" },
  {
    name: "Settings",
    icon: Settings,
    href: "#",
    hasDropdown: true,
  },
]

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Store Chain</h2>
            <p className="text-xs text-gray-400">Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            <button
              onClick={() => item.hasDropdown && toggleExpanded(item.name)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {item.hasDropdown &&
                (expandedItems.includes(item.name) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                ))}
            </button>
          </div>
        ))}
      </nav>
    </aside>
  )
}
