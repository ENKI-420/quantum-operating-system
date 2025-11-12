"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingDown, Zap, Clock, Server, Database, ArrowDown } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const costTrendData = [
  { month: "Jan", traditional: 45000, dnalang: 28000 },
  { month: "Feb", traditional: 47000, dnalang: 26500 },
  { month: "Mar", traditional: 46500, dnalang: 25000 },
  { month: "Apr", traditional: 48000, dnalang: 24200 },
  { month: "May", traditional: 49500, dnalang: 23800 },
  { month: "Jun", traditional: 51000, dnalang: 22900 },
]

const savingsBreakdown = [
  { name: "Backend Optimization", value: 35, color: "#3b82f6" },
  { name: "Circuit Reduction", value: 28, color: "#8b5cf6" },
  { name: "Resource Scaling", value: 22, color: "#06b6d4" },
  { name: "Queue Management", value: 15, color: "#10b981" },
]

const resourceUtilization = [
  { time: "00:00", cpu: 45, memory: 52, quantum: 38 },
  { time: "04:00", cpu: 32, memory: 41, quantum: 28 },
  { time: "08:00", cpu: 68, memory: 72, quantum: 65 },
  { time: "12:00", cpu: 82, memory: 85, quantum: 78 },
  { time: "16:00", cpu: 75, memory: 78, quantum: 72 },
  { time: "20:00", cpu: 58, memory: 62, quantum: 55 },
]

