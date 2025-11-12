"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Database, Activity, Cpu, Clock } from "lucide-react"
import {
  LineChart,
  Line,
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

interface PerformanceMetric {
  timestamp: string
  responseTime: number
  throughput: number
  cpuUsage: number
  memoryUsage: number
  networkLatency: number
}

interface OptimizationConfig {
  caching: boolean
  compression: boolean
  lazyLoading: boolean
  codesplitting: boolean
  imageOptimization: boolean
  databaseIndexing: boolean
  connectionPooling: boolean
  cdnEnabled: boolean
}

export default function PerformanceOptimizationTools() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [config, setConfig] = useState<OptimizationConfig>({
    caching: true,
    compression: true,
    lazyLoading: true,
    codesplitting: true,
    imageOptimization: true,
    databaseIndexing: true,
    connectionPooling: true,
    cdnEnabled: true,
  })
  const [cacheHitRate, setCacheHitRate] = useState(87.3)

  useEffect(() => {
    // Generate realistic performance data
    const generateData = () => {
      const data: PerformanceMetric[] = []
      const now = Date.now()
      for (let i = 30; i >= 0; i--) {
        data.push({
          timestamp: new Date(now - i * 60000).toLocaleTimeString(),
          responseTime: 50 + Math.random() * 100,
          throughput: 800 + Math.random() * 400,
          cpuUsage: 30 + Math.random() * 40,
          memoryUsage: 40 + Math.random() * 30,
          networkLatency: 10 + Math.random() * 20,
        })
      }
      return data
    }

    setMetrics(generateData())
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          timestamp: new Date().toLocaleTimeString(),
          responseTime: 50 + Math.random() * 100,
          throughput: 800 + Math.random() * 400,
          cpuUsage: 30 + Math.random() * 40,
          memoryUsage: 40 + Math.random() * 30,
          networkLatency: 10 + Math.random() * 20,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentMetrics = metrics[metrics.length - 1] || {
    responseTime: 0,
    throughput: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0,
  }

  const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length || 0
  const avgThroughput = metrics.reduce((sum, m) => sum + m.throughput, 0) / metrics.length || 0

  const optimizationImpact = [
    { name: "Caching", improvement: 45, enabled: config.caching },
    { name: "Compression", improvement: 38, enabled: config.compression },
    { name: "Lazy Loading", improvement: 32, enabled: config.lazyLoading },
    { name: "Code Splitting", improvement: 28, enabled: config.codesplitting },
    { name: "Image Optimization", improvement: 35, enabled: config.imageOptimization },
    { name: "DB Indexing", improvement: 52, enabled: config.databaseIndexing },
    { name: "Connection Pooling", improvement: 41, enabled: config.connectionPooling },
    { name: "CDN", improvement: 48, enabled: config.cdnEnabled },
  ]

  const resourceUtilization = [
    { resource: "CPU", current: currentMetrics.cpuUsage, optimal: 50, max: 100 },
    { resource: "Memory", current: currentMetrics.memoryUsage, optimal: 60, max: 100 },
    { resource: "Network", current: (currentMetrics.networkLatency / 30) * 100, optimal: 40, max: 100 },
    { resource: "Disk I/O", current: 45, optimal: 50, max: 100 },
  ]

  const bottleneckAnalysis = [
    { component: "Database Queries", score: 72, status: "warning" },
    { component: "API Response Time", score: 85, status: "good" },
    { component: "Frontend Rendering", score: 91, status: "excellent" },
    { component: "Network Latency", score: 78, status: "good" },
    { component: "Cache Hit Rate", score: 87, status: "excellent" },
    { component: "Memory Usage", score: 68, status: "warning" },
  ]

  const toggleOptimization = (key: keyof OptimizationConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Optimization Tools</h1>
          <p className="text-muted-foreground mt-2">Monitor and optimize system performance in real-time</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {avgResponseTime.toFixed(0)}ms avg response
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.responseTime.toFixed(0)}ms</div>
            <Progress value={100 - (currentMetrics.responseTime / 200) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Target: &lt;100ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.throughput.toFixed(0)}</div>
            <Progress value={(currentMetrics.throughput / 1500) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">requests/sec</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.cpuUsage.toFixed(1)}%</div>
            <Progress value={currentMetrics.cpuUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">4 cores available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{cacheHitRate.toFixed(1)}%</div>
            <Progress value={cacheHitRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList>
          <TabsTrigger value="realtime">Real-time Metrics</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottleneck Analysis</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
              <CardDescription>Real-time system performance monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#8884d8"
                    name="Response Time (ms)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="throughput"
                    stroke="#82ca9d"
                    name="Throughput (req/s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Current system resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="cpuUsage" stackId="1" stroke="#8884d8" fill="#8884d8" name="CPU %" />
                    <Area
                      type="monotone"
                      dataKey="memoryUsage"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Memory %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Performance</CardTitle>
                <CardDescription>Latency and bandwidth metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="networkLatency" stroke="#ff7300" name="Latency (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Configuration</CardTitle>
              <CardDescription>Enable or disable performance optimizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(config).map(([key, value]) => {
                  const impact = optimizationImpact.find((o) => o.name.toLowerCase().replace(/\s+/g, "") === key)
                  return (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1 flex-1">
                        <Label htmlFor={key} className="text-base font-semibold">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .split(" ")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {impact ? `${impact.improvement}% performance improvement` : "Optimization enabled"}
                        </p>
                      </div>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={() => toggleOptimization(key as keyof OptimizationConfig)}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Impact</CardTitle>
              <CardDescription>Performance improvement by optimization technique</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={optimizationImpact}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="improvement" fill="#8884d8" name="Improvement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Cache Configuration</CardTitle>
                <CardDescription>Adjust caching parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cache TTL (seconds)</Label>
                  <Slider defaultValue={[3600]} max={86400} step={300} />
                  <p className="text-xs text-muted-foreground">Current: 1 hour</p>
                </div>
                <div className="space-y-2">
                  <Label>Max Cache Size (MB)</Label>
                  <Slider defaultValue={[512]} max={2048} step={128} />
                  <p className="text-xs text-muted-foreground">Current: 512 MB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compression Settings</CardTitle>
                <CardDescription>Configure response compression</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Compression Level</Label>
                  <Slider defaultValue={[6]} max={9} step={1} />
                  <p className="text-xs text-muted-foreground">Current: Level 6</p>
                </div>
                <div className="space-y-2">
                  <Label>Min Size (KB)</Label>
                  <Slider defaultValue={[1]} max={10} step={1} />
                  <p className="text-xs text-muted-foreground">Current: 1 KB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connection Pool</CardTitle>
                <CardDescription>Database connection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pool Size</Label>
                  <Slider defaultValue={[20]} max={100} step={5} />
                  <p className="text-xs text-muted-foreground">Current: 20 connections</p>
                </div>
                <div className="space-y-2">
                  <Label>Idle Timeout (sec)</Label>
                  <Slider defaultValue={[30]} max={300} step={10} />
                  <p className="text-xs text-muted-foreground">Current: 30 seconds</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Bottleneck Analysis</CardTitle>
              <CardDescription>Identify and resolve performance issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bottleneckAnalysis.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Activity className={`h-5 w-5 ${getStatusColor(item.status)}`} />
                        <div>
                          <h4 className="font-semibold">{item.component}</h4>
                          <p className={`text-sm ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{item.score}</div>
                        <div className="text-xs text-muted-foreground">Performance Score</div>
                      </div>
                    </div>
                    <Progress value={item.score} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Slow Query Analysis</CardTitle>
                <CardDescription>Database queries requiring optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { query: "SELECT * FROM jobs WHERE...", time: 245, calls: 1247 },
                    { query: "JOIN users ON circuits...", time: 189, calls: 856 },
                    { query: "UPDATE results SET...", time: 156, calls: 423 },
                  ].map((query, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="font-mono text-sm mb-2">{query.query}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Avg: {query.time}ms</span>
                        <span>{query.calls} calls</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Automated optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Add Database Index", impact: "High", effort: "Low" },
                    { title: "Enable Query Caching", impact: "High", effort: "Low" },
                    { title: "Optimize Image Loading", impact: "Medium", effort: "Medium" },
                    { title: "Implement CDN", impact: "High", effort: "Medium" },
                  ].map((rec, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Impact: {rec.impact} • Effort: {rec.effort}
                        </div>
                      </div>
                      <Button size="sm">Apply</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization Overview</CardTitle>
              <CardDescription>Current vs optimal resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={resourceUtilization}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="resource" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Optimal" dataKey="optimal" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Auto-Scaling Configuration</CardTitle>
                <CardDescription>Automatic resource scaling rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>CPU Threshold</Label>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={5} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Memory Threshold</Label>
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                  <Slider defaultValue={[80]} max={100} step={5} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Min Instances</Label>
                    <span className="text-sm text-muted-foreground">2</span>
                  </div>
                  <Slider defaultValue={[2]} max={10} step={1} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Instances</Label>
                    <span className="text-sm text-muted-foreground">10</span>
                  </div>
                  <Slider defaultValue={[10]} max={50} step={5} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Load Balancing</CardTitle>
                <CardDescription>Distribution across instances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { instance: "Instance 1", load: 68, status: "healthy" },
                    { instance: "Instance 2", load: 72, status: "healthy" },
                    { instance: "Instance 3", load: 45, status: "healthy" },
                    { instance: "Instance 4", load: 58, status: "healthy" },
                  ].map((inst, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{inst.instance}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{inst.load}%</span>
                          <Badge variant="default">{inst.status}</Badge>
                        </div>
                      </div>
                      <Progress value={inst.load} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
