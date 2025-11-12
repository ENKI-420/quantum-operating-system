"use client"

import { CarbonHeader } from "./carbon-header"
import { AutoPilotDashboard } from "./auto-pilot-dashboard"
import { CostOptimizationDashboard } from "./cost-optimization-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Zap, TrendingUp, DollarSign } from "lucide-react"

export function CarbonDashboard() {
  return (
    <div className="min-h-screen bg-[#161616]">
      <CarbonHeader />

      <div className="p-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Quantum Operations Center</h1>
            <p className="text-sm text-[#c6c6c6]">Enterprise quantum computing platform with autonomous optimization</p>
          </div>
          <Badge className="bg-blue-600 text-white border-0">IBM Quantum Runtime</Badge>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="autopilot" className="space-y-6">
          <TabsList className="bg-[#262626] border border-[#393939] p-1">
            <TabsTrigger
              value="autopilot"
              className="data-[state=active]:bg-[#393939] data-[state=active]:text-white text-[#c6c6c6]"
            >
              <Zap className="mr-2 h-4 w-4" />
              Auto-Pilot
            </TabsTrigger>
            <TabsTrigger
              value="cost"
              className="data-[state=active]:bg-[#393939] data-[state=active]:text-white text-[#c6c6c6]"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Cost Optimization
            </TabsTrigger>
            <TabsTrigger
              value="operations"
              className="data-[state=active]:bg-[#393939] data-[state=active]:text-white text-[#c6c6c6]"
            >
              <Activity className="mr-2 h-4 w-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger
              value="backends"
              className="data-[state=active]:bg-[#393939] data-[state=active]:text-white text-[#c6c6c6]"
            >
              <Cpu className="mr-2 h-4 w-4" />
              Backends
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#393939] data-[state=active]:text-white text-[#c6c6c6]"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="autopilot">
            <AutoPilotDashboard />
          </TabsContent>

          <TabsContent value="cost">
            <CostOptimizationDashboard />
          </TabsContent>

          <TabsContent value="operations">
            <Card className="bg-[#262626] border-[#393939]">
              <CardHeader>
                <CardTitle className="text-white">Quantum Operations</CardTitle>
                <CardDescription className="text-[#c6c6c6]">
                  Execute and monitor quantum circuits across IBM Quantum Network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#c6c6c6]">Operations dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backends">
            <Card className="bg-[#262626] border-[#393939]">
              <CardHeader>
                <CardTitle className="text-white">Quantum Backends</CardTitle>
                <CardDescription className="text-[#c6c6c6]">
                  Available IBM Quantum processors and simulators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#c6c6c6]">Backend management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-[#262626] border-[#393939]">
              <CardHeader>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-[#c6c6c6]">
                  Detailed metrics and insights on quantum operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#c6c6c6]">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
