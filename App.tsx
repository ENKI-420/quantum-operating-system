"use client"
import type React from "react"
import Header from "./components/Header"
import AgenticChat from "./components/AgenticChat"
import ExperimentRunner from "./components/ExperimentRunner"
import JobMonitor from "./components/JobMonitor"
import ResultViewer from "./components/ResultViewer"
import { useQuantumOps } from "./hooks/useQuantumSimulation"

const App: React.FC = () => {
  const { logs, metrics, interactWithAiden, job, backends, runExperiment, result, isAidenThinking } = useQuantumOps()

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300 flex flex-col">
      <Header metrics={metrics} />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-[calc(100vh-80px)]">
        {/* Left Panel: Chat */}
        <div className="lg:col-span-4 h-full">
          <AgenticChat logs={logs} onCommand={interactWithAiden} isThinking={isAidenThinking} />
        </div>

        {/* Right Panel: Quantum Execution */}
        <div className="lg:col-span-8 flex flex-col gap-4 h-full">
          <ExperimentRunner backends={backends} onRun={runExperiment} jobStatus={job?.status} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <JobMonitor job={job} />
            <ResultViewer result={result} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
