import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Star, LayoutGrid, Folder, Trash2, User, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../lib/routes';
import { dbAdapter } from '../lib/database';
import { useAuth } from '../lib/auth';
import CreateSequenceModal from './modals/CreateSequenceModal';

// Brand color palette for auto-assigning folder colors
const FOLDER_COLORS = ['#8e8e8e', '#5b5b5b', '#929292'];

type ActiveView = 'all' | 'starred' | 'folder';

interface FolderType {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sequences, setSequences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('all');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [draggedSequenceId, setDraggedSequenceId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Data Fetching
  const fetchSequences = async () => {
    setLoading(true);
    const { data } = await dbAdapter.fetchSequences('updated_at', false);
    if (data) setSequences(data);
    setLoading(false);
  };

  const fetchFolders = async () => {
    if (!user) return;
    const { data } = await dbAdapter.fetchFolders(user.id);
    if (data) setFolders(data as FolderType[]);
  };

  useEffect(() => {
    fetchSequences();
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNewFlow = async (name: string) => {
    if (!user) return;

    const newSeq = {
      user_id: user.id,
      title: name,
      status: 'Idle',
      status_color: '#8e8e8e',
      agents_active: 0,
      total_agents: 0,
      is_starred: false,
      space_id: activeFolderId || null,
    };

    const { data } = await dbAdapter.createSequence(newSeq);

    if (data) {
      setSequences([data, ...sequences]);
      localStorage.setItem('active_sequence_id', data.id);
      setShowCreateModal(false);
      navigate(ROUTES.canvas);
    }
  };

  const handleDelete = async (id: string | number) => {
    setSequences(sequences.filter((seq: any) => seq.id !== id));
    await dbAdapter.deleteSequence(id as string);
  };

  const handleToggleStar = async (id: string | number) => {
    const seq = sequences.find((s: any) => s.id === id);
    if (!seq) return;

    const newStarred = !seq.is_starred;
    setSequences(sequences.map((s: any) => s.id === id ? { ...s, is_starred: newStarred } : s));
    await dbAdapter.updateSequence(id as string, { is_starred: newStarred });
  };

  // Folder CRUD
  const handleCreateFolder = async () => {
    if (!user || !newFolderName.trim()) return;

    const { data } = await dbAdapter.createFolder({ name: newFolderName.trim(), user_id: user.id });

    if (data) {
      setFolders([...folders, data as FolderType]);
    }
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  const handleDeleteFolder = async (folderId: string) => {
    await dbAdapter.deleteFolder(folderId);
    setSequences(sequences.map((s: any) => s.space_id === folderId ? { ...s, space_id: null } : s));
    setFolders(folders.filter((f: FolderType) => f.id !== folderId));

    if (activeFolderId === folderId) {
      setActiveView('all');
      setActiveFolderId(null);
    }
  };

  // Drag & Drop
  const handleDragStart = (seqId: string) => {
    setDraggedSequenceId(seqId);
  };

  const handleDragEnd = async () => {
    if (draggedSequenceId && dragOverFolderId) {
      setSequences(sequences.map((s: any) =>
        s.id === draggedSequenceId ? { ...s, space_id: dragOverFolderId } : s
      ));
      await dbAdapter.moveSequenceToFolder(draggedSequenceId, dragOverFolderId);
    }
    setDraggedSequenceId(null);
    setDragOverFolderId(null);
  };

  // View Filtering
  const getFilteredSequences = () => {
    let filtered = sequences;

    if (activeView === 'starred') {
      filtered = filtered.filter((s: any) => s.is_starred);
    } else if (activeView === 'folder' && activeFolderId) {
      filtered = filtered.filter((s: any) => s.space_id === activeFolderId);
    }

    if (searchQuery) {
      filtered = filtered.filter((s: any) =>
        s.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getViewTitle = () => {
    if (activeView === 'starred') return 'Starred Assets';
    if (activeView === 'folder') {
      const folder = folders.find((f: FolderType) => f.id === activeFolderId);
      return folder?.name || 'Folder';
    }
    return 'All Sequences';
  };

  const filteredSequences = getFilteredSequences();

  const folderCounts: Record<string, number> = {};
  folders.forEach((f: FolderType) => {
    folderCounts[f.id] = sequences.filter((s: any) => s.space_id === f.id).length;
  });

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#121212] text-white flex font-sans overflow-hidden relative select-none">

      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 border-r border-[#2e2e2e] bg-[#181818] flex flex-col z-20 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 mb-4 border-b border-[#2e2e2e]">
          <button
            type="button"
            onClick={() => navigate(ROUTES.landing)}
            className="flex items-center gap-4 text-left focus:outline-none"
          >
            <div className="w-20 h-20  flex items-center justify-center shrink-0 rounded-2xl shadow-inner">
              <img src="/o.svg" alt="Logo" className="w-25 h-25 object-contain" />
            </div>
            {/* <div>
              <h1 className="text-lg font-bold font-serif uppercase tracking-wider text-white">
                Float<span className="text-[#EB9A21]">it</span>
              </h1>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest block">v0.9.4.SYS</span>
            </div> */}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Navigation Section */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-sans block mb-3 pl-2">Navigation</span>
            <div className="flex flex-col space-y-2.5">
              <SidebarItem
                icon={<LayoutGrid size={18} />}
                title="All Sequences"
                active={activeView === 'all'}
                onClick={() => { setActiveView('all'); setActiveFolderId(null); }}
              />
              <SidebarItem
                icon={<Star size={18} />}
                title="Starred Assets"
                active={activeView === 'starred'}
                onClick={() => { setActiveView('starred'); setActiveFolderId(null); }}
              />
            </div>
          </div>

          {/* Project Spaces Section */}
          <div data-tour="folders-sidebar">
            <div className="flex items-center justify-between mb-3 pl-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-sans">Project Spaces</span>
              <button
                aria-label="Add project space"
                title="Add project space"
                className="text-zinc-400 hover:text-[#EB9A21] transition-colors p-1"
                onClick={() => setShowNewFolderInput(true)}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* New Folder Input */}
            <AnimatePresence>
              {showNewFolderInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-2 mb-3">
                    <div className="flex items-center gap-2 border border-[#3e3e3e] bg-[#242424] p-2.5 rounded-xl shadow-lg">
                      <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e: any) => setNewFolderName(e.target.value)}
                        onKeyDown={(e: any) => { if (e.key === 'Enter') handleCreateFolder(); if (e.key === 'Escape') setShowNewFolderInput(false); }}
                        autoFocus
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 font-sans border-0 p-0"
                        title="New folder name"
                        aria-label="New folder name"
                      />
                      <button
                        onClick={handleCreateFolder}
                        className="p-1 border border-[#3e3e3e] hover:border-[#EB9A21] hover:text-[#EB9A21] text-zinc-400 bg-[#1c1c1c] transition-colors rounded-lg"
                        title="Create folder"
                        aria-label="Create folder"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => { setShowNewFolderInput(false); setNewFolderName(''); }}
                        className="p-1 border border-[#3e3e3e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] text-zinc-400 bg-[#1c1c1c] transition-colors rounded-lg"
                        title="Cancel"
                        aria-label="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Folder List */}
            {folders.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {folders.map((folder: FolderType, i: number) => (
                  <FolderItem
                    key={folder.id}
                    folder={{ ...folder, color: folder.color || FOLDER_COLORS[i % FOLDER_COLORS.length]! }}
                    count={folderCounts[folder.id] || 0}
                    active={activeView === 'folder' && activeFolderId === folder.id}
                    isDragOver={dragOverFolderId === folder.id}
                    onClick={() => { setActiveView('folder'); setActiveFolderId(folder.id); }}
                    onDelete={() => handleDeleteFolder(folder.id)}
                    onDragOver={() => setDragOverFolderId(folder.id)}
                    onDragLeave={() => setDragOverFolderId(null)}
                    onDrop={handleDragEnd}
                  />
                ))}
              </div>
            ) : (
              !showNewFolderInput && (
                <p className="text-[11px] text-zinc-500 font-mono pl-2 italic">NO ACTIVE SPACES. PRESS + TO INITIALIZE.</p>
              )
            )}
          </div>
        </nav>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-1 flex flex-col relative h-screen bg-[#121212] overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#3e3e3e 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* HEADER */}
        <header className="shrink-0 px-12 py-8 flex justify-between items-center z-10 border-b border-[#2e2e2e] bg-[#181818] gap-8 shadow-md">
          <div className="relative flex-1 max-w-4xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FFFFFF] transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH VIA SEQUENCE FINGERPRINT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl py-3.5 pl-14 pr-6 text-xs uppercase tracking-wider focus:border-[#EB9A21] outline-none text-white transition-colors placeholder:text-zinc-500 font-mono shadow-inner"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0 justify-end relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-[#2e2e2e] text-zinc-400 hover:text-[#EB9A21] hover:border-[#EB9A21] bg-[#1e1e1e] shadow-md hover:-translate-y-0.5 transition-all animate-none"
              aria-label="User Profile"
              title="User Profile"
            >
              <User size={18} />
            </button>
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-14 w-48 rounded-2xl bg-[#181818] border border-[#2e2e2e] py-2 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-sans"
                >
                  <button
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setShowProfileDropdown(false);
                      navigate(ROUTES.profile);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setShowProfileDropdown(false);
                      navigate(ROUTES.profile + '#api-key');
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border-t border-[#2e2e2e]"
                  >
                    Global API Key
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-12 py-10 overflow-y-auto custom-scrollbar z-10 relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#ffffff] font-sans">
              {getViewTitle()}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-[#EB9A21] border-t-transparent animate-spin"></div>
            </div>
          ) : (
            /* Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredSequences.map((seq: any, i: number) => (
                <SessionCard
                  key={seq.id}
                  sequence={seq}
                  index={i}
                  onDelete={handleDelete}
                  onToggleStar={handleToggleStar}
                  onDragStart={handleDragStart}
                  isDragging={draggedSequenceId === seq.id}
                />
              ))}
              {filteredSequences.length === 0 && (
                <div className="col-span-full text-center py-20 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl">
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
                    {activeView === 'starred' ? 'NO STARRED ASSETS FOUND.' :
                      activeView === 'folder' ? 'SPACE IS EMPTY. DRAG SEQUENCES HERE TO ORGANIZE.' :
                        'NO ACTIVE SEQUENCES FOUND.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CREATE FLOW FIXED FAB */}
        <button
          data-tour="create-flow-btn"
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#EB9A21] border border-[#c57f12] shadow-[0_8px_30px_rgba(235,154,33,0.35)] hover:shadow-[0_15px_40px_rgba(235,154,33,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center text-[#FFFFFF]"
          aria-label="Create Flow"
          title="Create Flow"
        >
          <Plus size={24} strokeWidth={3} />
        </button>

        {/* Sequence Naming Modal (PRD Flow 1, Steps 3-4) */}
        <CreateSequenceModal
          isOpen={showCreateModal}
          onCreate={handleNewFlow}
          onClose={() => setShowCreateModal(false)}
        />

      </main>
    </div>
  );
}

// Helper
function formatDate(dateString: string) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Sidebar Item
interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, title, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full min-h-[72px] flex items-center gap-4 px-6 border border-[#2e2e2e] text-left transition-all duration-200 font-sans relative rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${active
        ? 'bg-[#ff6a6a] text-[#171717] font-bold shadow-[0_6px_20px_rgba(255,106,106,0.25)] border-[#ff6a6a]'
        : 'bg-[#1e1e1e] text-zinc-400 hover:text-white hover:bg-[#242424]'
        }`}
    >
      <motion.div
        animate={{ rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="shrink-0 flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <span className="text-sm font-medium tracking-wide">{title}</span>
    </button>
  );
}

// Folder Item
interface FolderItemProps {
  folder: FolderType;
  count: number;
  active: boolean;
  isDragOver: boolean;
  onClick: () => void;
  onDelete: () => void;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
}

function FolderItem({ folder, count, active, isDragOver, onClick, onDelete, onDragOver, onDragLeave, onDrop }: FolderItemProps) {
  return (
    <div
      onDragOver={(e: any) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={(e: any) => { e.preventDefault(); onDrop(); }}
      className={`group relative w-full min-h-[64px] flex items-center gap-4 px-6 border cursor-pointer transition-all duration-200 font-sans rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${isDragOver
        ? 'bg-[#EB9A21] text-[#FFFFFF] border-[#EB9A21] shadow-[0_6px_20px_rgba(235,154,33,0.25)]'
        : active
          ? 'bg-[#ff6a6a] text-[#171717] border-[#ff6a6a] shadow-[0_6px_20px_rgba(255,106,106,0.25)]'
          : 'bg-[#1e1e1e] text-zinc-400 hover:text-white hover:bg-[#242424] border-[#2e2e2e]'
        }`}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="shrink-0 flex items-center justify-center"
      >
        <Folder size={18} style={{ color: active || isDragOver ? '#171717' : folder.color }} />
      </motion.div>
      <span className="text-sm font-medium tracking-wide flex-1 truncate">{folder.name}</span>

      {count > 0 && (
        <span className={`text-[10px] font-mono border px-1.5 py-0.5 rounded-md ${active || isDragOver
          ? 'border-[#171717] text-[#171717]'
          : 'border-[#3e3e3e] bg-[#1c1c1c] text-zinc-400'
          }`}>
          {count}
        </span>
      )}

      <button
        onClick={(e: any) => { e.stopPropagation(); onDelete(); }}
        className={`opacity-0 group-hover:opacity-100 p-1.5 transition-colors ${active || isDragOver
          ? 'text-[#171717] hover:text-red-950'
          : 'text-zinc-500 hover:text-[#ff6a6a]'
          }`}
        title={`Delete ${folder.name}`}
        aria-label={`Delete ${folder.name}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// Session Card
interface SessionCardProps {
  sequence: any;
  index: number;
  onDelete: (id: string | number) => void;
  onToggleStar: (id: string | number) => void;
  onDragStart: (id: string) => void;
  isDragging: boolean;
}

function SessionCard({ sequence, index, onDelete, onToggleStar, onDragStart, isDragging }: SessionCardProps) {
  const isStarred = sequence.is_starred;
  const navigate = useNavigate();
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressed, setIsLongPressed] = useState(false);

  const handlePointerDown = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      setIsLongPressed(true);
    }, 400);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
    setIsLongPressed(false);
  }, []);

  const handleDragStartInternal = useCallback(() => {
    if (isLongPressed) {
      onDragStart(sequence.id);
    }
  }, [isLongPressed, onDragStart, sequence.id]);

  return (
    <motion.div
      draggable={isLongPressed}
      onDragStart={handleDragStartInternal}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={() => {
        if (!isLongPressed) {
          localStorage.setItem('active_sequence_id', sequence.id);
          navigate(ROUTES.canvas);
        }
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isDragging ? 0.4 : 1, scale: isLongPressed ? 1.02 : 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`bg-[#242424] p-8 border border-[#3e3e3e] hover:border-[#EB9A21] shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out group cursor-pointer relative overflow-hidden flex flex-col h-full rounded-3xl ${isLongPressed ? 'ring-1 ring-[#EB9A21] cursor-grab' : ''}`}
    >
      {/* Drag Handle Indicator */}
      {isLongPressed && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <GripVertical size={16} className="text-[#EB9A21]" />
        </div>
      )}

      <div className="flex justify-between items-start z-10 relative mb-6">
        <div />
        <div className="flex items-center gap-2">
          <button
            onClick={(e: any) => { e.stopPropagation(); onDelete(sequence.id); }}
            className="w-10 h-10 flex items-center justify-center border border-[#3e3e3e] text-zinc-400 hover:text-[#ff6a6a] hover:border-[#ff6a6a] transition-all relative z-20 rounded-xl bg-[#1c1c1c] shadow-md"
            title="Delete Sequence"
            aria-label="Delete Sequence"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={(e: any) => { e.stopPropagation(); onToggleStar(sequence.id); }}
            aria-label={isStarred ? "Unstar sequence" : "Star sequence"}
            title={isStarred ? "Unstar sequence" : "Star sequence"}
            className={`w-10 h-10 flex items-center justify-center border transition-all relative z-20 rounded-xl shadow-md bg-[#1c1c1c] ${isStarred
              ? 'text-[#EB9A21] border-[#EB9A21]'
              : 'text-zinc-400 border-[#3e3e3e] hover:text-[#EB9A21] hover:border-[#EB9A21]'
              }`}
          >
            <Star size={16} fill={isStarred ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="z-10 relative flex-1">
        <h3 className="text-xl font-bold font-sans text-white leading-tight mb-4 group-hover:text-[#EB9A21] transition-colors uppercase tracking-tight">
          {sequence.title}
        </h3>
      </div>

      <div className="mt-auto z-10 relative pt-4 border-t border-[#3e3e3e]">
        <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
          UPDATED: {formatDate(sequence.updated_at)}
        </span>
      </div>
    </motion.div>
  );
}
