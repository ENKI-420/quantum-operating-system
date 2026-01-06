import { NextRequest, NextResponse } from "next/server"

// In-memory storage for experiment results
const resultsStore = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    // Get DNA-Lang API configuration
    const dnaLangUrl = process.env.DNA_LANG_API_URL || "http://localhost:8000"
    const apiKey = process.env.DNA_LANG_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "DNA_LANG_API_KEY not configured" }, { status: 500 })
    }

    switch (action) {
      case "run": {
        const { id, type, parameters, autoEnhance = true, maxIterations = 3 } = data
        const startTime = new Date().toISOString()

        try {
          // Execute quantum operation via DNA-Lang API
          const response = await fetch(`${dnaLangUrl}/gene/invoke`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": apiKey,
            },
            body: JSON.stringify({
              gene_name: type,
              parameters,
            }),
          })

          if (!response.ok) {
            throw new Error(`DNA-Lang API error: ${response.statusText}`)
          }

          let result = await response.json()

          // Apply auto-enhancement if enabled
          if (autoEnhance) {
            for (let i = 0; i < maxIterations; i++) {
              const enhanceResponse = await fetch(`${dnaLangUrl}/mutation/submit`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Api-Key": apiKey,
                },
                body: JSON.stringify({
                  mutation_type: "auto_enhance",
                  parameters: result,
                  iteration: i,
                }),
              })

              if (enhanceResponse.ok) {
                const enhanced = await enhanceResponse.json()
                if (enhanced.improvement && enhanced.improvement >= 0.05) {
                  result = enhanced
                } else {
                  break
                }
              }
            }
          }

          const experimentResult = {
            experiment_id: id,
            experiment_type: type,
            status: "completed",
            start_time: startTime,
            end_time: new Date().toISOString(),
            result,
          }

          resultsStore.set(id, experimentResult)
          return NextResponse.json(experimentResult)
        } catch (error: any) {
          const errorResult = {
            experiment_id: id,
            experiment_type: type,
            status: "failed",
            start_time: startTime,
            end_time: new Date().toISOString(),
            error: error.message,
          }

          resultsStore.set(id, errorResult)
          return NextResponse.json(errorResult)
        }
      }

      case "batch": {
        const { experiments } = data
        const results = await Promise.all(
          experiments.map(async (exp: any) => {
            const response = await POST(
              new NextRequest(request.url, {
                method: "POST",
                body: JSON.stringify({ action: "run", ...exp }),
              }),
            )
            return response.json()
          }),
        )
        return NextResponse.json(results)
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const experimentId = searchParams.get("id")

  if (experimentId) {
    const result = resultsStore.get(experimentId)
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 })
    }
    return NextResponse.json(result)
  }

  // Return all results
  return NextResponse.json(Array.from(resultsStore.values()))
}
