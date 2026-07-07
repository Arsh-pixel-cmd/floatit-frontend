import React from 'react';
import { TOOL_REGISTRY } from '../../data/schema';
import type { WorkflowNodeResults } from '../../types/engine';

interface PipelineSidebarProps {
  selectedNodeId: string | null;
  layout: Record<string, any>;
  nodeResults: WorkflowNodeResults;
  onClose: () => void;
}

export default function PipelineSidebar({ selectedNodeId, layout, nodeResults, onClose }: PipelineSidebarProps) {
  if (!selectedNodeId) return null;

  const selectedNode = layout[selectedNodeId];
  const nodeDetails = selectedNode?.category || {};

  const renderPipelineSidebarContent = () => {
    const result = nodeResults?.[selectedNodeId];
    if (result) {
      if (result._errorType) {
        return (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-sans mt-4">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Execution Halted — {result._errorType.replace('_', ' ')}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{result.content || 'An error occurred during execution.'}</p>
          </div>
        );
      }

      if (result.ui) {
        const safeHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { margin: 0; padding: 0; background: transparent; color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
                ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
              </style>
            </head>
            <body>
              ${result.ui}
            </body>
          </html>
        `;

        return (
          <div className="flex-1 w-full relative h-[600px]">
            <iframe
              srcDoc={safeHtml}
              className="w-full h-full border-0 bg-transparent rounded-2xl"
              sandbox="allow-scripts"
              title="Agent Output"
            />
          </div>
        );
      }
    }

    return (
      <div className="flex-1 mt-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-8 shadow-inner">
          <p className="text-sm text-slate-400 leading-relaxed font-light">{nodeDetails.description}</p>
        </div>

        <span className="text-[10px] text-[#A259FF] uppercase font-bold tracking-widest mb-4 block">Recommended External APIs</span>
        <div className="flex flex-col gap-3">
          {nodeDetails.tools?.map((tid: string) => {
            const toolInfo = (TOOL_REGISTRY as any)[tid];
            return (
              <div key={tid} className="bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] p-4 rounded-xl cursor-default transition-all group">
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-slate-200 text-sm tracking-wide group-hover:text-[#46B1FF] transition-colors">{toolInfo?.name || tid.toUpperCase()}</strong>
                  {toolInfo?.pricing && (
                    <span className="text-[9px] bg-black/40 border border-white/10 text-slate-400 px-2.5 py-0.5 rounded-md uppercase tracking-wider">{toolInfo.pricing}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{toolInfo?.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center pb-8 border-b border-white/[0.02]">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest text-center px-4">Execute AI Pipeline Phase to generate dynamic output for this node.</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`absolute right-0 top-0 h-full w-[460px] bg-[#0c0c14]/60 backdrop-blur-2xl border-l border-white/5 p-0 shadow-2xl transition-transform duration-500 z-50 flex flex-col ${selectedNodeId ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-white/[0.04] bg-black/40">
        <div>
          <h2 className="font-bold text-[10px] uppercase tracking-widest text-[#46B1FF] mb-1">Delivered Asset Output</h2>
          <span className="text-white font-black tracking-wide font-display text-lg">
            {selectedNodeId.startsWith('sticky-') ? 'Sticky Note insight' : nodeDetails.name}
          </span>
        </div>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {selectedNodeId ? (
          <div className="animate-fade-in flex flex-col h-full">
            {renderPipelineSidebarContent()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
