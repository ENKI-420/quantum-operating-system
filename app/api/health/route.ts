import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    services: {
      quantum_backend: "operational",
      database: "operational",
      cache: "operational",
      telemetry: "operational",
    },
    backends: [
      { name: "ibm_brisbane", status: "online", queue_depth: 12 },
      { name: "ibm_kyoto", status: "online", queue_depth: 8 },
      { name: "ibm_osaka", status: "online", queue_depth: 15 },
      { name: "simulator", status: "online", queue_depth: 0 },
    ],
  })
}
