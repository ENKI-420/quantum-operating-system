"use client"

import { useState, useCallback } from "react"
import { insightsService, type AnalysisRequest, type AnalysisResponse } from "@/services/insightsService"
import type { InsightGeneration, ExperimentRun } from "@/types"

export function useInsights() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insights, setInsights] = useState<InsightGeneration[]>([])
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)

  const analyzeExperiments = useCallback(async (request: AnalysisRequest) => {
    setLoading(true)
    setError(null)

    try {
      const result = await insightsService.analyzeExperiments(request)
      setAnalysis(result)
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const generateInsight = useCallback(async (experimentRunId: string) => {
    setLoading(true)
    setError(null)

    try {
      const insight = await insightsService.generateInsight(experimentRunId)
      setInsights((prev) => [...prev, insight])
      return insight
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const detectAnomalies = useCallback(async (experimentRuns: ExperimentRun[]) => {
    setLoading(true)
    setError(null)

    try {
      const anomalies = await insightsService.detectAnomalies(experimentRuns)
      setInsights((prev) => [...prev, ...anomalies])
      return anomalies
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const suggestNextExperiments = useCallback(async (currentResults: ExperimentRun[]) => {
    setLoading(true)
    setError(null)

    try {
      const suggestions = await insightsService.suggestNextExperiments(currentResults)
      return suggestions
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshInsights = useCallback(async (experimentId?: string) => {
    try {
      const allInsights = await insightsService.getInsights(experimentId)
      setInsights(allInsights)
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  return {
    loading,
    error,
    insights,
    analysis,
    analyzeExperiments,
    generateInsight,
    detectAnomalies,
    suggestNextExperiments,
    refreshInsights,
  }
}
