"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, CheckCircle2, XCircle, Loader2, Zap, Server } from "lucide-react"

interface QuantumBackend {
  name: string
  qubits: number
  status: "online" | "offline" | "maintenance"
  pending_jobs: number
  basis_gates: string[]
}

interface Job {
  id: string
  status: "queued" | "running" | "completed" | "failed"
  backend: string
  shots: number
  created_at: Date
  result?: Record<string, number>
}

export function IBMQuantumIntegration() {
  const [apiToken, setApiToken] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [backends, setBackends] = useState<QuantumBackend[]>([])
  const [selectedBackend, setSelectedBackend] = useState<string>("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [shots, setShots] = useState(1024)

  // Simulate IBM Quantum connection
  const connectToIBM = async () => {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock backends data
    const mockBackends: QuantumBackend[] = [
      {
        name: "ibm_brisbane",
        qubits: 127,
        status: "online",
        pending_jobs: 12,
        basis_gates: ["id", "rz", "sx", "x", "cx"],
      },
      {
        name: "ibm_kyoto",
        qubits: 127,
        status: "online",
        pending_jobs: 8,
        basis_gates: ["id", "rz", "sx", "x", "cx"],
      },
      {
        name: "ibm_osaka",
        qubits: 127,
        status: "maintenance",
        pending_jobs: 0,
        basis_gates: ["id", "rz", "sx", "x", "cx"],
      },
      {
        name: "ibmq_qasm_simulator",
        qubits: 32,
        status: "online",
        pending_jobs: 0,
        basis_gates: ["u1", "u2", "u3", "cx", "id"],
      },
    ]

    setBackends(mockBackends)
    setSelectedBackend(mockBackends[0].name)
    setIsConnected(true)
    setIsConnecting(false)
  }

  const disconnect = () => {
    setIsConnected(false)
    setBackends([])
    setSelectedBackend("")
    setJobs([])
  }

  const submitJob = async () => {
    if (!selectedBackend) return

    const newJob: Job = {
      id: `job_${Date.now()}`,
      status: "queued",
      backend: selectedBackend,
      shots: shots,
      created_at: new Date(),
    }

    setJobs([newJob, ...jobs])

    // Simulate job execution
    setTimeout(() => {
      setJobs((prev) => prev.map((job) => (job.id === newJob.id ? { ...job, status: "running" as const } : job)))
    }, 1000)

    setTimeout(() => {
      // Mock results
      const mockResults: Record<string, number> = {
        "00": Math.floor(Math.random() * shots * 0.4),
        "01": Math.floor(Math.random() * shots * 0.2),
        "10": Math.floor(Math.random() * shots * 0.2),
        "11": Math.floor(Math.random() * shots * 0.2),
      }

      setJobs((prev) =>
        prev.map((job) => (job.id === newJob.id ? { ...job, status: "completed" as const, result: mockResults } : job)),
      )
    }, 5000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-quantum-green" />
      case "offline":
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "queued":
      case "running":
        return <Loader2 className="w-4 h-4 text-quantum-blue animate-spin" />
      default:
        return <Server className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Card */}
      <Card className="quantum-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-quantum-blue" />
            IBM Quantum Cloud
          </CardTitle>
          <CardDescription>Connect to IBM Quantum services and run circuits on real quantum hardware</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">IBM Quantum API Token</label>
                <Input
                  type="password"
                  placeholder="Enter your IBM Quantum API token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  disabled={isConnecting}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API token from{" "}
                  <a
                    href="https://quantum.ibm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-quantum-blue hover:underline"
                  >
                    quantum.ibm.com
                  </a>
                </p>
              </div>

              <Button onClick={connectToIBM} disabled={isConnecting || !apiToken} className="w-full">
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 mr-2" />
                    Connect to IBM Quantum
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Alert className="bg-quantum-green/10 border-quantum-green/20">
                <CheckCircle2 className="w-4 h-4 text-quantum-green" />
                <AlertDescription className="text-quantum-green">
                  Successfully connected to IBM Quantum Cloud
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Connection Status</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-quantum-green/10 text-quantum-green border-quantum-green/20">
                      Active
                    </Badge>
                    <span className="text-xs text-muted-foreground">{backends.length} backends available</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={disconnect}>
                  Disconnect
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Backends and Jobs */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Quantum Backends & Jobs</CardTitle>
            <CardDescription>Select a backend and submit quantum circuits for execution</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="backends" className="space-y-4">
              <TabsList>
                <TabsTrigger value="backends">Available Backends</TabsTrigger>
                <TabsTrigger value="submit">Submit Job</TabsTrigger>
                <TabsTrigger value="jobs">Job History</TabsTrigger>
              </TabsList>

              <TabsContent value="backends" className="space-y-4">
                <div className="grid gap-4">
                  {backends.map((backend) => (
                    <Card
                      key={backend.name}
                      className={`cursor-pointer transition-all ${
                        selectedBackend === backend.name ? "ring-2 ring-quantum-blue" : ""
                      }`}
                      onClick={() => setSelectedBackend(backend.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold font-mono">{backend.name}</h3>
                              {getStatusIcon(backend.status)}
                              <Badge variant="outline" className="text-xs">
                                {backend.status}
                              </Badge>
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>{backend.qubits} qubits</span>
                              <span>{backend.pending_jobs} pending jobs</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {backend.basis_gates.map((gate) => (
                                <Badge key={gate} variant="secondary" className="text-xs">
                                  {gate}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {selectedBackend === backend.name && <CheckCircle2 className="w-5 h-5 text-quantum-blue" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="submit" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selected Backend</label>
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="font-mono font-semibold">{selectedBackend}</div>
                      <div className="text-sm text-muted-foreground">
                        {backends.find((b) => b.name === selectedBackend)?.qubits} qubits available
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Shots</label>
                    <Input
                      type="number"
                      value={shots}
                      onChange={(e) => setShots(Number(e.target.value))}
                      min={1}
                      max={8192}
                    />
                    <p className="text-xs text-muted-foreground">Number of times to execute the circuit (1-8192)</p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-sm font-medium mb-2">Circuit Preview</div>
                    <div className="font-mono text-xs space-y-1 text-muted-foreground">
                      <div>qc = QuantumCircuit(2, 2)</div>
                      <div>qc.h(0)</div>
                      <div>qc.cx(0, 1)</div>
                      <div>qc.measure([0, 1], [0, 1])</div>
                    </div>
                  </div>

                  <Button onClick={submitJob} className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Submit Job to {selectedBackend}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-4">
                {jobs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Server className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No jobs submitted yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <Card key={job.id}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-sm font-semibold">{job.id}</span>
                                  {getStatusIcon(job.status)}
                                  <Badge variant="outline" className="text-xs">
                                    {job.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Backend: {job.backend} • Shots: {job.shots}
                                </div>
                                <div className="text-xs text-muted-foreground">{job.created_at.toLocaleString()}</div>
                              </div>
                            </div>

                            {job.result && (
                              <div className="space-y-2">
                                <div className="text-sm font-medium">Measurement Results</div>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(job.result).map(([state, count]) => (
                                    <div key={state} className="p-2 rounded bg-card border border-border">
                                      <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm">|{state}⟩</span>
                                        <span className="text-sm font-semibold">{count}</span>
                                      </div>
                                      <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-quantum-blue"
                                          style={{ width: `${(count / job.shots) * 100}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
