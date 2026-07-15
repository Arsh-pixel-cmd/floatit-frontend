import React, { useMemo, useState } from 'react';
import { X, Download, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';
import MDEditor from '@uiw/react-md-editor';

/**
 * OutputScreen — Observer pattern consumer.
 * 
 * Renders synthesized group outputs after workflow completion.
 * BUG-012: This component replaces the missing post-execution view.
 * Task 5: Adds inline editing via @uiw/react-md-editor.
 */
export default function OutputScreen({ onClose }: { onClose: () => void }) {
  const { nodeResults, editedOutputs } = useWorkflowStore();
  const { groups, blocks } = useBuilderStore();

  // Build ordered output summaries per group
  const groupOutputs = useMemo(() => {
    return [...groups]
      .sort((a, b) => a.order - b.order)
      .map(group => {
        const outputBlock = blocks.find(b => b.id === group.outputBlockId);
        const outputResult = nodeResults[group.outputBlockId];
        const agentResults = group.blockIds
          .map(id => {
            const block = blocks.find(b => b.id === id);
            const result = nodeResults[id];
            return block && result ? { name: block.name, content: result.content } : null;
          })
          .filter(Boolean);
        
        return {
          id: group.id,
          name: group.name,
          outputName: outputBlock?.name || `${group.name} Output`,
          synthesis: outputResult?.content || '',
          agents: agentResults,
        };
      });
  }, [groups, blocks, nodeResults]);

  const handleExport = () => {
    let markdown = `# FloatIt Workflow Output\n\n`;
    markdown += `Generated: ${new Date().toLocaleString()}\n\n---\n\n`;
    groupOutputs.forEach(group => {
      markdown += `## Phase: ${group.name}\n\n`;
      group.agents.forEach((agent: any) => {
        markdown += `### ${agent.name}\n\n${agent.content}\n\n`;
      });
      // Use edited content if available, otherwise original synthesis
      const displayContent = editedOutputs[group.id] ?? group.synthesis;
      markdown += `### 🔗 ${group.outputName} (Synthesis)\n\n${displayContent}\n\n---\n\n`;
    });
    const blob = new Blob([markdown], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `floatit-output-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#1e1e24] rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2945D1] to-[#A259FF] flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Workflow Output</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Execution complete — {groupOutputs.length} phase{groupOutputs.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition"
            >
              <Download size={13} />
              Export .txt
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 dark:hover:text-gray-200 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {groupOutputs.length === 0 && (
            <div className="text-center py-16 text-gray-400 dark:text-gray-600 text-sm">
              No group outputs available yet. Run the workflow first.
            </div>
          )}
          {groupOutputs.map((group, i) => (
            <GroupOutputCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupOutputCard({ group, index }: { group: any; index: number }) {
  const [agentsOpen, setAgentsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { editedOutputs, setEditedOutput } = useWorkflowStore();
  const displayContent = editedOutputs[group.id] ?? group.synthesis;

  return (
    <div className="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden">
      {/* Group header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#2945D1]/5 to-[#A259FF]/5 dark:from-[#2945D1]/10 dark:to-[#A259FF]/10">
        <span className="w-6 h-6 rounded-full bg-[#2945D1] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
          {index + 1}
        </span>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex-1">{group.name}</h3>
        <span className="text-[10px] font-medium text-[#2945D1] dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
          Phase
        </span>
      </div>

      {/* Synthesis output — with edit toggle (Task 5) */}
      <div className="px-4 py-3 bg-white dark:bg-zinc-900 border-b border-gray-50 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            🔗 {group.outputName}
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[11px] text-blue-500 hover:text-blue-700 font-medium transition"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
        {isEditing ? (
          <div data-color-mode="light">
            <MDEditor
              value={displayContent}
              onChange={(val) => setEditedOutput(group.id, val ?? '')}
              height={200}
            />
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 text-[13px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: displayContent || '<span class="text-gray-400 italic">No output yet</span>' }}
          />
        )}
      </div>

      {/* Individual agent results (collapsible) */}
      {group.agents.length > 0 && (
        <div className="bg-gray-50 dark:bg-zinc-950">
          <button
            onClick={() => setAgentsOpen(o => !o)}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
          >
            {agentsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {group.agents.length} agent result{group.agents.length !== 1 ? 's' : ''}
          </button>
          {agentsOpen && (
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {group.agents.map((agent: any, idx: number) => (
                <div key={idx} className="px-4 py-3">
                  <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-1.5">
                    {agent.name}
                  </p>
                  <div
                    className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: agent.content }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
