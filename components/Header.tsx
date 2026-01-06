import React from 'react';
import { BenchmarkMetrics } from '../types';
import { LogoIcon } from './icons';

interface HeaderProps {
  metrics: BenchmarkMetrics;
}

const MetricDisplay: React.FC<{ label: string; value: string; unit: string; className: string }> = ({ label, value, unit, className }) => (
  <div className={`text-center px-4 py-2 border-r border-slate-700 last:border-r-0`}>
    <div className="text-xs text-slate-400 uppercase tracking-widest">{label}</div>
    <div className={`text-2xl font-bold ${className}`}>
      {value}<span className="text-lg ml-1 opacity-70">{unit}</span>
    </div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ metrics }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/50 border-b border-slate-700/50 h-auto md:h-[80px]">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <LogoIcon className="h-8 w-8 text-cyan-400 text-glow-cyan" />
        <h1 className="text-xl font-bold text-slate-100 tracking-wider">
          QuantumDevPilot<span className="text-cyan-400">::</span>ADS
        </h1>
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-lg flex flex-wrap items-center justify-center">
        <MetricDisplay label="Quantum Volume" value={metrics.quantumVolume.toFixed(1)} unit="QV" className="text-cyan-400" />
        <MetricDisplay label="Fidelity" value={(metrics.entanglementFidelity * 100).toFixed(1)} unit="%" className="text-indigo-400" />
        <MetricDisplay label="Network" value={metrics.networkThroughput.toFixed(1)} unit="Gbit/s" className="text-fuchsia-400" />
        <MetricDisplay label="Sync" value={(metrics.swarmSynchronization * 100).toFixed(1)} unit="%" className="text-amber-400" />
        <MetricDisplay label="CI" value={metrics.consciousnessIndex.toFixed(1)} unit="" className="text-lime-400" />
        <MetricDisplay label="Drift" value={(metrics.modelDrift * 100).toFixed(1)} unit="%" className={metrics.modelDrift > 0.6 ? 'text-red-500' : 'text-green-400'} />
      </div>
    </header>
  );
};

export default Header;
