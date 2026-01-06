"use client"

import { useEffect, useState } from "react"
import { useOrchestrator } from "@/hooks/useOrchestrator"
import { useInsights } from "@/hooks/useInsights"
import { useEnhancement } from "@/hooks/useEnhancement"
import { useExperimentRunner } from "@/hooks/useExperimentRunner"
import { OrchestratorControls } from "./OrchestratorControls"
import { ExperimentQueue } from "./ExperimentQueue"
import { InsightsPanel } from "./InsightsPanel"
import { EnhancementsPanel } from "./EnhancementsPanel"
import { MetricsGrid } from "./MetricsGrid"
import { SystemHealth } from "./SystemHealth"

export function ResearchDashboard() {
  const orchestrator = useOrchestrator()
  const insights = useInsights()
  const enhancement = useEnhancement()
  const runner = useExperimentRunner()

  const [autoRefresh, setAutoRefresh] = useState(true)

  // Auto-refresh data every 5 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      orchestrator.refreshState()
      insights.refreshInsights()
      enhancement.refreshSuggestions()
      runner.refreshResults()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh, orchestrator, insights, enhancement, runner])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="mx-auto max-w-[1800px] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-balance">Quantum Research Platform</h1>
              <p className="text-sm text-[#a1a1a1]">Autonomous Experiment Orchestration & AI-Powered Insights</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  autoRefresh
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-[#262626] text-[#a1a1a1] hover:bg-[#333333]"
                }`}
              >
                {autoRefresh ? "Auto-Refresh On" : "Auto-Refresh Off"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1800px] px-6 py-6">
        <div className="grid gap-6">
          {/* System Health & Orchestrator Controls */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SystemHealth state={orchestrator.state} />
            <OrchestratorControls
              state={orchestrator.state}
              onStart={orchestrator.start}
              onStop={orchestrator.stop}
              onConfigure={orchestrator.configure}
              loading={orchestrator.loading}
            />
          </div>

          {/* Metrics Grid */}
          <MetricsGrid
            experiments={orchestrator.experiments}
            runs={runner.results}
            insights={insights.insights}
            enhancements={enhancement.suggestions}
          />

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Experiment Queue */}
            <div className="lg:col-span-1">
              <ExperimentQueue
                experiments={orchestrator.experiments}
                onAddExperiment={orchestrator.addExperiment}
                onRemoveExperiment={orchestrator.removeExperiment}
                loading={orchestrator.loading}
              />
            </div>

            {/* Insights Panel */}
            <div className="lg:col-span-1">
              <InsightsPanel
                insights={insights.insights}
                onAnalyze={() => insights.analyzeExperiments({ experimentRuns: runner.results })}
                onDetectAnomalies={() => insights.detectAnomalies(runner.results)}
                loading={insights.loading}
              />
            </div>

            {/* Enhancements Panel */}
            <div className="lg:col-span-1">
              <EnhancementsPanel
                suggestions={enhancement.suggestions}
                onApply={enhancement.applySuggestion}
                onAutoEnhance={(experimentId) => enhancement.autoEnhance(experimentId, 0.7)}
                loading={enhancement.loading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
