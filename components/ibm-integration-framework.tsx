"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TLSLifecycleView } from "./tls-lifecycle-view"
import { TechnicalArchitecture } from "./technical-architecture"
import { SecurityCompliance } from "./security-compliance"
import { ResourceOptimization } from "./resource-optimization"
import { IntegrationRoadmap } from "./integration-roadmap"
import { CostBenefitAnalysis } from "./cost-benefit-analysis"
import { LiveTelemetryDashboard } from "./live-telemetry-dashboard"
import { Cloud, Shield, Zap, TrendingUp, Network, CheckCircle2 } from "lucide-react"

export function IBMIntegrationFramework() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-blue-900/30 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DNALANG × IBM</h1>
                <p className="text-sm text-blue-300">Quantum-Classical Integration Framework</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                IBM Quantum Ready
              </Badge>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                TLS Compatible
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-blue-900/30 bg-gradient-to-r from-blue-950/50 to-purple-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-4">Comprehensive Support Framework for IBM Integration</h2>
            <p className="text-lg text-blue-200 mb-6 leading-relaxed">
              DNALANG provides deep integration with IBM technologies and TLS protocols, establishing future-proofed
              industry leadership through autonomous quantum-classical infrastructure that ensures market readiness,
              cost efficiency, and resource independence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-blue-900/30">
                <CardContent className="pt-6">
                  <Cloud className="h-8 w-8 text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-blue-300">Uptime SLA</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-blue-900/30">
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-white">40%</div>
                  <div className="text-sm text-purple-300">Performance Gain</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-blue-900/30">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-green-400 mb-2" />
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-green-300">Compliance</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-blue-900/30">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-cyan-400 mb-2" />
                  <div className="text-2xl font-bold text-white">70%</div>
                  <div className="text-sm text-cyan-300">Cost Reduction</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-slate-900/50 border border-blue-900/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="telemetry">Live Telemetry</TabsTrigger>
            <TabsTrigger value="tls">TLS Lifecycle</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-900/50 border-blue-900/30">
              <CardHeader>
                <CardTitle className="text-white">Executive Summary</CardTitle>
                <CardDescription className="text-blue-300">
                  Strategic positioning and value proposition for IBM partnership
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-blue-100">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Strategic Alignment</h3>
                  <p className="leading-relaxed mb-4">
                    DNALANG represents a paradigm shift in infrastructure management that directly addresses IBM's most
                    pressing challenges in the autonomous AI era. By implementing self-optimizing quantum-classical
                    hybrid systems that achieve verified negentropic improvement, DNALANG transforms IBM TLS's lifecycle
                    framework from reactive management to proactive evolution.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Core Capabilities</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Quantum Wasserstein Compilation (QWC) achieving 40% performance improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Autonomous lifecycle management with recursive self-improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Native sovereign cloud support with immutable audit trails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Red Hat OpenShift operator integration for enterprise deployment</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Business Impact</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>70% reduction in operational overhead through automation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>$2M+ annual savings per enterprise deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>New revenue streams through premium autonomous management services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Competitive differentiation in quantum-classical hybrid market</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Partnership Framework</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-blue-300 mb-1">Phase 1: Validation</div>
                      <div className="text-sm text-blue-200">90-day technical validation on IBM Quantum Network</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-purple-300 mb-1">Phase 2: Pilot</div>
                      <div className="text-sm text-purple-200">Controlled rollout to select TLS clients</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-300 mb-1">Phase 3: Enterprise</div>
                      <div className="text-sm text-green-200">Full commercial deployment across client base</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CostBenefitAnalysis />
          </TabsContent>

          <TabsContent value="telemetry">
            <Card className="bg-slate-900/50 border-cyan-500/20 mb-6">
              <CardHeader>
                <CardTitle className="text-cyan-400">Live System Telemetry</CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time monitoring of quantum agents, coherence metrics, and living organism status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/20 p-4 mb-4">
                  <p className="text-sm text-slate-300">
                    This dashboard displays <span className="font-semibold text-cyan-400">real experimental data</span>{" "}
                    from DNALANG quantum experiments, including perfect Bell pair coherence measurements, active
                    monitoring agents, and quantum-biological organism metadata. All metrics update in real-time via
                    WebSocket telemetry.
                  </p>
                </div>
              </CardContent>
            </Card>
            <LiveTelemetryDashboard />
          </TabsContent>

          <TabsContent value="tls">
            <TLSLifecycleView />
          </TabsContent>

          <TabsContent value="architecture">
            <TechnicalArchitecture />
          </TabsContent>

          <TabsContent value="security">
            <SecurityCompliance />
          </TabsContent>

          <TabsContent value="optimization">
            <ResourceOptimization />
          </TabsContent>

          <TabsContent value="roadmap">
            <IntegrationRoadmap />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer CTA */}
      <footer className="border-t border-blue-900/30 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Ready to Transform Your Infrastructure?</h3>
              <p className="text-sm text-blue-300">Contact IBM TLS to schedule a technical validation session</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-950/50 bg-transparent"
              >
                Download Proposal
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
