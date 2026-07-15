import React from 'react';
import { Search, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { dbAdapter } from '../lib/database';
import { useAuth } from '../lib/auth';
import { useBuilderStore } from '../lib/builderStore';

export default function Templates({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
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
        <div className="min-h-screen bg-[#faf5ff] text-gray-900 font-sans flex flex-col">
          <header className="h-[50px] bg-white border-b border-gray-200 flex items-center px-6">
            <div className="text-xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
          </header>
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} activePage="templates" />
            <div className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-[200px]' : 'ml-16'}`}>
              <div className="flex justify-between items-center mb-8 gap-4">
                <div className="relative flex-1 max-w-[600px]">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleCreateProject} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition">
                  <Plus size={14} /> New project
                </button>
              </div>
              <h2 className="text-sm font-bold mb-4 text-gray-900">Built-in Templates</h2>
              <div onClick={() => setCurrentPage('templateCanvas')} className="bg-white p-3 rounded-xl border border-gray-200 w-[220px] mb-8 shadow-sm cursor-pointer hover:shadow-md transition">
                <div className="h-32 bg-gray-800 rounded-lg mb-3"></div>
                <h3 className="font-semibold text-xs">Double Diamond</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Design Framework • 16 Agents</p>
              </div>
              <h2 className="text-sm font-bold mb-4 text-gray-900">Your Templates</h2>
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl w-[220px] h-[180px] flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition">
                <Plus size={30} className="mb-2" />
                <p className="text-xs font-semibold text-gray-600">Create your own template</p>
                <p className="text-[10px] mt-0.5">Customize Framework</p>
              </div>
            </div>
          </div>
        </div>
  );
}
