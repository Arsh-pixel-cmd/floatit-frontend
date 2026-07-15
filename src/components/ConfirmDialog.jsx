import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export default function ConfirmDialog({ open, onOpenChange, title, description, onConfirm }) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" />
        <AlertDialog.Content className="fixed z-[201] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[360px] bg-white dark:bg-[#1e1e24] rounded-2xl shadow-2xl border border-gray-100
          dark:border-zinc-800 p-6 focus:outline-none">
          <AlertDialog.Title className="text-[15px] font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-[13px] text-gray-500 dark:text-gray-400 mb-6">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300
                bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-[13px] font-medium text-white bg-red-500
                  rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
