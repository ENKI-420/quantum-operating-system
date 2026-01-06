import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for insights
const insightsStore = new Map<string, any>()

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
      case "analyze": {
        const { experimentRuns, focusAreas = [], includeRecommendations = true } = data

        const systemInstruction = `You are an expert quantum computing researcher and data scientist. 
Analyze quantum experiment results to identify patterns, anomalies, optimizations, and potential breakthroughs.
Provide scientific insights with confidence scores and actionable recommendations.`

        const prompt = `Analyze the following quantum experiment results and generate insights:

Experiment Data:
${JSON.stringify(experimentRuns, null, 2)}

Focus Areas: ${focusAreas.join(", ") || "General analysis"}

Please provide:
1. Key patterns identified in the data
2. Any anomalies or unexpected results
3. Optimization opportunities
4. Potential breakthrough discoveries
5. ${includeRecommendations ? "Recommendations for next experiments" : ""}

Format your response as JSON with the following structure:
{
  "insights": [
    {
      "type": "pattern|anomaly|optimization|breakthrough",
      "confidence": 0.0-1.0,
      "summary": "brief summary",
      "details": "detailed explanation",
      "recommendations": ["recommendation 1", "recommendation 2"]
    }
  ],
  "summary": "overall summary of findings",
  "nextSteps": ["suggested next experiment 1", "suggested next experiment 2"]
}`

        const response = await callGemini(prompt, systemInstruction)

        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { insights: [], summary: response, nextSteps: [] }

        // Store insights
        analysis.insights.forEach((insight: any, index: number) => {
          const insightId = `insight-${Date.now()}-${index}`
          const fullInsight = {
            id: insightId,
            experimentRunId: experimentRuns[0]?.id || "unknown",
            timestamp: new Date().toISOString(),
            type: insight.type,
            confidence: insight.confidence,
            summary: insight.summary,
            details: insight.details,
            recommendations: insight.recommendations || [],
            relatedExperiments: experimentRuns.map((r: any) => r.id),
          }
          insightsStore.set(insightId, fullInsight)
        })

        return NextResponse.json(analysis)
      }

      case "generate": {
        const { experimentRunId } = data

        const systemInstruction = `You are an expert quantum computing researcher. 
Generate a detailed scientific insight from the experiment results.`

        const prompt = `Generate a detailed scientific insight for experiment run: ${experimentRunId}

Provide:
1. Type of insight (pattern, anomaly, optimization, or breakthrough)
2. Confidence level (0.0-1.0)
3. Summary (1-2 sentences)
4. Detailed explanation
5. Actionable recommendations

Format as JSON:
{
  "type": "pattern|anomaly|optimization|breakthrough",
  "confidence": 0.0-1.0,
  "summary": "brief summary",
  "details": "detailed explanation",
  "recommendations": ["recommendation 1", "recommendation 2"]
}`

        const response = await callGemini(prompt, systemInstruction)
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        const insight = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

        const fullInsight = {
          id: `insight-${Date.now()}`,
          experimentRunId,
          timestamp: new Date().toISOString(),
          type: insight.type || "pattern",
          confidence: insight.confidence || 0.5,
          summary: insight.summary || "",
          details: insight.details || "",
          recommendations: insight.recommendations || [],
          relatedExperiments: [experimentRunId],
        }

        insightsStore.set(fullInsight.id, fullInsight)
        return NextResponse.json(fullInsight)
      }

      case "anomalies": {
        const { experimentRuns } = data

        const systemInstruction = `You are an expert at detecting anomalies in quantum computing experiments.
Identify unusual patterns, unexpected results, or deviations from expected behavior.`

        const prompt = `Analyze these experiment results for anomalies:

${JSON.stringify(experimentRuns, null, 2)}

Identify any:
- Unexpected measurement outcomes
- Statistical anomalies
- Performance deviations
- Error rate spikes
- Unusual quantum state behaviors

Format as JSON array:
[
  {
    "type": "anomaly",
    "confidence": 0.0-1.0,
    "summary": "brief description",
    "details": "detailed explanation",
    "recommendations": ["how to investigate", "potential fixes"]
  }
]`

        const response = await callGemini(prompt, systemInstruction)
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        const anomalies = jsonMatch ? JSON.parse(jsonMatch[0]) : []

        const insights = anomalies.map((anomaly: any, index: number) => {
          const insightId = `anomaly-${Date.now()}-${index}`
          const fullInsight = {
            id: insightId,
            experimentRunId: experimentRuns[0]?.id || "unknown",
            timestamp: new Date().toISOString(),
            type: "anomaly",
            confidence: anomaly.confidence,
            summary: anomaly.summary,
            details: anomaly.details,
            recommendations: anomaly.recommendations || [],
            relatedExperiments: experimentRuns.map((r: any) => r.id),
          }
          insightsStore.set(insightId, fullInsight)
          return fullInsight
        })

        return NextResponse.json(insights)
      }

      case "suggest-next": {
        const { currentResults } = data

        const systemInstruction = `You are a quantum computing research strategist.
Based on current experiment results, suggest the most promising next experiments to advance the research.`

        const prompt = `Based on these experiment results:

${JSON.stringify(currentResults, null, 2)}

Suggest 3-5 next experiments that would:
1. Build on successful results
2. Investigate anomalies
3. Explore new parameter spaces
4. Validate hypotheses
5. Push toward breakthroughs

Format as JSON:
{
  "suggestions": ["experiment 1 description", "experiment 2 description", ...],
  "rationale": "overall strategic reasoning for these suggestions"
}`

        const response = await callGemini(prompt, systemInstruction)
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { suggestions: [], rationale: response }

        return NextResponse.json(result)
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[v0] Insights API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const experimentId = searchParams.get("experimentId")

  if (experimentId) {
    const insights = Array.from(insightsStore.values()).filter((insight) =>
      insight.relatedExperiments.includes(experimentId),
    )
    return NextResponse.json(insights)
  }

  return NextResponse.json(Array.from(insightsStore.values()))
}
