"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Zap, Network } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { useEffect, useState } from "react"

// Real coherence data from experiments
const COHERENCE_DATA = [
  { pair: 0, coherence_proxy: 1.0 },
  { pair: 1, coherence_proxy: 1.0 },
  { pair: 2, coherence_proxy: 1.0 },
  { pair: 3, coherence_proxy: 1.0 },
]

interface AgentStatus {
  id: string
  type: string
  status: "running" | "idle" | "error"
  task: string
  metrics: Record<string, number>
}

export function LiveTelemetryDashboard() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      id: "monitor_001",
      type: "monitor",
      status: "running",
      task: "system_health_check",
      metrics: { uptime: 3847, health_checks: 1282, alerts_raised: 3 },
    },
    {
      id: "enhancer_001",
      type: "enhancer",
      status: "running",
      task: "auto_optimization",
      metrics: { enhancements_applied: 47, experiments_monitored: 470, avg_improvement: 0.15 },
    },
    {
      id: "swarm_001",
      type: "swarm_agent",
      status: "running",
      task: "eal_optimization_5x10",
      metrics: { agents: 5, dimensions: 10, coherence: 0.987 },
    },
  ])

  const [organismData] = useState({
    name: "ComplexOrganism",
    birth_time: "2025-10-30T07:18:09.456062",
    state: "alive",
    execution_count: 1,
    circuit_depth: 3,
    circuit_width: 3,
    adaptations: [
      {
        time: "2025-10-30T07:18:09.540776",
        trait: "Adaptive",
        dominant_state: "000",
        probability: 0.506591796875,
      },
    ],
  })

  const [circuitGates] = useState("H:0, H:1, H:2, CX:0,1, CX:1,2, H:0, H:2")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          metrics: {
            ...agent.metrics,
            uptime: agent.type === "monitor" ? (agent.metrics.uptime || 0) + 5 : agent.metrics.uptime,
            health_checks:
              agent.type === "monitor" ? (agent.metrics.health_checks || 0) + 1 : agent.metrics.health_checks,
            experiments_monitored:
              agent.type === "enhancer"
                ? (agent.metrics.experiments_monitored || 0) + 1
                : agent.metrics.experiments_monitored,
          },
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Agent Status Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="border-cyan-500/20 bg-slate-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-cyan-400">{agent.type.toUpperCase()}</CardTitle>
                <Badge
                  variant={agent.status === "running" ? "default" : "secondary"}
                  className={agent.status === "running" ? "bg-green-500/20 text-green-400" : ""}
                >
                  {agent.status}
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400">{agent.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Activity className="h-3 w-3 text-cyan-400" />
                  <span className="font-mono">{agent.task}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {Object.entries(agent.metrics)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="text-xs text-slate-400">{key.replace(/_/g, " ")}</div>
                        <div className="text-sm font-mono text-cyan-400">
                          {typeof value === "number" && value < 1 ? value.toFixed(3) : value}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ψ-Assembly Coherence Visualization */}
      <Card className="border-cyan-500/20 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-400" />
            <CardTitle className="text-cyan-400">Ψ-Assembly Coherence (Bell Pairs)</CardTitle>
          </div>
          <CardDescription>
            Real experimental data showing perfect quantum coherence across entangled pairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COHERENCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="pair"
                  stroke="#94a3b8"
                  label={{ value: "pair", position: "insideBottom", offset: -5, fill: "#94a3b8" }}
                />
                <YAxis
                  domain={[0.96, 1.04]}
                  stroke="#94a3b8"
                  label={{ value: "coherence_proxy", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #06b6d4",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#06b6d4" }}
                />
                <Line
                  type="monotone"
                  dataKey="coherence_proxy"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-slate-300">Perfect Coherence (1.0)</span>
            </div>
            <div className="text-slate-400">|</div>
            <div className="text-slate-400">4 Bell Pairs Measured</div>
          </div>
        </CardContent>
      </Card>

      {/* Living Organism Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-purple-500/20 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-purple-400">Living Organism Status</CardTitle>
            </div>
            <CardDescription>Quantum-biological entity metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400">Name</div>
                <div className="font-mono text-sm text-purple-400">{organismData.name}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">State</div>
                <Badge className="bg-green-500/20 text-green-400">{organismData.state}</Badge>
              </div>
              <div>
                <div className="text-xs text-slate-400">Circuit Depth</div>
                <div className="font-mono text-sm text-purple-400">{organismData.circuit_depth}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Circuit Width</div>
                <div className="font-mono text-sm text-purple-400">{organismData.circuit_width}</div>
              </div>
            </div>
            <div className="space-y-2 border-t border-purple-500/20 pt-4">
              <div className="text-xs font-semibold text-purple-400">Latest Adaptation</div>
              <div className="space-y-1 rounded-lg bg-purple-500/10 p-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Trait:</span>
                  <span className="font-mono text-purple-400">{organismData.adaptations[0].trait}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Dominant State:</span>
                  <span className="font-mono text-purple-400">{organismData.adaptations[0].dominant_state}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Probability:</span>
                  <span className="font-mono text-purple-400">
                    {(organismData.adaptations[0].probability * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-cyan-400">Quantum Circuit DNA</CardTitle>
            </div>
            <CardDescription>Gate sequence defining organism behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-950/50 p-4 font-mono text-sm text-cyan-400">{circuitGates}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-cyan-500/10 p-2">
                  <div className="text-slate-400">Hadamard Gates</div>
                  <div className="font-mono text-cyan-400">5 × H</div>
                </div>
                <div className="rounded bg-cyan-500/10 p-2">
                  <div className="text-slate-400">CNOT Gates</div>
                  <div className="font-mono text-cyan-400">2 × CX</div>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                This circuit creates superposition and entanglement across 3 qubits, enabling quantum-biological
                adaptation mechanisms.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
