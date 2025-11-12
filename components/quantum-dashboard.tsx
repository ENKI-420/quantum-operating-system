"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VQESimulator } from "@/components/vqe-simulator"
import { CostLandscapeVisualization } from "@/components/cost-landscape-visualization"
import { QuantumTerminal } from "@/components/quantum-terminal"
import { QuantumCircuitDisplay } from "@/components/quantum-circuit-display"
import { IBMQuantumIntegration } from "@/components/ibm-quantum-integration"
import { Activity, Cpu, Zap, Cloud } from "lucide-react"

export function QuantumDashboard() {
  const [activeTab, setActiveTab] = useState("vqe")

  return (
    <div className="min-h-screen quantum-grid">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quantum-blue to-quantum-purple flex items-center justify-center quantum-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">DNALANG Quantum OS</h1>
                <p className="text-sm text-muted-foreground">Negentropic Visualization Suite</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-quantum-green/10 border border-quantum-green/20">
                <Activity className="w-4 h-4 text-quantum-green" />
                <span className="text-sm text-quantum-green font-medium">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="vqe" className="gap-2">
              <Cpu className="w-4 h-4" />
              VQE Simulator
            </TabsTrigger>
            <TabsTrigger value="landscape" className="gap-2">
              <Activity className="w-4 h-4" />
              Cost Landscape
            </TabsTrigger>
            <TabsTrigger value="circuit" className="gap-2">
              <Zap className="w-4 h-4" />
              Circuit Display
            </TabsTrigger>
            <TabsTrigger value="ibm" className="gap-2">
              <Cloud className="w-4 h-4" />
              IBM Quantum
            </TabsTrigger>
            <TabsTrigger value="terminal" className="gap-2">
              <Cpu className="w-4 h-4" />
              Terminal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vqe" className="space-y-6">
            <VQESimulator />
          </TabsContent>

          <TabsContent value="landscape" className="space-y-6">
            <CostLandscapeVisualization />
          </TabsContent>

          <TabsContent value="circuit" className="space-y-6">
            <QuantumCircuitDisplay />
          </TabsContent>

          <TabsContent value="ibm" className="space-y-6">
            <IBMQuantumIntegration />
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <QuantumTerminal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
