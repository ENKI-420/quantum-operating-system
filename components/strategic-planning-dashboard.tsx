"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Network,
  Database,
  Cpu,
  Cloud,
  Lock,
  Users,
  BarChart3,
  Target,
  Rocket,
  GitBranch,
  Settings,
  AlertTriangle,
} from "lucide-react"

export function StrategicPlanningDashboard() {
  const [selectedPhase, setSelectedPhase] = useState("foundation")

  const phases = [
    {
      id: "foundation",
      name: "Phase 1: Foundation",
      duration: "Q1 2025 (3 months)",
      status: "in-progress",
      completion: 75,
      objectives: [
        "Complete IBM Quantum Runtime V2 integration",
        "Deploy IBM Carbon Design System UI",
        "Establish security compliance framework",
        "Implement automated backend selection",
      ],
      deliverables: [
        "Production-ready IBM Runtime integration",
        "Carbon Design System component library",
        "Security audit and compliance documentation",
        "Intelligent backend selector with ML",
      ],
      risks: ["API rate limiting", "Backend availability", "Security certification timeline"],
    },
    {
      id: "pilot",
      name: "Phase 2: Pilot Deployment",
      duration: "Q2 2025 (3 months)",
      status: "planned",
      completion: 0,
      objectives: [
        "Deploy to 5 enterprise pilot customers",
        "Implement multi-tenant architecture",
        "Enable real-time telemetry at scale",
        "Establish SLA monitoring",
      ],
      deliverables: [
        "Multi-tenant platform with RBAC",
        "Enterprise telemetry dashboard",
        "SLA monitoring and alerting",
        "Customer success playbook",
      ],
      risks: ["Customer onboarding complexity", "Performance at scale", "Support infrastructure"],
    },
    {
      id: "production",
      name: "Phase 3: Production Scale",
      duration: "Q3-Q4 2025 (6 months)",
      status: "planned",
      completion: 0,
      objectives: [
        "Scale to 50+ enterprise customers",
        "Implement advanced ML optimization",
        "Deploy global edge infrastructure",
        "Achieve SOC 2 Type II certification",
      ],
      deliverables: [
        "Global multi-region deployment",
        "Advanced ML-driven optimization engine",
        "SOC 2 Type II certification",
        "Enterprise support tier",
      ],
      risks: ["Infrastructure costs", "Regulatory compliance", "Talent acquisition"],
    },
    {
      id: "innovation",
      name: "Phase 4: Continuous Innovation",
      duration: "2026+ (Ongoing)",
      status: "planned",
      completion: 0,
      objectives: [
        "Research next-gen quantum algorithms",
        "Integrate emerging IBM quantum hardware",
        "Develop quantum-AI hybrid solutions",
        "Expand to new industry verticals",
      ],
      deliverables: [
        "Quantum algorithm marketplace",
        "Hybrid quantum-classical AI platform",
        "Industry-specific solution packages",
        "Research partnership program",
      ],
      risks: ["Technology obsolescence", "Market competition", "Research ROI"],
    },
  ]

  const integrationPoints = [
    {
      layer: "Quantum Hardware",
      icon: Cpu,
      components: [
        { name: "IBM Quantum Runtime V2", status: "complete", priority: "critical" },
        { name: "Backend Discovery & Selection", status: "complete", priority: "critical" },
        { name: "Circuit Transpilation", status: "complete", priority: "high" },
        { name: "Error Mitigation (ZNE, PEC)", status: "in-progress", priority: "high" },
        { name: "Quantum Volume Benchmarking", status: "planned", priority: "medium" },
      ],
    },
    {
      layer: "Software Platform",
      icon: Database,
      components: [
        { name: "DNALang Compiler", status: "complete", priority: "critical" },
        { name: "Auto-Pilot Orchestration", status: "complete", priority: "critical" },
        { name: "Multi-Agent Coordination", status: "complete", priority: "high" },
        { name: "Cost Optimization Engine", status: "in-progress", priority: "high" },
        { name: "Job Queue Management", status: "planned", priority: "medium" },
      ],
    },
    {
      layer: "AI & ML",
      icon: Network,
      components: [
        { name: "Circuit Optimization ML", status: "in-progress", priority: "critical" },
        { name: "Backend Selection AI", status: "in-progress", priority: "high" },
        { name: "Predictive Cost Modeling", status: "planned", priority: "high" },
        { name: "Anomaly Detection", status: "planned", priority: "medium" },
        { name: "Performance Forecasting", status: "planned", priority: "low" },
      ],
    },
    {
      layer: "Security & Compliance",
      icon: Shield,
      components: [
        { name: "API Token Management", status: "complete", priority: "critical" },
        { name: "Webhook Authentication", status: "complete", priority: "high" },
        { name: "Audit Logging", status: "in-progress", priority: "critical" },
        { name: "RBAC Implementation", status: "planned", priority: "critical" },
        { name: "SOC 2 Certification", status: "planned", priority: "high" },
      ],
    },
    {
      layer: "User Experience",
      icon: Users,
      components: [
        { name: "IBM Carbon Design System", status: "complete", priority: "critical" },
        { name: "Real-time Telemetry Dashboard", status: "complete", priority: "high" },
        { name: "Circuit Builder UI", status: "in-progress", priority: "high" },
        { name: "Analytics & Reporting", status: "in-progress", priority: "medium" },
        { name: "Collaborative Workspaces", status: "planned", priority: "low" },
      ],
    },
  ]

  const resourceOptimization = [
    {
      strategy: "Intelligent Backend Selection",
      description: "ML-driven selection of optimal quantum backend based on circuit requirements",
      impact: "40% cost reduction",
      implementation: "Complete",
      metrics: ["Cost per job", "Queue time", "Fidelity"],
    },
    {
      strategy: "Circuit Optimization",
      description: "Automated transpilation and gate reduction using Qiskit optimization levels",
      impact: "35% depth reduction",
      implementation: "Complete",
      metrics: ["Gate count", "Circuit depth", "Execution time"],
    },
    {
      strategy: "Batch Job Processing",
      description: "Group similar jobs for efficient execution using IBM Runtime sessions",
      impact: "50% throughput increase",
      implementation: "In Progress",
      metrics: ["Jobs per session", "Session utilization", "Cost per batch"],
    },
    {
      strategy: "Predictive Scaling",
      description: "ML-based prediction of resource needs for proactive scaling",
      impact: "30% infrastructure savings",
      implementation: "Planned",
      metrics: ["Prediction accuracy", "Resource utilization", "Cost variance"],
    },
    {
      strategy: "Error Mitigation Optimization",
      description: "Adaptive selection of error mitigation techniques based on circuit characteristics",
      impact: "25% fidelity improvement",
      implementation: "In Progress",
      metrics: ["Fidelity score", "Mitigation overhead", "Success rate"],
    },
  ]

  const successMetrics = [
    {
      category: "Technical Performance",
      metrics: [
        { name: "Circuit Optimization Rate", target: "40%", current: "35%", status: "on-track" },
        { name: "Backend Selection Accuracy", target: "95%", current: "92%", status: "on-track" },
        { name: "System Uptime", target: "99.9%", current: "99.7%", status: "at-risk" },
        { name: "Average Job Latency", target: "<2s", current: "1.8s", status: "achieved" },
      ],
    },
    {
      category: "Business Impact",
      metrics: [
        { name: "Cost Reduction", target: "50%", current: "40%", status: "on-track" },
        { name: "Customer Adoption", target: "50 enterprises", current: "5 pilots", status: "on-track" },
        { name: "Revenue Growth", target: "$5M ARR", current: "$0.5M ARR", status: "on-track" },
        { name: "Customer Satisfaction", target: "4.5/5", current: "4.7/5", status: "achieved" },
      ],
    },
    {
      category: "Innovation",
      metrics: [
        { name: "New Features Shipped", target: "20/quarter", current: "18/quarter", status: "on-track" },
        { name: "Research Publications", target: "4/year", current: "2/year", status: "at-risk" },
        { name: "Patent Applications", target: "6/year", current: "3/year", status: "on-track" },
        { name: "Open Source Contributions", target: "100/month", current: "85/month", status: "on-track" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "planned":
        return <Circle className="h-4 w-4 text-gray-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "on-track":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "at-risk":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "blocked":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "low":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Rocket className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DNALANG × IBM Strategic Integration Plan
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive roadmap for deep IBM Quantum infrastructure integration, enterprise-grade deployment, and
            continuous innovation
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">v4.0 Integrated</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Production Ready</Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">IBM Certified</Badge>
          </div>
        </div>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="integration" className="data-[state=active]:bg-blue-600">
              <GitBranch className="h-4 w-4 mr-2" />
              Integration Points
            </TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-blue-600">
              <Zap className="h-4 w-4 mr-2" />
              Optimization
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Success Metrics
            </TabsTrigger>
            <TabsTrigger value="architecture" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Architecture
            </TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Implementation Roadmap</CardTitle>
                <CardDescription>Four-phase strategic deployment plan for IBM integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {phases.map((phase) => (
                  <div
                    key={phase.id}
                    className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedPhase === phase.id
                        ? "border-blue-500 bg-blue-950/30"
                        : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
                    }`}
                    onClick={() => setSelectedPhase(phase.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">{phase.name}</h3>
                          <Badge
                            className={
                              phase.status === "in-progress"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                            }
                          >
                            {phase.status === "in-progress" ? "In Progress" : "Planned"}
                          </Badge>
                        </div>
                        <p className="text-gray-400">{phase.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-400">{phase.completion}%</div>
                        <div className="text-sm text-gray-400">Complete</div>
                      </div>
                    </div>

                    <Progress value={phase.completion} className="mb-4" />

                    {selectedPhase === phase.id && (
                      <div className="space-y-4 mt-6 pt-6 border-t border-gray-800">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Objectives</h4>
                          <ul className="space-y-2">
                            {phase.objectives.map((obj, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-400">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Deliverables</h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((del, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-400">
                                <Rocket className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Risk Factors</h4>
                          <ul className="space-y-2">
                            {phase.risks.map((risk, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-400">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Points Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Strategic Integration Points</CardTitle>
                <CardDescription>
                  Deep integration across quantum hardware, software, AI, security, and UX layers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {integrationPoints.map((layer) => {
                  const Icon = layer.icon
                  return (
                    <div key={layer.layer} className="p-6 rounded-lg bg-gray-900/30 border border-gray-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
                        <h3 className="text-xl font-semibold text-white">{layer.layer}</h3>
                      </div>
                      <div className="space-y-3">
                        {layer.components.map((component, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded bg-gray-950/50 border border-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(component.status)}
                              <span className="text-gray-300">{component.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(component.priority)}>{component.priority}</Badge>
                              <Badge
                                className={
                                  component.status === "complete"
                                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                                    : component.status === "in-progress"
                                      ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                      : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                                }
                              >
                                {component.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Resource Optimization Strategies</CardTitle>
                <CardDescription>
                  Intelligent resource allocation and cost optimization for efficient deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {resourceOptimization.map((strategy, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-gray-900/30 border border-gray-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{strategy.strategy}</h3>
                          <Badge
                            className={
                              strategy.implementation === "Complete"
                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                : strategy.implementation === "In Progress"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                  : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                            }
                          >
                            {strategy.implementation}
                          </Badge>
                        </div>
                        <p className="text-gray-400">{strategy.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-400">{strategy.impact}</div>
                        <div className="text-sm text-gray-400">Impact</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {strategy.metrics.map((metric, midx) => (
                        <Badge key={midx} variant="outline" className="text-gray-400 border-gray-700">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Success Metrics & KPIs</CardTitle>
                <CardDescription>
                  Tracking progress across technical, business, and innovation dimensions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {successMetrics.map((category) => (
                  <div key={category.category} className="p-6 rounded-lg bg-gray-900/30 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                    <div className="space-y-4">
                      {category.metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{metric.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400">
                                {metric.current} / {metric.target}
                              </span>
                              <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                            </div>
                          </div>
                          <Progress
                            value={
                              metric.target.includes("%")
                                ? Number.parseInt(metric.current)
                                : (Number.parseInt(metric.current.replace(/[^0-9.]/g, "")) /
                                    Number.parseInt(metric.target.replace(/[^0-9.]/g, ""))) *
                                  100
                            }
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Enterprise Architecture</CardTitle>
                <CardDescription>Scalable, secure, and resilient architecture for IBM integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-gray-950/50 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Architecture Principles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded bg-blue-950/30 border border-blue-800">
                      <Cloud className="h-8 w-8 text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white mb-1">Cloud-Native</h4>
                      <p className="text-sm text-gray-400">Microservices, containers, serverless functions</p>
                    </div>
                    <div className="p-4 rounded bg-purple-950/30 border border-purple-800">
                      <Lock className="h-8 w-8 text-purple-400 mb-2" />
                      <h4 className="font-semibold text-white mb-1">Security-First</h4>
                      <p className="text-sm text-gray-400">Zero-trust, encryption, compliance</p>
                    </div>
                    <div className="p-4 rounded bg-green-950/30 border border-green-800">
                      <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                      <h4 className="font-semibold text-white mb-1">Auto-Scaling</h4>
                      <p className="text-sm text-gray-400">Elastic infrastructure, load balancing</p>
                    </div>
                    <div className="p-4 rounded bg-cyan-950/30 border border-cyan-800">
                      <Network className="h-8 w-8 text-cyan-400 mb-2" />
                      <h4 className="font-semibold text-white mb-1">API-First</h4>
                      <p className="text-sm text-gray-400">RESTful, GraphQL, WebSocket</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-gray-950/50 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Deployment Topology</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded bg-gray-900/50 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Edge Layer</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Vercel Edge</Badge>
                      </div>
                      <p className="text-sm text-gray-400">Global CDN, edge functions, DDoS protection</p>
                    </div>
                    <div className="p-4 rounded bg-gray-900/50 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Application Layer</span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                          Next.js + FastAPI
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">React frontend, Python backend, WebSocket server</p>
                    </div>
                    <div className="p-4 rounded bg-gray-900/50 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Quantum Layer</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">IBM Quantum</Badge>
                      </div>
                      <p className="text-sm text-gray-400">Qiskit Runtime, quantum backends, circuit execution</p>
                    </div>
                    <div className="p-4 rounded bg-gray-900/50 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Data Layer</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">PostgreSQL + Redis</Badge>
                      </div>
                      <p className="text-sm text-gray-400">Persistent storage, caching, session management</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <Card className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Deploy?</h3>
                <p className="text-gray-400">
                  The DNALANG Quantum Platform is production-ready and awaiting IBM partnership approval.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy to Production
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-950/50 bg-transparent"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
