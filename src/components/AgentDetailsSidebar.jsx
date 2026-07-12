import React, { useState } from 'react';
import { useBuilderStore } from '../lib/builderStore';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentDetailsSidebar() {
  const { blocks, selectedElementId, updateBlock, setSelectedElementId } = useBuilderStore();
  
  const [triggerDropdown, setTriggerDropdown] = useState(false);
  const [waitDropdown, setWaitDropdown] = useState(false);

  const selectedBlock = blocks.find(b => b.id === selectedElementId);

  if (!selectedBlock) return null;

  return (
    <div className="sidebar absolute right-4 top-4 bottom-4 w-[320px] bg-white rounded-[24px] shadow-sm border border-gray-200 p-6 flex flex-col z-30 transition-transform duration-300 transform translate-x-0 overflow-y-auto" onPointerDown={e => e.stopPropagation()}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-[14px] font-bold text-[#2945D1]">Agent Details</h2>
        <button onClick={() => setSelectedElementId(null)} className="text-gray-400 hover:text-gray-600 transition">✕</button>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Agent Name */}
        <div>
          <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Agent Name</label>
          <input
            type="text"
            value={selectedBlock.name || ''}
            onChange={(e) => updateBlock(selectedBlock.id, { name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-[#2945D1] transition"
          />
        </div>

        {/* Objective / Description */}
        <div>
          <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Objective / Description</label>
          <textarea
            value={selectedBlock.description || ''}
            onChange={(e) => updateBlock(selectedBlock.id, { description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-[#2945D1] transition resize-none h-[100px]"
            placeholder="Search across research papers, PDFs.."
          />
        </div>

        {/* Trigger Configuration */}
        <div className="relative">
          <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Trigger Configuration</label>
          <div 
            onClick={() => { setTriggerDropdown(!triggerDropdown); setWaitDropdown(false); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
          >
            <span className="text-[13px] text-gray-600">{selectedBlock.triggerConfig?.type === 'manual' ? 'Manual Trigger' : selectedBlock.triggerConfig?.type === 'scheduled' ? 'Scheduled (Cron)' : 'Event-driven (Webhook)'}</span>
            {triggerDropdown ? <ChevronUp size={16} className="text-[#2945D1]" /> : <ChevronDown size={16} className="text-[#2945D1]" />}
          </div>
          {triggerDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {['manual', 'scheduled', 'event'].map(t => (
                <div 
                  key={t}
                  onClick={() => {
                    updateBlock(selectedBlock.id, { triggerConfig: { ...selectedBlock.triggerConfig, type: t } });
                    setTriggerDropdown(false);
                  }}
                  className={`px-3 py-2 text-[13px] cursor-pointer hover:bg-gray-50 transition ${selectedBlock.triggerConfig?.type === t ? 'bg-[#2945D1]/10 text-[#2945D1]' : 'text-gray-600'}`}
                >
                  {t === 'manual' ? 'Manual Trigger' : t === 'scheduled' ? 'Scheduled (Cron)' : 'Event-driven (Webhook)'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Waiting Configuration */}
        <div className="relative">
          <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Waiting Configuration</label>
          <div 
            onClick={() => { setWaitDropdown(!waitDropdown); setTriggerDropdown(false); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
          >
            <span className="text-[13px] text-gray-600">
              {selectedBlock.waitConfig?.type === 'none' ? 'No Delay' : selectedBlock.waitConfig?.type === 'delay' ? 'Fixed Time Delay' : selectedBlock.waitConfig?.type === 'condition' ? 'Wait for Condition' : 'Wait for Event'}
            </span>
            {waitDropdown ? <ChevronUp size={16} className="text-[#2945D1]" /> : <ChevronDown size={16} className="text-[#2945D1]" />}
          </div>
          {waitDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {['none', 'delay', 'condition', 'event'].map(t => (
                <div 
                  key={t}
                  onClick={() => {
                    updateBlock(selectedBlock.id, { waitConfig: { ...selectedBlock.waitConfig, type: t } });
                    setWaitDropdown(false);
                  }}
                  className={`px-3 py-2 text-[13px] cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 transition ${selectedBlock.waitConfig?.type === t ? 'bg-[#2945D1]/20 text-[#2945D1]' : 'text-gray-600'}`}
                >
                  {t === 'none' ? 'No Delay' : t === 'delay' ? 'Fixed Time Delay' : t === 'condition' ? 'Wait for Condition' : 'Wait for Event'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom API Key */}
        <div>
          <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Custom API Key</label>
          <input
            type="password"
            value={selectedBlock.apiKey || ''}
            onChange={(e) => updateBlock(selectedBlock.id, { apiKey: e.target.value, useCustomKey: e.target.value.length > 0 })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-[#2945D1] transition"
            placeholder="sk-or-v1-..."
          />
        </div>

        {/* Suggestions */}
        <div>
          <label className="block text-[13px] font-medium text-gray-800 mb-2">Suggestions</label>
          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg p-2.5 bg-white cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition">
              <h4 className="text-[12px] font-semibold text-gray-900 mb-0.5">Microsoft Clarity</h4>
              <p className="text-[10px] text-gray-400 leading-tight">Generates heatmaps, session recordings and behavioural insights.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-2.5 bg-white cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition">
              <h4 className="text-[12px] font-semibold text-gray-900 mb-0.5">NotebookLM</h4>
              <p className="text-[10px] text-gray-400 leading-tight">Search across research papers, PDFs and surveys</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer / Create button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button 
          onClick={() => setSelectedElementId(null)}
          className="w-full bg-[#2945D1] text-white rounded-lg py-2.5 text-[13px] font-medium hover:bg-blue-700 transition"
        >
          Create agent
        </button>
      </div>
    </div>
  );
}
