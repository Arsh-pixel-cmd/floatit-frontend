import React, { useState, useEffect } from 'react';
import { Search, Plus, List, LayoutGrid } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { dbAdapter } from '../lib/database';
import { useAuth } from '../lib/auth';
import { useBuilderStore } from '../lib/builderStore';

export default function Dashboard({ isSidebarOpen, setIsSidebarOpen, setCurrentPage, dashboardView, setDashboardView }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const resetCanvas = useBuilderStore(state => state.resetCanvas);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const { data } = await dbAdapter.fetchSequences();
      if (data) setProjects(data);
      setLoading(false);
    };
    if (user) loadProjects();
  }, [user]);

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

  const handleOpenProject = (id) => {
    localStorage.setItem('active_sequence_id', id);
    setCurrentPage('newProject');
  };

  return (
        <div className="min-h-screen bg-[#f5f3f7] text-gray-900 font-sans flex flex-col">
          {/* Header */}
          <header className="h-[56px] bg-white border-b border-gray-200 flex items-center px-6">
            <div className="text-xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} activePage="dashboard" />

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

              {/* Templates Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                <h2 className="text-sm font-bold mb-4 text-gray-900">Templates</h2>
                <div className="flex gap-4">
                  {/* Double Diamond Template */}
                  <div onClick={() => setCurrentPage('templateCanvas')} className="w-[200px] flex-shrink-0 cursor-pointer group">
                    <div className="h-[130px] bg-gray-900 rounded-lg mb-2 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-70">
                        <svg width="160" height="90" viewBox="0 0 160 90">
                          <path d="M10,45 L40,15 L70,45 L40,75 Z" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.6"/>
                          <path d="M50,45 L80,15 L110,45 L80,75 Z" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6"/>
                          <line x1="40" y1="45" x2="80" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="3,3"/>
                          <line x1="80" y1="45" x2="120" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="3,3"/>
                          <circle cx="10" cy="45" r="2" fill="#6366f1"/>
                          <circle cx="40" cy="45" r="2" fill="#22d3ee"/>
                          <circle cx="80" cy="45" r="2" fill="#f59e0b"/>
                          <circle cx="110" cy="45" r="2" fill="#22c55e"/>
                          <text x="10" y="82" fill="#64748b" fontSize="6">Discover</text>
                          <text x="42" y="82" fill="#64748b" fontSize="6">Define</text>
                          <text x="72" y="82" fill="#64748b" fontSize="6">Develop</text>
                          <text x="105" y="82" fill="#64748b" fontSize="6">Deliver</text>
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-semibold text-xs text-gray-900">Double Diamond Template</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Inbuilt</p>
                  </div>

                  {/* Problem Statement Template */}
                  <div className="w-[200px] flex-shrink-0 cursor-pointer group">
                    <div className="h-[130px] bg-gray-50 rounded-lg mb-2 overflow-hidden relative border border-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-2 p-4">
                          {['#f97316','#3b82f6','#22c55e','#eab308','#ef4444','#8b5cf6','#ec4899','#14b8a6','#f97316','#3b82f6','#22c55e','#eab308','#ef4444','#8b5cf6','#ec4899','#14b8a6','#f97316','#3b82f6','#22c55e','#eab308'].map((color, i) => (
                            <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-xs text-gray-900">Problem Statement Template</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Created by you</p>
                  </div>

                  {/* Create your own template */}
                  <div className="w-[200px] flex-shrink-0 cursor-pointer group">
                    <div className="h-[130px] bg-gray-50 rounded-lg mb-2 overflow-hidden relative border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-blue-400 transition">
                      <Plus size={36} className="text-gray-300 group-hover:text-blue-400 transition" />
                    </div>
                    <h3 className="font-semibold text-xs text-gray-900">Create your own template</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5"></p>
                  </div>
                </div>
              </div>

              {/* Tabs + View Toggle */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex gap-0">
                  <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-medium">Recent</button>
                  <button className="px-4 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-700 transition">My Projects</button>
                  <button className="px-4 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-700 transition">Team Projects</button>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setDashboardView('grid')} className={`p-1.5 rounded transition ${dashboardView === 'grid' ? 'bg-gray-100 text-gray-600' : 'text-gray-400 hover:bg-gray-100'}`}>
                    <LayoutGrid size={14} />
                  </button>
                  <button onClick={() => setDashboardView('list')} className={`p-1.5 rounded transition ${dashboardView === 'list' ? 'bg-gray-100 text-gray-600' : 'text-gray-400 hover:bg-gray-100'}`}>
                    <List size={14} />
                  </button>
                </div>
              </div>

              {/* Grid View */}
              {dashboardView === 'grid' && (
                <div className="grid grid-cols-4 gap-4">
                  {projects.map((project, i) => (
                    <div key={i} onClick={() => handleOpenProject(project.id)} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group">
                      <div className="h-[140px] bg-gray-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950"></div>
                        <div className="absolute inset-0 p-4 flex items-center justify-center">
                          <p className="text-white/70 text-[11px] font-medium text-center whitespace-pre-line leading-relaxed">{project.title}</p>
                        </div>
                        <div className="absolute top-2 left-2 right-2 flex gap-1">
                          <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                          <div className="h-1 w-6 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="flex gap-1">
                            <div className="h-1 w-8 bg-white/10 rounded-full"></div>
                            <div className="h-1 w-12 bg-white/10 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-xs text-gray-900">{project.title}</h3>
                            <p className="text-[10px] text-gray-400 mt-0.5">{new Date(project.updated_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center -space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center">
                              <span className="text-[7px] text-white font-bold">A</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                              <span className="text-[7px] text-white font-bold">K</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                              <span className="text-[7px] text-gray-500 font-bold">+2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && !loading && (
                    <div className="col-span-4 py-12 text-center text-gray-500 text-sm">
                      No projects found. Create a new one!
                    </div>
                  )}
                </div>
              )}

              {/* List View */}
              {dashboardView === 'list' && (
                <div>
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr] px-4 py-2.5 text-[11px] font-medium text-gray-400">
                    <span>Name</span>
                    <span>Last modified</span>
                    <span>Created</span>
                    <span className="text-right">Active in file</span>
                  </div>
                  {/* Table Rows */}
                  <div className="space-y-1">
                    {projects.map((project, i) => (
                      <div key={i} onClick={() => handleOpenProject(project.id)} className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center bg-white rounded-lg px-4 py-3 border border-gray-100 hover:shadow-sm transition cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                          </div>
                          <span className="text-xs font-medium text-gray-900">{project.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(project.updated_at).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">{new Date(project.created_at || project.updated_at).toLocaleDateString()}</span>
                        <div className="flex items-center justify-end -space-x-1.5">
                          <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">A</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">K</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">S</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-[8px] text-gray-500 font-bold">+2</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && !loading && (
                      <div className="py-8 text-center text-gray-500 text-sm">
                        No projects found. Create a new one!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  );
}
