import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GitMerge, LayoutGrid, Play, Loader2, LayoutDashboard } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';
import { ROUTES } from '../lib/routes';
import FlowHeaderViewToggle from './FlowHeader/FlowHeaderViewToggle';
import FlowHeaderValidationModal from './FlowHeader/FlowHeaderValidationModal';

const FlowHeader = () => {
  const { viewMode, setViewMode, blocks } = useBuilderStore();
  const [isDeploying, setIsDeploying] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const handleInitializeEngine = async () => {
    // ── BUILDER VALIDATION: Require exactly 8 nodes, each with name + description ──
    const errors: string[] = [];

    if (blocks.length !== 8) {
      errors.push(`You have ${blocks.length} node${blocks.length !== 1 ? 's' : ''}. Exactly 8 agent nodes are required.`);
    }

    blocks.forEach((block: any, idx: number) => {
      const label = block.name && block.name.trim() !== '' && block.name !== 'New Agent' ? block.name : null;
      const desc = block.description && block.description.trim() !== '' && block.description !== 'Describe the agent objective...' ? block.description : null;

      if (!label) {
        errors.push(`Node ${idx + 1}: Missing a custom agent name.`);
      }
      if (!desc) {
        errors.push(`Node ${idx + 1}${label ? ` (${label})` : ''}: Missing agent description.`);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationPopup(true);
      return;
    }

    setIsDeploying(true);

    // Zoom out canvas elements visually
    const canvasRef = document.getElementById('builder-canvas-area');
    if (canvasRef) canvasRef.classList.add('scale-75', 'opacity-0', 'transition-all', 'duration-1000');

    // Gradient Pulse transition effect portal hook
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = "fixed inset-0 z-[150] bg-gradient-to-r from-cyan-500/0 via-purple-500/20 to-cyan-500/0 backdrop-blur-3xl animate-fade-in pointer-events-none flex flex-col items-center justify-center";
    transitionOverlay.innerHTML = `<h1 class="text-4xl font-display font-black text-white mix-blend-overlay tracking-widest uppercase shadow-black drop-shadow-xl animate-pulse">Compiling Neural Path...</h1>`;
    document.body.appendChild(transitionOverlay);

    // Save configuration — MUST await before switching view
    const templateName = blocks.length > 0 ? blocks[0].name : "Custom Builder Flow";
    const deployedId = await useBuilderStore.getState().deployProject(templateName);

    // Remove Overlay
    document.body.removeChild(transitionOverlay);
    setIsDeploying(false);

    // Clear styles
    if (canvasRef) canvasRef.classList.remove('scale-75', 'opacity-0');

    if (!deployedId) {
      alert('Compilation failed. Please try again or add blocks first.');
      return;
    }

    // Only switch after store has deployedTemplateId confirmed
    setViewMode('pipeline');
  };

  const navigate = useNavigate();

  return (
    <>
      <header
        className="bg-black/40 backdrop-blur-3xl flex items-center px-8 py-5 z-40 relative border-b border-white/[0.03] shadow-2xl"
      >
        {/* Left: Navigation & Logo */}
        <div className="flex items-center gap-6 flex-1 min-w-0">

          {/* Return to Hub */}
          <Link
            to={ROUTES.dashboard}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#A259FF]/50 hover:text-white hover:bg-white/10 shadow-lg text-[11px] font-black uppercase tracking-wider group"
            title="Return to Dashboard"
            aria-label="Return to Dashboard"
          >
            <LayoutDashboard size={16} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>

          {/* Logo and Title */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.landing)}
            className="flex items-center gap-6 flex-1 min-w-0 text-left focus:outline-none"
          >
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 flex-shrink-0">
              <div className="w-20 h-20 rounded-[14px] flex items-center justify-center ">
                <img src="/o.svg" alt="Logo" className="w-25 h-25 object-contain" />
              </div>
              {/* <div>
                <h1 className="text-[18px] font-black tracking-tight text-white font-display leading-tight">
                  Float<span className="text-[#EB9A21]">it</span>
                </h1>
              </div> */}
            </div>

            <div className="flex items-center group flex-1 min-w-0 mr-4">
              <input
                type="text"
                value={useWorkflowStore(state => state.flowTitle) || ''}
                onChange={(e) => useWorkflowStore.getState().setFlowTitle(e.target.value)}
                placeholder="Untitled Flow"
                className="bg-transparent border-none outline-none text-sm font-medium text-zinc-300 placeholder-zinc-600 focus:text-white transition-colors w-full min-w-0 text-ellipsis overflow-hidden whitespace-nowrap"
              />
            </div>
          </button>
        </div>

        {/* Center: View Toggles */}
        <FlowHeaderViewToggle viewMode={viewMode} onChange={setViewMode} />

        {/* Right: Action */}
        <div className="flex items-center justify-end gap-4 flex-1">
          {viewMode === 'builder' && (
            <button
              onClick={handleInitializeEngine}
              disabled={isDeploying}
              className={`bg-gradient-to-r from-[#A259FF] to-[#6c39b3] text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(162,89,255,0.4)] ${isDeploying ? 'opacity-80 scale-95 cursor-wait' : 'hover:scale-105'}`}
            >
              {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {isDeploying ? 'Deploying...' : 'Initialize Engine'}
            </button>
          )}
        </div>
      </header>

      {showValidationPopup && (
        <FlowHeaderValidationModal
          validationErrors={validationErrors}
          onClose={() => setShowValidationPopup(false)}
        />
      )}
    </>
  );
};

export default FlowHeader;

