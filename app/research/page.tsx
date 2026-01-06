"use client"

import { ResearchDashboard } from "@/components/ResearchDashboard"
import { Navigation } from "@/components/Navigation"

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ResearchDashboard />
    </div>
  )
}
