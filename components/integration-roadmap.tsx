"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock } from "lucide-react"

export function IntegrationRoadmap() {
  const phases = [
    {
      phase: "Phase 1: Technical Validation",
      duration: "90 Days",
      status: "ready",
      milestones: [
        { name: "Deploy DNALANG on IBM Quantum Network", status: "ready" },
        { name: "Validate QWC performance improvements", status: "ready" },
        { name: "Demonstrate barren plateau mitigation", status: "ready" },
        { name: "Verify Red Hat OpenShift compatibility", status: "ready" },
        { name: "Complete security audit", status: "ready" },
      ],
      deliverables: [
        "Technical validation report with performance benchmarks",
        "Security assessment and compliance gap analysis",
        "Integration architecture documentation",
        "Proof-of-concept deployment on IBM infrastructure",
      ],
    },
    {
      phase: "Phase 2: Pilot Deployment",
      duration: "6 Months",
      status: "planned",
      milestones: [
        { name: "Select 3-5 pilot clients from IBM TLS portfolio", status: "planned" },
        { name: "Deploy DNALANG in non-regulated environments", status: "planned" },
        { name: "Train IBM TLS engineers on DNALANG operations", status: "planned" },
        { name: "Establish monitoring and support procedures", status: "planned" },
        { name: "Collect performance and cost metrics", status: "planned" },
      ],
      deliverables: [
        "Pilot deployment case studies",
        "ROI analysis with actual client data",
        "Operational runbooks for IBM TLS teams",
        "Customer satisfaction and NPS scores",
      ],
    },
    {
      phase: "Phase 3: Enterprise Rollout",
      duration: "12 Months",
      status: "future",
      milestones: [
        { name: "Achieve SOC 2 Type II certification", status: "future" },
        { name: "Launch DNALANG in IBM Marketplace", status: "future" },
        { name: "Establish joint innovation lab", status: "future" },
        { name: "Develop industry-specific organism templates", status: "future" },
        { name: "Integrate with Watson AIOps", status: "future" },
      ],
      deliverables: [
        "Full commercial product launch",
        "Industry-specific solution packages",
        "Joint marketing and sales enablement materials",
        "Long-term strategic partnership agreement",
      ],
    },
  ]

  const statusConfig = {
    ready: {
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-950/30",
      border: "border-green-900/50",
      label: "Ready to Start",
    },
    planned: {
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-950/30",
      border: "border-blue-900/50",
      label: "Planned",
    },
    future: {
      icon: Circle,
      color: "text-slate-400",
      bg: "bg-slate-950/30",
      border: "border-slate-700/50",
      label: "Future",
    },
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-white">Integration Roadmap</CardTitle>
          <CardDescription className="text-blue-300">
            Three-phase approach to IBM partnership deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const config = statusConfig[phase.status as keyof typeof statusConfig]
              const Icon = config.icon

              return (
                <Card key={phase.phase} className={`${config.bg} border ${config.border}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-slate-700/50">
                          <span className="text-lg font-bold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{phase.phase}</CardTitle>
                          <CardDescription className={config.color}>{phase.duration}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${config.border} ${config.color}`}>
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Key Milestones</h4>
                      <ul className="space-y-2">
                        {phase.milestones.map((milestone) => {
                          const milestoneConfig = statusConfig[milestone.status as keyof typeof statusConfig]
                          const MilestoneIcon = milestoneConfig.icon

                          return (
                            <li key={milestone.name} className="flex items-start gap-2 text-sm text-blue-100">
                              <MilestoneIcon className={`h-4 w-4 ${milestoneConfig.color} mt-0.5 flex-shrink-0`} />
                              <span>{milestone.name}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Deliverables</h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2 text-sm text-blue-100">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-blue-900/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Success Criteria</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-blue-300">Technical Metrics</h4>
                <ul className="space-y-1 text-sm text-blue-100">
                  <li>• 40%+ performance improvement validated</li>
                  <li>• 99.9% uptime SLA achieved</li>
                  <li>• Zero security incidents</li>
                  <li>• 100% compliance certification</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-purple-300">Business Metrics</h4>
                <ul className="space-y-1 text-sm text-purple-100">
                  <li>• 70%+ operational cost reduction</li>
                  <li>• 90%+ customer satisfaction score</li>
                  <li>• 5+ enterprise deployments</li>
                  <li>• $10M+ annual recurring revenue</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
