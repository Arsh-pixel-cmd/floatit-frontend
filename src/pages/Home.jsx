import React from 'react';
import { Paperclip, ArrowUp, Sparkles, Users2, Lightbulb, Heart } from 'lucide-react';

export default function Home({ inputValue, setInputValue, setCurrentPage }) {
  return (
      <div className="min-h-screen bg-[#faf5ff] text-gray-900 font-sans">
        <header className="h-[60px] bg-white border-b border-gray-200 flex items-center px-10 relative z-20">
          <div className="text-2xl font-bold"><span className="text-blue-600">float</span><span className="text-orange-500">it</span></div>
        </header>

        {/* Left Side Floating Navigation */}
        <div className="absolute top-[80px] left-10 z-10">
          <div 
            onClick={() => setCurrentPage('templates')} 
            className="bg-white p-1.5 rounded-xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition z-20"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">O</div>
          </div>
        </div>

        <main className="max-w-[650px] mx-auto px-4 pt-24 relative z-20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">
              What shall we design<br />
              <span className="text-orange-500">together today?</span>
            </h1>
            <p className="text-gray-500 text-[12px] mt-2">Describe your project or goal. Float It will craft the perfect design workflow for you.</p>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-[15px] font-semibold mb-1 text-gray-900">What are we working on?</h2>
            <textarea
              className="w-full text-[13px] text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none resize-none mb-2 h-12 mt-1"
              placeholder='Example: "Help me streamline our customer onboarding experience"'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex justify-between items-end mt-2">
              <button className="text-gray-500 hover:text-gray-700 transition"><Paperclip size={18} /></button>
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm"><ArrowUp size={16} /></button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-medium text-gray-500 mb-4">Try these too get started</p>
            <div className="flex flex-nowrap gap-3 justify-center max-w-[800px] mx-auto whitespace-nowrap">
              {[
                { icon: Heart, text: "Improve user onboard" },
                { icon: Users2, text: "Synthesize research" },
                { icon: Lightbulb, text: "User research plan" },
                { icon: Sparkles, text: "Automate workflow" }
              ].map((s, i) => (
                <div key={i} className="px-4 py-2 flex items-center gap-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-700 bg-white shadow-sm hover:shadow-md cursor-pointer transition">
                  <s.icon className="text-blue-600" size={16} /> {s.text}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
  );
}
