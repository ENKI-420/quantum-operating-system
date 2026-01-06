import React from 'react';
import { QuantumJob, JobStatus } from '../types';
import { CheckCircleIcon, ClockIcon, ErrorIcon, PlayIcon, QueuedIcon } from './icons';
import { Spinner } from './Spinner';


interface JobMonitorProps {
  job: QuantumJob | null;
}

const STATUS_INFO: Record<JobStatus, { text: string; icon: React.ReactNode; color: string }> = {
  [JobStatus.IDLE]: { text: 'Idle', icon: <ClockIcon className="h-5 w-5" />, color: 'text-slate-400' },
  [JobStatus.QUEUED]: { text: 'Queued', icon: <QueuedIcon className="h-5 w-5" />, color: 'text-amber-400' },
  [JobStatus.RUNNING]: { text: 'Running', icon: <Spinner />, color: 'text-blue-400' },
  [JobStatus.COMPLETED]: { text: 'Completed', icon: <CheckCircleIcon className="h-5 w-5" />, color: 'text-green-400' },
  [JobStatus.FAILED]: { text: 'Failed', icon: <ErrorIcon className="h-5 w-5" />, color: 'text-red-400' },
  [JobStatus.CANCELLED]: { text: 'Cancelled', icon: <ErrorIcon className="h-5 w-5" />, color: 'text-yellow-400' },
};

const JobMonitor: React.FC<JobMonitorProps> = ({ job }) => {
  const statusInfo = job ? STATUS_INFO[job.status] : STATUS_INFO[JobStatus.IDLE];
  const jobLog = job ? job.log.slice().reverse() : ["No job submitted."];

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 flex flex-col h-full">
      <h2 className="text-lg font-bold text-cyan-400 mb-4 text-glow-cyan">Job Monitor</h2>
      {job ? (
        <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
            <div>
                <p className="text-slate-400 text-xs">Job ID</p>
                <p className="font-semibold truncate">{job.id}</p>
            </div>
            <div>
                <p className="text-slate-400 text-xs">Backend</p>
                <p className="font-semibold truncate">{job.backend}</p>
            </div>
            <div>
                <p className="text-slate-400 text-xs">Submitted</p>
                <p className="font-semibold">{job.createdAt}</p>
            </div>
             <div className="flex items-center gap-2">
                {statusInfo.icon}
                <span className={`font-bold ${statusInfo.color}`}>{statusInfo.text}</span>
            </div>
        </div>
         <div className="flex-grow bg-black/50 rounded-md p-3 overflow-y-auto border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-2">Execution Log</h3>
            <ul className="space-y-1.5 text-xs">
                {jobLog.map((entry, index) => (
                    <li key={index} className="flex gap-2">
                        <span className="text-slate-500 flex-shrink-0">&gt;</span>
                        <span className="text-slate-300">{entry}</span>
                    </li>
                ))}
            </ul>
        </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center text-slate-500">
            <p>Waiting for a new job...</p>
        </div>
      )}
    </div>
  );
};

export default JobMonitor;
