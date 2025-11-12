import { UXEnhancementDashboard } from "@/components/ux-enhancement-dashboard"
import { QuantumCircuitVisualizer } from "@/components/quantum-circuit-visualizer"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"

export default function UXEnhancementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <AccessibilityToolbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            UI/UX Enhancement Plan
          </h1>
          <p className="text-muted-foreground">
            Comprehensive improvements to navigation, accessibility, and user experience
          </p>
        </div>

        <div className="space-y-8">
          <UXEnhancementDashboard />

          <div>
            <h2 className="text-2xl font-bold mb-4">Advanced Data Visualization</h2>
            <QuantumCircuitVisualizer />
          </div>
        </div>
      </main>
    </div>
  )
}
