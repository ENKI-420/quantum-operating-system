"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Zap, DollarSign, Activity } from "lucide-react"

export function ResourceOptimization() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-white">Resource Optimization Strategies</CardTitle>
          <CardDescription className="text-blue-300">
            Autonomous optimization for cost efficiency and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-blue-950/30 border-blue-900/50">
              <CardContent className="pt-6">
                <TrendingDown className="h-8 w-8 text-blue-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">70%</div>
                <div className="text-sm text-blue-300">Operational Overhead Reduction</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-950/30 border-purple-900/50">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-purple-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">40%</div>
                <div className="text-sm text-purple-300">Performance Improvement</div>
              </CardContent>
            </Card>
            <Card className="bg-green-950/30 border-green-900/50">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-green-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">$2M+</div>
                <div className="text-sm text-green-300">Annual Savings per Deployment</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-950/30 border-cyan-900/50">
              <CardContent className="pt-6">
                <Activity className="h-8 w-8 text-cyan-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-cyan-300">Uptime SLA</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-950/30 border-blue-900/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quantum Resource Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-100">
              <div>
                <h4 className="font-semibold text-white mb-2">Circuit Depth Reduction</h4>
                <p className="text-sm leading-relaxed mb-3">
                  QWC compilation reduces circuit depth by 35% on average, directly translating to reduced quantum
                  volume requirements and lower costs on IBM Quantum hardware.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                    <div className="text-xs text-blue-400 mb-1">Standard Qiskit</div>
                    <div className="text-lg font-bold text-white">~150 gates</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded border border-green-900/30">
                    <div className="text-xs text-green-400 mb-1">DNALANG QWC</div>
                    <div className="text-lg font-bold text-white">~98 gates</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Fidelity Improvement</h4>
                <p className="text-sm leading-relaxed">
                  Higher fidelity means fewer circuit repetitions needed to achieve target accuracy, reducing total
                  quantum execution time by up to 60%.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-950/30 border-purple-900/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Hybrid Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-purple-100">
              <p className="text-sm leading-relaxed">
                DNALANG's quantum swarm coordination automatically distributes workloads across quantum and classical
                resources, optimizing for cost, performance, and availability in real-time.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Quantum Tasks</span>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      High Priority
                    </Badge>
                  </div>
                  <div className="text-xs text-purple-200">
                    Automatically routed to IBM Quantum hardware when quantum advantage is predicted
                  </div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Classical Tasks</span>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      Standard Priority
                    </Badge>
                  </div>
                  <div className="text-xs text-purple-200">
                    Executed on IBM Cloud Code Engine with auto-scaling based on demand
                  </div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Hybrid Tasks</span>
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                      Optimized
                    </Badge>
                  </div>
                  <div className="text-xs text-purple-200">
                    Dynamically split between quantum and classical based on real-time cost-benefit analysis
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/30 border-green-900/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Cost Optimization Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-green-100">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Predictive Scaling:</strong> ML-based demand forecasting reduces
                    over-provisioning by 45%
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Spot Instance Optimization:</strong> Automatic failover to reserved
                    instances when spot prices spike
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Resource Pooling:</strong> Multi-tenant resource sharing reduces
                    per-client infrastructure costs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Quantum Job Batching:</strong> Intelligent batching reduces quantum
                    hardware access costs by 30%
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
