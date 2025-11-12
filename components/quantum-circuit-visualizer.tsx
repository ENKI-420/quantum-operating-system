"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZoomIn, ZoomOut, Download, Play } from "lucide-react"

interface QuantumGate {
  name: string
  qubits: number[]
  color: string
}

interface QuantumCircuitVisualizerProps {
  circuit?: {
    name: string
    qubits: number
    gates: QuantumGate[]
  }
}

export function QuantumCircuitVisualizer({ circuit }: QuantumCircuitVisualizerProps) {
  const [zoom, setZoom] = useState(1)
  const [isSimulating, setIsSimulating] = useState(false)

  // Default Bell state circuit if none provided
  const defaultCircuit = {
    name: "Bell State",
    qubits: 2,
    gates: [
      { name: "H", qubits: [0], color: "#3b82f6" },
      { name: "CNOT", qubits: [0, 1], color: "#8b5cf6" },
    ],
  }

  const displayCircuit = circuit || defaultCircuit

  const handleSimulate = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 2000)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{displayCircuit.name}</CardTitle>
            <CardDescription>
              {displayCircuit.qubits} qubits, {displayCircuit.gates.length} gates
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Download circuit">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="qasm">QASM</TabsTrigger>
            <TabsTrigger value="matrix">Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="mt-4">
            <div
              className="bg-card border border-border rounded-lg p-6 overflow-auto"
              style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
            >
              <div className="space-y-4">
                {Array.from({ length: displayCircuit.qubits }).map((_, qubitIndex) => (
                  <div key={qubitIndex} className="flex items-center gap-4">
                    <Badge variant="outline" className="w-16 justify-center">
                      q[{qubitIndex}]
                    </Badge>
                    <div className="flex-1 h-0.5 bg-primary/20 relative">
                      {displayCircuit.gates
                        .filter((gate) => gate.qubits.includes(qubitIndex))
                        .map((gate, gateIndex) => {
                          const position = (gateIndex / displayCircuit.gates.length) * 100
                          return (
                            <div
                              key={gateIndex}
                              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                              style={{ left: `${position}%` }}
                            >
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                style={{ backgroundColor: gate.color }}
                              >
                                {gate.name}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                    <Badge variant="outline" className="w-16 justify-center">
                      c[{qubitIndex}]
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button onClick={handleSimulate} disabled={isSimulating} className="gap-2">
                <Play className="h-4 w-4" />
                {isSimulating ? "Simulating..." : "Simulate Circuit"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="qasm" className="mt-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <pre className="text-sm font-mono text-muted-foreground">
                {`OPENQASM 2.0;
include "qelib1.inc";

qreg q[${displayCircuit.qubits}];
creg c[${displayCircuit.qubits}];

${displayCircuit.gates
  .map((gate) => {
    if (gate.name === "H") return `h q[${gate.qubits[0]}];`
    if (gate.name === "CNOT") return `cx q[${gate.qubits[0]}], q[${gate.qubits[1]}];`
    return `${gate.name.toLowerCase()} q[${gate.qubits.join("], q[")}];`
  })
  .join("\n")}

measure q -> c;`}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="matrix" className="mt-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground text-center">
                <p className="mb-2">Unitary Matrix Representation</p>
                <div className="inline-block text-left font-mono">
                  <div>[ 0.707 0.707 0.000 0.000 ]</div>
                  <div>[ 0.000 0.000 0.707 -0.707 ]</div>
                  <div>[ 0.000 0.000 0.707 0.707 ]</div>
                  <div>[ 0.707 -0.707 0.000 0.000 ]</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
