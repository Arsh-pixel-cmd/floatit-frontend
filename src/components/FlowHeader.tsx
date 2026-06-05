import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';
import { ROUTES } from '../lib/routes';


const FlowHeader = () => {
  const { viewMode } = useBuilderStore();



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



{/* Right */}
        <div className="flex items-center justify-end gap-4 flex-1" />
      </header>


    </>
  );
};

export default FlowHeader;

