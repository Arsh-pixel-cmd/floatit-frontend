import React from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library } from 'lucide-react';
import ProjectMenu from './ProjectMenu';
import { useWorkflowStore } from '../lib/store';
export default function CanvasSidebar({ isSidebarOpen, setIsSidebarOpen, setCurrentPage, mode }) {
  const { animationState, flowTitle } = useWorkflowStore();
  
  const currentPhase = animationState?.phase || 'discover';
  const phases = ['discover', 'define', 'develop', 'deliver'];
  const currentIndex = phases.indexOf(currentPhase);

  const getPhaseStatus = (phaseName) => {
    const phaseIndex = phases.indexOf(phaseName);
    if (phaseIndex < currentIndex) return { status: 'Completed', color: 'text-green-500', dot: 'bg-green-500 border-none' };
    if (phaseIndex === currentIndex) return { status: 'In Progress...', color: 'text-orange-500', dot: 'bg-orange-500 border-none' };
    return { status: 'Upcoming', color: 'text-gray-400', dot: 'border-2 border-gray-300 bg-transparent' };
  };

  return (
    <>
      {/* Closed Sidebar Floating Button */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-20 p-2.5 bg-white dark:bg-[#1e1e24] rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          title="Expand sidebar"
        >
          <PanelLeft size={20} />
        </button>
      )}

      <div className={`absolute top-4 bottom-4 w-[180px] bg-white dark:bg-[#1e1e24] rounded-xl border border-gray-200 dark:border-zinc-800 p-3 flex flex-col z-30 transition-all duration-300 shadow-xl ${isSidebarOpen ? 'left-4' : '-left-[200px]'}`}>
        <div className="flex items-center justify-between mb-3 px-1">
          <ProjectMenu />
          <PanelLeftClose size={18} className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition" onClick={() => setIsSidebarOpen(false)} />
        </div>
        <p className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-4 px-1">{flowTitle || 'Untitled Project'}</p>
        <nav className="space-y-0.5 mb-6">
          {[
            { name: 'Home', icon: Home, page: 'home' },
            { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
            { name: 'Projects', icon: Folder, page: 'projects' },
            { name: 'Templates', icon: LayoutGrid, page: 'templates' },
            ...(mode === 'template' ? [{ name: 'Templates', icon: LayoutGrid, page: 'templateCanvas' }] : []),
            { name: 'Library', icon: Library, page: 'library' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(item.page)}
              className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
              <item.icon size={16} /> {item.name}
            </button>
          ))}
        </nav>

        {mode === 'template' && (
          <div className="px-1">
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-3">Project Pipeline</p>
            <div className="space-y-3">
              {['discover', 'define', 'develop', 'deliver'].map((p, i) => {
                const { status, color, dot } = getPhaseStatus(p);
                const isLast = i === 3;
                return (
                  <div key={p} className="flex items-start gap-2.5">
                    <div className="flex flex-col items-center mt-0.5">
                      <div className={`w-3 h-3 rounded-full ${dot}`}></div>
                      {!isLast && <div className="w-px h-6 bg-gray-200 dark:bg-zinc-800 mt-1"></div>}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900 dark:text-gray-100 leading-tight capitalize">{p}</p>
                      <p className={`text-[10px] ${color}`}>{status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
