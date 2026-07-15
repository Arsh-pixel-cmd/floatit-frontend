import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, PlusSquare, Trash2, Sun, LogOut, Delete, Bell, Pencil, Key } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';
import { CommandHistory } from '../lib/blocks/CommandHistory';
import { DeleteBlockCommand } from '../lib/blocks/commands/DeleteBlockCommand';
import { DeleteAnnotationCommand } from '../lib/blocks/commands/DeleteAnnotationCommand';
import { useThemeStore } from '../lib/themeStore';
import { apiProxy } from '../lib/http/AuthenticatedApiProxy';
import toast from 'react-hot-toast';

export default function ProjectMenu() {
  const { user, signOut } = useAuth();
  const { 
    selectedElementId, deleteBlock, deleteStickyNote, deleteTextLabel
  } = useBuilderStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const menuRef = useRef(null);
  const { theme, setTheme } = useThemeStore();
  const { saveAsTemplate } = useBuilderStore();
  const { flowTitle } = useWorkflowStore();
  const [apiKey, setApiKey] = useState('');
  const [savingKey, setSavingKey] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim() || !user?.id) return;
    setSavingKey(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');
      await apiProxy.post(`${API_BASE}/api/keys/save`, { userId: user.id, apiKey: apiKey.trim() });
      toast.success('API key saved!');
      setApiKey('');
      setShowApiKeyInput(false);
    } catch (err) {
      toast.error('Failed to save API key');
    } finally {
      setSavingKey(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowEditMenu(false);
      }
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        CommandHistory.undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        CommandHistory.redo();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleDelete = () => {
    if (!selectedElementId) return;
    if (selectedElementId.startsWith('sticky-')) {
      CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('sticky-', ''), 'sticky'));
    } else if (selectedElementId.startsWith('text-')) {
      CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('text-', ''), 'text'));
    } else if (selectedElementId.startsWith('image-')) {
      CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('image-', ''), 'image'));
    } else {
      const store = useBuilderStore.getState();
      const isBlock = store.blocks.some(b => b.id === selectedElementId);
      if (isBlock) {
        CommandHistory.execute(new DeleteBlockCommand(selectedElementId));
      }
    }
    setIsOpen(false);
  };

  const handleExport = () => {
    const store = useBuilderStore.getState();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      blocks: store.blocks,
      connections: store.connections,
      groups: store.groups,
      stickyNotes: store.stickyNotes,
      textLabels: store.textLabels,
      drawLines: store.drawLines
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `floatit_workflow_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setIsOpen(false);
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
                  { label: 'Undo', shortcut: 'Ctrl+Z', action: () => CommandHistory.undo() },
                  { label: 'Redo', shortcut: 'Ctrl+Y', action: () => CommandHistory.redo() },
                  { label: 'Paste', shortcut: 'Ctrl+V', action: () => alert('Paste action is stubbed') },
                  { label: 'Duplicate', shortcut: 'Ctrl+D', action: () => alert('Duplicate action is stubbed') },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      if (item.action) item.action();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    {item.label} <span className="text-gray-400 text-[10px]">{item.shortcut}</span>
                  </button>
                ))}
                <button 
                  onClick={handleDelete}
                  className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Delete <Delete size={14} className="text-gray-400" />
                </button>
                <div className="h-px bg-gray-100 my-1"></div>
                {[
                  { label: 'Find', shortcut: 'Ctrl+F', action: () => alert('Find action is stubbed') },
                  { label: 'Select all', shortcut: 'Ctrl+A', action: () => alert('Select all action is stubbed') },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      if (item.action) item.action();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
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
          
          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Export
          </button>

          {/* Task 8: Save as Template */}
          <button
            className="w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
            onClick={async () => {
              setIsOpen(false);
              const name = window.prompt('Template name:', flowTitle || 'My Template');
              if (name) {
                await saveAsTemplate(name);
                toast.success('Saved as template!');
              }
            }}
          >
            Save as Template
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
                  {['light', 'dark', 'system'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`block w-full text-left text-[11px] font-medium hover:text-gray-900 transition py-1 capitalize ${theme === t ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                      {t === 'system' ? 'System theme' : t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Task 6: API Key Section */}
            <div className="px-1 mt-1">
              <button
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-gray-50 transition"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              >
                <div className="flex items-center gap-2.5 text-[12px] text-gray-600 font-medium">
                  <Key size={14} className="text-gray-400" /> Add API Key
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showApiKeyInput ? 'rotate-180' : ''}`} />
              </button>
              {showApiKeyInput && (
                <div className="pl-6 pr-2 py-2 space-y-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2 outline-none
                      focus:border-blue-400 transition bg-transparent text-gray-800"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    disabled={savingKey || !apiKey.trim()}
                    className="w-full text-[11px] font-semibold text-white bg-[#2945D1] rounded-lg py-1.5
                      hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {savingKey ? 'Saving...' : 'Save Key'}
                  </button>
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
