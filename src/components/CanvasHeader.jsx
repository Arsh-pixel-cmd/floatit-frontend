import React from 'react';
import { Play, Square } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';

export default function CanvasHeader({ setShowShareModal }) {
  const { flowTitle } = useBuilderStore();
  const { graphStatus } = useWorkflowStore();
  const isRunning = graphStatus === 'running';

  const startExecution = () => console.log('Run triggered');
  const stopExecution = () => console.log('Stop triggered');

  return (
    <header className="h-[50px] bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 relative">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
        <div className="h-5 w-px bg-gray-200"></div>
        <div className="text-sm font-medium text-gray-700">{flowTitle || 'Untitled Project'}</div>
      </div>
      <div className="flex items-center gap-3">
        {isRunning ? (
          <button onClick={stopExecution} className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition">
            <Square size={14} /> Stop
          </button>
        ) : (
          <button onClick={startExecution} className="flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition">
            <Play size={14} /> Run
          </button>
        )}
        <button onClick={() => setShowShareModal(true)} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition">Share</button>
      </div>
    </header>
  );
}
