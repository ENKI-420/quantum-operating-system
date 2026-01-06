import type { InsightGeneration, ExperimentRun } from "@/types"

export interface AnalysisRequest {
  experimentRuns: ExperimentRun[]
  focusAreas?: string[]
  includeRecommendations?: boolean
}

export interface AnalysisResponse {
  insights: InsightGeneration[]
  summary: string
  nextSteps: string[]
}

class InsightsService {
  private baseUrl = "/api/insights"

  async analyzeExperiments(request: AnalysisRequest): Promise<AnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Failed to analyze experiments: ${response.statusText}`)
    }

    return response.json()
  }

  async generateInsight(experimentRunId: string): Promise<InsightGeneration> {
    const response = await fetch(`${this.baseUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experimentRunId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate insight: ${response.statusText}`)
    }

    return response.json()
  }

  async getInsights(experimentId?: string): Promise<InsightGeneration[]> {
    const url = experimentId ? `${this.baseUrl}?experimentId=${experimentId}` : this.baseUrl

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to get insights: ${response.statusText}`)
    }

    return response.json()
  }

  async detectAnomalies(experimentRuns: ExperimentRun[]): Promise<InsightGeneration[]> {
    const response = await fetch(`${this.baseUrl}/anomalies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experimentRuns }),
    })

    if (!response.ok) {
      throw new Error(`Failed to detect anomalies: ${response.statusText}`)
    }

    return response.json()
  }

  async suggestNextExperiments(currentResults: ExperimentRun[]): Promise<{ suggestions: string[]; rationale: string }> {
    const response = await fetch(`${this.baseUrl}/suggest-next`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentResults }),
    })

    if (!response.ok) {
      throw new Error(`Failed to suggest experiments: ${response.statusText}`)
    }

    return response.json()
  }
}

export const insightsService = new InsightsService()
