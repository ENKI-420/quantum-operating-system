import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database in production)
const orchestratorState = {
  isRunning: false,
  activeExperiments: 0,
  queuedExperiments: 0,
  totalExperimentsRun: 0,
  successRate: 0.95,
  systemHealth: "healthy" as const,
}

const experiments: any[] = []
const runs: any[] = []
const insights: any[] = []
const enhancements: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  try {
    switch (path) {
      case "state":
        return NextResponse.json(orchestratorState)

      case "experiments":
        return NextResponse.json(experiments)

      case "runs":
        const experimentId = searchParams.get("experimentId")
        const filteredRuns = experimentId ? runs.filter((r) => r.experimentId === experimentId) : runs
        return NextResponse.json(filteredRuns)

      case "insights":
        const runId = searchParams.get("runId")
        const filteredInsights = runId ? insights.filter((i) => i.experimentRunId === runId) : insights
        return NextResponse.json(filteredInsights)

      case "enhancements":
        const expId = searchParams.get("experimentId")
        const filteredEnhancements = expId ? enhancements.filter((e) => e.experimentId === expId) : enhancements
        return NextResponse.json(filteredEnhancements)

      default:
        return NextResponse.json({ error: "Invalid path" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Orchestrator GET error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  try {
    const body = path !== "start" && path !== "stop" ? await request.json() : null

    switch (path) {
      case "start":
        orchestratorState.isRunning = true
        orchestratorState.lastRunAt = new Date().toISOString()
        return NextResponse.json({ success: true, message: "Orchestrator started" })

      case "stop":
        orchestratorState.isRunning = false
        return NextResponse.json({ success: true, message: "Orchestrator stopped" })

      case "experiments":
        const newExperiment = {
          ...body,
          id: `exp_${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        experiments.push(newExperiment)
        orchestratorState.queuedExperiments++
        return NextResponse.json(newExperiment)

      case "cancel-run":
        const runId = body.runId
        const run = runs.find((r) => r.id === runId)
        if (run) {
          run.status = "cancelled"
          run.completedAt = new Date().toISOString()
        }
        return NextResponse.json({ success: true })

      case "apply-enhancement":
        const enhancementId = body.enhancementId
        const enhancement = enhancements.find((e) => e.id === enhancementId)
        if (enhancement) {
          enhancement.appliedAt = new Date().toISOString()
          enhancement.results = {
            before: { accuracy: 0.85, speed: 100 },
            after: { accuracy: 0.92, speed: 120 },
            improvement: 0.15,
          }
        }
        return NextResponse.json({ success: true, message: "Enhancement applied" })

      default:
        return NextResponse.json({ error: "Invalid path" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Orchestrator POST error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")
  const id = searchParams.get("id")

  try {
    const body = await request.json()

    if (path === "experiments" && id) {
      const experiment = experiments.find((e) => e.id === id)
      if (experiment) {
        Object.assign(experiment, body)
        return NextResponse.json(experiment)
      }
      return NextResponse.json({ error: "Experiment not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Orchestrator PATCH error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")
  const id = searchParams.get("id")

  try {
    if (path === "experiments" && id) {
      const index = experiments.findIndex((e) => e.id === id)
      if (index !== -1) {
        experiments.splice(index, 1)
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: "Experiment not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Orchestrator DELETE error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
