#!/usr/bin/env python3
"""
Quantum Monitoring Agent

Monitors system health, job queue, and quantum hardware status
while streaming real-time telemetry.
"""

import asyncio
import sys
import random
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sdk.python.realtime_client import RealtimeClient


class MonitorAgent:
    """System monitoring agent with realtime telemetry"""

    def __init__(self, agent_id: str = "monitor_001", ws_url: str = "ws://localhost:8000/realtime"):
        self.agent_id = agent_id
        self.client = RealtimeClient(ws_url)
        self.running = False
        self.stats = {
            'uptime': 0,
            'health_checks': 0,
            'alerts_raised': 0
        }

    async def start(self):
        """Start the monitoring agent"""
        print(f"[{self.agent_id}] Starting Monitor Agent...")

        await self.client.connect()
        self.running = True

        await self.client.send_agent_status(
            agent_id=self.agent_id,
            agent_type="monitor",
            status="running",
            current_task="system_health_check",
            metrics=self.stats
        )

        print(f"[{self.agent_id}] Agent started")

        try:
            while self.running:
                await self.monitoring_cycle()
                await asyncio.sleep(3)
                self.stats['uptime'] += 3
        finally:
            await self.stop()

    async def monitoring_cycle(self):
        """Single monitoring cycle"""
        self.stats['health_checks'] += 1

        # Simulate system metrics
        metrics = {
            'cpu_usage': random.uniform(20, 80),
            'memory_usage': random.uniform(40, 70),
            'job_queue_depth': random.randint(0, 10),
            'quantum_backend_available': True
        }

        # Send telemetry
        await self.client.send_telemetry(
            metrics=metrics,
            source=f"monitor_{self.agent_id}"
        )

        # Update agent status
        await self.client.send_agent_status(
            agent_id=self.agent_id,
            agent_type="monitor",
            status="running",
            current_task="monitoring_system",
            metrics=self.stats
        )

        # Check for alerts
        if metrics['cpu_usage'] > 75:
            self.stats['alerts_raised'] += 1
            print(f"[{self.agent_id}] ALERT: High CPU usage: {metrics['cpu_usage']:.1f}%")

    async def stop(self):
        """Stop the agent"""
        print(f"[{self.agent_id}] Stopping...")
        self.running = False

        await self.client.send_agent_status(
            agent_id=self.agent_id,
            agent_type="monitor",
            status="idle",
            current_task=None,
            metrics=self.stats
        )

        await self.client.disconnect()
        print(f"[{self.agent_id}] Stopped")


async def main():
    agent = MonitorAgent()

    try:
        await agent.start()
    except KeyboardInterrupt:
        print("\nShutting down gracefully...")
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
