import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_FLASH_MODEL = "gemini-2.0-flash-exp"
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_FLASH_MODEL}:generateContent?key=${GEMINI_API_KEY}`

// Exponential Backoff Utility
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 5): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)
      if (response.status !== 429) return response

      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    } catch (error) {
      if (attempt === maxRetries - 1) throw error
    }
  }
  throw new Error("Max retries exceeded for API call.")
}

export async function POST(request: NextRequest) {
  // Check if API key is configured
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not configured. Please set GEMINI_API_KEY in environment variables." },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()
    const { userQuery, systemPrompt, useGrounding = false, responseSchema = null } = body

    if (!userQuery || !systemPrompt) {
      return NextResponse.json({ error: "Missing required fields: userQuery and systemPrompt" }, { status: 400 })
    }

    // Build Gemini API payload
    const payload: any = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    }

    if (useGrounding) {
      payload.tools = [{ googleSearch: {} }]
    }

    if (responseSchema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    }

    // Call Gemini API with retry logic
    const response = await fetchWithRetry(API_URL_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const result = await response.json()
    const candidate = result.candidates?.[0]

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const text = candidate.content.parts[0].text

      let sources: any[] = []
      const groundingMetadata = candidate.groundingMetadata
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map((attribution: any) => ({
            uri: attribution.web?.uri,
            title: attribution.web?.title,
          }))
          .filter((source: any) => source.uri && source.title)
      }

      return NextResponse.json({ text, sources })
    } else {
      console.error("Unexpected Gemini response structure:", result)
      return NextResponse.json({ error: "LLM returned an empty or malformed response." }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error)
    return NextResponse.json({ error: `Gemini API Error: ${error.message}` }, { status: 500 })
  }
}
