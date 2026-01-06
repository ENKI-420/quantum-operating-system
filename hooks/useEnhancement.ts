"use client"

import { useState, useCallback } from "react"
import { enhancementService, type EnhancementRequest } from "@/services/enhancementService"
import type { EnhancementSuggestion, ExperimentConfig, ExperimentRun } from "@/types"

export function useEnhancement() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<EnhancementSuggestion[]>([])

  const generateSuggestions = useCallback(async (request: EnhancementRequest) => {
    setLoading(true)
    setError(null)

    try {
      const result = await enhancementService.generateSuggestions(request)
      setSuggestions((prev) => [...prev, ...result.suggestions])
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const applySuggestion = useCallback(async (suggestionId: string) => {
    setLoading(true)
    setError(null)

    try {
      const updated = await enhancementService.applySuggestion(suggestionId)
      setSuggestions((prev) => prev.map((s) => (s.id === suggestionId ? updated : s)))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const optimizeParameters = useCallback(
    async (experimentConfig: ExperimentConfig, historicalRuns: ExperimentRun[]) => {
      setLoading(true)
      setError(null)

      try {
        const result = await enhancementService.optimizeParameters(experimentConfig, historicalRuns)
        return result
      } catch (err: any) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const autoEnhance = useCallback(async (experimentId: string, threshold = 0.7) => {
    setLoading(true)
    setError(null)

    try {
      const result = await enhancementService.autoEnhance(experimentId, threshold)
      setSuggestions((prev) => [...prev, ...result.suggestions])
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshSuggestions = useCallback(async (experimentId?: string) => {
    try {
      const allSuggestions = await enhancementService.getSuggestions(experimentId)
      setSuggestions(allSuggestions)
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  return {
    loading,
    error,
    suggestions,
    generateSuggestions,
    applySuggestion,
    optimizeParameters,
    autoEnhance,
    refreshSuggestions,
  }
}
