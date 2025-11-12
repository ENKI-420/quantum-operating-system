"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Lightbulb, Wrench, HeadphonesIcon, TrendingUp, Settings } from "lucide-react"

export function TLSLifecycleView() {
  const phases = [
    {
      name: "Advise",
      icon: Lightbulb,
      color: "blue",
      dnalangEnhancement: "AI-Powered Infrastructure Assessment",
      capabilities: [
        "Automated quantum readiness evaluation",
        "Workload classification for hybrid deployment",
        "Cost-benefit analysis with quantum advantage prediction",
        "Compliance gap analysis with remediation roadmap",
      ],
      integration:
        "DNALANG's C.E.N.T. system provides multi-agent analysis of infrastructure state, identifying optimization opportunities through quantum-inspired coherence metrics.",
    },
    {
      name: "Build",
      icon: Wrench,
      color: "purple",
      dnalangEnhancement: "Autonomous Circuit Compilation",
      capabilities: [
        "Quantum Wasserstein Compilation for optimal gate sequences",
        "Automatic barren plateau mitigation",
        "Biological programming paradigm for intuitive circuit design",
        "Red Hat OpenShift operator for seamless deployment",
      ],
      integration:
        "DNALANG transforms circuit design from manual optimization to biological evolution, reducing development time by 60% while improving fidelity by 40%.",
    },
    {
      name: "Support",
      icon: HeadphonesIcon,
      color: "green",
      dnalangEnhancement: "Predictive Maintenance & Self-Healing",
      capabilities: [
        "Real-time coherence monitoring across quantum-classical boundary",
        "Automatic error detection and correction",
        "Negentropic health metrics for system stability",
        "Immutable audit trails for compliance verification",
      ],
      integration:
        "The R-GET molecular executive continuously monitors system health, predicting failures before they occur and automatically applying corrective measures.",
    },
    {
      name: "Optimize",
      icon: TrendingUp,
      color: "cyan",
      dnalangEnhancement: "Recursive Self-Improvement",
      capabilities: [
        "Wasserstein Gradient Flow for stable optimization",
        "Multi-agent evolutionary algorithms",
        "Dynamic workload rebalancing across hybrid infrastructure",
        "Quantum-classical resource allocation optimization",
      ],
      integration:
        "DNALANG's infrastructure optimizes itself faster than human teams can audit, achieving continuous performance improvement without manual intervention.",
    },
    {
      name: "Manage",
      icon: Settings,
      color: "orange",
      dnalangEnhancement: "Autonomous Governance",
      capabilities: [
        "Self-certifying compliance validation",
        "Automated policy enforcement across sovereign clouds",
        "Real-time cost optimization with budget constraints",
        "Quantum swarm coordination for distributed workloads",
      ],
      integration:
        "Traditional 'Manage' implies human oversight. DNALANG extends this to autonomous management where the infrastructure itself becomes the primary governance agent.",
    },
  ]

  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-950/30", border: "border-blue-900/50", text: "text-blue-300", icon: "text-blue-400" },
    purple: {
      bg: "bg-purple-950/30",
      border: "border-purple-900/50",
      text: "text-purple-300",
      icon: "text-purple-400",
    },
    green: { bg: "bg-green-950/30", border: "border-green-900/50", text: "text-green-300", icon: "text-green-400" },
    cyan: { bg: "bg-cyan-950/30", border: "border-cyan-900/50", text: "text-cyan-300", icon: "text-cyan-400" },
    orange: {
      bg: "bg-orange-950/30",
      border: "border-orange-900/50",
      text: "text-orange-300",
      icon: "text-orange-400",
    },
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-white">IBM TLS Lifecycle Enhancement</CardTitle>
          <CardDescription className="text-blue-300">
            How DNALANG extends the Advise-Build-Support-Optimize-Manage framework for autonomous infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg">
            <p className="text-blue-100 leading-relaxed">
              <strong className="text-white">Strategic Question:</strong> "IBM TLS's
              Advise-Build-Support-Optimize-Manage lifecycle provides crucial structure for AI readiness. As we move
              toward autonomous infrastructure with systems like DNALANG that self-optimize across quantum, hybrid, and
              sovereign clouds—how does IBM envision extending this framework to handle recursive self-improvement?"
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {phases.map((phase, index) => {
          const colors = colorMap[phase.color]
          const Icon = phase.icon

          return (
            <Card key={phase.name} className="bg-slate-900/50 border-blue-900/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-white">{phase.name}</CardTitle>
                      <CardDescription className={colors.text}>{phase.dnalangEnhancement}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${colors.border} ${colors.text}`}>
                    Phase {index + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">DNALANG Capabilities</h4>
                  <ul className="space-y-2">
                    {phase.capabilities.map((capability, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                        <CheckCircle2 className={`h-4 w-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-4 ${colors.bg} border ${colors.border} rounded-lg`}>
                  <h4 className="text-sm font-semibold text-white mb-2">Integration Strategy</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">{phase.integration}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-blue-900/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <ArrowRight className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">The Autonomous Evolution</h3>
              <p className="text-blue-100 leading-relaxed">
                DNALANG doesn't just enhance each phase of the TLS lifecycle—it introduces a new paradigm where the
                infrastructure itself becomes the optimization agent. This shift from human-managed to self-managing
                systems requires a new "Validate" phase for recursive improvement boundaries, ensuring that autonomous
                evolution never violates regulatory or operational constraints.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
