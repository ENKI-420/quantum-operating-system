import { NextResponse } from "next/server"

export async function GET() {
  // Simulate IBM Quantum backend data
  const backends = [
    {
      name: "ibm_torino",
      qubits: 127,
      status: "online",
      queue: 12,
      t1: 185.3,
      t2: 142.7,
      readout_error: 0.012,
      gate_error: 0.0008,
      cost_per_shot: 0.00042,
    },
    {
      name: "ibm_kyoto",
      qubits: 127,
      status: "online",
      queue: 8,
      t1: 192.1,
      t2: 156.4,
      readout_error: 0.01,
      gate_error: 0.0007,
      cost_per_shot: 0.00045,
    },
    {
      name: "ibm_osaka",
      qubits: 127,
      status: "online",
      queue: 15,
      t1: 178.9,
      t2: 138.2,
      readout_error: 0.013,
      gate_error: 0.0009,
      cost_per_shot: 0.0004,
    },
    {
      name: "ibm_brisbane",
      qubits: 127,
      status: "maintenance",
      queue: 0,
      t1: 0,
      t2: 0,
      readout_error: 0,
      gate_error: 0,
      cost_per_shot: 0,
    },
  ]

  return NextResponse.json({ backends, timestamp: new Date().toISOString() })
}
