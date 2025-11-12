"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Database, Cloud, Cpu, Lock, Zap } from "lucide-react"

export function TechnicalArchitecture() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-white">Technical Architecture Overview</CardTitle>
          <CardDescription className="text-blue-300">
            Comprehensive integration architecture for IBM ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="layers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="layers">Architecture Layers</TabsTrigger>
              <TabsTrigger value="quantum">Quantum Integration</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid Cloud</TabsTrigger>
              <TabsTrigger value="apis">API Interfaces</TabsTrigger>
            </TabsList>

            <TabsContent value="layers" className="space-y-4">
              {[
                {
                  name: "Presentation Layer",
                  icon: Network,
                  color: "blue",
                  components: ["Web UI Dashboard", "CLI Interface", "REST API Gateway", "GraphQL Endpoint"],
                  technologies: ["Next.js 16", "React 19", "TailwindCSS v4", "WebSocket"],
                },
                {
                  name: "Application Layer",
                  icon: Cpu,
                  color: "purple",
                  components: [
                    "C.E.N.T. Multi-Agent System",
                    "Quantum Circuit Compiler",
                    "Workflow Orchestrator",
                    "Policy Engine",
                  ],
                  technologies: ["Node.js", "Python 3.11", "Qiskit 1.0", "IBM Quantum Runtime"],
                },
                {
                  name: "Integration Layer",
                  icon: Zap,
                  color: "cyan",
                  components: [
                    "IBM Quantum Connector",
                    "Red Hat OpenShift Operator",
                    "Watson AIOps Bridge",
                    "TLS Service Mesh",
                  ],
                  technologies: ["Kubernetes", "Istio", "gRPC", "Protocol Buffers"],
                },
                {
                  name: "Data Layer",
                  icon: Database,
                  color: "green",
                  components: [
                    "Quantum State Store",
                    "Audit Trail Database",
                    "Metrics Time Series",
                    "Configuration Registry",
                  ],
                  technologies: ["PostgreSQL", "Redis", "InfluxDB", "etcd"],
                },
                {
                  name: "Infrastructure Layer",
                  icon: Cloud,
                  color: "orange",
                  components: [
                    "IBM Quantum Hardware",
                    "IBM Cloud Code Engine",
                    "Sovereign Cloud Nodes",
                    "Edge Computing",
                  ],
                  technologies: ["IBM Torino/Brisbane/Kyoto", "IBM Cloud", "OpenShift", "KubeEdge"],
                },
                {
                  name: "Security Layer",
                  icon: Lock,
                  color: "red",
                  components: [
                    "Identity & Access Management",
                    "Encryption Service",
                    "Compliance Validator",
                    "Audit Logger",
                  ],
                  technologies: ["OAuth 2.0", "TLS 1.3", "Vault", "OpenTelemetry"],
                },
              ].map((layer) => {
                const Icon = layer.icon
                const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
                  blue: { bg: "bg-blue-950/30", border: "border-blue-900/50", icon: "text-blue-400" },
                  purple: { bg: "bg-purple-950/30", border: "border-purple-900/50", icon: "text-purple-400" },
                  cyan: { bg: "bg-cyan-950/30", border: "border-cyan-900/50", icon: "text-cyan-400" },
                  green: { bg: "bg-green-950/30", border: "border-green-900/50", icon: "text-green-400" },
                  orange: { bg: "bg-orange-950/30", border: "border-orange-900/50", icon: "text-orange-400" },
                  red: { bg: "bg-red-950/30", border: "border-red-900/50", icon: "text-red-400" },
                }
                const colors = colorMap[layer.color]

                return (
                  <Card key={layer.name} className={`${colors.bg} border ${colors.border}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                        <CardTitle className="text-white text-lg">{layer.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-white mb-2">Components</div>
                        <div className="flex flex-wrap gap-2">
                          {layer.components.map((comp) => (
                            <Badge key={comp} variant="outline" className="text-xs border-blue-700/50 text-blue-300">
                              {comp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white mb-2">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                          {layer.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs bg-slate-800/50 text-slate-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="quantum" className="space-y-4">
              <Card className="bg-blue-950/30 border-blue-900/50">
                <CardHeader>
                  <CardTitle className="text-white">IBM Quantum Integration</CardTitle>
                  <CardDescription className="text-blue-300">
                    Direct integration with IBM Quantum Network hardware
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-blue-100">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Supported IBM Quantum Systems</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• IBM Torino (133 qubits, Heron processor)</li>
                      <li>• IBM Brisbane (127 qubits, Eagle r3 processor)</li>
                      <li>• IBM Kyoto (127 qubits, Eagle r3 processor)</li>
                      <li>• IBM Quantum Simulator (cloud-based)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Quantum Wasserstein Compilation (QWC)</h4>
                    <p className="text-sm leading-relaxed mb-2">
                      DNALANG's proprietary QWC methodology achieves 40% performance improvement over standard Qiskit
                      compilation by navigating the optimal Riemannian geometry of Hilbert space.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                        <div className="text-xs text-blue-400 mb-1">Fidelity Improvement</div>
                        <div className="text-2xl font-bold text-white">+40%</div>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                        <div className="text-xs text-purple-400 mb-1">Circuit Depth Reduction</div>
                        <div className="text-2xl font-bold text-white">-35%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Barren Plateau Mitigation</h4>
                    <p className="text-sm leading-relaxed">
                      Wasserstein Gradient Flow (WGF) provides stable gradient descent that avoids the barren plateau
                      problem, enabling optimization of deep quantum circuits that traditional methods cannot handle.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hybrid" className="space-y-4">
              <Card className="bg-purple-950/30 border-purple-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Hybrid Cloud Architecture</CardTitle>
                  <CardDescription className="text-purple-300">
                    Seamless integration across IBM Cloud, Red Hat OpenShift, and sovereign clouds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-purple-100">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Deployment Models</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                        <div className="font-medium text-white mb-2">IBM Cloud Native</div>
                        <div className="text-sm">Full IBM Cloud Code Engine deployment with Quantum Network access</div>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                        <div className="font-medium text-white mb-2">Red Hat OpenShift</div>
                        <div className="text-sm">Operator-based deployment on any OpenShift cluster</div>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded border border-purple-900/30">
                        <div className="font-medium text-white mb-2">Sovereign Cloud</div>
                        <div className="text-sm">Air-gapped deployment with compliance guarantees</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Resource Orchestration</h4>
                    <p className="text-sm leading-relaxed">
                      DNALANG's quantum swarm coordination automatically distributes workloads across quantum and
                      classical resources, optimizing for cost, performance, and compliance constraints in real-time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apis" className="space-y-4">
              <Card className="bg-cyan-950/30 border-cyan-900/50">
                <CardHeader>
                  <CardTitle className="text-white">API Integration Interfaces</CardTitle>
                  <CardDescription className="text-cyan-300">
                    Comprehensive API surface for IBM TLS integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        name: "Quantum Circuit API",
                        endpoint: "/api/v1/quantum/circuits",
                        methods: ["POST", "GET", "PUT", "DELETE"],
                        description: "Submit, retrieve, and manage quantum circuits with automatic QWC optimization",
                      },
                      {
                        name: "Optimization API",
                        endpoint: "/api/v1/optimize",
                        methods: ["POST", "GET"],
                        description:
                          "Trigger autonomous optimization runs with configurable objectives and constraints",
                      },
                      {
                        name: "Monitoring API",
                        endpoint: "/api/v1/monitor",
                        methods: ["GET", "WebSocket"],
                        description: "Real-time coherence metrics, system health, and negentropic indicators",
                      },
                      {
                        name: "Compliance API",
                        endpoint: "/api/v1/compliance",
                        methods: ["GET", "POST"],
                        description: "Audit trail access, compliance validation, and policy enforcement",
                      },
                    ].map((api) => (
                      <div key={api.name} className="p-4 bg-slate-900/50 rounded border border-cyan-900/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium text-white">{api.name}</div>
                            <code className="text-xs text-cyan-400">{api.endpoint}</code>
                          </div>
                          <div className="flex gap-1">
                            {api.methods.map((method) => (
                              <Badge
                                key={method}
                                variant="outline"
                                className="text-xs border-cyan-700/50 text-cyan-300"
                              >
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-cyan-100">{api.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
