import React from 'react';
import { Activity, Paperclip, Folder, X, Play, FileText, Key } from 'lucide-react';
import type { ApiKeyModalType, KeyInfoState, SequenceAttachment, GraphStatus, TokenLimitModalState } from '../../types/engine';
import { WORKFLOW_PHASES } from '../../data/schema';
import { useBuilderStore } from '../../lib/builderStore';

interface PromptBarProps {
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  projectAttachment: SequenceAttachment | null;
  setProjectAttachment: (attachment: SequenceAttachment | null) => void;
  graphStatus: GraphStatus;
  addToast: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
  runFullPipeline: () => void;
  showKeyModal: boolean;
  setShowKeyModal: (show: boolean) => void;
  setKeyModalType: (type: ApiKeyModalType) => void;
  keyInfo: KeyInfoState;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  completedPhases: string[];
  runningPhaseId: string | null;
  setPhaseOutputModal: (phaseId: string | null) => void;
  runPhase?: (phaseId: string) => void;
  tokenLimitModal: TokenLimitModalState | null;
}

export default function PromptBar({
  projectPrompt,
  setProjectPrompt,
  projectAttachment,
  setProjectAttachment,
  graphStatus,
  addToast,
  runFullPipeline,
  setShowKeyModal,
  setKeyModalType,
  keyInfo,
  fileInputRef,
  completedPhases,
  runningPhaseId,
  setPhaseOutputModal,
  runPhase = () => {},
  tokenLimitModal,
}: PromptBarProps) {
  const { groups, runningGroupId, completedGroupIds } = useBuilderStore();
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-8 pointer-events-none">
      <div className="flex flex-col items-center gap-2 pointer-events-auto bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#46B1FF] transition-colors">
              <Activity size={18} />
            </div>
            <input
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              placeholder="Orchestrate your objective... (e.g. Design a technical whitepaper for a DeFi protocol)"
              className="w-full bg-black/60 border border-white/5 rounded-[20px] py-4 pl-12 pr-6 outline-none focus:border-[#46B1FF]/40 transition-all text-white text-sm shadow-inner placeholder:text-slate-600 font-secondary"
              disabled={graphStatus === 'running'}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.json,.pdf"
              className="hidden"
              title="Upload attachment"
              aria-label="Upload attachment"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev: any) => {
                  const content = ev.target.result as string;
                  setProjectAttachment({ name: file.name, content, type: file.type });

                  let extractedPrompt = '';
                  if (file.type === 'application/json' || file.name.endsWith('.json')) {
                    try {
                      const json = JSON.parse(content);
                      extractedPrompt = json.title || json.description || json.prompt || json.name || '';
                      if (!extractedPrompt && typeof json === 'object') {
                        extractedPrompt = JSON.stringify(json).substring(0, 200);
                      }
                    } catch {
                      extractedPrompt = content.split('\n').find((l: string) => l.trim().length > 0) || '';
                    }
                  } else {
                    const lines = content
                      .split('\n')
                      .map((l: string) => l.replace(/^#+\s*/, '').trim())
                      .filter((l: string) => l.length > 0);
                    extractedPrompt = lines[0] || '';
                  }

                  if (extractedPrompt) {
                    setProjectPrompt(extractedPrompt.substring(0, 200));
                  }

                  addToast('success', `File "${file.name}" loaded — prompt auto-filled from content`);
                };
                reader.readAsText(file);
                e.target.value = '';
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={graphStatus === 'running'}
              className="w-14 h-14 rounded-[20px] bg-white/[0.03] border border-white/5 text-slate-400 hover:text-[#46B1FF] hover:border-[#46B1FF]/30 transition-all flex items-center justify-center group"
              title="Attach context (.txt, .md, .pdf)"
              aria-label="Attach context file"
            >
              <Paperclip size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full mt-3 px-1 justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${keyInfo.activeSource === 'project'
                ? 'bg-[#A259FF]/10 border-[#A259FF]/30 text-[#A259FF] shadow-[0_0_15px_rgba(162,89,255,0.1)]'
                : keyInfo.activeSource === 'global'
                  ? 'bg-[#46B1FF]/10 border-[#46B1FF]/30 text-[#46B1FF]'
                  : 'bg-white/5 border-white/10 text-slate-500'
              }`}
              onClick={() => {
                setKeyModalType('NO_KEY');
                setShowKeyModal(true);
              }}
            >
              <Key size={12} />
              {keyInfo.activeSource === 'project'
                ? `Project Key (••••${keyInfo.project.lastFour ?? '----'})`
                : keyInfo.activeSource === 'global'
                  ? `Global Key (••••${keyInfo.global.lastFour ?? '----'})`
                  : 'No API Key Configured'}
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Priority: Project Key &gt; Global Key
            </div>
          </div>

          {projectAttachment && (
            <div className="flex items-center gap-3 bg-[#46B1FF]/10 border-[#46B1FF]/20 text-[#46B1FF] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider animate-fade-in">
              <Folder size={14} />
              {projectAttachment.name}
              <button
                onClick={() => setProjectAttachment(null)}
                className="ml-2 hover:text-white transition-colors"
                title="Remove attachment"
                aria-label="Remove attachment"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 w-full px-1 mb-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pipeline Execution</h3>
          <button
            onClick={() => {
              runFullPipeline();
            }}
            disabled={graphStatus === 'running' || !projectPrompt || groups.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-[#A259FF] hover:border-[#A259FF] transition-all text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
            title="Run all phases automatically"
          >
            {graphStatus === 'running' ? (
              <><div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Orchestrating...</>
            ) : (
              <><Play size={12} fill="currentColor" /> Run</>
            )}
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="w-full py-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.01]">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider text-center">
              No groups configured
            </p>
            <p className="text-[10px] text-slate-600 mt-1 text-center font-medium">
              Select multiple agents on the canvas (Shift + Click) and click "Create Group" to enable phase execution.
            </p>
          </div>
        ) : (
          <div 
            className="w-full grid gap-2"
            style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}
          >
            {[...groups].sort((a, b) => a.order - b.order).map((group, idx) => {
              const isCompleted = completedGroupIds.includes(group.id);
              const isRunning = runningGroupId === group.id;

              const groupColors = [
                { accent: '#A259FF', glow: 'rgba(162,89,255,0.15)' },
                { accent: '#DEF767', glow: 'rgba(222,247,103,0.15)' },
                { accent: '#46B1FF', glow: 'rgba(70,177,255,0.15)' },
                { accent: '#CEA3FF', glow: 'rgba(206,163,255,0.15)' }
              ];
              const color = groupColors[idx % groupColors.length]!;

              return (
                <div
                  key={group.id}
                  className="flex flex-col gap-1.5 rounded-2xl border p-3 transition-all duration-300 relative group-phase-box"
                  style={{
                    borderColor: isCompleted ? color.accent + '60' : isRunning ? color.accent + '40' : 'rgba(255,255,255,0.05)',
                    background: isCompleted ? color.glow : isRunning ? color.glow : 'rgba(255,255,255,0.02)',
                    boxShadow: isRunning ? `0 0 20px ${color.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[120px]" style={{ color: color.accent }} title={group.name}>
                      {group.name}
                    </span>
                    {isCompleted && <span className="text-[10px] text-green-400 font-bold">✓</span>}
                    {isRunning && <div className="w-2 h-2 rounded-full animate-ping" style={{ background: color.accent }} />}
                  </div>
                  {isCompleted ? (
                    <button
                      onClick={() => setPhaseOutputModal(group.outputBlockId)}
                      className="w-full py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1 hover:opacity-85 pointer-events-auto"
                      style={{
                        background: `${color.accent}10`,
                        color: color.accent,
                        border: `1px solid ${color.accent}30`
                      }}
                    >
                      <FileText size={9} /> View Report
                    </button>
                  ) : (
                    <button
                      onClick={() => runPhase(group.id)}
                      disabled={isRunning || graphStatus === 'running' || !projectPrompt}
                      className="w-full py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 pointer-events-auto"
                      style={{
                        background: !projectPrompt ? 'rgba(255,255,255,0.03)' : `${color.accent}20`,
                        color: !projectPrompt ? '#475569' : color.accent,
                        border: `1px solid ${color.accent}30`
                      }}
                    >
                      {isRunning ? (
                        <><div className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" /> Running</>
                      ) : (
                        <><Play size={9} fill="currentColor" /> Run</>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
