import { type NextRequest, NextResponse } from "next/server"

// The server-side environment variables are read here.
// NOTE: These variables (DNA_LANG_API_URL and DNA_LANG_API_KEY) are NOT public.
const API_BASE_URL = process.env.DNA_LANG_API_URL
const API_KEY = process.env.DNA_LANG_API_KEY

/**
 * Next.js API Route handler for all requests to the DNA-Lang API.
 * This acts as a secure proxy to hide the API_KEY from the client.
 */
export async function POST(req: NextRequest) {
  // 1. Check for critical environment variables
  if (!API_BASE_URL || !API_KEY) {
    // Log to server console only (for security)
    console.error("Critical environment variables missing: DNA_LANG_API_URL or DNA_LANG_API_KEY.")
    return NextResponse.json(
      { error: "Server configuration error: DNA-Lang API credentials are not set." },
      { status: 500 },
    )
  }

  try {
    // The client request payload contains the path and method to proxy
    const { path, method, body: clientBody } = await req.json()

    if (!path || !method) {
      return NextResponse.json({ error: "Missing path or method in proxy request." }, { status: 400 })
    }

    const url = `${API_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`

    // 2. Construct the headers for the upstream request
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      // Crucially, we insert the API_KEY here on the server side
      "X-Api-Key": API_KEY,
    }

    // 3. Prepare the fetch options
    const fetchOptions: RequestInit = {
      method: method,
      headers: headers,
      // Only include body for POST, PUT, PATCH methods
      body: clientBody ? JSON.stringify(clientBody) : undefined,
      // Use 'no-store' to ensure fresh data
      cache: "no-store" as RequestCache,
    }

    // 4. Proxy the request to the external DNA-Lang API
    const response = await fetch(url, fetchOptions)

    // 5. Read the response body and status from the API
    const data = await response.json()
    const status = response.status

    // 6. Return the API's response to the client
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error("Error during DNA-Lang API proxy call:", error)
    return NextResponse.json(
      { error: "Failed to communicate with the upstream DNA-Lang API." },
      { status: 502 }, // Bad Gateway
    )
  }
}
