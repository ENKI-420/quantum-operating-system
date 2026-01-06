"""
Quantum Experiment Runner
=========================

Executes quantum experiments with DNALang framework integration
"""

import asyncio
import json
from typing import Dict, Any, List, Optional
from datetime import datetime
from dnalang_client import QuantumClient
from dnalang_config import DNALangConfig


class ExperimentRunner:
    """
    Autonomous quantum experiment runner
    
    Executes experiments, collects results, and applies auto-enhancement
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize experiment runner"""
        self.client = QuantumClient(api_key=api_key)
        self.config = DNALangConfig()
        self.results_cache: Dict[str, Any] = {}
        
    async def run_experiment(
        self,
        experiment_id: str,
        experiment_type: str,
        parameters: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Run a single experiment
        
        Args:
            experiment_id: Unique experiment identifier
            experiment_type: Type of experiment (VQE, QPE, QAOA, etc.)
            parameters: Experiment parameters
            
        Returns:
            Experiment results with metadata
        """
        start_time = datetime.utcnow()
        
        try:
            # Execute quantum operation
            result = self.client.execute_operation(
                operation=experiment_type,
                **parameters
            )
            
            # Apply auto-enhancement if enabled
            if self.config.auto_enhance:
                result = self.client.enhance(
                    result,
                    iterations=self.config.max_enhancement_iterations
                )
            
            # Add metadata
            result["experiment_id"] = experiment_id
            result["experiment_type"] = experiment_type
            result["start_time"] = start_time.isoformat()
            result["end_time"] = datetime.utcnow().isoformat()
            result["status"] = "completed"
            
            # Cache result
            self.results_cache[experiment_id] = result
            
            return result
            
        except Exception as e:
            return {
                "experiment_id": experiment_id,
                "experiment_type": experiment_type,
                "status": "failed",
                "error": str(e),
                "start_time": start_time.isoformat(),
                "end_time": datetime.utcnow().isoformat()
            }
    
    async def run_batch(
        self,
        experiments: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Run multiple experiments in parallel
        
        Args:
            experiments: List of experiment configurations
            
        Returns:
            List of experiment results
        """
        tasks = [
            self.run_experiment(
                experiment_id=exp["id"],
                experiment_type=exp["type"],
                parameters=exp["parameters"]
            )
            for exp in experiments
        ]
        
        results = await asyncio.gather(*tasks)
        return results
    
    def get_result(self, experiment_id: str) -> Optional[Dict[str, Any]]:
        """Get cached experiment result"""
        return self.results_cache.get(experiment_id)
    
    def get_all_results(self) -> List[Dict[str, Any]]:
        """Get all cached results"""
        return list(self.results_cache.values())
