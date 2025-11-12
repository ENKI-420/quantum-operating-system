#!/usr/bin/env python3
"""
Quantum Swarm Telemetry Agent

Runs EAL experiments and streams live swarm coherence metrics
to the realtime dashboard.
"""

import asyncio
import sys
import numpy as np
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sdk.python.realtime_client import RealtimeClient
from multi_agent_eal import QuantumSwarmEAL


class SwarmTelemetryAgent:
    """Swarm agent that streams coherence metrics"""

    def __init__(self, agent_id: str = "swarm_001", ws_url: str = "ws://localhost:8000/realtime"):
        self.agent_id = agent_id
        self.client = RealtimeClient(ws_url)
        self.running = False

    async def start(self, agents: int = 5, dimensions: int = 10, iterations: int = 100):
        """Start swarm optimization with telemetry"""
        print(f"[{self.agent_id}] Starting Swarm Telemetry Agent...")
        print(f"[{self.agent_id}] Config: {agents} agents, {dimensions}D, {iterations} iterations")

        await self.client.connect()
        self.running = True

        # Send initial status
        await self.client.send_agent_status(
            agent_id=self.agent_id,
            agent_type="swarm_agent",
            status="running",
            current_task=f"eal_optimization_{agents}x{dimensions}",
            metrics={'agents': agents, 'dimensions': dimensions}
        )

        # Run EAL with telemetry
        await self.run_eal_with_telemetry(agents, dimensions, iterations)

        await self.stop()

    async def run_eal_with_telemetry(self, agents: int, dimensions: int, iterations: int):
        """Run EAL and stream metrics"""
        print(f"[{self.agent_id}] Initializing EAL...")

        swarm = QuantumSwarmEAL(
            n_agents=agents,
            dimensions=dimensions,
            bounds=(-5.12, 5.12)
        )

        print(f"[{self.agent_id}] Starting evolution...")

        for iteration in range(iterations):
            swarm.iteration = iteration

            # Evaluate fitness for all agents
            for agent in swarm.agents:
                agent.fitness = swarm.fitness_function(agent.position)

                # Update personal best
                if agent.fitness < agent.best_fitness:
                    agent.best_fitness = agent.fitness
                    agent.best_position = agent.position.copy()

                # Update global best
                if agent.fitness < swarm.global_best_fitness:
                    swarm.global_best_fitness = agent.fitness
                    swarm.global_best_position = agent.position.copy()

            # Quantum entanglement between neighboring agents
            for i in range(swarm.n_agents - 1):
                if np.random.random() < swarm.entanglement_strength:
                    swarm.quantum_entangle_agents(swarm.agents[i], swarm.agents[i + 1])

            # Apply quantum coherence preservation
            for agent in swarm.agents:
                swarm.apply_quantum_coherence(agent)

            # Update all agents
            for agent in swarm.agents:
                swarm.update_agent(agent)

            # Calculate coherence metrics
            positions = np.array([agent.position for agent in swarm.agents])
            coherence = self.calculate_coherence(positions)
            entanglement = swarm.entanglement_strength

            # Send swarm coherence telemetry
            await self.client.send_swarm_coherence(
                coherence=coherence,
                entanglement=entanglement,
                agents_count=agents,
                iteration=iteration
            )

            # Update agent status every 10 iterations
            if iteration % 10 == 0:
                await self.client.send_agent_status(
                    agent_id=self.agent_id,
                    agent_type="swarm_agent",
                    status="running",
                    current_task=f"iteration_{iteration}/{iterations}",
                    metrics={
                        'best_fitness': swarm.global_best_fitness,
                        'coherence': coherence,
                        'entanglement': entanglement
                    }
                )

                print(f"[{self.agent_id}] Iteration {iteration}: "
                      f"Coherence={coherence:.3f}, "
                      f"Entanglement={entanglement:.3f}, "
                      f"Best={swarm.global_best_fitness:.3f}")

            # Small delay for telemetry
            await asyncio.sleep(0.05)

        print(f"[{self.agent_id}] Evolution complete!")
        print(f"[{self.agent_id}] Final best fitness: {swarm.global_best_fitness:.3f}")

    def calculate_coherence(self, positions: np.ndarray) -> float:
        """Calculate swarm coherence (0-1)"""
        if len(positions) < 2:
            return 1.0

        # Calculate variance of positions
        variances = np.var(positions, axis=0)
        avg_variance = np.mean(variances)

        # Convert to coherence (inverse of spread)
        # Lower variance = higher coherence
        coherence = 1.0 / (1.0 + avg_variance / 10.0)

        return np.clip(coherence, 0.0, 1.0)

    async def stop(self):
        """Stop the agent"""
        print(f"[{self.agent_id}] Stopping...")
        self.running = False

        await self.client.send_agent_status(
            agent_id=self.agent_id,
            agent_type="swarm_agent",
            status="idle",
            current_task="completed"
        )

        await self.client.disconnect()
        print(f"[{self.agent_id}] Stopped")


async def main():
    import argparse

    parser = argparse.ArgumentParser(description="Swarm Telemetry Agent")
    parser.add_argument("--agents", type=int, default=5, help="Number of agents")
    parser.add_argument("--dimensions", type=int, default=10, help="Problem dimensions")
    parser.add_argument("--iterations", type=int, default=100, help="Number of iterations")
    parser.add_argument("--ws-url", default="ws://localhost:8000/realtime", help="WebSocket URL")

    args = parser.parse_args()

    agent = SwarmTelemetryAgent(ws_url=args.ws_url)

    try:
        await agent.start(
            agents=args.agents,
            dimensions=args.dimensions,
            iterations=args.iterations
        )
    except KeyboardInterrupt:
        print("\nShutting down gracefully...")
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
