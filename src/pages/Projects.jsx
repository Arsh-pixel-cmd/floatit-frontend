import React from 'react';
import { Search, Plus, List, LayoutGrid } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { dbAdapter } from '../lib/database';
import { useAuth } from '../lib/auth';
import { useBuilderStore } from '../lib/builderStore';

export default function Projects({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
  const { user } = useAuth();
  const resetCanvas = useBuilderStore(state => state.resetCanvas);

  const handleCreateProject = async () => {
    const { data } = await dbAdapter.createSequence({
      title: 'Untitled Project',
      status: 'active',
      user_id: user?.id,
      agents_active: 0,
      total_agents: 0,
      is_starred: false,
      updated_at: new Date().toISOString()
    });
    if (data) {
      localStorage.setItem('active_sequence_id', data.id);
      resetCanvas();
      setCurrentPage('newProject');
    }
  };

  return (
        <div className="min-h-screen bg-[#f5f3f7] text-gray-900 font-sans flex flex-col">
          {/* Header */}
          <header className="h-[56px] bg-white border-b border-gray-200 flex items-center px-6">
            <div className="text-xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} activePage="projects" />

            {/* Main Content */}
            <div className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-[200px]' : 'ml-16'}`}>
              {/* Search + New Project */}
              <div className="flex justify-between items-center mb-6 gap-4">
                <div className="relative flex-1 max-w-[700px]">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleCreateProject} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition">
                  <Plus size={14} /> New project
                </button>
              </div>

              {/* Tabs + View Toggle */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex gap-0">
                  <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-medium">Recent</button>
                  <button className="px-4 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-700 transition">My Projects</button>
                  <button className="px-4 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-700 transition">Team Projects</button>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded bg-gray-100 text-gray-600">
                    <LayoutGrid size={14} />
                  </button>
                  <button className="p-1.5 rounded text-gray-400 hover:bg-gray-100 transition">
                    <List size={14} />
                  </button>
                </div>
              </div>

              {/* Build your own project card */}
              <div onClick={handleCreateProject} className="w-[220px] cursor-pointer group">
                <div className="h-[160px] bg-[#e8e5e0] rounded-xl mb-2 flex items-center justify-center hover:bg-[#ddd9d3] transition">
                  <Plus size={40} className="text-white/80" />
                </div>
                <h3 className="font-semibold text-xs text-gray-900">Build your own project</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">personalize your space</p>
              </div>
            </div>
          </div>
        </div>
  );
}
