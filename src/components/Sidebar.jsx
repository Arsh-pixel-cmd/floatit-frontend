import React from 'react';
import { PanelLeft, PanelLeftClose, Home, LayoutDashboard, Folder, LayoutGrid, Library } from 'lucide-react';
import ProjectMenu from './ProjectMenu';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, setCurrentPage, activePage }) {
  return (
    <>
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-20 p-2.5 bg-white rounded-xl shadow-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all"
          title="Expand sidebar"
        >
          <PanelLeft size={20} />
        </button>
      )}
      
      <div className={`absolute top-4 bottom-4 w-[180px] bg-white rounded-xl border border-gray-200 p-3 flex flex-col z-30 transition-all duration-300 shadow-xl ${isSidebarOpen ? 'left-4' : '-left-[200px]'}`}>
        <div className="flex items-center justify-between mb-5 px-1">
          <ProjectMenu />
          <PanelLeftClose size={18} className="text-gray-400 cursor-pointer hover:text-gray-600 transition" onClick={() => setIsSidebarOpen(false)} />
        </div>
        <p className="text-xs font-bold text-gray-900 mb-4 px-1">Project name</p>
        <nav className="space-y-0.5">
          {[
            { name: 'Home', icon: Home, page: 'home' },
            { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
            { name: 'Projects', icon: Folder, page: 'projects' },
            { name: 'Templates', icon: LayoutGrid, page: 'templates' },
            { name: 'Library', icon: Library, page: 'library' }
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-[13px] font-medium transition ${item.page === activePage ? 'text-orange-500 border-l-[3px] border-orange-500 bg-orange-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>
              <item.icon size={16} /> {item.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