export function CostOptimizationDashboard() {
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("month")

  return (
    <div className="space-y-6">
      {/* Cost Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-xs">
                <ArrowDown className="mr-1 h-3 w-3" />
                70%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">$28.1K</div>
            <div className="text-sm text-[#c6c6c6]">Monthly Cost (Current)</div>
            <div className="text-xs text-green-400 mt-1">vs $51K traditional</div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="h-5 w-5 text-blue-400" />
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 text-xs">Annual</Badge>
            </div>
            <div className="text-2xl font-bold text-white">$2.1M</div>
            <div className="text-sm text-[#c6c6c6]">Projected Annual Savings</div>
            <div className="text-xs text-blue-400 mt-1">Based on current trajectory</div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30 text-xs">Optimized</Badge>
            </div>
            <div className="text-2xl font-bold text-white">94.7%</div>
            <div className="text-sm text-[#c6c6c6]">Resource Efficiency</div>
            <div className="text-xs text-purple-400 mt-1">+12% vs baseline</div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#393939]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-cyan-400" />
              <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30 text-xs">
                <ArrowDown className="mr-1 h-3 w-3" />
                45%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white">2.3 min</div>
            <div className="text-sm text-[#c6c6c6]">Avg. Queue Time</div>
            <div className="text-xs text-cyan-400 mt-1">vs 4.2 min traditional</div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Trend Comparison */}
      <Card className="bg-[#262626] border-[#393939]">
        <CardHeader>
          <CardTitle className="text-white">Cost Trend: DNALANG vs Traditional</CardTitle>
          <CardDescription className="text-[#c6c6c6]">
            Monthly infrastructure costs showing 70% reduction with autonomous optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393939" />
              <XAxis dataKey="month" stroke="#c6c6c6" />
              <YAxis stroke="#c6c6c6" />
              <Tooltip
                contentStyle={{ backgroundColor: "#262626", border: "1px solid #393939", borderRadius: "8px" }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Line type="monotone" dataKey="traditional" stroke="#ef4444" strokeWidth={2} name="Traditional" />
              <Line type="monotone" dataKey="dnalang" stroke="#10b981" strokeWidth={2} name="DNALANG" />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-[#c6c6c6]">Traditional: $51K/month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-[#c6c6c6]">DNALANG: $22.9K/month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Breakdown */}
        <Card className="bg-[#262626] border-[#393939]">
          <CardHeader>
            <CardTitle className="text-white">Cost Savings Breakdown</CardTitle>
            <CardDescription className="text-[#c6c6c6]">
              Distribution of optimization impact by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={savingsBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {savingsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#262626", border: "1px solid #393939", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {savingsBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-[#c6c6c6]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card className="bg-[#262626] border-[#393939]">
          <CardHeader>
            <CardTitle className="text-white">Resource Utilization (24h)</CardTitle>
            <CardDescription className="text-[#c6c6c6]">Real-time monitoring of compute resource usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={resourceUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="#393939" />
                <XAxis dataKey="time" stroke="#c6c6c6" />
                <YAxis stroke="#c6c6c6" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#262626", border: "1px solid #393939", borderRadius: "8px" }}
                  labelStyle={{ color: "#ffffff" }}
                />
                <Bar dataKey="cpu" fill="#3b82f6" name="CPU" />
                <Bar dataKey="memory" fill="#8b5cf6" name="Memory" />
                <Bar dataKey="quantum" fill="#06b6d4" name="Quantum" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs text-[#c6c6c6]">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-xs text-[#c6c6c6]">Memory</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                <span className="text-xs text-[#c6c6c6]">Quantum</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Strategies */}
      <Card className="bg-[#262626] border-[#393939]">
        <CardHeader>
          <CardTitle className="text-white">Active Optimization Strategies</CardTitle>
          <CardDescription className="text-[#c6c6c6]">
            Real-time cost reduction techniques applied by Auto-Pilot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#161616] border border-[#393939]">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-white">Intelligent Backend Selection</h4>
              </div>
              <p className="text-sm text-[#c6c6c6] mb-3">
                Automatically routes jobs to the most cost-effective quantum backend based on real-time pricing, queue
                depth, and error rates
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d8d8d]">Impact</span>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">$12.3K/month saved</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#161616] border border-[#393939]">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-white">Circuit Depth Reduction</h4>
              </div>
              <p className="text-sm text-[#c6c6c6] mb-3">
                QWC compilation reduces gate count by 40%, directly lowering execution time and associated costs
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d8d8d]">Impact</span>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">$9.8K/month saved</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#161616] border border-[#393939]">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Dynamic Resource Scaling</h4>
              </div>
              <p className="text-sm text-[#c6c6c6] mb-3">
                Scales compute resources up/down based on demand, eliminating idle capacity and over-provisioning
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d8d8d]">Impact</span>
                <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30">$7.7K/month saved</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#161616] border border-[#393939]">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-white">Queue Optimization</h4>
              </div>
              <p className="text-sm text-[#c6c6c6] mb-3">
                Intelligent job batching and scheduling minimizes wait times and maximizes throughput efficiency
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d8d8d]">Impact</span>
                <Badge className="bg-green-600/20 text-green-400 border-green-600/30">$5.3K/month saved</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-900/30">
        <CardHeader>
          <CardTitle className="text-white">Return on Investment (ROI)</CardTitle>
          <CardDescription className="text-green-300">
            Financial impact of DNALANG deployment for enterprise clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-green-300 mb-1">Implementation Cost</div>
              <div className="text-3xl font-bold text-white mb-1">$150K</div>
              <div className="text-xs text-green-400">One-time setup + training</div>
            </div>
            <div>
              <div className="text-sm text-green-300 mb-1">Annual Savings</div>
              <div className="text-3xl font-bold text-white mb-1">$2.1M</div>
              <div className="text-xs text-green-400">70% cost reduction</div>
            </div>
            <div>
              <div className="text-sm text-green-300 mb-1">Payback Period</div>
              <div className="text-3xl font-bold text-white mb-1">26 days</div>
              <div className="text-xs text-green-400">Break-even in under 1 month</div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-green-950/30 border border-green-900/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">5-Year Total Savings</span>
              <span className="text-2xl font-bold text-green-400">$10.5M</span>
            </div>
            <Progress value={100} className="mt-2 h-2 bg-green-950" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
