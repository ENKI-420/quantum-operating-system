"use client"

import { useState, useEffect, useCallback } from "react"

// =================================================================
// 1. CONFIGURATION AND API HANDLERS
// =================================================================

const ORGANISM_ID = "QuantumSwarm"

// Define the schema for the Gene Documentation feature (Structured Output)
const GENE_DOC_SCHEMA = {
  type: "OBJECT",
  properties: {
    function: { type: "STRING", description: "The high-level function of the gene." },
    input_signature: { type: "STRING", description: "The data structures required for input." },
    output_result: { type: "STRING", description: "The expected output or side-effect of the gene." },
    negentropy_role: { type: "STRING", description: "The gene's role in achieving Negentropic Self-Assembly." },
  },
  propertyOrdering: ["function", "input_signature", "output_result", "negentropy_role"],
}

// Exponential Backoff Utility for robust API calls
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 5): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)
      if (response.status !== 429) return response

      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    } catch (error) {
      if (attempt === maxRetries - 1) throw error
    }
  }
  throw new Error("Max retries exceeded for API call.")
}

/**
 * Handles communication with the Gemini API via secure Next.js proxy
 */
async function callGeminiAPI(
  userQuery: string,
  systemPrompt: string,
  useGrounding = false,
  responseSchema: any = null,
) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userQuery,
        systemPrompt,
        useGrounding,
        responseSchema,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Gemini API request failed")
    }

    return await response.json()
  } catch (err: any) {
    console.error("Gemini API Call Failed:", err)
    throw new Error(`Gemini API Error: ${err.message}`)
  }
}

// =================================================================
// 2. DNA-LANG MLOPS API SERVICE (Proxy Call)
// =================================================================

async function callProxy(path: string, method: string, body?: any) {
  const proxyUrl = "/api/dna-lang"

  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, method, body }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`API Error ${response.status}: ${errorData.error || response.statusText}`)
  }

  return response.json()
}

const dnaLangService = {
  getOrganismState: (organismId: string) => {
    return callProxy(`/organism/${organismId}`, "GET")
  },
  invokeGene: (request: any) => {
    return callProxy("/gene/invoke", "POST", request)
  },
  getRunHistory: () => {
    return callProxy("/history", "GET")
  },
}

// =================================================================
// 3. REACT COMPONENT: DNALangVisualizer
// =================================================================

const formatTimestamp = (ts: number) => new Date(ts * 1000).toLocaleTimeString()

// Icon Components
const ZapIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const DnaIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 15c6.667 0 10-2 16-2 6 0 10 2 16 2" />
    <path d="M2 9c6.667 0 10 2 16 2 6 0 10-2 16-2" />
    <path d="M12 2v20" />
    <path d="M6 4v16" />
    <path d="M18 4v16" />
  </svg>
)
const ClockIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const ActivityIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)
const GemIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17l5-5-5-5h8l-5 5 5 5z" />
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M19 12h3" />
    <path d="M2 12h3" />
  </svg>
)

