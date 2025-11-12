"""DNALang Configuration"""

from dataclasses import dataclass, field
from typing import List, Dict, Any

@dataclass
class DNALangConfig:
    """DNALang framework configuration"""

    # Version
    version: str = "1.0.0"

    # API settings
    timeout: int = 30
    max_retries: int = 3
    retry_delay: float = 1.0

    # Feature flags
    auto_enhance: bool = True
    telemetry: bool = True
    caching: bool = True

    # Quantum settings
    default_backend: str = "simulator"
    default_shots: int = 2048
    max_qubits: int = 20

    # Enhancement settings
    enhancement_threshold: float = 0.05  # 5% minimum improvement
    max_enhancement_iterations: int = 5

    # Industry vertical settings
    verticals_enabled: List[str] = field(default_factory=lambda: [
        "finance", "pharma", "materials", "logistics"
    ])

    # Cache settings
    cache_ttl: int = 300  # seconds
    cache_size: int = 100  # max items

    def to_dict(self) -> Dict[str, Any]:
        """Convert config to dictionary"""
        return {
            "version": self.version,
            "timeout": self.timeout,
            "auto_enhance": self.auto_enhance,
            "default_backend": self.default_backend,
            "default_shots": self.default_shots
        }
