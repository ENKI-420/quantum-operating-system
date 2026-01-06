import json
import time
import sys
import numpy as np
import rustworkx as rx
from rich.console import Console
from rich.panel import Panel
from typing import Dict, Any, List

# --- Configuration ---
BENCHMARK_CONFIG = {
    "VQE_H2": {"algorithm": "VQE", "molecule": "H 0.0 0.0 0.0; H 0.0 0.0 0.735", "ansatz": "uccsd", "mapper": "JordanWigner"},
    "VQE_LiH": {"algorithm": "VQE", "molecule": "Li 0.0 0.0 0.0; H 0.0 0.0 1.547", "ansatz": "uccsd", "mapper": "JordanWigner"},
    "QPE_H2": {"algorithm": "QPE", "molecule": "H 0.0 0.0 0.0; H 0.0 0.0 0.735", "mapper": "JordanWigner", "num_counting_qubits": 6},
    "QPE_LiH": {"algorithm": "QPE", "molecule": "Li 0.0 0.0 0.0; H 0.0 0.0 1.547", "mapper": "JordanWigner", "num_counting_qubits": 8},
    "QAOA_MaxCut": {"algorithm": "QAOA", "graph_size": 4, "depth": 2},
    "HHL_System": {"algorithm": "HHL", "matrix": [[1.5, 0.5], [0.5, 1.5]], "vector": [0, 1]},
    "QAA_Grover": {"algorithm": "QAA", "num_qubits": 3, "iterations": 1},
}

# --- Qiskit Imports: CORRECTED FOR Qiskit 2.x/3.x ---
try:
    from qiskit import QuantumCircuit
    from qiskit.quantum_info import SparsePauliOp
    from qiskit.primitives import Estimator, Sampler
    from qiskit_aer import AerSimulator
    from qiskit_algorithms import VQE, QAOA, HHL
    from qiskit_algorithms.optimizers import SLSQP
    from qiskit_algorithms.eigensolvers import NumPyEigensolver
    from qiskit_algorithms.phase_estimators import IterativePhaseEstimation
    from qiskit_nature.second_quantization.mappers import JordanWignerMapper
    from qiskit_nature.second_quantization import ElectronicStructureProblem
    from qiskit_nature.drivers import Molecule
    from qiskit_nature.settings import settings
    from qiskit_nature.second_quantization.circuit.ansatz import UCCSD
    
    settings.default_qubit_converter_info = {"driver": "pyscf", "basis": "sto-3g", "mapper": JordanWignerMapper()}
    QISKIT_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Qiskit not fully available: {e}")
    QISKIT_AVAILABLE = False

console = Console()
BENCHMARK_RESULTS = {}

def get_simulator():
    """Returns the configured AerSimulator instance."""
    if not QISKIT_AVAILABLE:
        return None
    return AerSimulator(method="statevector")

def get_qubit_op(molecule_str: str, mapper_cls: type = JordanWignerMapper):
    """Generates the qubit operator for a given molecule."""
    if not QISKIT_AVAILABLE:
        return None, None, 0.0
    
    try:
        mol = Molecule(geometry=molecule_str, basis='sto-3g', charge=0, multiplicity=1)
        driver_result = mol.drive()
        problem = ElectronicStructureProblem(driver_result)
        mapper = mapper_cls()
        qubit_op = mapper.map(problem.second_q_ops()["ElectronicEnergy"])
        solver = NumPyEigensolver()
        ref_result = solver.compute_minimum_eigenvalue(qubit_op)
        reference_energy = ref_result.eigenvalue.real + driver_result.nuclear_repulsion_energy
        return qubit_op, problem, reference_energy
    except Exception as e:
        console.print(f"[bold red]Error in Molecule setup:[/bold red] {e}")
        return None, None, 0.0

def run_vqe_experiment(name: str, config: Dict[str, Any]):
    """Runs a VQE experiment."""
    console.print(f"\n{'='*60}")
    console.print(f"VQE: {name.split('_')[1]} with {config['ansatz']} ansatz")
    console.print(f"{'='*60}\n")

    start_time = time.time()
    result: Dict[str, Any] = {
        "success": False, 
        "error": None, 
        "depth": 0, 
        "time": 0.0, 
        "qubits": 0, 
        "energy": 0.0, 
        "ref_energy": 0.0, 
        "error_hartree": 0.0
    }

    if not QISKIT_AVAILABLE:
        result["error"] = "Qiskit not available."
        return result

    try:
        qubit_op, problem, ref_energy = get_qubit_op(config["molecule"])
        if qubit_op is None:
            raise RuntimeError("Failed to generate qubit operator.")
        
        ucc_ansatz = UCCSD(qubit_op.num_qubits, problem=problem, initial_state=None, coupled_cluster_type='uccsd')
        optimizer = SLSQP(maxiter=100)
        estimator = Estimator()
        
        vqe = VQE(estimator=estimator, ansatz=ucc_ansatz, optimizer=optimizer)
        vqe_result = vqe.compute_minimum_eigenvalue(operator=qubit_op)
        
        measured_energy = vqe_result.eigenvalue.real + problem.nuclear_repulsion_energy
        vqe_circuit = ucc_ansatz.assign_parameters(vqe_result.optimal_point)
        
        result.update({
            "success": True,
            "depth": vqe_circuit.depth(),
            "time": time.time() - start_time,
            "qubits": qubit_op.num_qubits,
            "energy": measured_energy,
            "ref_energy": ref_energy,
            "error_hartree": abs(measured_energy - ref_energy)
        })
    except Exception as e:
        result["error"] = f"VQE failed: {e}"
        
    return result

def run_benchmark(benchmark_name: str = None):
    """Run quantum benchmarks."""
    if benchmark_name and benchmark_name in BENCHMARK_CONFIG:
        config = BENCHMARK_CONFIG[benchmark_name]
        if config["algorithm"] == "VQE":
            return run_vqe_experiment(benchmark_name, config)
    return {"error": "Benchmark not found or not implemented"}

if __name__ == "__main__":
    # Run all benchmarks
    for name, config in BENCHMARK_CONFIG.items():
        result = run_benchmark(name)
        BENCHMARK_RESULTS[name] = result
        console.print(f"Completed: {name}")
    
    console.print("\n[bold green]All benchmarks completed![/bold green]")
