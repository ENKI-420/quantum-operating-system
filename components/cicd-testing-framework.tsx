"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { GitBranch, CheckCircle2, XCircle, Clock, Play, AlertCircle, TrendingUp, Zap } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Pipeline {
  id: string
  name: string
  branch: string
  status: "success" | "failed" | "running" | "pending"
  duration: string
  timestamp: string
  commit: string
  author: string
}

interface TestSuite {
  name: string
  total: number
  passed: number
  failed: number
  skipped: number
  duration: string
  coverage: number
}

export default function CICDTestingFramework() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "Production Deploy",
      branch: "main",
      status: "success",
      duration: "4m 32s",
      timestamp: "5 minutes ago",
      commit: "a3f2c1d",
      author: "Alice Johnson",
    },
    {
      id: "2",
      name: "Feature Branch",
      branch: "feature/quantum-optimization",
      status: "running",
      duration: "2m 15s",
      timestamp: "2 minutes ago",
      commit: "b7e9f4a",
      author: "Bob Smith",
    },
    {
      id: "3",
      name: "Staging Deploy",
      branch: "develop",
      status: "success",
      duration: "3m 48s",
      timestamp: "1 hour ago",
      commit: "c4d8e2b",
      author: "Carol Williams",
    },
    {
      id: "4",
      name: "Hotfix Deploy",
      branch: "hotfix/error-correction",
      status: "failed",
      duration: "1m 22s",
      timestamp: "3 hours ago",
      commit: "d9a1f3c",
      author: "David Brown",
    },
  ])

  const testSuites: TestSuite[] = [
    {
      name: "Unit Tests",
      total: 487,
      passed: 482,
      failed: 3,
      skipped: 2,
      duration: "45s",
      coverage: 87.3,
    },
    {
      name: "Integration Tests",
      total: 156,
      passed: 152,
      failed: 2,
      skipped: 2,
      duration: "2m 15s",
      coverage: 76.8,
    },
    {
      name: "E2E Tests",
      total: 89,
      passed: 85,
      failed: 1,
      skipped: 3,
      duration: "5m 32s",
      coverage: 68.4,
    },
    {
      name: "Security Tests",
      total: 42,
      passed: 40,
      failed: 1,
      skipped: 1,
      duration: "1m 48s",
      coverage: 92.1,
    },
  ]

  const coverageTrend = [
    { date: "Mon", unit: 85.2, integration: 74.1, e2e: 65.3, overall: 74.9 },
    { date: "Tue", unit: 86.1, integration: 75.3, e2e: 66.8, overall: 76.1 },
    { date: "Wed", unit: 86.8, integration: 75.9, e2e: 67.2, overall: 76.6 },
    { date: "Thu", unit: 87.0, integration: 76.2, e2e: 67.8, overall: 77.0 },
    { date: "Fri", unit: 87.3, integration: 76.8, e2e: 68.4, overall: 77.5 },
  ]

  const deploymentFrequency = [
    { week: "Week 1", deploys: 12, success: 11, failed: 1 },
    { week: "Week 2", deploys: 15, success: 14, failed: 1 },
    { week: "Week 3", deploys: 18, success: 17, failed: 1 },
    { week: "Week 4", deploys: 21, success: 20, failed: 1 },
  ]

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.total, 0)
  const totalPassed = testSuites.reduce((sum, suite) => sum + suite.passed, 0)
  const totalFailed = testSuites.reduce((sum, suite) => sum + suite.failed, 0)
  const overallCoverage = testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      success: "default",
      failed: "destructive",
      running: "secondary",
      pending: "outline",
    }
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const pieData = [
    { name: "Passed", value: totalPassed, color: "#10b981" },
    { name: "Failed", value: totalFailed, color: "#ef4444" },
    { name: "Skipped", value: testSuites.reduce((sum, suite) => sum + suite.skipped, 0), color: "#6b7280" },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CI/CD & Testing Framework</h1>
          <p className="text-muted-foreground mt-2">Continuous integration, deployment, and automated testing</p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Run Pipeline
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallCoverage.toFixed(1)}%</div>
            <Progress value={overallCoverage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+2.6% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalPassed / totalTests) * 100).toFixed(1)}%</div>
            <Progress value={(totalPassed / totalTests) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {totalPassed} of {totalTests} passed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deploy Frequency</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-muted-foreground mt-2">Deploys this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Success</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.2%</div>
            <Progress value={95.2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipelines" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="tests">Test Suites</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Pipeline Runs</CardTitle>
              <CardDescription>Latest CI/CD pipeline executions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pipelines.map((pipeline) => (
                  <div key={pipeline.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      {getStatusIcon(pipeline.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{pipeline.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {pipeline.branch}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pipeline.commit} by {pipeline.author} • {pipeline.timestamp}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{pipeline.duration}</div>
                        {getStatusBadge(pipeline.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Stages</CardTitle>
                <CardDescription>Current pipeline execution breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Checkout", status: "success", duration: "12s" },
                    { name: "Install Dependencies", status: "success", duration: "45s" },
                    { name: "Lint & Format", status: "success", duration: "18s" },
                    { name: "Unit Tests", status: "success", duration: "1m 32s" },
                    { name: "Integration Tests", status: "running", duration: "45s" },
                    { name: "Build", status: "pending", duration: "-" },
                    { name: "Deploy", status: "pending", duration: "-" },
                  ].map((stage, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(stage.status)}
                        <span className="font-medium">{stage.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{stage.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Configuration</CardTitle>
                <CardDescription>Automated workflow settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trigger on Push</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trigger on PR</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Auto Deploy</span>
                      <Badge variant="default">main, develop</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Parallel Jobs</span>
                      <Badge variant="outline">4</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Timeout</span>
                      <Badge variant="outline">30 minutes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Retry Failed</span>
                      <Badge variant="default">2 attempts</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {testSuites.map((suite, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{suite.name}</CardTitle>
                    <Badge variant="outline">{suite.duration}</Badge>
                  </div>
                  <CardDescription>
                    {suite.passed} passed, {suite.failed} failed, {suite.skipped} skipped
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Success Rate</span>
                        <span className="font-medium">{((suite.passed / suite.total) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(suite.passed / suite.total) * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Code Coverage</span>
                        <span className="font-medium">{suite.coverage}%</span>
                      </div>
                      <Progress value={suite.coverage} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                        <div className="text-2xl font-bold text-green-600">{suite.passed}</div>
                        <div className="text-xs text-muted-foreground">Passed</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded">
                        <div className="text-2xl font-bold text-red-600">{suite.failed}</div>
                        <div className="text-xs text-muted-foreground">Failed</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-950/20 rounded">
                        <div className="text-2xl font-bold text-gray-600">{suite.skipped}</div>
                        <div className="text-xs text-muted-foreground">Skipped</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Results Distribution</CardTitle>
              <CardDescription>Overall test execution breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coverage Trends</CardTitle>
              <CardDescription>Test coverage over time by suite</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={coverageTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[60, 90]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="unit" stroke="#8884d8" name="Unit Tests" />
                  <Line type="monotone" dataKey="integration" stroke="#82ca9d" name="Integration Tests" />
                  <Line type="monotone" dataKey="e2e" stroke="#ffc658" name="E2E Tests" />
                  <Line type="monotone" dataKey="overall" stroke="#ff7300" strokeWidth={2} name="Overall" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Coverage by Module</CardTitle>
                <CardDescription>Code coverage breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { module: "Quantum Core", coverage: 92.4 },
                    { module: "Error Correction", coverage: 88.7 },
                    { module: "Backend Integration", coverage: 85.3 },
                    { module: "User Management", coverage: 79.6 },
                    { module: "API Routes", coverage: 76.2 },
                    { module: "UI Components", coverage: 68.9 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.module}</span>
                        <span className="text-muted-foreground">{item.coverage}%</span>
                      </div>
                      <Progress value={item.coverage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Goals</CardTitle>
                <CardDescription>Target coverage thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Critical Paths", current: 95.2, target: 95, status: "success" },
                    { type: "Core Features", current: 87.3, target: 90, status: "warning" },
                    { type: "API Endpoints", current: 76.2, target: 80, status: "warning" },
                    { type: "UI Components", current: 68.9, target: 75, status: "danger" },
                  ].map((goal, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{goal.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {goal.current}% / {goal.target}%
                          </span>
                          {goal.status === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle
                              className={`h-4 w-4 ${goal.status === "warning" ? "text-yellow-500" : "text-red-500"}`}
                            />
                          )}
                        </div>
                      </div>
                      <Progress value={goal.current} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Frequency</CardTitle>
              <CardDescription>Weekly deployment statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deploymentFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="success" fill="#10b981" name="Successful" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lead Time</span>
                    <span className="text-sm text-muted-foreground">2.3 hours</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">MTTR</span>
                    <span className="text-sm text-muted-foreground">18 minutes</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Change Failure Rate</span>
                    <span className="text-sm text-muted-foreground">4.8%</span>
                  </div>
                  <Progress value={95.2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environments</CardTitle>
                <CardDescription>Deployment targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Production", version: "v2.4.1", status: "healthy", updated: "5m ago" },
                  { name: "Staging", version: "v2.5.0-rc1", status: "healthy", updated: "1h ago" },
                  { name: "Development", version: "v2.5.0-dev", status: "healthy", updated: "15m ago" },
                ].map((env, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{env.name}</span>
                      <Badge variant="default">{env.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {env.version} • Updated {env.updated}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rollback History</CardTitle>
                <CardDescription>Recent rollback events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { version: "v2.4.0", reason: "High error rate", time: "3 days ago" },
                  { version: "v2.3.5", reason: "Performance issue", time: "1 week ago" },
                  { version: "v2.3.2", reason: "Database migration", time: "2 weeks ago" },
                ].map((rollback, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{rollback.version}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {rollback.reason} • {rollback.time}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
