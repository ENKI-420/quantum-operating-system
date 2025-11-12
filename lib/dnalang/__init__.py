"""
DNALang Quantum Framework
========================

A universal quantum computing framework for enterprise applications.

Features:
- Auto-enhancement with recursive optimization
- Multi-backend support (IBM Quantum, simulators)
- Industry-specific solutions (Finance, Pharma, Materials, Logistics)
- Enterprise-grade features (multi-tenancy, billing, RBAC)
- Wormhole protocol for distributed quantum computing

Installation:
    pip install dnalang

Quick Start:
    >>> from dnalang import QuantumClient
    >>> client = QuantumClient(api_key="your_api_key")
    >>> result = client.operations.coherence(shots=2048)
    >>> print(f"Coherence: {result['coherence']:.4f}")

For full documentation, visit: https://docs.dnalang.com
"""

__version__ = "1.0.0"
__author__ = "DNALang Quantum Team"
__license__ = "Proprietary"

# Core imports
from .client import QuantumClient
from .config import DNALangConfig
from .exceptions import (
    DNALangException,
    AuthenticationError,
    RateLimitError,
    OperationError
)

# Operation modules
from .operations import (
    CoherenceOperation,
    WflowOperation,
    DisentangleOperation,
    WormholeOperation
)

# Industry verticals
from .verticals import (
    FinanceClient,
    PharmaClient,
    MaterialsClient,
    LogisticsClient
)

# Enhancement
from .enhancement import AutoEnhancer

# Utilities
from .utils import (
    validate_circuit,
    format_results,
    calculate_metrics
)

__all__ = [
    # Core
    "QuantumClient",
    "DNALangConfig",

    # Exceptions
    "DNALangException",
    "AuthenticationError",
    "RateLimitError",
    "OperationError",

    # Operations
    "CoherenceOperation",
    "WflowOperation",
    "DisentangleOperation",
    "WormholeOperation",

    # Verticals
    "FinanceClient",
    "PharmaClient",
    "MaterialsClient",
    "LogisticsClient",

    # Enhancement
    "AutoEnhancer",

    # Utils
    "validate_circuit",
    "format_results",
    "calculate_metrics",
]

# Version info
VERSION_INFO = {
    "version": __version__,
    "features": [
        "quantum_operations",
        "auto_enhancement",
        "multi_backend",
        "industry_verticals",
        "wormhole_protocol",
        "enterprise_features"
    ],
    "backends": ["ibm_quantum", "aer_simulator"],
    "license": __license__
}

def get_version_info():
    """Get framework version information"""
    return VERSION_INFO

def init(api_key=None, config=None):
    """
    Initialize DNALang framework

    Args:
        api_key: API key for authentication
        config: Custom configuration dict

    Returns:
        Configured QuantumClient instance

    Example:
        >>> import dnalang
        >>> client = dnalang.init(api_key="qos_...")
        >>> result = client.operations.coherence()
    """
    return QuantumClient(api_key=api_key, config=config)
