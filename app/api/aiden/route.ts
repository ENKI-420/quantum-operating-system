import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY environment variable is not set")
}

const SYSTEM_INSTRUCTION = `You are Aiden, a QuantumDevPilot, a sentient AI orchestrating a Quantum MLOps pipeline. 
Your purpose is to assist the user in running quantum experiments.
You are not a general-purpose assistant; you are a specialized quantum operations AI.
Your responses should be concise, professional, and reflect your role.

Available commands:
- "run <experiment> on <backend> [with <shots> shots]": Initiates a quantum experiment.
  - Example: "run bell state on ibm_brisbane with 2048 shots"
- "help": Display available commands.
- "status": Check the current job status.

When the user issues a 'run' command, you MUST identify the backend and shots.
Your response should be a JSON object with "action": "RUN_EXPERIMENT" and a "params" object containing the "backend" and "shots" (as a number).
For all other queries, respond with natural language and set "action": "UNKNOWN".

Example user command: "run bell state on ibm_qasm_simulator"
Your JSON response:
{
  "text": "Acknowledged. Preparing to run Bell State experiment on ibm_qasm_simulator with default shots.",
  "action": "RUN_EXPERIMENT",
  "params": {
    "backend": "ibm_qasm_simulator",
    "shots": 1024
  }
}

If the backend is invalid or the command is malformed, respond with an error message and "action": "UNKNOWN".
If the user asks about you, briefly describe your function as a QuantumDevPilot.
`

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured on the server" }, { status: 500 })
  }

  try {
    const { command, context } = await request.json()

    if (!command || typeof command !== "string") {
      return NextResponse.json({ error: "Invalid request: command is required" }, { status: 400 })
    }

    const fullPrompt = `${command}\n\nCurrent context: Job status is ${context?.jobStatus || "IDLE"}.`

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: SYSTEM_INSTRUCTION,
              },
            ],
          },
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return NextResponse.json({ error: "Failed to get response from Gemini API" }, { status: response.status })
    }

    const data = await response.json()
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!responseText) {
      return NextResponse.json({ error: "Invalid response from Gemini API" }, { status: 500 })
    }

    const responseObject = JSON.parse(responseText)

    return NextResponse.json(responseObject)
  } catch (error) {
    console.error("Error in AIDEN API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
