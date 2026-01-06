export enum JobStatus {
  IDLE = "IDLE",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface QuantumJob {
  id: string
  backend: string
  status: JobStatus
  createdAt: string
  queuedAt?: string
  startedAt?: string
  completedAt?: string
  log: string[]
}

export interface QuantumExperimentMetrics {
  entropy: number
  fidelity: number
  mutualInfo: number
  l1_distance: number
}

export interface QuantumResult {
  jobId: string
  backend: string
  shots: number
  counts: Record<string, number>
  probabilities: Record<string, number>
  completedAt: string
  metrics: QuantumExperimentMetrics
}

export interface LogEntry {
  id: number
  timestamp: string
  message: string
  type: "info" | "warning" | "success" | "error" | "sent" | "received"
  author: "user" | "aiden" | "system"
}

export interface BenchmarkMetrics {
  quantumVolume: number
  entanglementFidelity: number
  networkThroughput: number
  swarmSynchronization: number
  consciousnessIndex: number
  modelDrift: number
}

export interface OrganismState {
  fitness: number
  consciousness: number
  stability: number
  transcendence: boolean
  variables: Record<string, any>
  lastUpdated: string
}

export interface GeneInvokeRequest {
  gene: string
  args: Record<string, any>
  dryRun?: boolean
  withAutoEnhance?: boolean
}

export interface RunLog {
  ts: string
  level: "DEBUG" | "INFO" | "WARN" | "ERROR"
  message: string
  data?: Record<string, any>
}

export interface RunResult {
  runId: string
  success: boolean
  returned: any
  status: "queued" | "running" | "completed" | "failed" | "cancelled"
  startedAt: string
  finishedAt: string
  logs: RunLog[]
}

export interface MutationRequest {
  type: "minor" | "major" | "hotfix" | "revert"
  instruction: string
  rationale?: string
}

export interface MutationResult {
  accepted: boolean
  notes: string
}

export interface RunSummary {
  runId: string
  organismId: string
  kind: "gene" | "workflow"
  target: string
  status: "queued" | "running" | "completed" | "failed" | "cancelled"
  startedAt: string
  finishedAt: string
}

export interface ParseResult {
  valid: boolean
  organismName: string
  errors: Array<{
    line?: number
    column?: number
    message: string
  }>
}

export interface PatchOperation {
  op: "add" | "replace" | "remove"
  path: string
  value?: any
}

export interface GeneInvocationRequest {
  organism_id: string
  gene_name: string
  parameters: Record<string, string>
}

export interface GeneInvocationResponse {
  organism_id: string
  gene_name: string
  status: string
  output: Record<string, any>
  timestamp: number
}

export interface DNAOrganismState {
  state_id: string
  current_state: string
  last_mutation_timestamp?: number
  coherence_level: number
}

export interface MutationSubmission {
  organism_id: string
  gene_sequence: string
  description: string
}

export interface RunHistoryEntry {
  run_id: string
  timestamp: number
  event_type: string
  details: Record<string, any>
}

export interface ExperimentConfig {
  id: string
  name: string
  description: string
  type: "quantum" | "dna-lang" | "hybrid"
  parameters: Record<string, any>
  schedule?: {
    type: "once" | "recurring" | "continuous"
    interval?: number // in milliseconds for recurring
    maxRuns?: number
  }
  autoEnhance: boolean
  priority: "low" | "normal" | "high" | "critical"
  createdAt: string
  createdBy: string
}

export interface ExperimentRun {
  id: string
  experimentId: string
  status: "queued" | "running" | "completed" | "failed" | "cancelled"
  startedAt?: string
  completedAt?: string
  duration?: number
  results?: any
  metrics?: Record<string, number>
  insights?: string[]
  errors?: string[]
  logs: RunLog[]
}

export interface OrchestratorState {
  isRunning: boolean
  activeExperiments: number
  queuedExperiments: number
  totalExperimentsRun: number
  successRate: number
  lastRunAt?: string
  systemHealth: "healthy" | "degraded" | "critical"
}

export interface InsightGeneration {
  id: string
  experimentRunId: string
  timestamp: string
  type: "pattern" | "anomaly" | "optimization" | "breakthrough"
  confidence: number
  summary: string
  details: string
  recommendations: string[]
  relatedExperiments: string[]
}

export interface EnhancementSuggestion {
  id: string
  experimentId: string
  type: "parameter" | "algorithm" | "architecture"
  description: string
  expectedImprovement: number
  confidence: number
  autoApply: boolean
  appliedAt?: string
  results?: {
    before: Record<string, number>
    after: Record<string, number>
    improvement: number
  }
}
