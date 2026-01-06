"use client"

import type { OrchestratorState } from "@/types"

interface OrchestratorControlsProps {
  state: OrchestratorState | null
  onStart: () => Promise<void>
  onStop: () => Promise<void>
  onConfigure: (config: any) => Promise<void>
  loading: boolean
}

export function OrchestratorControls({ state, onStart, onStop, onConfigure, loading }: OrchestratorControlsProps) {
  return (
    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-6">
      <h2 className="mb-4 text-lg font-semibold">Orchestrator Controls</h2>

      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#a1a1a1]">Status</span>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${state?.isRunning ? "bg-green-500" : "bg-gray-500"}`} />
            <span className="text-sm font-medium">{state?.isRunning ? "Running" : "Stopped"}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!state?.isRunning ? (
            <button
              onClick={onStart}
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              Start Orchestrator
            </button>
          ) : (
            <button
              onClick={onStop}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              Stop Orchestrator
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div>
            <div className="text-2xl font-bold text-blue-500">{state?.activeExperiments || 0}</div>
            <div className="text-xs text-[#a1a1a1]">Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">{state?.queuedExperiments || 0}</div>
            <div className="text-xs text-[#a1a1a1]">Queued</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">{state?.totalExperimentsRun || 0}</div>
            <div className="text-xs text-[#a1a1a1]">Total Runs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {state?.successRate ? `${(state.successRate * 100).toFixed(1)}%` : "0%"}
            </div>
            <div className="text-xs text-[#a1a1a1]">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
