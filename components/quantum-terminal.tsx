"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Terminal, Send, Trash2 } from "lucide-react"

interface TerminalLine {
  type: "input" | "output" | "error" | "system"
  content: string
  timestamp: Date
}

export function QuantumTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      content: "DNALANG Quantum OS v1.0.0 - Negentropic Terminal",
      timestamp: new Date(),
    },
    {
      type: "system",
      content: "Type 'help' for available commands",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, (args: string[]) => string> = {
    help: () => `Available commands:
  help          - Show this help message
  qubits        - Display qubit register status
  measure       - Measure quantum state
  entangle      - Create entangled state
  vqe           - Run VQE optimization
  clear         - Clear terminal
  status        - Show system status`,

    qubits: () => `Qubit Register Status:
  |q0⟩ = α|0⟩ + β|1⟩  [Superposition]
  |q1⟩ = |0⟩          [Ground State]
  |q2⟩ = |+⟩          [Hadamard State]
  
  Total Qubits: 3
  Entangled Pairs: 0`,

    measure: () => {
      const result = Math.random() > 0.5 ? "1" : "0"
      return `Measurement Result: |${result}⟩
  Probability: ${(Math.random() * 100).toFixed(2)}%
  State Collapsed: True`
    },

    entangle: (args) => {
      const q1 = args[0] || "0"
      const q2 = args[1] || "1"
      return `Creating Bell State between q${q1} and q${q2}
  |Ψ⟩ = (|00⟩ + |11⟩) / √2
  Entanglement: Successful
  Fidelity: ${(0.95 + Math.random() * 0.05).toFixed(4)}`
    },

    vqe: () => {
      const energy = -1.137 + Math.random() * 0.01
      return `VQE Optimization Complete
  Ground State Energy: ${energy.toFixed(6)} Ha
  Iterations: ${Math.floor(Math.random() * 50 + 30)}
  Convergence: True
  Parameters: θ=${(Math.random() * Math.PI).toFixed(3)}, φ=${(Math.random() * Math.PI).toFixed(3)}`
    },

    status: () => `System Status:
  Quantum Processor: Online
  Coherence Time: ${(Math.random() * 100 + 50).toFixed(1)} μs
  Gate Fidelity: ${(0.99 + Math.random() * 0.01).toFixed(4)}
  Temperature: ${(Math.random() * 0.05).toFixed(3)} K
  Qubits Available: 3/3`,

    clear: () => {
      setLines([
        {
          type: "system",
          content: "Terminal cleared",
          timestamp: new Date(),
        },
      ])
      return ""
    },
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    // Add input line
    setLines((prev) => [
      ...prev,
      {
        type: "input",
        content: trimmedCmd,
        timestamp: new Date(),
      },
    ])

    // Parse command
    const parts = trimmedCmd.split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Execute command
    if (command in commands) {
      const output = commands[command](args)
      if (output) {
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            content: output,
            timestamp: new Date(),
          },
        ])
      }
    } else {
      setLines((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${command}. Type 'help' for available commands.`,
          timestamp: new Date(),
        },
      ])
    }

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-quantum-cyan"
      case "output":
        return "text-foreground"
      case "error":
        return "text-destructive"
      case "system":
        return "text-quantum-purple"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card className="quantum-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-quantum-green" />
              Quantum Terminal
            </CardTitle>
            <CardDescription>Interactive command-line interface for quantum operations</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={() => commands.clear([])}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Terminal Display */}
        <div
          ref={terminalRef}
          className="h-[500px] overflow-y-auto p-4 rounded-lg bg-black border border-border font-mono text-sm space-y-2"
        >
          {lines.map((line, idx) => (
            <div key={idx} className={`${getLineColor(line.type)} leading-relaxed`}>
              {line.type === "input" && <span className="text-quantum-green mr-2">$</span>}
              <span className="whitespace-pre-wrap">{line.content}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-black border border-border">
            <span className="text-quantum-green font-mono">$</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
            />
          </div>
          <Button onClick={() => executeCommand(input)}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Commands */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => executeCommand("help")}>
            help
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => executeCommand("qubits")}>
            qubits
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => executeCommand("measure")}>
            measure
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => executeCommand("vqe")}>
            vqe
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => executeCommand("status")}>
            status
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
