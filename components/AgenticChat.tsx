import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
// FIX: Removed unused and non-existent icon imports.
import { SendIcon, SystemIcon, UserIcon, AidenIcon } from './icons';
import { Spinner } from './Spinner';


interface AgenticChatProps {
  logs: LogEntry[];
  onCommand: (command: string) => void;
  isThinking: boolean;
}

const LOG_TYPE_CLASSES: Record<LogEntry['type'], string> = {
  info: 'text-slate-300',
  warning: 'text-yellow-400',
  success: 'text-green-400',
  error: 'text-red-400',
  sent: 'text-amber-300',
  received: 'text-slate-200',
};

const AUTHOR_INFO: Record<LogEntry['author'], { text: string; className: string; icon: React.ReactNode }> = {
  system: { text: '[SYSTEM]', className: 'text-cyan-400', icon: <SystemIcon className="h-5 w-5 text-cyan-500" /> },
  aiden: { text: '[AIDEN]', className: 'text-lime-400', icon: <AidenIcon className="h-5 w-5 text-lime-400" /> },
  user: { text: '>', className: 'text-amber-400', icon: <UserIcon className="h-5 w-5 text-amber-400" /> },
};


const EventLog: React.FC<AgenticChatProps> = ({ logs, onCommand, isThinking }) => {
  const [input, setInput] = useState('');
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 h-full flex flex-col font-mono">
      <h2 className="text-lg font-bold text-cyan-400 mb-4 text-glow-cyan flex-shrink-0">
        AIDEN :: DevPilot CLI
      </h2>
      <div ref={logContainerRef} className="overflow-y-auto flex-grow pr-2 flex flex-col-reverse">
        {/* The actual list is rendered here, in reverse order due to flex-col-reverse */}
        <ul className="flex flex-col gap-4">
          {logs.map((log) => (
            <li key={log.id} className="text-sm leading-relaxed animate-fade-in flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{AUTHOR_INFO[log.author].icon}</div>
              <div className="flex-grow">
                 <div className="flex items-center gap-2">
                    <span className={`${AUTHOR_INFO[log.author].className} font-bold`}>
                        {AUTHOR_INFO[log.author].text}
                    </span>
                    <span className="text-slate-500 text-xs">{log.timestamp}</span>
                </div>
                <p className={`${LOG_TYPE_CLASSES[log.type]} whitespace-pre-wrap`}>{log.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
        <div className="flex items-center bg-black/50 border border-slate-600 rounded-md focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-all">
          <span className="text-amber-400 pl-3 text-sm font-bold">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isThinking ? "Aiden is thinking..." : "Interact with Aiden..."}
            className="w-full bg-transparent p-2 text-slate-200 focus:outline-none text-sm"
            disabled={isThinking}
            autoFocus
          />
          <button type="submit" disabled={isThinking} className="p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-50">
            {isThinking ? <Spinner /> : <SendIcon className="h-5 w-5"/>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventLog;
