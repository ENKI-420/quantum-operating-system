"use client"

import { useState, useCallback } from "react"
import type {
  OrganismState,
  GeneInvokeRequest,
  RunResult,
  MutationRequest,
  RunSummary,
  PatchOperation,
  LogEntry,
  GeneInvocationRequest,
  GeneInvocationResponse,
  DNAOrganismState,
  MutationSubmission,
  RunHistoryEntry,
} from "../types"
import * as dnaLangAPI from "../services/dnaLangService"

export const useDNALang = (organismId = "QuantumSwarm") => {
  const [state, setState] = useState<OrganismState | null>(null)
  const [dnaState, setDnaState] = useState<DNAOrganismState | null>(null)
  const [runs, setRuns] = useState<RunSummary[]>([])
  const [currentRun, setCurrentRun] = useState<RunResult | null>(null)
  const [currentInvocation, setCurrentInvocation] = useState<GeneInvocationResponse | null>(null)
  const [runHistory, setRunHistory] = useState<RunHistoryEntry[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: "DNA-Lang Interpreter initialized.",
      type: "info",
      author: "system",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const addLog = useCallback((message: string, type: LogEntry["type"], author: LogEntry["author"] = "system") => {
    setLogs((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        message,
        type,
        author,
      },
      ...prev.slice(0, 100),
    ])
  }, [])

  const checkHealth = useCallback(async () => {
    try {
      const health = await dnaLangAPI.healthCheck()
      addLog(`API Health: ${health.status} - ${health.service}`, "success")
      return health
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      addLog(`Health check failed: ${message}`, "error")
      throw error
    }
  }, [addLog])

  const parseSource = useCallback(
    async (source: string) => {
      setIsLoading(true)
      try {
        const result = await dnaLangAPI.parseProgram(source)
        if (result.valid) {
          addLog(`Program parsed successfully: ${result.organismName}`, "success")
        } else {
          addLog(`Parse errors: ${result.errors.map((e) => e.message).join(", ")}`, "error")
        }
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Parse failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [addLog],
  )

  const invokeGene = useCallback(
    async (geneName: string, parameters: Record<string, string> = {}) => {
      setIsLoading(true)
      addLog(`Invoking gene: ${geneName}`, "info", "user")
      try {
        const request: GeneInvocationRequest = {
          organism_id: organismId,
          gene_name: geneName,
          parameters,
        }
        const result = await dnaLangAPI.invokeGene(request)
        setCurrentInvocation(result)
        addLog(
          `Gene ${geneName} executed: ${result.status} (${result.output.execution_time_ms}ms)`,
          result.status === "COMPLETED" ? "success" : "error",
        )
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Gene invocation failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const runGene = useCallback(
    async (request: GeneInvokeRequest) => {
      setIsLoading(true)
      addLog(`Invoking gene: ${request.gene}`, "info", "user")
      try {
        const result = await dnaLangAPI.invokeGene(organismId, request)
        setCurrentRun(result)
        addLog(
          `Gene ${request.gene} executed: ${result.success ? "SUCCESS" : "FAILED"}`,
          result.success ? "success" : "error",
        )

        // Add run logs to the main log
        result.logs.forEach((log) => {
          addLog(`[${log.level}] ${log.message}`, "info")
        })

        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Gene invocation failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const applyMutation = useCallback(
    async (request: MutationRequest) => {
      setIsLoading(true)
      addLog(`Submitting ${request.type} mutation: ${request.instruction}`, "info", "user")
      try {
        const result = await dnaLangAPI.submitMutation(organismId, request)
        addLog(
          `Mutation ${result.accepted ? "accepted" : "rejected"}: ${result.notes}`,
          result.accepted ? "success" : "warning",
        )
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Mutation failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const submitMutation = useCallback(
    async (geneSequence: string, description: string) => {
      setIsLoading(true)
      addLog(`Submitting mutation: ${description}`, "info", "user")
      try {
        const submission: MutationSubmission = {
          organism_id: organismId,
          gene_sequence: geneSequence,
          description,
        }
        const result = await dnaLangAPI.submitMutation(submission)
        addLog(`Mutation submitted: ${result.event_type} (Run ID: ${result.run_id})`, "success")
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Mutation failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const fetchState = useCallback(async () => {
    setIsLoading(true)
    try {
      const newState = await dnaLangAPI.getOrganismState(organismId)
      setState(newState)
      addLog("Organism state fetched successfully", "success")
      return newState
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      addLog(`Failed to fetch state: ${message}`, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [organismId, addLog])

  const fetchDNAState = useCallback(async () => {
    setIsLoading(true)
    try {
      const newState = await dnaLangAPI.getOrganismState(organismId)
      setDnaState(newState)
      addLog(
        `DNA Organism state fetched: ${newState.current_state} (Coherence: ${newState.coherence_level})`,
        "success",
      )
      return newState
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      addLog(`Failed to fetch DNA state: ${message}`, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [organismId, addLog])

  const updateState = useCallback(
    async (operations: PatchOperation[]) => {
      setIsLoading(true)
      addLog(`Patching organism state with ${operations.length} operation(s)`, "info")
      try {
        const newState = await dnaLangAPI.patchOrganismState(organismId, operations)
        setState(newState)
        addLog("State patched successfully", "success")
        return newState
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`State patch failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const updateDNAState = useCallback(
    async (newState: Partial<DNAOrganismState>) => {
      setIsLoading(true)
      addLog(`Updating DNA organism state`, "info")
      try {
        const updatedState = await dnaLangAPI.patchOrganismState(organismId, newState)
        setDnaState(updatedState)
        addLog("DNA state updated successfully", "success")
        return updatedState
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`DNA state update failed: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const fetchRuns = useCallback(
    async (page = 1, pageSize = 50) => {
      setIsLoading(true)
      try {
        const runList = await dnaLangAPI.listRuns(organismId, page, pageSize)
        setRuns(runList)
        addLog(`Fetched ${runList.length} run(s)`, "success")
        return runList
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        addLog(`Failed to fetch runs: ${message}`, "error")
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [organismId, addLog],
  )

  const fetchRunHistory = useCallback(async () => {
    setIsLoading(true)
    try {
      const history = await dnaLangAPI.getRunHistory()
      setRunHistory(history)
      addLog(`Fetched ${history.length} history entries`, "success")
      return history
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      addLog(`Failed to fetch run history: ${message}`, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [addLog])

  return {
    // Old API state
    state,
    runs,
    currentRun,
    // New API state
    dnaState,
    currentInvocation,
    runHistory,
    // Common state
    logs,
    isLoading,
    // Old API methods
    checkHealth,
    parseSource,
    runGene,
    applyMutation,
    fetchState,
    updateState,
    fetchRuns,
    // New API methods
    invokeGene,
    submitMutation,
    fetchDNAState,
    updateDNAState,
    fetchRunHistory,
  }
}
