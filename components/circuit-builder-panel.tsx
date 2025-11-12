"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Play, Download } from "lucide-react"

interface Gate {
  id: string
  type: string
  qubit: number
  control?: number
}

export function CircuitBuilderPanel() {
  const [numQubits, setNumQubits] = useState(3)
  const [gates, setGates] = useState<Gate[]>([])
  const [selectedGate, setSelectedGate] = useState<string>("H")

  const gateTypes = [
    { name: "H", label: "Hadamard", color: "bg-blue-500" },
    { name: "X", label: "Pauli-X", color: "bg-red-500" },
    { name: "Y", label: "Pauli-Y", color: "bg-green-500" },
    { name: "Z", label: "Pauli-Z", color: "bg-purple-500" },
    { name: "CNOT", label: "CNOT", color: "bg-cyan-500" },
    { name: "RY", label: "Rotate-Y", color: "bg-orange-500" },
  ]

  const addGate = (qubit: number) => {
    const newGate: Gate = {
      id: `gate_${Date.now()}`,
      type: selectedGate,
      qubit,
    }
    setGates([...gates, newGate])
  }

  const removeGate = (id: string) => {
    setGates(gates.filter((g) => g.id !== id))
  }

  const exportCircuit = () => {
    const dnalang = gates
      .map((g) => {
        if (g.type === "H") return `gene_superpose(q${g.qubit})`
        if (g.type === "X") return `gene_x(q${g.qubit})`
        if (g.type === "Y") return `gene_y(q${g.qubit})`
        if (g.type === "Z") return `gene_z(q${g.qubit})`
        if (g.type === "CNOT" && g.control !== undefined) return `gene_entangle(q${g.control}, q${g.qubit})`
        if (g.type === "RY") return `gene_rotate(q${g.qubit}, 1.57, 0)`
        return ""
      })
      .join("\n")

    const blob = new Blob([`@ibm:backend(ibm_torino)\n@ibm:optimize(3)\n\n${dnalang}`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "circuit.dnalang"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Circuit Builder</h2>
          <p className="text-sm text-gray-400">Visual quantum circuit designer</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportCircuit} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export DNALang
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Execute
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Gate Palette</h3>
          <div className="grid grid-cols-2 gap-2">
            {gateTypes.map((gate) => (
              <Button
                key={gate.name}
                onClick={() => setSelectedGate(gate.name)}
                variant={selectedGate === gate.name ? "default" : "outline"}
                className={`${selectedGate === gate.name ? gate.color : ""}`}
              >
                {gate.name}
              </Button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-800/50 rounded">
            <p className="text-xs text-gray-400">Selected: {selectedGate}</p>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Circuit Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Number of Qubits</label>
              <input
                type="number"
                value={numQubits}
                onChange={(e) => setNumQubits(Number.parseInt(e.target.value))}
                min={1}
                max={10}
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Gates:</span>
              <Badge variant="secondary">{gates.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Circuit Depth:</span>
              <Badge variant="secondary">{Math.ceil(gates.length / numQubits)}</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Circuit Visualization</h3>
        <div className="space-y-3">
          {Array.from({ length: numQubits }).map((_, qubitIndex) => (
            <div key={qubitIndex} className="flex items-center gap-4">
              <div className="w-12 text-sm text-gray-400">q{qubitIndex}</div>
              <div className="flex-1 h-px bg-gray-700 relative">
                {gates
                  .filter((g) => g.qubit === qubitIndex)
                  .map((gate, idx) => (
                    <div
                      key={gate.id}
                      className="absolute top-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${(idx * 100) / Math.max(gates.filter((g) => g.qubit === qubitIndex).length, 1)}%`,
                      }}
                    >
                      <div className="w-12 h-12 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-blue-700 transition-colors">
                        {gate.type}
                      </div>
                      <button
                        onClick={() => removeGate(gate.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
              </div>
              <Button onClick={() => addGate(qubitIndex)} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
