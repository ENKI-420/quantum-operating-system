"""
DNALang Quantum Client
======================

Main client for interacting with DNALang Quantum Platform
"""

import os
import requests
from typing import Dict, Any, Optional
from .config import DNALangConfig
from .exceptions import AuthenticationError, RateLimitError, OperationError
from .operations import OperationsClient
from .verticals import VerticalsClient
from .enhancement import AutoEnhancer


class QuantumClient:
    """
    Main DNALang Quantum client

    Example:
        >>> from dnalang import QuantumClient
        >>> client = QuantumClient(api_key="qos_...")
        >>>
        >>> # Execute quantum operation
        >>> result = client.operations.coherence(shots=2048)
        >>>
        >>> # Use industry vertical
        >>> portfolio = client.finance.optimize_portfolio(...)
        >>>
        >>> # Auto-enhance results
        >>> enhanced = client.enhance(result)
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        config: Optional[DNALangConfig] = None,
        base_url: str = "https://dnalang-quantum-swarm.vercel.app"
    ):
        """
        Initialize QuantumClient

        Args:
            api_key: API key for authentication (or set DNALANG_API_KEY env var)
            config: Custom configuration
            base_url: API base URL
        """
        self.api_key = api_key or os.getenv("DNALANG_API_KEY")
        if not self.api_key:
            raise AuthenticationError(
                "API key required. Set DNALANG_API_KEY env var or pass api_key parameter."
            )

        self.config = config or DNALangConfig()
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": f"DNALang-Python/{self.config.version}"
        })

        # Initialize sub-clients
        self.operations = OperationsClient(self)
        self.verticals = VerticalsClient(self)
        self.enhancer = AutoEnhancer(self)

        # Shortcuts to verticals
        self.finance = self.verticals.finance
        self.pharma = self.verticals.pharma
        self.materials = self.verticals.materials
        self.logistics = self.verticals.logistics

    def request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict] = None,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Make HTTP request to API

        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint path
            data: Request body data
            params: URL parameters

        Returns:
            Response data

        Raises:
            AuthenticationError: If authentication fails
            RateLimitError: If rate limit exceeded
            OperationError: If operation fails
        """
        url = f"{self.base_url}{endpoint}"

        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                params=params,
                timeout=self.config.timeout
            )

            # Handle errors
            if response.status_code == 401:
                raise AuthenticationError("Invalid API key")
            elif response.status_code == 429:
                raise RateLimitError("Rate limit exceeded")
            elif response.status_code >= 400:
                error_data = response.json() if response.content else {}
                raise OperationError(
                    error_data.get("detail", f"HTTP {response.status_code}")
                )

            return response.json()

        except requests.RequestException as e:
            raise OperationError(f"Request failed: {str(e)}")

    def health(self) -> Dict[str, Any]:
        """
        Check API health

        Returns:
            Health status dict

        Example:
            >>> health = client.health()
            >>> print(health['status'])
            'healthy'
        """
        return self.request("GET", "/api/health")

    def get_metrics(self) -> Dict[str, Any]:
        """
        Get platform metrics

        Returns:
            Dashboard metrics

        Example:
            >>> metrics = client.get_metrics()
            >>> print(f"Coherence: {metrics['coherence']:.4f}")
        """
        return self.request("GET", "/api/dashboard/metrics")

    def enhance(self, result: Dict[str, Any], iterations: int = 3) -> Dict[str, Any]:
        """
        Auto-enhance operation result

        Args:
            result: Operation result to enhance
            iterations: Max enhancement iterations

        Returns:
            Enhanced result

        Example:
            >>> result = client.operations.coherence()
            >>> enhanced = client.enhance(result)
            >>> print(f"Improvement: +{enhanced['improvement']:.1%}")
        """
        return self.enhancer.enhance(result, iterations=iterations)

    def __repr__(self) -> str:
        return f"<QuantumClient(base_url='{self.base_url}')>"
