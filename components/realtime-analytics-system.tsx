"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, TrendingDown, Zap, Clock, DollarSign, Cpu, Database, AlertCircle } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function RealtimeAnalyticsSystem() {
  const [liveData, setLiveData] = useState({
    activeJobs: 42,
    queuedJobs: 15,
    completedToday: 287,
    avgCoherence: 0.892,
    totalCost: 1247.5,
    systemLoad: 68,
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setLiveData((prev) => ({
        activeJobs: Math.max(0, prev.activeJobs + Math.floor(Math.random() * 5 - 2)),
        queuedJobs: Math.max(0, prev.queuedJobs + Math.floor(Math.random() * 3 - 1)),
        completedToday: prev.completedToday + Math.floor(Math.random() * 3),
        avgCoherence: Math.min(1, Math.max(0.8, prev.avgCoherence + (Math.random() - 0.5) * 0.01)),
        totalCost: prev.totalCost + Math.random() * 2,
        systemLoad: Math.min(100, Math.max(30, prev.systemLoad + (Math.random() - 0.5) * 5)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const performanceData = [
    { time: "00:00", coherence: 0.856, fidelity: 0.912, throughput: 45 },
    { time: "04:00", coherence: 0.892, fidelity: 0.928, throughput: 52 },
    { time: "08:00", coherence: 0.878, fidelity: 0.915, throughput: 48 },
    { time: "12:00", coherence: 0.901, fidelity: 0.935, throughput: 61 },
    { time: "16:00", coherence: 0.885, fidelity: 0.921, throughput: 55 },
    { time: "20:00", coherence: 0.912, fidelity: 0.942, throughput: 58 },
  ]

  const resourceUtilization = [
    { resource: "CPU", usage: 68, capacity: 100 },
    { resource: "Memory", usage: 54, capacity: 100 },
    { resource: "Network", usage: 42, capacity: 100 },
    { resource: "Storage", usage: 31, capacity: 100 },
    { resource: "QPU", usage: 76, capacity: 100 },
  ]

  const backendPerformance = [
    { backend: "ibm_torino", fidelity: 0.956, speed: 92, cost: 85, reliability: 94 },
    { backend: "ibm_kyoto", fidelity: 0.948, speed: 88, cost: 82, reliability: 96 },
    { backend: "ibm_osaka", fidelity: 0.942, speed: 90, cost: 88, reliability: 92 },
  ]

  const costTrends = [
    { day: "Mon", actual: 1250, optimized: 875, saved: 375 },
    { day: "Tue", actual: 1420, optimized: 994, saved: 426 },
    { day: "Wed", actual: 1180, optimized: 826, saved: 354 },
    { day: "Thu", actual: 1650, optimized: 1155, saved: 495 },
    { day: "Fri", actual: 1380, optimized: 966, saved: 414 },
    { day: "Sat", actual: 980, optimized: 686, saved: 294 },
    { day: "Sun", actual: 1120, optimized: 784, saved: 336 },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Real-time Analytics System
            </h1>
            <p className="text-gray-400 mt-2">Live insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
              <span className="text-sm text-gray-400">{isLive ? "Live" : "Paused"}</span>
            </div>
            <Button onClick={() => setIsLive(!isLive)} variant="outline" size="sm">
              {isLive ? "Pause" : "Resume"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Active Jobs</p>
            <p className="text-3xl font-bold text-white">{liveData.activeJobs}</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-xs text-gray-400">Queue</span>
            </div>
            <p className="text-sm text-gray-400">Queued</p>
            <p className="text-3xl font-bold text-white">{liveData.queuedJobs}</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-green-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-3xl font-bold text-white">{liveData.completedToday}</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <Badge className="bg-green-600 text-xs">Good</Badge>
            </div>
            <p className="text-sm text-gray-400">Coherence</p>
            <p className="text-3xl font-bold text-white">{liveData.avgCoherence.toFixed(3)}</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <TrendingDown className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Cost Today</p>
            <p className="text-3xl font-bold text-white">${liveData.totalCost.toFixed(0)}</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-gray-400">{liveData.systemLoad}%</span>
            </div>
            <p className="text-sm text-gray-400">System Load</p>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${liveData.systemLoad}%` }}
              />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 grid grid-cols-5 w-full">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="backends">Backends</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Performance Metrics Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCoherence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFidelity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0.8, 1.0]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="coherence"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorCoherence)"
                    name="Coherence"
                  />
                  <Area
                    type="monotone"
                    dataKey="fidelity"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorFidelity)"
                    name="Fidelity"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gray-900/50 border-gray-800">
                <h3 className="text-xl font-bold mb-4">Job Throughput</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                    <Bar dataKey="throughput" fill="#10b981" name="Jobs/Hour" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-gray-900/50 border-gray-800">
                <h3 className="text-xl font-bold mb-4">Performance Summary</h3>
                <div className="space-y-4">
                  {[
                    { label: "Average Coherence", value: "0.889", trend: "+2.3%", color: "purple" },
                    { label: "Average Fidelity", value: "0.926", trend: "+1.8%", color: "blue" },
                    { label: "Peak Throughput", value: "61 jobs/hr", trend: "+12%", color: "green" },
                    { label: "Success Rate", value: "98.7%", trend: "+0.5%", color: "cyan" },
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                      <div>
                        <p className="text-sm text-gray-400">{metric.label}</p>
                        <p className="text-xl font-bold text-white">{metric.value}</p>
                      </div>
                      <Badge className={`bg-${metric.color}-600 text-white`}>{metric.trend}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Resource Utilization</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resourceUtilization} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" domain={[0, 100]} />
                  <YAxis dataKey="resource" type="category" stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                  <Bar dataKey="usage" fill="#3b82f6" name="Usage %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {resourceUtilization.map((resource, idx) => (
                <Card key={idx} className="p-4 bg-gray-900/50 border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">{resource.resource}</p>
                    <Badge variant={resource.usage > 80 ? "destructive" : "secondary"}>{resource.usage}%</Badge>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        resource.usage > 80 ? "bg-red-500" : resource.usage > 60 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${resource.usage}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backends" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Backend Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={backendPerformance}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="backend" stroke="#9ca3af" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                  <Radar name="Fidelity" dataKey="fidelity" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Radar name="Speed" dataKey="speed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Cost Efficiency" dataKey="cost" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {backendPerformance.map((backend, idx) => (
                <Card key={idx} className="p-6 bg-gray-900/50 border-gray-800">
                  <h4 className="text-lg font-semibold mb-4">{backend.backend}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Fidelity</span>
                        <span className="text-sm font-semibold">{backend.fidelity}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${backend.fidelity * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Speed</span>
                        <span className="text-sm font-semibold">{backend.speed}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${backend.speed}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Reliability</span>
                        <span className="text-sm font-semibold">{backend.reliability}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${backend.reliability}%` }} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Cost Optimization Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                  <Legend />
                  <Bar dataKey="actual" fill="#ef4444" name="Actual Cost" />
                  <Bar dataKey="optimized" fill="#3b82f6" name="Optimized Cost" />
                  <Bar dataKey="saved" fill="#10b981" name="Savings" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 bg-green-900/20 border-green-500/30">
                <p className="text-sm text-gray-400 mb-1">Total Saved (7d)</p>
                <p className="text-3xl font-bold text-green-400">$2,694</p>
                <p className="text-xs text-gray-500">40% reduction</p>
              </Card>
              <Card className="p-4 bg-blue-900/20 border-blue-500/30">
                <p className="text-sm text-gray-400 mb-1">Avg Daily Cost</p>
                <p className="text-3xl font-bold text-blue-400">$1,283</p>
                <p className="text-xs text-gray-500">Optimized</p>
              </Card>
              <Card className="p-4 bg-purple-900/20 border-purple-500/30">
                <p className="text-sm text-gray-400 mb-1">Cost per Job</p>
                <p className="text-3xl font-bold text-purple-400">$0.42</p>
                <p className="text-xs text-gray-500">-35% vs baseline</p>
              </Card>
              <Card className="p-4 bg-cyan-900/20 border-cyan-500/30">
                <p className="text-sm text-gray-400 mb-1">Monthly Projection</p>
                <p className="text-3xl font-bold text-cyan-400">$38.5K</p>
                <p className="text-xs text-gray-500">$15K saved</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">System Alerts & Notifications</h3>
              <div className="space-y-3">
                {[
                  {
                    type: "success",
                    title: "High Coherence Achieved",
                    message: "Coherence reached 0.912 on ibm_torino",
                    time: "2 minutes ago",
                  },
                  {
                    type: "info",
                    title: "Backend Maintenance Scheduled",
                    message: "ibm_brisbane will undergo maintenance on Jan 15",
                    time: "1 hour ago",
                  },
                  {
                    type: "success",
                    title: "Cost Optimization Success",
                    message: "Saved $495 today through intelligent backend selection",
                    time: "3 hours ago",
                  },
                  {
                    type: "info",
                    title: "New Backend Available",
                    message: "ibm_osaka_v2 is now available for testing",
                    time: "5 hours ago",
                  },
                ].map((alert, idx) => (
                  <Card
                    key={idx}
                    className={`p-4 ${
                      alert.type === "success"
                        ? "bg-green-900/20 border-green-500/30"
                        : alert.type === "warning"
                          ? "bg-yellow-900/20 border-yellow-500/30"
                          : "bg-blue-900/20 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {alert.type === "success" ? (
                        <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : alert.type === "warning" ? (
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      ) : (
                        <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{alert.title}</p>
                          <span className="text-xs text-gray-400">{alert.time}</span>
                        </div>
                        <p className="text-sm text-gray-400">{alert.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-xl font-bold mb-4">Alert Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Coherence Threshold", value: "< 0.85", enabled: true },
                  { name: "Cost Limit", value: "> $2000/day", enabled: true },
                  { name: "Queue Time", value: "> 30 min", enabled: true },
                  { name: "Error Rate", value: "> 5%", enabled: true },
                ].map((config, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <div>
                      <p className="font-semibold">{config.name}</p>
                      <p className="text-sm text-gray-400">{config.value}</p>
                    </div>
                    <Badge className={config.enabled ? "bg-green-600" : "bg-gray-600"}>
                      {config.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
