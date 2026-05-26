import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { ApiKeyModalType, TokenLimitModalState } from '../../types/engine';
import OutputScreen from '../OutputScreen';
import ApiKeyModal from './ApiKeyModal';

interface EngineModalStackProps {
  showOutputButton: boolean;
  onOpenOutputScreen: () => void;
  showOutputScreen: boolean;
  onCloseOutputScreen: () => void;
  phaseOutputModal: string | null;
  onClosePhaseOutput: () => void;
  tokenLimitModal: TokenLimitModalState | null;
  onDismissTokenLimit: () => void;
  onSwitchApiKey: () => void;
  showKeyModal: boolean;
  keyModalType: ApiKeyModalType;
  onCloseKeyModal: () => void;
  onSavedKeyModal: () => void;
}

export default function EngineModalStack({
  showOutputButton,
  onOpenOutputScreen,
  showOutputScreen,
  onCloseOutputScreen,
  phaseOutputModal,
  onClosePhaseOutput,
  tokenLimitModal,
  onDismissTokenLimit,
  onSwitchApiKey,
  showKeyModal,
  keyModalType,
  onCloseKeyModal,
  onSavedKeyModal,
}: EngineModalStackProps) {
  return (
    <>
      {showOutputButton && (
        <button
          onClick={onOpenOutputScreen}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#DEF767] to-[#A3E636] text-black text-xs font-black uppercase tracking-widest shadow-xl shadow-[#DEF767]/20 hover:scale-105 transition-transform"
        >
          <FileText size={16} /> Full Report
        </button>
      )}

      {phaseOutputModal && (
        <OutputScreen
          isOpen={true}
          onClose={onClosePhaseOutput}
          phaseFilter={phaseOutputModal}
        />
      )}

      <OutputScreen isOpen={showOutputScreen} onClose={onCloseOutputScreen} />

      <AnimatePresence>
        {tokenLimitModal?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="relative w-[480px] max-w-[92vw] bg-[#0d0d15] border border-[#F6E27F]/25 rounded-3xl shadow-[0_40px_120px_rgba(246,226,127,0.15)] overflow-hidden pointer-events-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F6E27F] to-transparent pointer-events-none" />
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6E27F]/10 border border-[#F6E27F]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(246,226,127,0.2)]">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F6E27F] mb-1">Context Window Exceeded</p>
                    <h2 className="text-2xl font-black text-white font-display leading-tight">Token Limit Reached</h2>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-5 space-y-2 pointer-events-none">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Model</span>
                    <span className="text-sm text-white font-mono bg-white/5 px-3 py-1 rounded-lg">{tokenLimitModal.model}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Provider</span>
                    <span className="text-sm text-[#46B1FF] font-bold">{tokenLimitModal.provider}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  The input sent to this model exceeded its maximum context window. The pipeline has been paused at this node. You can shorten your prompt, switch to a model with a larger context window, or dismiss and continue.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={onDismissTokenLimit}
                    className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest pointer-events-auto"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={onSwitchApiKey}
                    className="flex-[1.5] py-3.5 rounded-2xl bg-gradient-to-r from-[#F6E27F] to-[#DEF767] text-black text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_30px_rgba(246,226,127,0.3)] pointer-events-auto"
                  >
                    Switch API Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKeyModal && (
          <ApiKeyModal
            type={keyModalType}
            onClose={onCloseKeyModal}
            onSaved={onSavedKeyModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
