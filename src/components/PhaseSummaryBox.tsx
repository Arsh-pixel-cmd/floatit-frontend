import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useWorkflowStore } from '../lib/store';

function useOutsideClick(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const PhaseSummaryBox = ({ phase, x, y }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  useOutsideClick(modalRef, () => setIsOpen(false));
  const nodeResults = useWorkflowStore((state: any) => state.nodeResults);
  
  const phaseResults = Object.entries(nodeResults)
    .filter(([id]) => id.startsWith(phase.id + '::'))
    .map(([id, result]) => ({ id, ...(result as any) }));

  return (
    // eslint-disable-next-line
    <div className="absolute z-50 flex flex-col items-center font-sans" style={{ left: x, top: y, transform: 'translate(-50%, 0)' }}>
      {/* Default State - Flat Anchor */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer relative border border-[#2e2e2e] bg-[#181818] hover:border-[#DEF767] transition-all font-sans"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#DEF767]" />
        <span className="text-xs font-bold tracking-widest text-[#e2e8f0] uppercase font-sans">
          Phase Output: {phase.label}
        </span>
      </motion.button>

      {/* Modal State */}
      <AnimatePresence>
        {isOpen && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-8 font-sans pointer-events-auto"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full max-w-4xl max-h-[85vh] rounded-[32px] overflow-hidden flex flex-col border border-white/10 bg-[#0a0a0f] shadow-[0_40px_100px_rgba(0,0,0,0.8)] font-sans"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h3 className="text-lg font-black text-white uppercase tracking-wider font-display">
                  <span className="text-[#DEF767]">Synthesis //</span> {phase.label}
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto custom-scrollbar-neon flex-1 text-slate-300 bg-[#0a0a0f]">
                {phaseResults.length === 0 ? (
                  <div className="text-sm text-slate-500 italic text-center py-16 font-sans">
                    Sequence idle. Execute the {phase.label} phase to synthesize data.
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {phaseResults.map((res, idx) => {
                      const cleanName = res.id.split('::')[1].replace('-', ' ');
                      return (
                        <div key={idx} className="bg-[#0f0f15] p-6 rounded-2xl border border-white/5">
                          <div className="text-xs text-[#ff6a6a] uppercase font-bold tracking-widest mb-3 font-sans">
                            AGENT: {cleanName}
                          </div>
                          <div className="text-sm text-slate-300 font-sans leading-relaxed space-y-4">
                             {res.content ? res.content : 'Awaiting output...'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center font-sans">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">UXISM Theme Active</span>
                <button 
                  className="px-6 py-3 rounded-xl bg-[#DEF767] text-black font-black uppercase tracking-widest hover:opacity-90 transition-opacity text-xs flex items-center gap-2 font-sans"
                >
                  Download Result
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhaseSummaryBox;
