import React, { useState } from 'react';
import { useWorkflowStore } from '../lib/store';
import { Send, MessageSquare } from 'lucide-react';
import { callLLM } from '../lib/llm';

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your FloatIt workflow assistant. I can analyze the results from your agents or help you write project directives. Ask me anything!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { nodeResults, projectPrompt } = useWorkflowStore();

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      // Gather context from current agent results
      const resultsText = Object.entries(nodeResults)
        .map(([id, res]) => `Agent: ${res.agentName || id}\nOutput: ${res.content || ''}`)
        .join('\n\n---\n\n');

      const chatbotPrompt = `You are a helpful assistant for the project "${projectPrompt}".
Here is the output context from the executed workflow:
${resultsText}

User Question: ${userMsg.content}`;

      // Call our LLM backend
      const result = await callLLM(chatbotPrompt, { name: 'Workflow Chatbot', categoryName: 'Chatbot' });
      setMessages(prev => [...prev, { role: 'assistant', content: result?.content || 'Sorry, I couldn\'t process that.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error communicating with assistant.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute right-4 bottom-20 w-[330px] h-[440px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-40 overflow-hidden" onPointerDown={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="bg-[#2945D1] text-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <span className="font-bold text-xs uppercase tracking-wider">FloatIt Assistant</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition text-xs">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#2945D1] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-3 py-1.5 text-xs text-gray-400 flex items-center gap-1 shadow-sm">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about agent results..."
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#2945D1] transition"
        />
        <button 
          onClick={handleSend}
          className="bg-[#2945D1] hover:bg-blue-700 text-white rounded-xl p-2.5 transition flex items-center justify-center cursor-pointer"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
