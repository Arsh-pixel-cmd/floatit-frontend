import React from 'react';
import { Mic, Paperclip, Send } from 'lucide-react';

interface HeroPromptProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onInit: () => void;
}

export const HeroPrompt = ({ prompt, onPromptChange, onInit }: HeroPromptProps) => (
  <div className="w-full max-w-2xl mx-auto mb-10 font-onest relative z-20 select-none">
    {/* Brutalist prompt container: Deep BG, rounded corners, focus snaps to Lime */}
    <div className="relative flex items-center bg-[#171717] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-4 rounded-none transition-colors duration-100">

      {/* Left: Attach File Icon Button */}
      <button
        type="button"
        aria-label="Attach File"
        className="p-2 text-[#5b5b5b] hover:text-[#ff6a6a] transition-colors duration-100 mr-2 flex-shrink-0"
      >
        <Paperclip className="w-4 h-4" />
      </button>

      {/* Middle: Text Input Area */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Ask anything or orchestrate your pipeline..."
        className="w-full bg-transparent border-none outline-none text-white placeholder-[#5b5b5b] text-[14px] font-onest tracking-normal py-1"
      />

      {/* Right: Action Buttons */}
      <div className="ml-4 flex items-center gap-2 flex-shrink-0">
        {/* Voice Input Mic Button */}
        <button
          type="button"
          aria-label="Voice Input"
          className="p-2 text-[#5b5b5b] hover:text-[#DEF767] transition-colors duration-100 flex-shrink-0"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Submit Arrow Button */}
        <button
          onClick={onInit}
          aria-label="Submit Prompt"
          title="Submit Prompt"
          className="w-8 h-8 rounded-full border border-[#2e2e2e] hover:border-[#DEF767] hover:bg-[#DEF767] text-[#929292] hover:text-[#171717] flex items-center justify-center transition-all duration-100 bg-[#181818]"
        >
          <Send className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </div>
  </div>
);
