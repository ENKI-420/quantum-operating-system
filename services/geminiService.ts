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

interface AidenResponse {
  text: string
  action: "RUN_EXPERIMENT" | "UNKNOWN"
  params?: {
    backend: string
    shots: number
  }
}

export const getAidenResponse = async (command: string, context: { jobStatus?: string }): Promise<AidenResponse> => {
  try {
    const response = await fetch("/api/aiden", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command,
        context,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to get response from AIDEN")
    }

    const responseObject = (await response.json()) as AidenResponse

    // Basic validation
    if (typeof responseObject.text !== "string" || typeof responseObject.action !== "string") {
      throw new Error("Invalid response structure from AI")
    }

    return responseObject
  } catch (error) {
    console.error("Error getting response from AIDEN:", error)
    // Fallback response
    return {
      text: "My apologies, I'm experiencing a coherence drop in my cognitive matrix. Please try again.",
      action: "UNKNOWN",
    }
  }
}
