import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  const shots = body.shots || 1024
  const backend = body.backend || "ibm_torino"

  const cost_per_shot: Record<string, number> = {
    ibm_torino: 0.00042,
    ibm_kyoto: 0.00045,
    ibm_osaka: 0.0004,
    ibm_brisbane: 0.00038,
  }

  const base_cost = shots * (cost_per_shot[backend] || 0.00042)
  const optimization_savings = body.optimized ? base_cost * 0.15 : 0
  const final_cost = base_cost - optimization_savings

  const estimate = {
    shots,
    backend,
    base_cost: Number.parseFloat(base_cost.toFixed(4)),
    optimization_savings: Number.parseFloat(optimization_savings.toFixed(4)),
    final_cost: Number.parseFloat(final_cost.toFixed(4)),
    currency: "USD",
    estimated_execution_time_seconds: Math.ceil(shots / 100),
  }

  return NextResponse.json({ estimate, success: true })
}
