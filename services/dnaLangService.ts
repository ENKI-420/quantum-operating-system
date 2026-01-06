import type {
  RunSummary,
  ParseResult,
  GeneInvocationRequest,
  GeneInvocationResponse,
  DNAOrganismState,
  MutationSubmission,
  RunHistoryEntry,
} from "../types"

const API_PROXY_URL = "/api/dna-lang"

class DNALangAPIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "DNALangAPIError"
  }
}

async function fetchViaProxy<T>(path: string, method: "GET" | "POST" | "PATCH" = "GET", body?: any): Promise<T> {
  const response = await fetch(API_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path,
      method,
      body,
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new DNALangAPIError(response.status, result.error || `HTTP ${response.status}`)
  }

  return result
}

export async function healthCheck(): Promise<{ status: string; service: string }> {
  return fetchViaProxy("/health", "GET")
}

export async function parseProgram(source: string): Promise<ParseResult> {
  return fetchViaProxy("/parse", "POST", { source })
}

export async function invokeGene(request: GeneInvocationRequest): Promise<GeneInvocationResponse> {
  return fetchViaProxy("/gene/invoke", "POST", request)
}

export async function submitMutation(submission: MutationSubmission): Promise<RunHistoryEntry> {
  return fetchViaProxy("/mutation/submit", "POST", submission)
}

export async function getOrganismState(organismId: string): Promise<DNAOrganismState> {
  return fetchViaProxy(`/organism/${organismId}`, "GET")
}

export async function patchOrganismState(
  organismId: string,
  newState: Partial<DNAOrganismState>,
): Promise<DNAOrganismState> {
  return fetchViaProxy(`/organism/${organismId}`, "PATCH", newState)
}

export async function listRuns(organismId: string, page = 1, pageSize = 50): Promise<RunSummary[]> {
  return fetchViaProxy(`/organisms/${organismId}/runs?page=${page}&pageSize=${pageSize}`, "GET")
}

export async function getRunHistory(): Promise<RunHistoryEntry[]> {
  return fetchViaProxy("/history", "GET")
}
