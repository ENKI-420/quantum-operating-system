"use client"

import type { OrchestratorState } from "@/types"

interface SystemHealthProps {
  state: OrchestratorState | null
}

export function SystemHealth({ state }: SystemHealthProps) {
  const healthColor =
    state?.systemHealth === "healthy"
      ? "text-green-500"
      : state?.systemHealth === "degraded"
        ? "text-yellow-500"
        : "text-red-500"

  const healthBg =
    state?.systemHealth === "healthy"
      ? "bg-green-500/10"
      : state?.systemHealth === "degraded"
        ? "bg-yellow-500/10"
        : "bg-red-500/10"

  return (
    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-6">
      <h2 className="mb-4 text-lg font-semibold">System Health</h2>

      <div className="space-y-4">
        {/* Overall Health */}
        <div className={`rounded-lg ${healthBg} p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#a1a1a1]">Overall Status</span>
            <span className={`text-lg font-bold uppercase ${healthColor}`}>{state?.systemHealth || "Unknown"}</span>
          </div>
        </div>

        {/* Last Run */}
        {state?.lastRunAt && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#a1a1a1]">Last Run</span>
            <span className="font-medium">{new Date(state.lastRunAt).toLocaleString()}</span>
          </div>
        )}

        {/* System Metrics */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#a1a1a1]">CPU Usage</span>
            <span className="font-medium">42%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#262626]">
            <div className="h-full w-[42%] bg-blue-500" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#a1a1a1]">Memory Usage</span>
            <span className="font-medium">68%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#262626]">
            <div className="h-full w-[68%] bg-blue-500" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#a1a1a1]">Queue Capacity</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#262626]">
            <div className="h-full w-[85%] bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
