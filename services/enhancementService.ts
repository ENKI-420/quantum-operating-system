import type { EnhancementSuggestion, ExperimentRun, ExperimentConfig } from "@/types"

export interface EnhancementRequest {
  experimentId: string
  experimentRuns: ExperimentRun[]
  targetMetric?: string
  autoApply?: boolean
}

export interface EnhancementResult {
  suggestions: EnhancementSuggestion[]
  appliedCount: number
  estimatedImprovement: number
}

class EnhancementService {
  private baseUrl = "/api/enhancement"

  async generateSuggestions(request: EnhancementRequest): Promise<EnhancementResult> {
    const response = await fetch(`${this.baseUrl}/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate suggestions: ${response.statusText}`)
    }

    return response.json()
  }

  async applySuggestion(suggestionId: string): Promise<EnhancementSuggestion> {
    const response = await fetch(`${this.baseUrl}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ suggestionId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to apply suggestion: ${response.statusText}`)
    }

    return response.json()
  }

  async getSuggestions(experimentId?: string): Promise<EnhancementSuggestion[]> {
    const url = experimentId ? `${this.baseUrl}?experimentId=${experimentId}` : this.baseUrl

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to get suggestions: ${response.statusText}`)
    }

    return response.json()
  }

  async optimizeParameters(
    experimentConfig: ExperimentConfig,
    historicalRuns: ExperimentRun[],
  ): Promise<{ optimizedConfig: ExperimentConfig; rationale: string }> {
    const response = await fetch(`${this.baseUrl}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experimentConfig, historicalRuns }),
    })

    if (!response.ok) {
      throw new Error(`Failed to optimize parameters: ${response.statusText}`)
    }

    return response.json()
  }

  async autoEnhance(experimentId: string, threshold = 0.7): Promise<EnhancementResult> {
    const response = await fetch(`${this.baseUrl}/auto-enhance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experimentId, threshold }),
    })

    if (!response.ok) {
      throw new Error(`Failed to auto-enhance: ${response.statusText}`)
    }

    return response.json()
  }
}

export const enhancementService = new EnhancementService()
