"""DNALang Utilities"""

from typing import Dict, Any, List
import re

def validate_circuit(qasm: str) -> bool:
    """
    Validate OpenQASM circuit

    Args:
        qasm: OpenQASM code string

    Returns:
        True if valid

    Raises:
        ValidationError: If circuit is invalid
    """
    if not qasm or not isinstance(qasm, str):
        return False

    # Basic QASM validation
    if not qasm.strip().startswith("OPENQASM"):
        return False

    return True


def format_results(result: Dict[str, Any]) -> str:
    """
    Format quantum operation results for display

    Args:
        result: Operation result dict

    Returns:
        Formatted string representation

    Example:
        >>> result = {"fidelity": 0.95, "shots": 2048}
        >>> print(format_results(result))
        Fidelity: 0.9500
        Shots: 2048
    """
    lines = []
    for key, value in result.items():
        if isinstance(value, float):
            lines.append(f"{key.title()}: {value:.4f}")
        else:
            lines.append(f"{key.title()}: {value}")

    return "\n".join(lines)


def calculate_metrics(counts: Dict[str, int]) -> Dict[str, float]:
    """
    Calculate quantum metrics from measurement counts

    Args:
        counts: Measurement counts dict (e.g., {"00": 512, "11": 512})

    Returns:
        Calculated metrics (fidelity, entropy, etc.)

    Example:
        >>> counts = {"00": 500, "11": 500, "01": 24, "10": 24}
        >>> metrics = calculate_metrics(counts)
        >>> print(f"Fidelity: {metrics['fidelity']:.4f}")
    """
    total_shots = sum(counts.values())
    if total_shots == 0:
        return {}

    # Calculate probabilities
    probs = {state: count / total_shots for state, count in counts.items()}

    # Shannon entropy
    import math
    entropy = -sum(p * math.log2(p) if p > 0 else 0 for p in probs.values())

    # Simplified fidelity (assumes ideal state is |00> + |11>)
    ideal_states = ["00", "11"] if "00" in counts else list(counts.keys())[:2]
    fidelity = sum(probs.get(state, 0) for state in ideal_states)

    return {
        "fidelity": fidelity,
        "entropy": entropy,
        "total_shots": total_shots,
        "num_states": len(counts)
    }


def validate_api_key(api_key: str) -> bool:
    """
    Validate API key format

    Args:
        api_key: API key string

    Returns:
        True if valid format
    """
    if not api_key or not isinstance(api_key, str):
        return False

    # API keys start with "qos_" followed by alphanumeric
    pattern = r"^qos_[A-Za-z0-9_-]{20,}$"
    return bool(re.match(pattern, api_key))


def parse_qasm(qasm: str) -> Dict[str, Any]:
    """
    Parse OpenQASM code

    Args:
        qasm: OpenQASM code string

    Returns:
        Parsed circuit information

    Example:
        >>> qasm = "OPENQASM 2.0;\\nqreg q[2];"
        >>> info = parse_qasm(qasm)
        >>> print(f"Qubits: {info['num_qubits']}")
    """
    lines = qasm.strip().split("\n")

    info = {
        "version": None,
        "num_qubits": 0,
        "num_gates": 0
    }

    for line in lines:
        line = line.strip()

        # Version
        if line.startswith("OPENQASM"):
            info["version"] = line.split()[-1].rstrip(";")

        # Qubit register
        if line.startswith("qreg"):
            match = re.search(r"\[(\d+)\]", line)
            if match:
                info["num_qubits"] = int(match.group(1))

        # Count gates (simplified)
        if any(gate in line for gate in ["cx", "h", "x", "y", "z", "rx", "ry", "rz"]):
            info["num_gates"] += 1

    return info