const DNALangVisualizer = () => {
  // MLOps State
  const [organismState, setOrganismState] = useState<any>(null)
  const [runHistory, setRunHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInvoking, setIsInvoking] = useState(false)

  // Gemini API States
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [explanationResult, setExplanationResult] = useState<any>(null)
  const [isExplaining, setIsExplaining] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [state, history] = await Promise.all([
        dnaLangService.getOrganismState(ORGANISM_ID),
        dnaLangService.getRunHistory(),
      ])
      setOrganismState(state)
      setRunHistory(history)
    } catch (err: any) {
      console.error("Fetch Data Error:", err.message)
      setError(`Failed to load data. Detail: ${err.message}. Check backend and proxy.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(fetchData, 15000)
    return () => clearInterval(intervalId)
  }, [fetchData])

  const handleInvokeGene = async () => {
    setIsInvoking(true)
    setError(null)
    setAnalysisResult(null)
    setExplanationResult(null)

    const geneName = "QuantumOptimizer"
    const request = {
      organism_id: ORGANISM_ID,
      gene_name: geneName,
      parameters: {
        input_qubits: "7",
        optimization_level: "high",
      },
    }

    try {
      await dnaLangService.invokeGene(request)
      await fetchData()
    } catch (err: any) {
      console.error("Gene Invocation Error:", err.message)
      setError(`Failed to invoke gene ${geneName}. Detail: ${err.message}`)
    } finally {
      setIsInvoking(false)
    }
  }

  const handleStateAnalysis = async () => {
    if (!organismState) {
      alert("Cannot analyze state: Organism data not loaded.")
      return
    }

    setIsAnalyzing(true)
    setAnalysisResult(null)
    setError(null)

    const state = organismState.current_state
    const level = (organismState.coherence_level * 100).toFixed(2)

    const userQuery = `Analyze the MLOps Organism state. Current State is '${state}' and Coherence Level is ${level}%. Provide an expert, grounded assessment of its health and suggest the single most crucial immediate next step for the MLOps engineer to ensure Negentropic Self-Assembly.`
    const systemPrompt =
      "You are a world-class Quantum MLOps and Negentropic Systems analyst. Your response must be highly professional, structured, and strictly based on the provided data and search results. Do not exceed 100 words. Provide the assessment and the next step."

    try {
      const result = await callGeminiAPI(userQuery, systemPrompt, true)
      setAnalysisResult(result)
    } catch (err: any) {
      setError(`State Analysis Failed: ${err.message}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGeneExplanation = async (geneName = "QuantumOptimizer") => {
    setIsExplaining(true)
    setExplanationResult(null)
    setError(null)

    const userQuery = `Provide a detailed, creative explanation for the Quantum DNA-Lang Gene: '${geneName}'. Describe its function, its expected input/output, and its role in achieving Negentropic Self-Assembly.`
    const systemPrompt =
      "You are the primary documentation engine for the DNA-Lang Quantum OS. Provide a structured JSON response only, conforming to the provided schema. The explanation must be creative, use high-level quantum and bio-digital terminology, and be suitable for display in a technical dashboard."

    try {
      const result = await callGeminiAPI(userQuery, systemPrompt, false, GENE_DOC_SCHEMA)
      const parsedJson = JSON.parse(result.text)
      setExplanationResult({ ...result, parsed: parsedJson })
    } catch (err: any) {
      setError(`Gene Doc Generation Failed: ${err.message}`)
    } finally {
      setIsExplaining(false)
    }
  }

  // UI Components
  const StateCard = ({ title, value, icon: Icon, isMetric = false }: any) => (
    <div className="bg-gray-800/50 p-4 rounded-xl border border-blue-600/50 flex flex-col shadow-lg">
      <div className="flex items-center gap-3 text-blue-400 mb-2">
        <Icon className="w-6 h-6" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      </div>
      <p className={`text-3xl font-bold ${isMetric ? "text-green-400" : "text-white"}`}>{value}</p>
    </div>
  )

  const HistoryItem = ({ entry }: any) => {
    let icon, color, title

    switch (entry.event_type) {
      case "GENE_INVOKE":
        icon = <ZapIcon className="w-5 h-5" />
        color = "text-yellow-400 border-yellow-500"
        title = `Gene Invocation: ${entry.details.gene}`
        break
      case "MUTATION_SUBMITTED":
        icon = <DnaIcon className="w-5 h-5" />
        color = "text-purple-400 border-purple-500"
        title = `Mutation Submitted (${entry.details.new_sequence_length} bases)`
        break
      case "STATE_UPDATE":
        icon = <ActivityIcon className="w-5 h-5" />
        color = "text-teal-400 border-teal-500"
        title = `State Change: ${entry.details.new_state}`
        break
      default:
        icon = <ClockIcon className="w-5 h-5" />
        color = "text-gray-400 border-gray-500"
        title = entry.event_type
    }

    return (
      <div
        className={`flex gap-3 p-3 bg-gray-800/30 rounded-lg transition duration-200 hover:bg-gray-700/50 border-l-4 ${color.replace("text", "border")}`}
      >
        <div className={`p-1.5 rounded-full ${color.replace("text", "bg").replace("border", "bg")}/20 flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${color}`}>{title}</p>
          <p className="text-xs text-gray-400 truncate">{JSON.stringify(entry.details)}</p>
        </div>
        <div className="text-right text-xs text-gray-500 flex-shrink-0">{formatTimestamp(entry.timestamp)}</div>
      </div>
    )
  }

  const GeneDocumentation = ({ data }: any) => (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-teal-400 border-b border-teal-500/50 pb-1 mb-3">
        Gene Documentation (Structured)
      </h4>
      {Object.entries(data).map(([key, value]: [string, any]) => (
        <div key={key} className="flex flex-col">
          <span className="text-xs uppercase font-medium text-gray-400">{key.replace(/_/g, " ")}:</span>
          <p className="text-sm text-white bg-gray-700/50 p-2 rounded-md">{value}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <style jsx>{`
        .quantum-shadow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 5px rgba(59, 130, 246, 0.6);
        }
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        .pulsing-button {
          animation: pulse-blue 1.5s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #60a5fa; }
      `}</style>

      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          DNA-Lang <span className="text-blue-500">Quantum OS</span> Visualizer
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Real-Time MLOps and Organism Telemetry</p>
      </header>

      {error && (
        <div className="bg-red-900/50 border border-red-600 p-4 rounded-xl mb-6 text-red-200 shadow-xl">
          <p className="font-bold">System Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20 text-blue-400">
          <DnaIcon className="w-12 h-12 mx-auto animate-spin" />
          <p className="mt-4 text-lg">Establishing Quantum Entanglement...</p>
        </div>
      ) : (
        <main className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* LEFT COLUMN: Controls & Metrics */}
          <div className="lg:col-span-1 space-y-8 xl:col-span-1">
            {/* Control Panel */}
            <div className="bg-gray-800 p-6 rounded-xl quantum-shadow">
              <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-blue-500/30 pb-2">
                Organism Control: {ORGANISM_ID}
              </h2>
              <button
                onClick={handleInvokeGene}
                disabled={isInvoking}
                className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-300 mb-4 ${
                  isInvoking
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white pulsing-button"
                }`}
              >
                {isInvoking ? (
                  <span className="flex items-center justify-center gap-2">
                    <ZapIcon className="w-5 h-5 animate-bounce" />
                    <span>Invoking QuantumOptimizer...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ZapIcon className="w-5 h-5" />
                    <span>INVOKE GENE: QuantumOptimizer</span>
                  </span>
                )}
              </button>
              <button
                onClick={handleStateAnalysis}
                disabled={isAnalyzing || !organismState}
                className={`w-full py-3 rounded-xl text-base font-semibold transition duration-300 mb-2 ${
                  isAnalyzing
                    ? "bg-purple-800/50 text-purple-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <GemIcon className="w-5 h-5 animate-spin" />
                    <span>Analyzing State...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <GemIcon className="w-5 h-5" />
                    <span>State Diagnosis (Grounded)</span>
                  </span>
                )}
              </button>
              <button
                onClick={() => handleGeneExplanation("QuantumOptimizer")}
                disabled={isExplaining}
                className={`w-full py-3 rounded-xl text-base font-semibold transition duration-300 ${
                  isExplaining
                    ? "bg-teal-800/50 text-teal-300 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                {isExplaining ? (
                  <span className="flex items-center justify-center gap-2">
                    <GemIcon className="w-5 h-5 animate-spin" />
                    <span>Generating Docs...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <GemIcon className="w-5 h-5" />
                    <span>Generate Gene Docs (Structured)</span>
                  </span>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">LLM features powered by Gemini Flash.</p>
            </div>

            {/* Organism Metrics */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-300">Organism Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StateCard title="Current State" value={organismState?.current_state || "UNKNOWN"} icon={DnaIcon} />
                <StateCard
                  title="Coherence Level"
                  value={`${(organismState?.coherence_level * 100).toFixed(2) || "0.00"} %`}
                  icon={ActivityIcon}
                  isMetric={true}
                />
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">Last Mutation</h3>
                <p className="text-white text-sm">
                  {organismState?.last_mutation_timestamp
                    ? new Date(organismState.last_mutation_timestamp * 1000).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER/RIGHT COLUMNS: Analysis & History Feed */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-8">
            {/* Gemini Analysis Output */}
            {(analysisResult || explanationResult) && (
              <div className="bg-gray-800 p-6 rounded-xl quantum-shadow border border-purple-500/50">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 border-b border-purple-500/30 pb-2 flex items-center">
                  <GemIcon className="w-6 h-6 mr-2" />
                  Gemini LLM Output
                </h2>

                {analysisResult && (
                  <div className="mb-6 border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-bold text-white mb-2">State Diagnosis</h3>
                    <div className="prose prose-sm max-w-none text-gray-300">
                      {analysisResult.text.split("\n").map((line: string, i: number) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                    {analysisResult.sources.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-gray-500">Grounded Sources:</p>
                        <ul className="list-disc list-inside text-xs text-gray-500">
                          {analysisResult.sources.slice(0, 3).map((source: any, i: number) => (
                            <li key={i} className="truncate">
                              <a
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                              >
                                {source.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {explanationResult && explanationResult.parsed && <GeneDocumentation data={explanationResult.parsed} />}
              </div>
            )}

            {/* Event History Feed */}
            <div className="bg-gray-800 p-6 rounded-xl quantum-shadow h-full">
              <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-blue-500/30 pb-2 flex items-center">
                <ClockIcon className="w-6 h-6 mr-2" />
                Event History Feed
              </h2>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {runHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">
                    No recent history. Invoke a gene to begin logging events.
                  </p>
                ) : (
                  runHistory.map((entry, index) => <HistoryItem key={entry.run_id || index} entry={entry} />)
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default DNALangVisualizer
