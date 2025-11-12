"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Trash2 } from "lucide-react"

interface Gate {
  id: string
  type: string
  qubit: number
  target?: number
  parameter?: number
}

export function QuantumCircuitDisplay() {
  const [numQubits, setNumQubits] = useState(3)
  const [gates, setGates] = useState<Gate[]>([
    { id: "1", type: "H", qubit: 0 },
    { id: "2", type: "CNOT", qubit: 0, target: 1 },
    { id: "3", type: "RY", qubit: 1, parameter: 0.5 },
    { id: "4", type: "CNOT", qubit: 1, target: 2 },
    { id: "5", type: "RZ", qubit: 2, parameter: 0.3 },
  ])

  const gateTypes = [
    { name: "H", color: "bg-quantum-blue", description: "Hadamard" },
    { name: "X", color: "bg-quantum-purple", description: "Pauli-X" },
    { name: "Y", color: "bg-quantum-cyan", description: "Pauli-Y" },
    { name: "Z", color: "bg-quantum-green", description: "Pauli-Z" },
    { name: "RY", color: "bg-chart-2", description: "Rotation-Y" },
    { name: "RZ", color: "bg-chart-3", description: "Rotation-Z" },
    { name: "CNOT", color: "bg-chart-4", description: "Controlled-NOT" },
  ]

  const addGate = (type: string) => {
    const newGate: Gate = {
      id: Date.now().toString(),
      type,
      qubit: 0,
      parameter: type.startsWith("R") ? 0.5 : undefined,
      target: type === "CNOT" ? 1 : undefined,
    }
    setGates([...gates, newGate])
  }

  const removeGate = (id: string) => {
    setGates(gates.filter((g) => g.id !== id))
  }

  const renderCircuit = () => {
    const qubitLines = Array.from({ length: numQubits }, (_, i) => i)
    const gateWidth = 80
    const gateHeight = 40
    const lineSpacing = 60
    const startX = 50
    const startY = 40

    return (
      <svg width="100%" height={numQubits * lineSpacing + 80} className="bg-card rounded-lg border border-border">
        {/* Qubit lines */}
        {qubitLines.map((qubit) => (
          <g key={`qubit-${qubit}`}>
            <line
              x1={startX}
              y1={startY + qubit * lineSpacing}
              x2={startX + gates.length * (gateWidth + 20) + 100}
              y2={startY + qubit * lineSpacing}
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            <text
              x={20}
              y={startY + qubit * lineSpacing + 5}
              fill="hsl(var(--foreground))"
              fontSize="14"
              fontFamily="monospace"
            >
              q{qubit}
            </text>
          </g>
        ))}

        {/* Gates */}
        {gates.map((gate, idx) => {
          const x = startX + idx * (gateWidth + 20)
          const y = startY + gate.qubit * lineSpacing

          if (gate.type === "CNOT" && gate.target !== undefined) {
            const targetY = startY + gate.target * lineSpacing
            return (
              <g key={gate.id}>
                {/* Control qubit */}
                <circle cx={x + gateWidth / 2} cy={y} r="6" fill="hsl(var(--chart-4))" />
                {/* Connection line */}
                <line
                  x1={x + gateWidth / 2}
                  y1={y}
                  x2={x + gateWidth / 2}
                  y2={targetY}
                  stroke="hsl(var(--chart-4))"
                  strokeWidth="2"
                />
                {/* Target qubit */}
                <circle
                  cx={x + gateWidth / 2}
                  cy={targetY}
                  r="15"
                  fill="none"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth="2"
                />
                <line
                  x1={x + gateWidth / 2 - 10}
                  y1={targetY}
                  x2={x + gateWidth / 2 + 10}
                  y2={targetY}
                  stroke="hsl(var(--chart-4))"
                  strokeWidth="2"
                />
                <line
                  x1={x + gateWidth / 2}
                  y1={targetY - 10}
                  x2={x + gateWidth / 2}
                  y2={targetY + 10}
                  stroke="hsl(var(--chart-4))"
                  strokeWidth="2"
                />
              </g>
            )
          }

          const gateColor = gateTypes.find((g) => g.name === gate.type)?.color || "bg-muted"

          return (
            <g key={gate.id}>
              <rect
                x={x}
                y={y - gateHeight / 2}
                width={gateWidth}
                height={gateHeight}
                fill="hsl(var(--card))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                rx="4"
              />
              <text
                x={x + gateWidth / 2}
                y={y + 5}
                fill="hsl(var(--foreground))"
                fontSize="16"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {gate.type}
              </text>
              {gate.parameter !== undefined && (
                <text
                  x={x + gateWidth / 2}
                  y={y + 20}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {gate.parameter.toFixed(2)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-quantum-cyan" />
            Quantum Circuit Builder
          </CardTitle>
          <CardDescription>Design and visualize quantum circuits with parameterized gates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="circuit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="circuit">Circuit View</TabsTrigger>
              <TabsTrigger value="gates">Gate Library</TabsTrigger>
              <TabsTrigger value="code">Export Code</TabsTrigger>
            </TabsList>

            <TabsContent value="circuit" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Qubits: {numQubits}</Badge>
                  <Badge variant="outline">Gates: {gates.length}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setNumQubits(Math.max(2, numQubits - 1))}>
                    -
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setNumQubits(Math.min(5, numQubits + 1))}>
                    +
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">{renderCircuit()}</div>

              <div className="flex flex-wrap gap-2">
                {gates.map((gate) => (
                  <Badge key={gate.id} variant="secondary" className="gap-2">
                    {gate.type}
                    {gate.parameter && ` (${gate.parameter.toFixed(2)})`}
                    <button onClick={() => removeGate(gate.id)} className="hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gates" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gateTypes.map((gate) => (
                  <Button
                    key={gate.name}
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 bg-transparent"
                    onClick={() => addGate(gate.name)}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${gate.color} flex items-center justify-center text-white font-bold`}
                    >
                      {gate.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{gate.description}</div>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm space-y-1">
                <div className="text-quantum-cyan"># Qiskit Circuit</div>
                <div>from qiskit import QuantumCircuit</div>
                <div>qc = QuantumCircuit({numQubits})</div>
                {gates.map((gate, idx) => (
                  <div key={idx} className="text-quantum-purple">
                    qc.{gate.type.toLowerCase()}
                    {gate.parameter !== undefined
                      ? `(${gate.parameter.toFixed(3)}, ${gate.qubit})`
                      : gate.target !== undefined
                        ? `(${gate.qubit}, ${gate.target})`
                        : `(${gate.qubit})`}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
