import { IBMIntegrationFramework } from "@/components/ibm-integration-framework"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MobileFirstNavigation } from "@/components/mobile-first-navigation"
import { AIAssistant } from "@/components/ai-assistant"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <MobileFirstNavigation />
      <AIAssistant />
      <AccessibilityToolbar />

      {/* Mobile-first layout with proper spacing */}
      <div className="pb-20 md:pb-0 md:ml-64">
        <IBMIntegrationFramework />
      </div>
      <div className="fixed top-4 right-4 z-50 flex gap-2 flex-wrap">
        <Link href="/production-readiness">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            Production Readiness
          </Button>
        </Link>
        <Link href="/error-monitoring">
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
            Error Monitoring
          </Button>
        </Link>
        <Link href="/user-management">
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
            User Management
          </Button>
        </Link>
        <Link href="/cicd-testing">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            CI/CD & Testing
          </Button>
        </Link>
        <Link href="/performance-optimization">
          <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
            Performance
          </Button>
        </Link>
        {/* End of new navigation button */}
        <Link href="/quantum-platform">
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            Quantum Platform
          </Button>
        </Link>
        <Link href="/analytics">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Analytics
          </Button>
        </Link>
        <Link href="/strategic-plan">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Strategic Plan
          </Button>
        </Link>
        <Link href="/security">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            Security
          </Button>
        </Link>
        <Link href="/carbon">
          <Button className="bg-blue-600 hover:bg-blue-700">Carbon Design Demo</Button>
        </Link>
        <Link href="/assessment">
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-950/50 bg-transparent"
          >
            Technical Assessment
          </Button>
        </Link>
      </div>
    </main>
  )
}
