"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface QuantumGate {
  type: string
  qubit: number
  parameter?: number
}

interface VQEResult {
  iteration: number
  energy: number
  parameters: number[]
}

export function VQESimulator() {
  const [numQubits, setNumQubits] = useState(2)
  const [theta, setTheta] = useState([0.5])
  const [phi, setPhi] = useState([0.3])
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<VQEResult[]>([])
  const [currentEnergy, setCurrentEnergy] = useState<number | null>(null)
  const [circuit, setCircuit] = useState<QuantumGate[]>([])

  // Simulate VQE optimization
  const runVQE = async () => {
    setIsRunning(true)
    setResults([])

    const iterations = 50
    const learningRate = 0.1
    const currentTheta = [...theta]
    const currentPhi = [...phi]
    const newResults: VQEResult[] = []

    for (let i = 0; i < iterations; i++) {
      // Simulate energy calculation with a simple cost function
      // E(θ, φ) = cos(θ) + sin(φ) + 0.5 * cos(2θ) (simplified H2 molecule)
      const energy =
        Math.cos(currentTheta[0]) +
        Math.sin(currentPhi[0]) +
        0.5 * Math.cos(2 * currentTheta[0]) +
        0.3 * Math.sin(2 * currentPhi[0])

      newResults.push({
        iteration: i,
        energy: energy,
        parameters: [...currentTheta, ...currentPhi],
      })

      // Gradient descent update (simplified)
      const gradTheta = -Math.sin(currentTheta[0]) - Math.sin(2 * currentTheta[0])
      const gradPhi = Math.cos(currentPhi[0]) + 0.6 * Math.cos(2 * currentPhi[0])

      currentTheta[0] -= learningRate * gradTheta
      currentPhi[0] -= learningRate * gradPhi

      // Update UI periodically
      if (i % 5 === 0) {
        setResults([...newResults])
        setCurrentEnergy(energy)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    setResults(newResults)
    setCurrentEnergy(newResults[newResults.length - 1].energy)
    setTheta(currentTheta)
    setPhi(currentPhi)
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setTheta([0.5])
    setPhi([0.3])
    setResults([])
    setCurrentEnergy(null)
  }

  // Build quantum circuit based on parameters
  useEffect(() => {
    const newCircuit: QuantumGate[] = [
      { type: "H", qubit: 0 },
      { type: "RY", qubit: 0, parameter: theta[0] },
      { type: "CNOT", qubit: 0 },
      { type: "RZ", qubit: 1, parameter: phi[0] },
      { type: "CNOT", qubit: 1 },
    ]
    setCircuit(newCircuit)
  }, [theta, phi])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Control Panel */}
      <Card className="quantum-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-quantum-blue" />
            VQE Control Panel
          </CardTitle>
          <CardDescription>Variational Quantum Eigensolver for molecular ground state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Parameter Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Rotation Angle θ</label>
                <Badge variant="outline" className="font-mono">
                  {theta[0].toFixed(3)} rad
                </Badge>
              </div>
              <Slider
                value={theta}
                onValueChange={setTheta}
                min={0}
                max={Math.PI * 2}
                step={0.01}
                disabled={isRunning}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Phase Angle φ</label>
                <Badge variant="outline" className="font-mono">
                  {phi[0].toFixed(3)} rad
                </Badge>
              </div>
              <Slider
                value={phi}
                onValueChange={setPhi}
                min={0}
                max={Math.PI * 2}
                step={0.01}
                disabled={isRunning}
                className="w-full"
              />
            </div>
          </div>

          {/* Current Energy Display */}
          {currentEnergy !== null && (
            <div className="p-4 rounded-lg bg-quantum-blue/10 border border-quantum-blue/20">
              <div className="text-sm text-muted-foreground mb-1">Ground State Energy</div>
              <div className="text-2xl font-bold font-mono text-quantum-blue">{currentEnergy.toFixed(6)} Ha</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={runVQE} disabled={isRunning} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Optimizing..." : "Run VQE"}
            </Button>
            <Button onClick={resetSimulation} variant="outline" disabled={isRunning}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Circuit Visualization */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Parameterized Circuit</h3>
            <div className="p-4 rounded-lg bg-card border border-border font-mono text-xs space-y-1">
              {circuit.map((gate, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-quantum-cyan">q[{gate.qubit}]</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-quantum-purple font-semibold">{gate.type}</span>
                  {gate.parameter !== undefined && (
                    <span className="text-quantum-green">({gate.parameter.toFixed(3)})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Convergence Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Convergence</CardTitle>
          <CardDescription>Optimization trajectory in parameter space</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="iteration"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Iteration", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Energy (Ha)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line type="monotone" dataKey="energy" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <Zap className="w-12 h-12 mx-auto opacity-50" />
                <p>Run VQE to see energy convergence</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
