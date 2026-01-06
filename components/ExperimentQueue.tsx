"use client"

import { useState } from "react"
import type { ExperimentConfig } from "@/types"

interface ExperimentQueueProps {
  experiments: ExperimentConfig[]
  onAddExperiment: (config: ExperimentConfig) => Promise<void>
  onRemoveExperiment: (id: string) => Promise<void>
  loading: boolean
}

export function ExperimentQueue({ experiments, onAddExperiment, onRemoveExperiment, loading }: ExperimentQueueProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Experiment Queue</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {experiments.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#a1a1a1]">No experiments queued</div>
        ) : (
          experiments.map((exp) => (
            <div key={exp.id} className="rounded-lg border border-[#262626] bg-black p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">{exp.name}</div>
                  <div className="mt-1 text-xs text-[#a1a1a1]">{exp.type}</div>
                </div>
                <button
                  onClick={() => onRemoveExperiment(exp.id)}
                  disabled={loading}
                  className="text-xs text-red-500 hover:text-red-400 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
