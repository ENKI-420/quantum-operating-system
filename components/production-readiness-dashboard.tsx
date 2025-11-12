"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, Clock, Activity, FileCheck, TrendingUp } from "lucide-react"

interface ReadinessMetric {
  category: string
  items: {
    name: string
    status: "complete" | "in-progress" | "pending"
    progress: number
    priority: "critical" | "high" | "medium" | "low"
  }[]
}

export default function ProductionReadinessDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("overview")

  const readinessMetrics: ReadinessMetric[] = [
    {
      category: "Error Correction",
      items: [
        { name: "Quantum Error Mitigation (ZNE)", status: "complete", progress: 100, priority: "critical" },
        { name: "Readout Error Correction", status: "complete", progress: 100, priority: "critical" },
        { name: "Dynamical Decoupling", status: "in-progress", progress: 75, priority: "high" },
        { name: "Error Detection Codes", status: "in-progress", progress: 60, priority: "high" },
        { name: "Surface Code Implementation", status: "pending", progress: 20, priority: "medium" },
      ],
    },
    {
      category: "Monitoring & Alerting",
      items: [
        { name: "Real-time Telemetry", status: "complete", progress: 100, priority: "critical" },
        { name: "Health Check System", status: "complete", progress: 100, priority: "critical" },
        { name: "Webhook Notifications", status: "complete", progress: 100, priority: "high" },
        { name: "Prometheus Metrics", status: "in-progress", progress: 70, priority: "high" },
        { name: "Grafana Dashboards", status: "in-progress", progress: 65, priority: "medium" },
        { name: "PagerDuty Integration", status: "pending", progress: 30, priority: "medium" },
      ],
    },
    {
      category: "User Management",
      items: [
        { name: "Authentication System", status: "in-progress", progress: 80, priority: "critical" },
        { name: "Role-Based Access Control", status: "in-progress", progress: 75, priority: "critical" },
        { name: "Multi-tenancy Support", status: "in-progress", progress: 60, priority: "high" },
        { name: "API Key Management", status: "in-progress", progress: 70, priority: "high" },
        { name: "Audit Logging", status: "in-progress", progress: 55, priority: "high" },
        { name: "SSO Integration", status: "pending", progress: 25, priority: "medium" },
      ],
    },
    {
      category: "CI/CD & Testing",
      items: [
        { name: "GitHub Actions Pipeline", status: "complete", progress: 100, priority: "critical" },
        { name: "Unit Test Coverage", status: "in-progress", progress: 65, priority: "critical" },
        { name: "Integration Tests", status: "in-progress", progress: 55, priority: "high" },
        { name: "E2E Testing", status: "in-progress", progress: 45, priority: "high" },
        { name: "Performance Testing", status: "pending", progress: 30, priority: "medium" },
        { name: "Security Scanning", status: "in-progress", progress: 60, priority: "high" },
      ],
    },
    {
      category: "Performance",
      items: [
        { name: "Circuit Optimization", status: "complete", progress: 100, priority: "critical" },
        { name: "Caching Layer", status: "in-progress", progress: 70, priority: "high" },
        { name: "Database Indexing", status: "in-progress", progress: 65, priority: "high" },
        { name: "CDN Integration", status: "complete", progress: 100, priority: "medium" },
        { name: "Load Balancing", status: "in-progress", progress: 50, priority: "high" },
        { name: "Auto-scaling", status: "pending", progress: 35, priority: "medium" },
      ],
    },
    {
      category: "Security & Compliance",
      items: [
        { name: "Data Encryption (at rest)", status: "complete", progress: 100, priority: "critical" },
        { name: "Data Encryption (in transit)", status: "complete", progress: 100, priority: "critical" },
        { name: "SOC 2 Type II", status: "in-progress", progress: 60, priority: "critical" },
        { name: "GDPR Compliance", status: "in-progress", progress: 70, priority: "critical" },
        { name: "HIPAA Compliance", status: "pending", progress: 40, priority: "high" },
        { name: "Penetration Testing", status: "pending", progress: 20, priority: "high" },
      ],
    },
  ]

  const overallProgress = Math.round(
    readinessMetrics.reduce((acc, cat) => {
      const catProgress = cat.items.reduce((sum, item) => sum + item.progress, 0) / cat.items.length
      return acc + catProgress
    }, 0) / readinessMetrics.length,
  )

  const criticalItems = readinessMetrics.flatMap((cat) =>
    cat.items.filter((item) => item.priority === "critical" && item.status !== "complete"),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      complete: "default",
      "in-progress": "secondary",
      pending: "outline",
    }
    return (
      <Badge variant={variants[status]}>
        {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Readiness Dashboard</h1>
          <p className="text-muted-foreground mt-2">Comprehensive strategy for production deployment</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {overallProgress}% Ready
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalItems.length}</div>
            <p className="text-xs text-muted-foreground mt-2">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readinessMetrics.length}</div>
            <p className="text-xs text-muted-foreground mt-2">Production areas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readinessMetrics.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
            <p className="text-xs text-muted-foreground mt-2">Tracked metrics</p>
          </CardContent>
        </Card>
      </div>

      {criticalItems.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              Critical Items Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.progress} className="w-24" />
                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="error">Error Correction</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="cicd">CI/CD</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readinessMetrics.map((category, idx) => {
              const categoryProgress = Math.round(
                category.items.reduce((sum, item) => sum + item.progress, 0) / category.items.length,
              )
              const completeCount = category.items.filter((i) => i.status === "complete").length

              return (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <CardDescription>
                      {completeCount} of {category.items.length} complete
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={categoryProgress} className="mb-2" />
                    <p className="text-2xl font-bold">{categoryProgress}%</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {readinessMetrics.map((category, catIdx) => (
          <TabsContent key={catIdx} value={category.category.toLowerCase().split(" ")[0]} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>Detailed breakdown of {category.category.toLowerCase()} readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className={`text-sm ${getPriorityColor(item.priority)}`}>
                              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Production Deployment Checklist</CardTitle>
          <CardDescription>Key milestones before going live</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "All critical items completed", done: criticalItems.length === 0 },
              { name: "Security audit passed", done: false },
              { name: "Load testing completed", done: false },
              { name: "Disaster recovery plan", done: false },
              { name: "Documentation complete", done: true },
              { name: "Team training finished", done: false },
              { name: "Monitoring configured", done: true },
              { name: "Backup systems tested", done: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                {item.done ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                )}
                <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
