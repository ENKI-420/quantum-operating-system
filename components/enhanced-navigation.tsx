"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Home,
  Activity,
  Shield,
  Users,
  GitBranch,
  Gauge,
  BarChart3,
  FileText,
  Cpu,
  Zap,
  Settings,
  HelpCircle,
} from "lucide-react"

const navigationItems = [
  { href: "/", label: "Home", icon: Home, category: "Main" },
  { href: "/quantum-platform", label: "Quantum Platform", icon: Cpu, category: "Platform" },
  { href: "/production-readiness", label: "Production Readiness", icon: Zap, category: "Operations" },
  { href: "/error-monitoring", label: "Error Monitoring", icon: Activity, category: "Operations" },
  { href: "/user-management", label: "User Management", icon: Users, category: "Operations" },
  { href: "/cicd-testing", label: "CI/CD & Testing", icon: GitBranch, category: "Operations" },
  { href: "/performance-optimization", label: "Performance", icon: Gauge, category: "Operations" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, category: "Insights" },
  { href: "/security", label: "Security", icon: Shield, category: "Compliance" },
  { href: "/strategic-plan", label: "Strategic Plan", icon: FileText, category: "Planning" },
  { href: "/assessment", label: "Technical Assessment", icon: FileText, category: "Planning" },
]

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const categories = Array.from(new Set(navigationItems.map((item) => item.category)))

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-background/95 backdrop-blur-md border-primary/20">
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DNALANG Platform
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Quantum Computing Interface</p>
          </div>

          <nav className="flex-1 overflow-y-auto" aria-label="Main navigation">
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {navigationItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-border pt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-sm" onClick={() => setIsOpen(false)}>
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-sm" onClick={() => setIsOpen(false)}>
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Help & Documentation
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
