import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, PlusSquare, Trash2, Sun, LogOut, Delete, Bell, Pencil } from 'lucide-react';
import { useAuth } from '../lib/auth';

export default function ProjectMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowEditMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Get user display info from auth context
  const userName = user?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <div 
        className="flex items-center gap-1.5 cursor-pointer bg-orange-50 hover:bg-orange-100 p-1 pr-1.5 rounded-lg transition" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-7 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white font-bold text-xs">{userInitial}</div>
        <ChevronDown size={14} className="text-orange-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-1.5 z-50">
          <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition">
            New File <PlusSquare size={14} className="text-gray-900" />
          </button>
          
          <div className="relative px-1.5 py-0.5">
            <button 
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[13px] font-medium rounded-lg transition ${showEditMenu ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50'}`}
              onMouseEnter={() => setShowEditMenu(true)}
              onClick={() => setShowEditMenu(!showEditMenu)}
            >
              Edit <ChevronRight size={14} className={showEditMenu ? "text-orange-500" : "text-gray-400"} />
            </button>
            
            {showEditMenu && (
              <div 
                className="absolute top-0 left-full ml-1 w-48 bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-1.5 z-50"
                onMouseLeave={() => setShowEditMenu(false)}
              >
                {[
                  { label: 'Undo', shortcut: 'Ctrl+Z' },
                  { label: 'Redo', shortcut: 'Ctrl+Y' },
                  { label: 'Paste', shortcut: 'Ctrl+V' },
                  { label: 'Duplicate', shortcut: 'Ctrl+D' },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition">
                    {item.label} <span className="text-gray-400 text-[10px]">{item.shortcut}</span>
                  </button>
                ))}
                <button className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition">
                  Delete <Delete size={14} className="text-gray-400" />
                </button>
                <div className="h-px bg-gray-100 my-1"></div>
                {[
                  { label: 'Find', shortcut: 'Ctrl+F' },
                  { label: 'Select all', shortcut: 'Ctrl+A' },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition">
                    {item.label} <span className="text-gray-400 text-[10px]">{item.shortcut}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
            onClick={() => {
              setIsOpen(false);
              setShowProfileModal(true);
            }}
          >
            Profile <ChevronRight size={14} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition">
            Export
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowProfileModal(false)}>
          <div className="bg-white w-[280px] rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-1.5 relative z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-3">
              <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-sm">{userInitial}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-medium text-gray-900">{userName}</h3>
                  <Pencil size={12} className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[11px] text-gray-500">{userEmail}</p>
                  <Pencil size={12} className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </div>
            </div>
            
            <div className="h-px bg-gray-100 my-1"></div>
            
            <div className="px-1">
              <button 
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-gray-50 transition"
                onClick={() => setAppearanceOpen(!appearanceOpen)}
              >
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 font-medium">
                  <Sun size={14} className="text-gray-400" /> Appearance
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${appearanceOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {appearanceOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1 mb-1 relative">
                  <div className="absolute left-[17px] top-0 bottom-0 w-px bg-gray-200"></div>
                  <button className="block w-full text-left text-[11px] text-gray-500 font-medium hover:text-gray-900 transition py-1">Light</button>
                  <button className="block w-full text-left text-[11px] text-gray-500 font-medium hover:text-gray-900 transition py-1">Dark</button>
                  <button className="block w-full text-left text-[11px] text-gray-500 font-medium hover:text-gray-900 transition py-1">System theme</button>
                </div>
              )}
            </div>

            <div className="px-1 mt-1">
              <div className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg">
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 font-medium">
                  <Bell size={14} className="text-gray-400" /> Notifications
                </div>
                <div className="w-7 h-4 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="h-px bg-gray-100 my-1"></div>

            <div className="px-1">
              <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition text-[12px] text-gray-600 font-medium">
                <LogOut size={14} className="text-gray-400" /> Log Out
              </button>
            </div>

            <div className="px-1 mb-1">
              <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-red-50 transition text-[12px] text-red-500 font-medium">
                <Trash2 size={14} className="text-red-400" /> Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
