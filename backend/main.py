from fastapi import FastAPI, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import List, Dict, Optional
import time
import os

# --- Configuration ---
# This API key will be checked against the value passed in the X-Api-Key header
# NOTE: In a real deployment, this should be set securely via environment variables or a secret manager.
# For this demonstration, we are mocking the key check based on the key the client provides.
# The client will use the key provided in the environment variables (DNA_LANG_API_KEY)

# --- Data Models (Based on DNA-Lang Reference) ---

class GeneInvocationRequest(BaseModel):
    organism_id: str
    gene_name: str
    parameters: Dict[str, str] = {}
    
class GeneInvocationResponse(BaseModel):
    organism_id: str
    gene_name: str
    status: str
    output: Dict
    timestamp: float

class OrganismState(BaseModel):
    state_id: str
    current_state: str
    last_mutation_timestamp: Optional[float] = None
    coherence_level: float = 0.0 # Quantum coherence metric
    
class MutationSubmission(BaseModel):
    organism_id: str
    gene_sequence: str
    description: str
    
class RunHistoryEntry(BaseModel):
    run_id: str
    timestamp: float
    event_type: str
    details: Dict
    
# --- Mock Data Storage (In-Memory for demonstration) ---
# Replace with Firestore or a database in a production environment
MOCK_ORGANISM_STATE: Dict[str, OrganismState] = {
    "QuantumSwarm": OrganismState(
        state_id="QuantumSwarm",
        current_state="ADAPTIVE_EVOLUTION",
        coherence_level=0.95,
        last_mutation_timestamp=time.time()
    )
}
MOCK_RUN_HISTORY: List[RunHistoryEntry] = []

# --- FastAPI Setup ---
app = FastAPI(
    title="DNA-Lang Quantum OS API",
    description="API for managing and interacting with DNA-Lang bio-digital organisms and quantum processes.",
    version="1.0.0"
)

# --- Dependency for API Key Authentication ---
# NOTE: In a real-world scenario, the API key would be checked against a server-side secret.
# Here, we just check for its presence as the API Key value is configured via the Next.js proxy.
async def verify_api_key(x_api_key: str = Header(..., alias="X-Api-Key")):
    """Verifies the presence of the API Key."""
    # Since this is a mock backend, we simply check if the key is present. 
    # The actual key validation logic is simplified for the canvas environment.
    if not x_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-Api-Key header."
        )
    return x_api_key

# --- Endpoints ---

@app.get("/health", summary="Health Check")
async def health_check():
    """Returns the status of the service."""
    return {"status": "ok", "service": "DNA-Lang API"}

@app.post("/gene/invoke", response_model=GeneInvocationResponse, summary="Invoke a Gene")
async def invoke_gene(request: GeneInvocationRequest, api_key: str = Depends(verify_api_key)):
    """Simulates the invocation of a gene within an organism."""
    
    # Mock computation/quantum operation
    output = {
        "result_qubits": 5,
        "entanglement_metric": 0.88,
        "execution_time_ms": 150
    }
    
    response = GeneInvocationResponse(
        organism_id=request.organism_id,
        gene_name=request.gene_name,
        status="COMPLETED",
        output=output,
        timestamp=time.time()
    )
    
    MOCK_RUN_HISTORY.append(RunHistoryEntry(
        run_id=f"run-{len(MOCK_RUN_HISTORY)+1}",
        timestamp=time.time(),
        event_type="GENE_INVOKE",
        details={"organism": request.organism_id, "gene": request.gene_name, "status": "COMPLETED"}
    ))
    
    return response

@app.get("/organism/{organism_id}", response_model=OrganismState, summary="Get Organism State")
async def get_organism_state(organism_id: str, api_key: str = Depends(verify_api_key)):
    """Retrieves the current state and metrics of an organism."""
    if organism_id not in MOCK_ORGANISM_STATE:
        raise HTTPException(status_code=404, detail="Organism not found")
    return MOCK_ORGANISM_STATE[organism_id]

@app.patch("/organism/{organism_id}", response_model=OrganismState, summary="Patch Organism State")
async def patch_organism_state(organism_id: str, new_state: OrganismState, api_key: str = Depends(verify_api_key)):
    """Updates the state and metrics of an organism."""
    if organism_id not in MOCK_ORGANISM_STATE:
        raise HTTPException(status_code=404, detail="Organism not found")
        
    current_state = MOCK_ORGANISM_STATE[organism_id]
    
    # Update fields that are provided
    current_state.current_state = new_state.current_state or current_state.current_state
    current_state.coherence_level = new_state.coherence_level or current_state.coherence_level
    
    MOCK_ORGANISM_STATE[organism_id] = current_state
    
    MOCK_RUN_HISTORY.append(RunHistoryEntry(
        run_id=f"run-{len(MOCK_RUN_HISTORY)+1}",
        timestamp=time.time(),
        event_type="STATE_UPDATE",
        details={"organism": organism_id, "new_state": new_state.current_state}
    ))
    
    return current_state

@app.post("/mutation/submit", response_model=RunHistoryEntry, summary="Submit a New Mutation")
async def submit_mutation(submission: MutationSubmission, api_key: str = Depends(verify_api_key)):
    """Submits a new self-modifying mutation to the organism's DNA-Lang sequence."""
    
    # Simulates storing the mutation and updating the organism
    mutation_entry = RunHistoryEntry(
        run_id=f"mut-{len(MOCK_RUN_HISTORY)+1}",
        timestamp=time.time(),
        event_type="MUTATION_SUBMITTED",
        details={
            "organism": submission.organism_id,
            "description": submission.description,
            "new_sequence_length": len(submission.gene_sequence)
        }
    )
    MOCK_RUN_HISTORY.append(mutation_entry)
    
    # Update organism's state to reflect the mutation
    if submission.organism_id in MOCK_ORGANISM_STATE:
        MOCK_ORGANISM_STATE[submission.organism_id].last_mutation_timestamp = time.time()
        
    return mutation_entry

@app.get("/history", response_model=List[RunHistoryEntry], summary="Get Run History")
async def get_run_history(api_key: str = Depends(verify_api_key)):
    """Retrieves the chronological history of all organism runs, invocations, and mutations."""
    return sorted(MOCK_RUN_HISTORY, key=lambda x: x.timestamp, reverse=True)
