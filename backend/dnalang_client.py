"""
DNALang Quantum Client
======================

Main client for interacting with DNALang Quantum Platform
"""

import os
import requests
from typing import Dict, Any, Optional
from dnalang_config import DNALangConfig


class AuthenticationError(Exception):
    """Authentication failed"""
    pass


class RateLimitError(Exception):
    """Rate limit exceeded"""
    pass


class OperationError(Exception):
    """Operation failed"""
    pass


class QuantumClient:
    """
    Main DNALang Quantum client

    Example:
        >>> from dnalang_client import QuantumClient
        >>> client = QuantumClient(api_key="qos_...")
        >>>
        >>> # Execute quantum operation
        >>> result = client.execute_operation("coherence", shots=2048)
        >>>
        >>> # Auto-enhance results
        >>> enhanced = client.enhance(result)
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        config: Optional[DNALangConfig] = None,
        base_url: str = "http://localhost:8000"
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
            "X-Api-Key": self.api_key,
            "Content-Type": "application/json",
            "User-Agent": f"DNALang-Python/{self.config.version}"
        })

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
        """Check API health"""
        return self.request("GET", "/health")

    def execute_operation(self, operation: str, **kwargs) -> Dict[str, Any]:
        """Execute a quantum operation"""
        return self.request("POST", f"/gene/invoke", data={
            "gene_name": operation,
            "parameters": kwargs
        })

    def get_organism_state(self, organism_id: str) -> Dict[str, Any]:
        """Get organism state"""
        return self.request("GET", f"/organism/{organism_id}")

    def enhance(self, result: Dict[str, Any], iterations: int = 3) -> Dict[str, Any]:
        """
        Auto-enhance operation result

        Args:
            result: Operation result to enhance
            iterations: Max enhancement iterations

        Returns:
            Enhanced result
        """
        enhanced = result.copy()
        for i in range(iterations):
            # Submit mutation for enhancement
            mutation_result = self.request("POST", "/mutation/submit", data={
                "mutation_type": "auto_enhance",
                "parameters": enhanced,
                "iteration": i
            })
            
            # Check if improvement meets threshold
            if mutation_result.get("improvement", 0) < self.config.enhancement_threshold:
                break
                
            enhanced = mutation_result
            
        return enhanced

    def __repr__(self) -> str:
        return f"<QuantumClient(base_url='{self.base_url}')>"
