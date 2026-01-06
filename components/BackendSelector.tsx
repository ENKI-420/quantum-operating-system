import React from 'react';
import { CpuIcon, ServerIcon } from './icons';

interface BackendSelectorProps {
  backends: string[];
  selectedBackend: string;
  onBackendChange: (backend: string) => void;
  disabled: boolean;
}

const BackendSelector: React.FC<BackendSelectorProps> = ({ backends, selectedBackend, onBackendChange, disabled }) => {
  const isLoading = backends.length === 0;

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {selectedBackend.includes('simulator') ? <CpuIcon className="h-5 w-5 text-slate-400" /> : <ServerIcon className="h-5 w-5 text-slate-400" />}
      </div>
      <select
        value={selectedBackend}
        onChange={(e) => onBackendChange(e.target.value)}
        disabled={disabled || isLoading}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-md p-2 pl-10 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
      >
        {isLoading ? (
            <option>Loading backends...</option>
        ) : (
            backends.map((backend) => (
                <option key={backend} value={backend}>
                    {backend}
                </option>
            ))
        )}
      </select>
    </div>
  );
};

export default BackendSelector;
