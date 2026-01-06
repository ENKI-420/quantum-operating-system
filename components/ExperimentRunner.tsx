import React, { useState } from 'react';
import BackendSelector from './BackendSelector';
import { JobStatus } from '../types';
import { PlayIcon } from './icons';
import { Spinner } from './Spinner';

interface ExperimentRunnerProps {
  backends: string[];
  onRun: (backend: string, shots: number) => void;
  jobStatus?: JobStatus;
}

const ExperimentRunner: React.FC<ExperimentRunnerProps> = ({ backends, onRun, jobStatus }) => {
  const [selectedBackend, setSelectedBackend] = useState(backends[0] || '');
  const [shots, setShots] = useState('1024');

  const isRunning = jobStatus === JobStatus.QUEUED || jobStatus === JobStatus.RUNNING;
  const areBackendsLoading = backends.length === 0;

  const handleRun = () => {
    const numShots = parseInt(shots, 10);
    if (!isNaN(numShots) && numShots > 0) {
      onRun(selectedBackend, numShots);
    } else {
      alert("Please enter a valid number of shots.");
    }
  };
  
  React.useEffect(() => {
      if(backends.length > 0 && !selectedBackend) {
          setSelectedBackend(backends[0]);
      }
  }, [backends, selectedBackend]);

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
      <h2 className="text-lg font-bold text-cyan-400 mb-4 text-glow-cyan">Experiment Runner</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="text-xs text-slate-400 mb-1 block">Quantum Backend</label>
          <BackendSelector
            backends={backends}
            selectedBackend={selectedBackend}
            onBackendChange={setSelectedBackend}
            disabled={isRunning || areBackendsLoading}
          />
        </div>
        <div>
          <label htmlFor="shots" className="text-xs text-slate-400 mb-1 block">Shots</label>
          <input
            id="shots"
            type="number"
            value={shots}
            onChange={(e) => setShots(e.target.value)}
            disabled={isRunning || areBackendsLoading}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
          />
        </div>
      </div>
       <div className="mt-4">
          <button
            onClick={handleRun}
            disabled={isRunning || areBackendsLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-600 border-b-4 border-cyan-800 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <><Spinner /> Submitting...</> : <><PlayIcon className="h-5 w-5" /> Run Bell State Experiment</>}
          </button>
        </div>
    </div>
  );
};

export default ExperimentRunner;
