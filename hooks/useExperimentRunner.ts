"use client"

import { useState, useCallback } from "react"
import {
  experimentRunnerService,
  type ExperimentConfig,
  type ExperimentResult,
} from "@/services/experimentRunnerService"

export function useExperimentRunner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ExperimentResult[]>([])

  const runExperiment = useCallback(async (config: ExperimentConfig) => {
    setLoading(true)
    setError(null)

    try {
      const result = await experimentRunnerService.runExperiment(config)
      setResults((prev) => [...prev, result])
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const runBatch = useCallback(async (experiments: ExperimentConfig[]) => {
    setLoading(true)
    setError(null)

    try {
      const batchResults = await experimentRunnerService.runBatch(experiments)
      setResults((prev) => [...prev, ...batchResults])
      return batchResults
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getResult = useCallback(async (experimentId: string) => {
    try {
      return await experimentRunnerService.getResult(experimentId)
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }, [])

  const refreshResults = useCallback(async () => {
    try {
      const allResults = await experimentRunnerService.getAllResults()
      setResults(allResults)
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  return {
    loading,
    error,
    results,
    runExperiment,
    runBatch,
    getResult,
    refreshResults,
  }
}
