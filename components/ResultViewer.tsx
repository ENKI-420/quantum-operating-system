import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { QuantumResult } from '../types';
import { ChartIcon, EntropyIcon, FidelityIcon, MutualInfoIcon, WassersteinIcon } from './icons';

interface ResultViewerProps {
  result: QuantumResult | null;
}

const MetricCard: React.FC<{ icon: React.ReactNode; label: string; value: string; unit?: string, color: string }> = ({ icon, label, value, unit, color }) => (
    <div className="bg-slate-800/50 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="text-xs text-slate-400">{label}</span>
        </div>
        <div className={`text-xl font-bold ${color}`}>
            {value}
            {unit && <span className="text-sm ml-1 opacity-70">{unit}</span>}
        </div>
    </div>
);

const ResultViewer: React.FC<ResultViewerProps> = ({ result }) => {
  const chartData = result ? Object.entries(result.probabilities).map(([name, value]) => ({ name, value })) : [];

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 flex flex-col h-full">
      <h2 className="text-lg font-bold text-cyan-400 mb-4 text-glow-cyan">Result Viewer</h2>
      {result ? (
        <div className="flex-grow flex flex-col gap-4">
          <div className="text-xs text-slate-400 grid grid-cols-2 gap-x-4 gap-y-1">
             <p><strong>Job ID:</strong> <span className="text-slate-300 truncate">{result.jobId}</span></p>
             <p><strong>Backend:</strong> <span className="text-slate-300">{result.backend}</span></p>
             <p><strong>Shots:</strong> <span className="text-slate-300">{result.shots.toLocaleString()}</span></p>
             <p><strong>Completed:</strong> <span className="text-slate-300">{result.completedAt}</span></p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <MetricCard icon={<FidelityIcon className="h-4 w-4 text-indigo-400"/>} label="Fidelity" value={result.metrics.fidelity.toFixed(4)} color="text-indigo-400" />
            <MetricCard icon={<EntropyIcon className="h-4 w-4 text-lime-400"/>} label="Entropy" value={result.metrics.entropy.toFixed(4)} unit="bits" color="text-lime-400" />
            <MetricCard icon={<MutualInfoIcon className="h-4 w-4 text-fuchsia-400"/>} label="Mutual Info" value={result.metrics.mutualInfo.toFixed(4)} unit="bits" color="text-fuchsia-400" />
            <MetricCard icon={<WassersteinIcon className="h-4 w-4 text-amber-400"/>} label="L1 Distance" value={result.metrics.l1_distance.toFixed(4)} color="text-amber-400" />
          </div>

          <div className="flex-grow w-full text-xs">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 1]} />
                <Tooltip
                  cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(2, 6, 23, 0.8)',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value: number) => [value.toFixed(4), 'Probability']}
                />
                <Bar dataKey="value" fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-slate-500">
          <div className="text-center">
            <ChartIcon className="h-10 w-10 mx-auto mb-2" />
            <p>No results to display.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultViewer;
