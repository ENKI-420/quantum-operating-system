"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Zap } from "lucide-react"

export function CostBenefitAnalysis() {
  return (
    <Card className="bg-slate-900/50 border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-white">Cost-Benefit Analysis</CardTitle>
        <CardDescription className="text-blue-300">
          Financial impact of DNALANG deployment for typical enterprise client
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-red-400" />
              Traditional Approach Costs
            </h3>
            <div className="space-y-3">
              {[
                { item: "Manual circuit optimization", cost: "$500K/year", description: "Quantum algorithm engineers" },
                { item: "Infrastructure management", cost: "$800K/year", description: "DevOps and SRE teams" },
                { item: "Compliance auditing", cost: "$300K/year", description: "Security and compliance staff" },
                { item: "Performance tuning", cost: "$400K/year", description: "Ongoing optimization work" },
              ].map((item) => (
                <div key={item.item} className="p-3 bg-red-950/20 border border-red-900/30 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{item.item}</span>
                    <span className="text-sm font-bold text-red-400">{item.cost}</span>
                  </div>
                  <div className="text-xs text-red-300">{item.description}</div>
                </div>
              ))}
              <div className="p-4 bg-red-950/30 border-2 border-red-900/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Total Annual Cost</span>
                  <span className="text-2xl font-bold text-red-400">$2.0M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              DNALANG Approach Costs
            </h3>
            <div className="space-y-3">
              {[
                { item: "DNALANG platform license", cost: "$200K/year", description: "Enterprise tier subscription" },
                { item: "IBM TLS support", cost: "$150K/year", description: "Managed service tier" },
                { item: "Reduced infrastructure", cost: "$150K/year", description: "Minimal oversight needed" },
                { item: "Automated optimization", cost: "$100K/year", description: "Self-managing system" },
              ].map((item) => (
                <div key={item.item} className="p-3 bg-green-950/20 border border-green-900/30 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{item.item}</span>
                    <span className="text-sm font-bold text-green-400">{item.cost}</span>
                  </div>
                  <div className="text-xs text-green-300">{item.description}</div>
                </div>
              ))}
              <div className="p-4 bg-green-950/30 border-2 border-green-900/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Total Annual Cost</span>
                  <span className="text-2xl font-bold text-green-400">$600K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 border-blue-900/50">
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$1.4M</div>
              <div className="text-sm text-blue-300">Annual Savings</div>
              <div className="text-xs text-blue-400 mt-2">70% cost reduction</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 border-purple-900/50">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">6 months</div>
              <div className="text-sm text-purple-300">Payback Period</div>
              <div className="text-xs text-purple-400 mt-2">ROI: 233% annually</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-950/50 to-cyan-950/50 border-green-900/50">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-green-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">15 FTE</div>
              <div className="text-sm text-green-300">Staff Reallocation</div>
              <div className="text-xs text-green-400 mt-2">Focus on innovation</div>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-900/50 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3">Additional Benefits</h4>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <span>40% performance improvement enables new use cases</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
              <span>Reduced time-to-market for quantum applications</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <span>Competitive differentiation in quantum market</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <span>Automatic compliance reduces audit costs</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
