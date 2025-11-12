"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Brain, TrendingUp, CheckCircle2, Activity, Cpu, Database, Network, BarChart3 } from "lucide-react"

interface AutoPilotMetrics {
  status: "active" | "learning" | "optimizing" | "idle"
  efficiency: number
  decisions_made: number
  cost_savings: number
  uptime: number
  active_optimizations: number
}

export function AutoPilotDashboard() {
  const [metrics, setMetrics] = useState<AutoPilotMetrics>({
    status: "active",
    efficiency: 94.7,
    decisions_made: 1247,
    cost_savings: 34.2,
    uptime: 99.97,
    active_optimizations: 8,
  })

  const [recentDecisions, setRecentDecisions] = useState([
    {
      id: 1,
      time: "2 min ago",
      action: "Backend Selection",
      decision: "Switched to ibm_kyoto (lower queue depth)",
      impact: "+15% faster execution",
      status: "success",
    },
    {
      id: 2,
      time: "8 min ago",
      action: "Circuit Optimization",
      decision: "Applied QWC compilation pass",
      impact: "40% gate reduction",
      status: "success",
    },
    {
      id: 3,
      time: "12 min ago",
      action: "Resource Allocation",
      decision: "Scaled down idle workers",
      impact: "$12/hr cost savings",
      status: "success",
    },
    {
      id: 4,
      time: "18 min ago",
      action: "Error Mitigation",
      decision: "Enabled adaptive readout correction",
      impact: "+8% fidelity improvement",
      status: "success",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        efficiency: Math.min(99, prev.efficiency + Math.random() * 0.5 - 0.2),
        decisions_made: prev.decisions_made + Math.floor(Math.random() * 3),
        cost_savings: prev.cost_savings + Math.random() * 0.1,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <Card className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-900/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Auto-Pilot System Active</h3>
                <p className="text-sm text-green-300">Autonomous optimization and decision-making enabled</p>
              </div>
            </div>
            <Badge className="bg-green-600 text-white border-0 text-sm px-4 py-2">
              <Activity className="mr-2 h-4 w-4" />
              {metrics.active_optimizations} Active Optimizations
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 text-xs">
                ML-Driven
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.efficiency.toFixed(1)}%</div>
            <div className="text-sm text-[#c6c6c6]">System Efficiency</div>
            <Progress value={metrics.efficiency} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                Real-time
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.decisions_made.toLocaleString()}</div>
            <div className="text-sm text-[#c6c6c6]">Decisions Made</div>
            <div className="text-xs text-green-400 mt-1">+{Math.floor(metrics.decisions_made / 24)}/hour</div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
                Optimized
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">${metrics.cost_savings.toFixed(1)}K</div>
            <div className="text-sm text-[#c6c6c6]">Cost Savings (Today)</div>
            <div className="text-xs text-purple-400 mt-1">$2.1M projected annually</div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
                Reliable
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.uptime}%</div>
            <div className="text-sm text-[#c6c6c6]">System Uptime</div>
            <div className="text-xs text-cyan-400 mt-1">99.9% SLA guaranteed</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Decisions */}
      <Card className="bg-[#262626] border-[#393939]">
        <CardHeader>
          <CardTitle className="text-white">Recent Auto-Pilot Decisions</CardTitle>
          <CardDescription className="text-[#c6c6c6]">
            Real-time autonomous optimization actions and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDecisions.map((decision) => (
              <div
                key={decision.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#161616] border border-[#393939] hover:border-[#525252] transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white">{decision.action}</h4>
                    <span className="text-xs text-[#8d8d8d]">{decision.time}</span>
                  </div>
                  <p className="text-sm text-[#c6c6c6] mb-2">{decision.decision}</p>
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-xs">
                    {decision.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#262626] border-[#393939]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white text-base">Backend Selection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#c6c6c6] mb-4">
              Automatically selects optimal quantum backend based on queue depth, error rates, and job requirements
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Selections Today</span>
                <span className="text-white font-medium">342</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Avg. Improvement</span>
                <span className="text-green-400 font-medium">+23%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white text-base">Circuit Optimization</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#c6c6c6] mb-4">
              Applies QWC compilation and gate reduction techniques to minimize circuit depth and execution time
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Circuits Optimized</span>
                <span className="text-white font-medium">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Avg. Gate Reduction</span>
                <span className="text-purple-400 font-medium">-38%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-white text-base">Resource Allocation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#c6c6c6] mb-4">
              Dynamically scales compute resources and manages job queues to optimize cost and performance
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Scaling Events</span>
                <span className="text-white font-medium">89</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8d8d8d]">Cost Savings</span>
                <span className="text-cyan-400 font-medium">$34.2K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
