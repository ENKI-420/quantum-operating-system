"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Clock, Zap, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"

interface Backend {
  name: string
  qubits: number
  status: string
  queue: number
  t1: number
  t2: number
  readout_error: number
  gate_error: number
  cost_per_shot: number
}

export function BackendSelectorPanel() {
  const [backends, setBackends] = useState<Backend[]>([])
  const [selectedBackend, setSelectedBackend] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBackends()
    const interval = setInterval(fetchBackends, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchBackends = async () => {
    try {
      const response = await fetch("/api/ibm/backends")
      const data = await response.json()
      setBackends(data.backends)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch backends:", error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    if (status === "online") return "bg-green-500"
    if (status === "maintenance") return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusIcon = (status: string) => {
    if (status === "online") return <CheckCircle2 className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Backend Selector</h2>
          <p className="text-sm text-gray-400">Choose optimal IBM Quantum hardware</p>
        </div>
        <Button onClick={fetchBackends} variant="outline" size="sm">
          <Activity className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <Card className="p-8 bg-gray-900/50 border-gray-800 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-gray-400 mt-4">Loading backends...</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {backends.map((backend) => (
            <Card
              key={backend.name}
              className={`p-6 bg-gray-900/50 border-gray-800 cursor-pointer transition-all hover:border-blue-500 ${
                selectedBackend === backend.name ? "border-blue-500 ring-2 ring-blue-500/20" : ""
              }`}
              onClick={() => setSelectedBackend(backend.name)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{backend.name}</h3>
                  <p className="text-sm text-gray-400">{backend.qubits} qubits</p>
                </div>
                <Badge className={`${getStatusColor(backend.status)} text-white flex items-center gap-1`}>
                  {getStatusIcon(backend.status)}
                  {backend.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Queue:</span>
                    <span className="text-white font-semibold">{backend.queue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">T1:</span>
                    <span className="text-white font-semibold">{backend.t1.toFixed(1)}μs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">T2:</span>
                    <span className="text-white font-semibold">{backend.t2.toFixed(1)}μs</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Readout:</span>
                    <span className="text-white font-semibold">{(backend.readout_error * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Gate:</span>
                    <span className="text-white font-semibold">{(backend.gate_error * 100).toFixed(3)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white font-semibold">${backend.cost_per_shot.toFixed(5)}</span>
                  </div>
                </div>
              </div>

              {backend.status === "online" && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Fidelity Score</span>
                    <span className="text-green-400 font-semibold">
                      {(0.95 - backend.gate_error * 10 - backend.readout_error).toFixed(3)}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {selectedBackend && (
        <Card className="p-6 bg-blue-900/20 border-blue-500/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Selected Backend</h3>
              <p className="text-sm text-gray-400">{selectedBackend}</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Use This Backend</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
