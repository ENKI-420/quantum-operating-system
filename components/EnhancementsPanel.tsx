"use client"

import type { EnhancementSuggestion } from "@/types"

interface EnhancementsPanelProps {
  suggestions: EnhancementSuggestion[]
  onApply: (id: string) => Promise<void>
  onAutoEnhance: (experimentId: string) => Promise<void>
  loading: boolean
}

export function EnhancementsPanel({ suggestions, onApply, onAutoEnhance, loading }: EnhancementsPanelProps) {
  return (
    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Enhancements</h2>
        <button
          onClick={() => onAutoEnhance("all")}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Auto-Enhance
        </button>
      </div>

      <div className="space-y-2">
        {suggestions.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#a1a1a1]">No enhancement suggestions</div>
        ) : (
          suggestions.slice(0, 5).map((suggestion) => (
            <div key={suggestion.id} className="rounded-lg border border-[#262626] bg-black p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-sm">{suggestion.description}</div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#a1a1a1]">
                    <span>+{(suggestion.expectedImprovement * 100).toFixed(1)}%</span>
                    <span>Confidence: {(suggestion.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
                {!suggestion.appliedAt && (
                  <button
                    onClick={() => onApply(suggestion.id)}
                    disabled={loading}
                    className="text-xs text-blue-500 hover:text-blue-400 disabled:opacity-50"
                  >
                    Apply
                  </button>
                )}
                {suggestion.appliedAt && <span className="text-xs text-green-500">Applied</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
