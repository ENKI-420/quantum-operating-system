# Quantum DNA MLOps Visualizer

A comprehensive full-stack application for visualizing and managing Quantum DNA-Lang organisms with AI-powered insights.

## Features

### 1. Quantum Simulation Dashboard (Main App)
- Real-time quantum circuit simulation
- **AIDEN AI assistant** for quantum operations (powered by Gemini)
- Job monitoring and result visualization
- Multiple quantum backend support

### 2. DNA-Lang Organism Visualizer (`/dna-lang`)
- Real-time organism state monitoring
- Gene invocation and mutation tracking
- Event history feed
- **AI-Powered Features:**
  - **State Diagnosis**: Gemini-powered analysis with Google Search grounding
  - **Gene Documentation**: Structured gene documentation generation
  - Exponential backoff retry logic for robust API calls

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.9+ (for backend services)
- Gemini API Key (for AI features - both AIDEN and DNA-Lang visualizer)
- DNA-Lang API Key (optional, for production)

### Installation

1. Clone the repository
2. Install frontend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install backend dependencies:
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

4. Configure environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your API keys:
- `GEMINI_API_KEY`: Your Gemini API key (server-side, used for AIDEN and DNA-Lang AI features)
- `DNA_LANG_API_KEY`: Your DNA-Lang API key (server-side)
- `DNA_LANG_API_URL`: Backend API URL (default: http://localhost:8000/api)

**Important**: You can add environment variables directly in the v0 UI by clicking the **Vars** section in the in-chat sidebar.

### Running the Application

#### Frontend (Next.js)
\`\`\`bash
npm run dev
\`\`\`

Visit:
- Main Dashboard: http://localhost:3000
- DNA-Lang Visualizer: http://localhost:3000/dna-lang

#### Backend (FastAPI)

**Option 1: DNA-Lang API Server**
\`\`\`bash
cd backend
uvicorn main:app --reload --port 8000
\`\`\`

**Option 2: Quantum Circuit Benchmarks**
\`\`\`bash
cd backend
python quantum_circuit.py
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main quantum dashboard
│   ├── dna-lang/
│   │   └── page.tsx          # DNA-Lang visualizer page
│   └── api/
│       └── dna-lang/
│           └── route.ts      # Secure API proxy
├── components/
│   ├── DNALangVisualizer.tsx # DNA-Lang organism UI
│   ├── Header.tsx            # Main dashboard header
│   ├── AgenticChat.tsx       # AIDEN AI chat interface
│   └── ...                   # Other quantum components
├── backend/
│   ├── main.py               # DNA-Lang FastAPI server
│   ├── quantum_circuit.py    # Quantum benchmarks
│   └── requirements.txt      # Python dependencies
├── services/
│   └── dnaLangService.ts     # API client service
├── hooks/
│   ├── useDNALang.ts         # DNA-Lang API hooks
│   └── useQuantumSimulation.ts
└── types.ts                  # TypeScript type definitions
\`\`\`

## API Documentation

### DNA-Lang API Endpoints

- `GET /organism/{organism_id}` - Get organism state
- `POST /gene/invoke` - Invoke a gene
- `POST /mutation/submit` - Submit a mutation
- `GET /history` - Get run history

### Gemini AI Features

Both the main dashboard (AIDEN) and DNA-Lang visualizer use Google's Gemini API:

**AIDEN Assistant (Main Dashboard)**:
- Natural language quantum experiment control
- Command parsing and execution
- Job status monitoring

**DNA-Lang Visualizer**:
1. **State Diagnosis** (with Google Search grounding):
   - Analyzes organism health
   - Provides actionable recommendations
   - Cites sources from web search

2. **Gene Documentation** (structured output):
   - Generates comprehensive gene documentation
   - Returns structured JSON with function, I/O, and role descriptions
   - Uses schema-based generation for consistency

## Environment Variables

### Server-Side Only (Secure)

All API keys are kept server-side and never exposed to the client browser:

- `GEMINI_API_KEY` - Google Gemini API key for AI features (AIDEN assistant and DNA-Lang visualizer)
- `DNA_LANG_API_URL` - Backend API base URL (default: http://localhost:8000/api)
- `DNA_LANG_API_KEY` - Authentication key for DNA-Lang API

**Security Architecture**: 
- ✅ All API keys use server-side environment variables (no `NEXT_PUBLIC_` prefix)
- ✅ Frontend communicates with secure Next.js API routes (`/api/aiden`, `/api/gemini`, `/api/dna-lang`)
- ✅ API routes proxy requests to external services with server-side credentials
- ✅ API keys never appear in client-side JavaScript bundles

**Configuration**: Add environment variables in the v0 UI via the **Vars** section in the in-chat sidebar, or create a `.env.local` file based on `.env.local.example`.

## Security Notes

- All API keys are server-side only and never exposed to the browser
- DNA-Lang API calls are proxied through Next.js API routes (`/api/dna-lang`)
- Gemini API calls are proxied through Next.js API routes (`/api/aiden` and `/api/gemini`)
- Retry logic with exponential backoff for robust API communication
- Proper error handling and validation at all API boundaries

## Technologies

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, Qiskit (quantum computing)
- **AI**: Google Gemini 2.0 Flash with grounding and structured output
- **APIs**: DNA-Lang MLOps API, Gemini API

## License

MIT
