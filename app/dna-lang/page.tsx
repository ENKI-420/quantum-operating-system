"use client"

import DNALangVisualizer from "@/components/DNALangVisualizer"
import { Navigation } from "@/components/Navigation"

export default function DNALangPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DNALangVisualizer />
    </div>
  )
}
