"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Save, FileCode, CheckCircle2, AlertCircle } from "lucide-react"

export function DNALangEditor() {
  const [code, setCode] = useState(`@ibm:backend(ibm_torino)
@ibm:optimize(3)
@ibm:mitigation(zne)
@ibm:cost_limit(1.00)

# Bell State Circuit
gene_superpose(q0)
gene_entangle(q0, q1)
gene_measure(q0, c0)
gene_measure(q1, c1)`)

  const [compiling, setCompiling] = useState(false)
  const [compiled, setCompiled] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleCompile = async () => {
    setCompiling(true)
    setErrors([])

    // Simulate compilation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple validation
    const lines = code.split("\n").filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("@"))
    const validGenes = ["gene_superpose", "gene_entangle", "gene_measure", "gene_x", "gene_y", "gene_z", "gene_rotate"]

    const newErrors: string[] = []
    lines.forEach((line, idx) => {
      const hasValidGene = validGenes.some((gene) => line.includes(gene))
      if (!hasValidGene) {
        newErrors.push(`Line ${idx + 1}: Unknown gene operation`)
      }
    })

    setErrors(newErrors)
    setCompiled(newErrors.length === 0)
    setCompiling(false)
  }

  const handleExecute = async () => {
    if (!compiled) {
      await handleCompile()
    }
    // Execute logic would go here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">DNALang Editor</h2>
          <p className="text-sm text-gray-400">Write quantum circuits in biological syntax</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleCompile} disabled={compiling} variant="outline" size="sm">
            <FileCode className="w-4 h-4 mr-2" />
            {compiling ? "Compiling..." : "Compile"}
          </Button>
          <Button onClick={handleExecute} disabled={compiling} className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Execute
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Lines</span>
          </div>
          <p className="text-2xl font-bold text-white">{code.split("\n").length}</p>
        </Card>

        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            {compiled ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm font-semibold text-white">Status</span>
          </div>
          <Badge variant={compiled ? "default" : "secondary"} className={compiled ? "bg-green-600" : ""}>
            {compiled ? "Compiled" : "Not Compiled"}
          </Badge>
        </Card>

        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-white">Errors</span>
          </div>
          <p className="text-2xl font-bold text-white">{errors.length}</p>
        </Card>
      </div>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setCompiled(false)
          }}
          className="w-full h-96 bg-gray-950 border border-gray-800 rounded p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />
      </Card>

      {errors.length > 0 && (
        <Card className="p-4 bg-red-900/20 border-red-500/50">
          <h3 className="text-sm font-semibold text-red-400 mb-2">Compilation Errors</h3>
          <div className="space-y-1">
            {errors.map((error, idx) => (
              <p key={idx} className="text-xs text-red-300">
                {error}
              </p>
            ))}
          </div>
        </Card>
      )}

      {compiled && (
        <Card className="p-4 bg-green-900/20 border-green-500/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <h3 className="text-sm font-semibold text-green-400">Compilation Successful</h3>
              <p className="text-xs text-green-300">Circuit ready for execution on IBM Quantum hardware</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
