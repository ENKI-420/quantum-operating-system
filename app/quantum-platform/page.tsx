"use client"
import { CarbonHeader } from "@/components/carbon-header"
import { CircuitBuilderPanel } from "@/components/circuit-builder-panel"
import { BackendSelectorPanel } from "@/components/backend-selector-panel"
import { DNALangEditor } from "@/components/dnalang-editor"
import { AnalyticsDashboardPanel } from "@/components/analytics-dashboard-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QuantumPlatformPage() {
  return (
    <div className="min-h-screen bg-black">
      <CarbonHeader />
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="circuit-builder" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="circuit-builder">Circuit Builder</TabsTrigger>
            <TabsTrigger value="backend-selector">Backend Selector</TabsTrigger>
            <TabsTrigger value="dnalang-editor">DNALang Editor</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="circuit-builder">
            <CircuitBuilderPanel />
          </TabsContent>

          <TabsContent value="backend-selector">
            <BackendSelectorPanel />
          </TabsContent>

          <TabsContent value="dnalang-editor">
            <DNALangEditor />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboardPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
