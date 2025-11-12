"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Activity, Zap, Shield, TrendingUp, Bell, Settings } from "lucide-react"
import {
  LineChart,
  Line,
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

interface ErrorMetrics {
  timestamp: string
  readoutError: number
  gateError: number
  coherenceError: number
  mitigatedError: number
}

interface AlertRule {
  id: string
  name: string
  metric: string
  threshold: number
  enabled: boolean
  severity: "critical" | "warning" | "info"
}

export default function ErrorCorrectionMonitoring() {
  const [errorData, setErrorData] = useState<ErrorMetrics[]>([])
  const [mitigationEnabled, setMitigationEnabled] = useState({
    zne: true,
    readout: true,
    dynamical: false,
    measurement: true,
  })
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "High Gate Error Rate",
      metric: "gate_error",
      threshold: 0.05,
      enabled: true,
      severity: "critical",
    },
    {
      id: "2",
      name: "Readout Error Spike",
      metric: "readout_error",
      threshold: 0.1,
      enabled: true,
      severity: "warning",
    },
    {
      id: "3",
      name: "Coherence Degradation",
      metric: "coherence_error",
      threshold: 0.15,
      enabled: true,
      severity: "warning",
    },
    {
      id: "4",
      name: "Mitigation Failure",
      metric: "mitigation_error",
      threshold: 0.2,
      enabled: false,
      severity: "info",
    },
  ])

  useEffect(() => {
    // Generate realistic error data
    const generateData = () => {
      const data: ErrorMetrics[] = []
      const now = Date.now()
      for (let i = 30; i >= 0; i--) {
        const baseReadout = 0.03 + Math.random() * 0.02
        const baseGate = 0.02 + Math.random() * 0.015
        const baseCoherence = 0.05 + Math.random() * 0.03
        const mitigated = Math.max(0.01, (baseReadout + baseGate + baseCoherence) * 0.4)

        data.push({
          timestamp: new Date(now - i * 60000).toLocaleTimeString(),
          readoutError: Number.parseFloat(baseReadout.toFixed(4)),
          gateError: Number.parseFloat(baseGate.toFixed(4)),
          coherenceError: Number.parseFloat(baseCoherence.toFixed(4)),
          mitigatedError: Number.parseFloat(mitigated.toFixed(4)),
        })
      }
      return data
    }

    setErrorData(generateData())
    const interval = setInterval(() => {
      setErrorData((prev) => {
        const newData = [...prev.slice(1)]
        const last = prev[prev.length - 1]
        newData.push({
          timestamp: new Date().toLocaleTimeString(),
          readoutError: Number.parseFloat((0.03 + Math.random() * 0.02).toFixed(4)),
          gateError: Number.parseFloat((0.02 + Math.random() * 0.015).toFixed(4)),
          coherenceError: Number.parseFloat((0.05 + Math.random() * 0.03).toFixed(4)),
          mitigatedError: Number.parseFloat(Math.max(0.01, (0.03 + 0.02 + 0.05) * 0.4).toFixed(4)),
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentMetrics = errorData[errorData.length - 1] || {
    readoutError: 0,
    gateError: 0,
    coherenceError: 0,
    mitigatedError: 0,
  }

  const errorReduction =
    currentMetrics.readoutError + currentMetrics.gateError + currentMetrics.coherenceError > 0
      ? (1 -
          currentMetrics.mitigatedError /
            (currentMetrics.readoutError + currentMetrics.gateError + currentMetrics.coherenceError)) *
        100
      : 0

  const radarData = [
    { metric: "Readout", value: (1 - currentMetrics.readoutError) * 100, fullMark: 100 },
    { metric: "Gate", value: (1 - currentMetrics.gateError) * 100, fullMark: 100 },
    { metric: "Coherence", value: (1 - currentMetrics.coherenceError) * 100, fullMark: 100 },
    { metric: "Overall", value: (1 - currentMetrics.mitigatedError) * 100, fullMark: 100 },
  ]

  const mitigationStats = [
    { name: "ZNE", reduction: 45, active: mitigationEnabled.zne },
    { name: "Readout", reduction: 38, active: mitigationEnabled.readout },
    { name: "Dynamical", reduction: 22, active: mitigationEnabled.dynamical },
    { name: "Measurement", reduction: 31, active: mitigationEnabled.measurement },
  ]

  const toggleAlert = (id: string) => {
    setAlertRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Error Correction & Monitoring</h1>
          <p className="text-muted-foreground mt-2">Real-time quantum error mitigation and system health monitoring</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {errorReduction.toFixed(1)}% Error Reduction
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Readout Error</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(currentMetrics.readoutError * 100).toFixed(2)}%</div>
            <Progress value={(1 - currentMetrics.readoutError) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Measurement accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gate Error</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(currentMetrics.gateError * 100).toFixed(2)}%</div>
            <Progress value={(1 - currentMetrics.gateError) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Gate fidelity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coherence Error</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(currentMetrics.coherenceError * 100).toFixed(2)}%</div>
            <Progress value={(1 - currentMetrics.coherenceError) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Decoherence rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigated Error</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{(currentMetrics.mitigatedError * 100).toFixed(2)}%</div>
            <Progress value={(1 - currentMetrics.mitigatedError) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">After correction</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList>
          <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="mitigation">Error Mitigation</TabsTrigger>
          <TabsTrigger value="alerts">Alert Configuration</TabsTrigger>
          <TabsTrigger value="analysis">Error Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Rate Trends</CardTitle>
              <CardDescription>Real-time error metrics over the last 30 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={errorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="readoutError" stroke="#8884d8" name="Readout Error" />
                  <Line type="monotone" dataKey="gateError" stroke="#82ca9d" name="Gate Error" />
                  <Line type="monotone" dataKey="coherenceError" stroke="#ffc658" name="Coherence Error" />
                  <Line
                    type="monotone"
                    dataKey="mitigatedError"
                    stroke="#ff7300"
                    strokeWidth={2}
                    name="Mitigated Error"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Current error sources breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Accuracy" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Overall quantum system status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Circuit Fidelity</span>
                    <span className="text-sm text-muted-foreground">94.2%</span>
                  </div>
                  <Progress value={94.2} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Qubit Connectivity</span>
                    <span className="text-sm text-muted-foreground">98.7%</span>
                  </div>
                  <Progress value={98.7} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Backend Availability</span>
                    <span className="text-sm text-muted-foreground">99.1%</span>
                  </div>
                  <Progress value={99.1} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Mitigation</span>
                    <span className="text-sm text-muted-foreground">{errorReduction.toFixed(1)}%</span>
                  </div>
                  <Progress value={errorReduction} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Mitigation Techniques</CardTitle>
              <CardDescription>Configure quantum error mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="zne" className="text-base font-semibold">
                      Zero-Noise Extrapolation (ZNE)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Extrapolate to zero-noise limit by scaling noise levels
                    </p>
                  </div>
                  <Switch
                    id="zne"
                    checked={mitigationEnabled.zne}
                    onCheckedChange={(checked) => setMitigationEnabled((prev) => ({ ...prev, zne: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="readout" className="text-base font-semibold">
                      Readout Error Mitigation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Correct measurement errors using calibration matrices
                    </p>
                  </div>
                  <Switch
                    id="readout"
                    checked={mitigationEnabled.readout}
                    onCheckedChange={(checked) => setMitigationEnabled((prev) => ({ ...prev, readout: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="dynamical" className="text-base font-semibold">
                      Dynamical Decoupling
                    </Label>
                    <p className="text-sm text-muted-foreground">Insert pulse sequences to suppress decoherence</p>
                  </div>
                  <Switch
                    id="dynamical"
                    checked={mitigationEnabled.dynamical}
                    onCheckedChange={(checked) => setMitigationEnabled((prev) => ({ ...prev, dynamical: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="measurement" className="text-base font-semibold">
                      Measurement Error Correction
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Apply post-processing to improve measurement accuracy
                    </p>
                  </div>
                  <Switch
                    id="measurement"
                    checked={mitigationEnabled.measurement}
                    onCheckedChange={(checked) => setMitigationEnabled((prev) => ({ ...prev, measurement: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mitigation Performance</CardTitle>
              <CardDescription>Error reduction by technique</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mitigationStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reduction" fill="#8884d8" name="Error Reduction %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Configure monitoring alerts and thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`${getSeverityColor(rule.severity)}`}>
                        {rule.severity === "critical" ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Threshold: {(rule.threshold * 100).toFixed(1)}% | Metric: {rule.metric}
                        </p>
                      </div>
                      <Badge variant={rule.severity === "critical" ? "destructive" : "secondary"}>
                        {rule.severity}
                      </Badge>
                    </div>
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleAlert(rule.id)} />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Add New Alert Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure where alerts are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg space-y-2">
                  <Label>Email Notifications</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="critical-only">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Label>Slack Integration</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="critical-only">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Label>PagerDuty</Label>
                  <Select defaultValue="critical-only">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="critical-only">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Label>Webhook</Label>
                  <Select defaultValue="disabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="critical-only">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Analysis Summary</CardTitle>
              <CardDescription>Detailed breakdown of error sources and mitigation effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Primary Error Source</h4>
                    <p className="text-2xl font-bold text-yellow-500">Coherence</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(currentMetrics.coherenceError * 100).toFixed(2)}% error rate
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Best Mitigation</h4>
                    <p className="text-2xl font-bold text-green-500">ZNE</p>
                    <p className="text-sm text-muted-foreground mt-1">45% error reduction</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Overall Improvement</h4>
                    <p className="text-2xl font-bold text-blue-500">{errorReduction.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Total error reduction</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Enable Dynamical Decoupling</p>
                        <p className="text-sm text-muted-foreground">
                          Could reduce coherence errors by an additional 22%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Optimize Gate Scheduling</p>
                        <p className="text-sm text-muted-foreground">
                          Reorder gates to minimize idle time and decoherence
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Backend Calibration Needed</p>
                        <p className="text-sm text-muted-foreground">
                          Readout errors above normal threshold, recalibration recommended
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
