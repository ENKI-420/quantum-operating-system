"use client"

import type { InsightGeneration } from "@/types"

interface InsightsPanelProps {
  insights: InsightGeneration[]
  onAnalyze: () => Promise<void>
  onDetectAnomalies: () => Promise<void>
  loading: boolean
}

export function InsightsPanel({ insights, onAnalyze, onDetectAnomalies, loading }: InsightsPanelProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "breakthrough":
        return "text-green-500"
      case "anomaly":
        return "text-red-500"
      case "optimization":
        return "text-blue-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Insights</h2>
        <div className="flex gap-2">
          <button
            onClick={onAnalyze}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            Analyze
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {insights.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#a1a1a1]">No insights generated yet</div>
        ) : (
          insights.slice(0, 5).map((insight) => (
            <div key={insight.id} className="rounded-lg border border-[#262626] bg-black p-3">
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 text-xs font-bold uppercase ${getTypeColor(insight.type)}`}>{insight.type}</div>
                <div className="flex-1">
                  <div className="text-sm">{insight.summary}</div>
                  <div className="mt-1 text-xs text-[#a1a1a1]">
                    Confidence: {(insight.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
