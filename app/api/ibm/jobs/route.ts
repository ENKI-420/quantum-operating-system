import { NextResponse } from "next/server"

export async function GET() {
  // Simulate IBM Quantum job data
  const jobs = [
    {
      id: "job_001",
      circuit_name: "Bell State",
      backend: "ibm_torino",
      status: "completed",
      shots: 1024,
      qubits: 2,
      depth: 2,
      cost: 0.43,
      fidelity: 0.956,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      completed_at: new Date(Date.now() - 3000000).toISOString(),
    },
    {
      id: "job_002",
      circuit_name: "GHZ State",
      backend: "ibm_kyoto",
      status: "running",
      shots: 2048,
      qubits: 3,
      depth: 3,
      cost: 0.92,
      fidelity: null,
      created_at: new Date(Date.now() - 600000).toISOString(),
      completed_at: null,
    },
    {
      id: "job_003",
      circuit_name: "QFT 5-qubit",
      backend: "ibm_osaka",
      status: "queued",
      shots: 4096,
      qubits: 5,
      depth: 45,
      cost: 1.68,
      fidelity: null,
      created_at: new Date(Date.now() - 300000).toISOString(),
      completed_at: null,
    },
  ]

  return NextResponse.json({ jobs, timestamp: new Date().toISOString() })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simulate job submission
  const job = {
    id: `job_${Date.now()}`,
    circuit_name: body.circuit_name || "Unnamed Circuit",
    backend: body.backend || "ibm_torino",
    status: "queued",
    shots: body.shots || 1024,
    qubits: body.qubits || 2,
    depth: body.depth || 10,
    cost: (body.shots || 1024) * 0.00042,
    fidelity: null,
    created_at: new Date().toISOString(),
    completed_at: null,
  }

  return NextResponse.json({ job, success: true })
}
