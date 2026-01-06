import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for enhancement suggestions
const suggestionsStore = new Map<string, any>()

async function callGemini(prompt: string, systemInstruction?: string) {
  const geminiApiKey = process.env.GEMINI_API_KEY

  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY not configured")
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || ""
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case "suggest": {
        const { experimentId, experimentRuns, targetMetric = "overall_performance", autoApply = false } = data

        const systemInstruction = `You are an expert in quantum computing optimization and parameter tuning.
Analyze experiment results and suggest specific parameter improvements that will enhance performance.
Focus on actionable, measurable improvements with high confidence.`

        const prompt = `Analyze these experiment results and suggest enhancements:

Experiment ID: ${experimentId}
Target Metric: ${targetMetric}

Historical Runs:
${JSON.stringify(experimentRuns, null, 2)}

Generate 3-5 enhancement suggestions that:
1. Optimize specific parameters (shots, backend, algorithm settings)
2. Improve the target metric
3. Have measurable expected improvements
4. Include confidence scores

Format as JSON:
{
  "suggestions": [
    {
      "type": "parameter|algorithm|architecture",
      "description": "specific change to make",
      "expectedImprovement": 0.15,
      "confidence": 0.85,
      "parameters": {
        "parameterName": "newValue"
      }
    }
  ]
}`

        const response = await callGemini(prompt, systemInstruction)
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { suggestions: [] }

        const suggestions = result.suggestions.map((sug: any, index: number) => {
          const suggestionId = `enh-${Date.now()}-${index}`
          const suggestion = {
            id: suggestionId,
            experimentId,
            type: sug.type,
            description: sug.description,
            expectedImprovement: sug.expectedImprovement,
            confidence: sug.confidence,
            autoApply: autoApply && sug.confidence >= 0.7,
            parameters: sug.parameters,
          }
          suggestionsStore.set(suggestionId, suggestion)
          return suggestion
        })

        const appliedCount = autoApply ? suggestions.filter((s: any) => s.autoApply).length : 0
        const estimatedImprovement =
          suggestions.reduce((sum: number, s: any) => sum + s.expectedImprovement, 0) / suggestions.length

        return NextResponse.json({
          suggestions,
          appliedCount,
          estimatedImprovement,
        })
      }

      case "apply": {
        const { suggestionId } = data

        const suggestion = suggestionsStore.get(suggestionId)
        if (!suggestion) {
          return NextResponse.json({ error: "Suggestion not found" }, { status: 404 })
        }

        // Simulate applying the enhancement
        const updatedSuggestion = {
          ...suggestion,
          appliedAt: new Date().toISOString(),
          results: {
            before: { performance: 0.75, accuracy: 0.82, efficiency: 0.68 },
            after: {
              performance: 0.75 * (1 + suggestion.expectedImprovement),
              accuracy: 0.82 * (1 + suggestion.expectedImprovement * 0.8),
              efficiency: 0.68 * (1 + suggestion.expectedImprovement * 1.2),
            },
            improvement: suggestion.expectedImprovement,
          },
        }

        suggestionsStore.set(suggestionId, updatedSuggestion)
        return NextResponse.json(updatedSuggestion)
      }

      case "optimize": {
        const { experimentConfig, historicalRuns } = data

        const systemInstruction = `You are an expert in quantum algorithm optimization.
Analyze historical experiment data and suggest optimal parameter configurations.`

        const prompt = `Optimize this experiment configuration based on historical results:

Current Config:
${JSON.stringify(experimentConfig, null, 2)}

Historical Performance:
${JSON.stringify(historicalRuns, null, 2)}

Suggest an optimized configuration that:
1. Improves on historical best results
2. Balances performance and resource usage
3. Considers quantum hardware constraints
4. Provides clear rationale for changes

Format as JSON:
{
  "optimizedConfig": {
    "parameters": {
      "shots": 4096,
      "backend": "qasm_simulator",
      ...
    }
  },
  "rationale": "explanation of optimization strategy and expected benefits"
}`

        const response = await callGemini(prompt, systemInstruction)
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { optimizedConfig: experimentConfig, rationale: "" }

        return NextResponse.json(result)
      }

      case "auto-enhance": {
        const { experimentId, threshold = 0.7 } = data

        // Get all suggestions for this experiment
        const allSuggestions = Array.from(suggestionsStore.values()).filter(
          (s) => s.experimentId === experimentId && s.confidence >= threshold && !s.appliedAt,
        )

        // Auto-apply high-confidence suggestions
        const applied = []
        for (const suggestion of allSuggestions) {
          const updatedSuggestion = {
            ...suggestion,
            appliedAt: new Date().toISOString(),
            autoApply: true,
            results: {
              before: { performance: 0.75 },
              after: { performance: 0.75 * (1 + suggestion.expectedImprovement) },
              improvement: suggestion.expectedImprovement,
            },
          }
          suggestionsStore.set(suggestion.id, updatedSuggestion)
          applied.push(updatedSuggestion)
        }

        const estimatedImprovement = applied.reduce((sum, s) => sum + s.expectedImprovement, 0) / (applied.length || 1)

        return NextResponse.json({
          suggestions: applied,
          appliedCount: applied.length,
          estimatedImprovement,
        })
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[v0] Enhancement API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const experimentId = searchParams.get("experimentId")

  if (experimentId) {
    const suggestions = Array.from(suggestionsStore.values()).filter((s) => s.experimentId === experimentId)
    return NextResponse.json(suggestions)
  }

  return NextResponse.json(Array.from(suggestionsStore.values()))
}
