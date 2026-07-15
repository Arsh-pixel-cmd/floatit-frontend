import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Trash2, X } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useAuth } from '../lib/auth';

export default function CanvasComment({ comment, canvasOffset }) {
  const { addReply, resolveComment, deleteComment } = useBuilderStore();
  const { user } = useAuth();
  const [replyText, setReplyText] = useState('');
  const [open, setOpen] = useState(false);
  const authorName = user?.name || user?.email?.split('@')[0] || 'User';

  const handleReply = () => {
    if (!replyText.trim()) return;
    addReply(comment.id, replyText.trim(), { name: authorName });
    setReplyText('');
  };

  return (
    <div style={{
      position: 'absolute',
      left: comment.x + (canvasOffset?.x ?? 0),
      top: comment.y + (canvasOffset?.y ?? 0),
      zIndex: 40,
    }}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white
              text-[11px] font-bold shadow-lg hover:scale-110 border-2 border-white transition
              ${comment.resolved ? 'bg-green-500' : 'bg-[#2945D1]'}`}
            title={comment.authorName}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {comment.authorInitial}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="right"
            align="start"
            sideOffset={8}
            className="w-[280px] bg-white dark:bg-[#1e1e24] rounded-2xl shadow-2xl border
              border-gray-100 dark:border-zinc-800 z-[200] outline-none"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2945D1] text-white text-[10px] font-bold flex items-center justify-center">
                  {comment.authorInitial}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-900 dark:text-gray-100">{comment.authorName}</p>
                  <p className="text-[10px] text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!comment.resolved && (
                  <button
                    onClick={() => resolveComment(comment.id)}
                    title="Resolve"
                    className="p-1 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-500 transition">
                    <CheckCircle size={14} />
                  </button>
                )}
                <button
                  onClick={() => deleteComment(comment.id)}
                  title="Delete"
                  className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                  <Trash2 size={14} />
                </button>
                <Popover.Close asChild>
                  <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 transition">
                    <X size={14} />
                  </button>
                </Popover.Close>
              </div>
            </div>

            {/* Comment body */}
            <div className="px-4 py-3 text-[13px] text-gray-700 dark:text-gray-300">
              {comment.resolved && (
                <span className="text-[10px] font-semibold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mr-2">Resolved</span>
              )}
              {comment.text}
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="border-t border-gray-50 dark:border-zinc-800 px-4 py-2 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-400 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {reply.authorInitial}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">
                        {reply.authorName}
                        <span className="text-[10px] text-gray-400 font-normal ml-1">
                          {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                        </span>
                      </p>
                      <p className="text-[12px] text-gray-600 dark:text-gray-400">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {!comment.resolved && (
              <div className="px-4 py-3 border-t border-gray-50 dark:border-zinc-800 flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleReply(); }}
                  placeholder="Reply..."
                  className="flex-1 text-[12px] border border-gray-200 dark:border-zinc-700 rounded-lg
                    px-2.5 py-1.5 outline-none focus:border-blue-400 bg-transparent text-gray-800 dark:text-gray-200"
                />
                <button
                  onClick={handleReply}
                  className="px-3 py-1.5 bg-[#2945D1] text-white text-[11px] font-semibold rounded-lg hover:bg-blue-700 transition">
                  ↵
                </button>
              </div>
            )}
            <Popover.Arrow className="fill-white dark:fill-zinc-900" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
