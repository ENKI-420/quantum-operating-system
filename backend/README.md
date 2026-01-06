# DNA-Lang Interpreter Service

FastAPI backend for the DNA-Lang interpreter with quantum computing capabilities.

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Set your API key in `main.py`:
\`\`\`python
API_KEY = "your-secret-key-here"
\`\`\`

3. Run the server:
\`\`\`bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

Set `API_KEY` environment variable or update it in `main.py`.

## Quantum Computing Features


The backend includes a quantum computing benchmark suite (`quantum_circuit.py`) with the following algorithms:

### Available Benchmarks

- **VQE (Variational Quantum Eigensolver)**: H2 and LiH molecular ground state calculations
- **QPE (Quantum Phase Estimation)**: Phase estimation for H2 and LiH molecules
- **QAOA (Quantum Approximate Optimization Algorithm)**: MaxCut problem solving
- **HHL (Harrow-Hassidim-Lloyd)**: Linear system solver
- **QAA (Quantum Amplitude Amplification)**: Grover's search algorithm

### Running Quantum Benchmarks

\`\`\`bash
python quantum_circuit.py
\`\`\`

### Requirements

The quantum features require:
- Qiskit 1.0+
- Qiskit Aer (simulator)
- Qiskit Algorithms
- Qiskit Nature (for chemistry problems)
- PySCF (quantum chemistry driver)
- RustworkX (graph library)
- Rich (console output)

Note: Quantum features are optional. The DNA-Lang API will work without them, but quantum benchmarks will not be available.
