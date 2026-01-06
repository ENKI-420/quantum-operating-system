import type {
  ExperimentConfig,
  ExperimentRun,
  OrchestratorState,
  InsightGeneration,
  EnhancementSuggestion,
} from "@/types"

const API_BASE = "/api/orchestrator"

export const orchestratorService = {
  // Orchestrator control
  async getState(): Promise<OrchestratorState> {
    const response = await fetch(`${API_BASE}/state`)
    if (!response.ok) throw new Error("Failed to fetch orchestrator state")
    return response.json()
  },

  async start(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/start`, { method: "POST" })
    if (!response.ok) throw new Error("Failed to start orchestrator")
    return response.json()
  },

  async stop(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/stop`, { method: "POST" })
    if (!response.ok) throw new Error("Failed to stop orchestrator")
    return response.json()
  },

  // Experiment management
  async createExperiment(config: Omit<ExperimentConfig, "id" | "createdAt">): Promise<ExperimentConfig> {
    const response = await fetch(`${API_BASE}/experiments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
    if (!response.ok) throw new Error("Failed to create experiment")
    return response.json()
  },

  async getExperiments(): Promise<ExperimentConfig[]> {
    const response = await fetch(`${API_BASE}/experiments`)
    if (!response.ok) throw new Error("Failed to fetch experiments")
    return response.json()
  },

  async getExperiment(id: string): Promise<ExperimentConfig> {
    const response = await fetch(`${API_BASE}/experiments/${id}`)
    if (!response.ok) throw new Error("Failed to fetch experiment")
    return response.json()
  },

  async updateExperiment(id: string, updates: Partial<ExperimentConfig>): Promise<ExperimentConfig> {
    const response = await fetch(`${API_BASE}/experiments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error("Failed to update experiment")
    return response.json()
  },

  async deleteExperiment(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE}/experiments/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete experiment")
    return response.json()
  },

  // Experiment runs
  async getRuns(experimentId?: string): Promise<ExperimentRun[]> {
    const url = experimentId ? `${API_BASE}/runs?experimentId=${experimentId}` : `${API_BASE}/runs`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch runs")
    return response.json()
  },

  async getRun(id: string): Promise<ExperimentRun> {
    const response = await fetch(`${API_BASE}/runs/${id}`)
    if (!response.ok) throw new Error("Failed to fetch run")
    return response.json()
  },

  async cancelRun(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE}/runs/${id}/cancel`, { method: "POST" })
    if (!response.ok) throw new Error("Failed to cancel run")
    return response.json()
  },

  // Insights
  async getInsights(experimentRunId?: string): Promise<InsightGeneration[]> {
    const url = experimentRunId ? `${API_BASE}/insights?runId=${experimentRunId}` : `${API_BASE}/insights`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch insights")
    return response.json()
  },

  // Enhancements
  async getEnhancements(experimentId?: string): Promise<EnhancementSuggestion[]> {
    const url = experimentId ? `${API_BASE}/enhancements?experimentId=${experimentId}` : `${API_BASE}/enhancements`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch enhancements")
    return response.json()
  },

  async applyEnhancement(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/enhancements/${id}/apply`, { method: "POST" })
    if (!response.ok) throw new Error("Failed to apply enhancement")
    return response.json()
  },
}
