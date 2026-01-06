import { useState, useCallback, useRef, useEffect } from 'react';
import { LogEntry, BenchmarkMetrics, QuantumJob, JobStatus, QuantumResult } from '../types';
import { getAidenResponse } from '../services/geminiService';
import { runQuantumExperiment, getBackends } from '../services/quantumService';

const INITIAL_METRICS: BenchmarkMetrics = {
  quantumVolume: 45,
  networkThroughput: 80,
  consciousnessIndex: 8,
  modelDrift: 0.1,
  entanglementFidelity: 0.98,
  swarmSynchronization: 0.95,
};

export const useQuantumOps = () => {
  const [logs, setLogs] = useState<LogEntry[]>([{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: 'System Initialized. Quantum Core online. AIDEN is ready.', type: 'info', author: 'system' }]);
  const [metrics, setMetrics] = useState<BenchmarkMetrics>(INITIAL_METRICS);
  const [isAidenThinking, setIsAidenThinking] = useState(false);
  
  const [job, setJob] = useState<QuantumJob | null>(null);
  const [result, setResult] = useState<QuantumResult | null>(null);
  const [backends, setBackends] = useState<string[]>([]);
  
  const addLog = useCallback((message: string, type: LogEntry['type'], author: LogEntry['author'] = 'system') => {
    setLogs(prev => [{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), message, type, author }, ...prev.slice(0, 100)]);
  }, []);

  useEffect(() => {
    const fetchBackends = async () => {
      try {
        const backendList = await getBackends();
        setBackends(backendList);
      } catch (error) {
        addLog('Failed to fetch quantum backends.', 'error');
      }
    };
    fetchBackends();
  }, [addLog]);

  const runExperiment = useCallback(async (backend: string, shots: number) => {
    setResult(null);
    const onUpdate = (updatedJob: QuantumJob) => {
      setJob(updatedJob);
      addLog(updatedJob.log[updatedJob.log.length - 1], 'info');
    };
    
    try {
      const finalResult = await runQuantumExperiment(backend, shots, onUpdate);
      setResult(finalResult);
      addLog(`Experiment successful. Results received from ${backend}.`, 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      addLog(`Experiment failed: ${errorMessage}`, 'error');
      if (job) {
        setJob(prev => prev ? {...prev, status: JobStatus.FAILED} : null);
      }
    }
  }, [addLog, job]);

  const interactWithAiden = useCallback(async (command: string) => {
    addLog(command, 'sent', 'user');
    setIsAidenThinking(true);

    try {
      const aidenResponse = await getAidenResponse(command, { jobStatus: job?.status });
      addLog(aidenResponse.text, 'received', 'aiden');

      if (aidenResponse.action === 'RUN_EXPERIMENT' && aidenResponse.params) {
        const { backend, shots } = aidenResponse.params;
        if (backends.includes(backend)) {
            addLog(`Affirmative. Initiating Bell State experiment on ${backend} with ${shots} shots.`, 'success', 'aiden');
            await runExperiment(backend, shots);
        } else {
            addLog(`Negative. Backend "${backend}" is not in the available list. Please select from the dropdown.`, 'error', 'aiden');
        }
      } else if (aidenResponse.action === 'UNKNOWN') {
        // Handled by the default response text.
      }

    } catch (error) {
      console.error("Error interacting with Aiden:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      addLog(`Error communicating with my core consciousness: ${errorMessage}`, 'error', 'aiden');
    } finally {
      setIsAidenThinking(false);
    }
  }, [addLog, runExperiment, job, backends]);

  return { logs, metrics, interactWithAiden, job, backends, runExperiment, result, isAidenThinking };
};
