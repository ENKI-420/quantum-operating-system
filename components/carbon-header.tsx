"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Settings, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CarbonHeader() {
  return (
    <header className="h-12 bg-[#161616] border-b border-[#393939] flex items-center px-4">
      <div className="flex items-center gap-4 flex-1">
        {/* IBM Logo Area */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-[#262626]">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-white">
              IBM
            </div>
            <span className="text-sm font-medium text-white">DNALANG Quantum OS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 ml-8">
          <Button variant="ghost" className="h-8 text-sm text-white hover:bg-[#262626]">
            Dashboard
          </Button>
          <Button variant="ghost" className="h-8 text-sm text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
            Operations
          </Button>
          <Button variant="ghost" className="h-8 text-sm text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
            Analytics
          </Button>
          <Button variant="ghost" className="h-8 text-sm text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
            Settings
          </Button>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Badge className="bg-green-600 text-white border-0 h-6">Auto-Pilot Active</Badge>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
          <Settings className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 text-[#c6c6c6] hover:bg-[#262626] hover:text-white">
              <User className="h-4 w-4" />
              <span className="text-sm">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#262626] border-[#393939] text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#393939]" />
            <DropdownMenuItem className="hover:bg-[#353535]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#353535]">API Keys</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#353535]">Billing</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#393939]" />
            <DropdownMenuItem className="hover:bg-[#353535]">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
