"use client"

import type { ExperimentConfig, InsightGeneration, EnhancementSuggestion } from "@/types"

interface MetricsGridProps {
  experiments: ExperimentConfig[]
  runs: any[]
  insights: InsightGeneration[]
  enhancements: EnhancementSuggestion[]
}

export function MetricsGrid({ experiments, runs, insights, enhancements }: MetricsGridProps) {
  const completedRuns = runs.filter((r) => r.status === "completed").length
  const failedRuns = runs.filter((r) => r.status === "failed").length
  const breakthroughs = insights.filter((i) => i.type === "breakthrough").length
  const appliedEnhancements = enhancements.filter((e) => e.appliedAt).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Total Experiments" value={experiments.length} trend="+12%" trendUp />
      <MetricCard title="Completed Runs" value={completedRuns} trend="+8%" trendUp />
      <MetricCard title="Breakthroughs" value={breakthroughs} trend="+3" trendUp highlight />
      <MetricCard title="Applied Enhancements" value={appliedEnhancements} trend="+5" trendUp />
    </div>
  )
}

function MetricCard({
  title,
  value,
  trend,
  trendUp,
  highlight,
}: {
  title: string
  value: number
  trend: string
  trendUp: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${highlight ? "border-blue-500 bg-blue-500/5" : "border-[#262626] bg-[#0a0a0a]"}`}
    >
      <div className="text-sm text-[#a1a1a1]">{title}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className={`text-3xl font-bold ${highlight ? "text-blue-500" : ""}`}>{value}</div>
        <div className={`text-sm font-medium ${trendUp ? "text-green-500" : "text-red-500"}`}>{trend}</div>
      </div>
    </div>
  )
}
