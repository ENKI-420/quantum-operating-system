export interface ExperimentConfig {
  id: string
  type: "VQE" | "QPE" | "QAOA" | "HHL" | "QAA" | "coherence" | "entanglement"
  parameters: Record<string, any>
  autoEnhance?: boolean
  maxIterations?: number
}

export interface ExperimentResult {
  experiment_id: string
  experiment_type: string
  status: "completed" | "failed" | "running"
  start_time: string
  end_time?: string
  result?: any
  error?: string
  enhancement?: {
    iterations: number
    improvement: number
    final_value: number
  }
}

export interface BatchExperimentRequest {
  experiments: ExperimentConfig[]
}

class ExperimentRunnerService {
  private baseUrl = "/api/experiment-runner"

  async runExperiment(config: ExperimentConfig): Promise<ExperimentResult> {
    const response = await fetch(`${this.baseUrl}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })

    if (!response.ok) {
      throw new Error(`Failed to run experiment: ${response.statusText}`)
    }

    return response.json()
  }

  async runBatch(experiments: ExperimentConfig[]): Promise<ExperimentResult[]> {
    const response = await fetch(`${this.baseUrl}/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiments }),
    })

    if (!response.ok) {
      throw new Error(`Failed to run batch: ${response.statusText}`)
    }

    return response.json()
  }

  async getResult(experimentId: string): Promise<ExperimentResult | null> {
    const response = await fetch(`${this.baseUrl}/result/${experimentId}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Failed to get result: ${response.statusText}`)
    }

    return response.json()
  }

  async getAllResults(): Promise<ExperimentResult[]> {
    const response = await fetch(`${this.baseUrl}/results`)

    if (!response.ok) {
      throw new Error(`Failed to get results: ${response.statusText}`)
    }

    return response.json()
  }
}

export const experimentRunnerService = new ExperimentRunnerService()
