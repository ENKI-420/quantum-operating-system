"use client"

import { useState, useEffect, useCallback } from "react"
import { orchestratorService } from "@/services/orchestratorService"
import type {
  ExperimentConfig,
  ExperimentRun,
  OrchestratorState,
  InsightGeneration,
  EnhancementSuggestion,
} from "@/types"

export function useOrchestrator() {
  const [state, setState] = useState<OrchestratorState | null>(null)
  const [experiments, setExperiments] = useState<ExperimentConfig[]>([])
  const [runs, setRuns] = useState<ExperimentRun[]>([])
  const [insights, setInsights] = useState<InsightGeneration[]>([])
  const [enhancements, setEnhancements] = useState<EnhancementSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchState = useCallback(async () => {
    try {
      const data = await orchestratorService.getState()
      setState(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch state")
    }
  }, [])

  const fetchExperiments = useCallback(async () => {
    try {
      const data = await orchestratorService.getExperiments()
      setExperiments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch experiments")
    }
  }, [])

  const fetchRuns = useCallback(async (experimentId?: string) => {
    try {
      const data = await orchestratorService.getRuns(experimentId)
      setRuns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch runs")
    }
  }, [])

  const fetchInsights = useCallback(async () => {
    try {
      const data = await orchestratorService.getInsights()
      setInsights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch insights")
    }
  }, [])

  const fetchEnhancements = useCallback(async () => {
    try {
      const data = await orchestratorService.getEnhancements()
      setEnhancements(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch enhancements")
    }
  }, [])

  const startOrchestrator = useCallback(async () => {
    try {
      await orchestratorService.start()
      await fetchState()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start orchestrator")
    }
  }, [fetchState])

  const stopOrchestrator = useCallback(async () => {
    try {
      await orchestratorService.stop()
      await fetchState()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to stop orchestrator")
    }
  }, [fetchState])

  const createExperiment = useCallback(
    async (config: Omit<ExperimentConfig, "id" | "createdAt">) => {
      try {
        const newExperiment = await orchestratorService.createExperiment(config)
        await fetchExperiments()
        return newExperiment
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create experiment")
        throw err
      }
    },
    [fetchExperiments],
  )

  const applyEnhancement = useCallback(
    async (id: string) => {
      try {
        await orchestratorService.applyEnhancement(id)
        await fetchEnhancements()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to apply enhancement")
      }
    },
    [fetchEnhancements],
  )

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchState(), fetchExperiments(), fetchRuns(), fetchInsights(), fetchEnhancements()])
      setLoading(false)
    }

    loadData()

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      fetchState()
      fetchRuns()
      fetchInsights()
    }, 5000)

    return () => clearInterval(interval)
  }, [fetchState, fetchExperiments, fetchRuns, fetchInsights, fetchEnhancements])

  return {
    state,
    experiments,
    runs,
    insights,
    enhancements,
    loading,
    error,
    startOrchestrator,
    stopOrchestrator,
    createExperiment,
    applyEnhancement,
    refreshData: () => {
      fetchState()
      fetchExperiments()
      fetchRuns()
      fetchInsights()
      fetchEnhancements()
    },
  }
}
