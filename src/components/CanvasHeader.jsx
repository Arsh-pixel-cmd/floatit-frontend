import React, { useState, useRef } from 'react';
import { Play, Square, ChevronDown, Check, Paperclip, X } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';
import toast from 'react-hot-toast';

export default function CanvasHeader({ setShowShareModal, startExecution, stopExecution }) {
  const { graphStatus, flowTitle, setFlowTitle, projectAttachment, setProjectAttachment, selectedGroupId, setSelectedGroupId, projectPrompt, setProjectPrompt } = useWorkflowStore();
  const { groups } = useBuilderStore();
  const isRunning = graphStatus === 'running';
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTitleClick = () => {
    setEditValue(flowTitle || 'Untitled Project');
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleTitleBlur = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      setFlowTitle(trimmed);
    }
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProjectAttachment({
        name: file.name,
        content: ev.target.result,
        type: file.type,
      });
      toast.success(`Attached: ${file.name}`);
    };
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
    // Reset the input so the same file can be re-attached
    e.target.value = '';
  };

  return (
    <header className="h-[50px] bg-white dark:bg-[#1e1e24] border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-6 z-20 relative">
      <div className="flex items-center gap-4 flex-1">
        <div className="text-xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
        <div className="h-5 w-px bg-gray-200 dark:bg-zinc-800"></div>
        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="text-sm font-medium text-gray-700 dark:text-gray-200 border border-blue-400 dark:border-blue-500 bg-transparent rounded px-2 py-0.5 outline-none focus:ring-1 ring-blue-400 min-w-[120px]"
            autoFocus
          />
        ) : (
          <div
            className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 hover:underline transition select-none"
            title="Click to rename project"
            onClick={handleTitleClick}
          >
            {flowTitle || 'Untitled Project'}
          </div>
        )}

        {/* Project Prompt Bar */}
        <div className="flex items-center bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 gap-2 max-w-[320px] w-full min-w-[150px]">
          <input
            type="text"
            value={projectPrompt}
            onChange={(e) => setProjectPrompt(e.target.value)}
            placeholder="Describe project objective..."
            className="w-full text-[11px] bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Task 3: Group Dropdown */}
        {groups.length > 0 && (
          <Select.Root
            value={selectedGroupId ?? 'all'}
            onValueChange={(val) => setSelectedGroupId(val === 'all' ? null : val)}
          >
            <Select.Trigger className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
              bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 rounded-lg border
              border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700 transition
              outline-none focus:ring-2 ring-blue-400 min-w-[120px]">
              <Select.Value placeholder="All Agents" />
              <ChevronDown size={12} className="ml-auto text-gray-400" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border
                border-gray-100 dark:border-zinc-800 py-1.5 z-[100] min-w-[160px]">
                <Select.Viewport>
                  <Select.Item value="all" className="flex items-center gap-2 px-3 py-2 text-xs
                    font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-50
                    dark:hover:bg-zinc-800 outline-none data-[highlighted]:bg-gray-50 dark:data-[highlighted]:bg-zinc-800">
                    <Select.ItemText>All Agents</Select.ItemText>
                    <Select.ItemIndicator className="ml-auto"><Check size={12} /></Select.ItemIndicator>
                  </Select.Item>
                  {groups.map((g) => (
                    <Select.Item key={g.id} value={g.id} className="flex items-center gap-2 px-3 py-2
                      text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer
                      hover:bg-gray-50 dark:hover:bg-zinc-800 outline-none data-[highlighted]:bg-gray-50 dark:data-[highlighted]:bg-zinc-800">
                      <Select.ItemText>{g.name}</Select.ItemText>
                      <Select.ItemIndicator className="ml-auto"><Check size={12} /></Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Task 4: File Attachment Picker */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".txt,.pdf,.md,.csv,.json,.png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
        {projectAttachment ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 dark:bg-orange-950
            text-orange-600 dark:text-orange-400 rounded-lg text-xs font-medium max-w-[140px]">
            <Paperclip size={12} />
            <span className="truncate">{projectAttachment.name}</span>
            <button
              onClick={() => setProjectAttachment(null)}
              className="hover:text-red-500 transition ml-auto shrink-0">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100
              dark:hover:bg-zinc-800 rounded-lg transition">
            <Paperclip size={15} />
          </button>
        )}

        {isRunning ? (
          <button onClick={stopExecution} className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition">
            <Square size={14} /> Stop
          </button>
        ) : (
          <button onClick={startExecution} className="flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition">
            <Play size={14} /> Run
          </button>
        )}
        <button onClick={() => setShowShareModal(true)} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition">Share</button>
      </div>
    </header>
  );
}
