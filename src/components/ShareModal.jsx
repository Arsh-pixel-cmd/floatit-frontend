import React from 'react';
import { Users2, Link as LinkIcon, Search, ChevronDown } from 'lucide-react';

export default function ShareModal({ setShowShareModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setShowShareModal(false)}>
      <div className="bg-white w-[420px] rounded-[16px] shadow-2xl p-5 relative z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <Users2 className="text-gray-900" size={20} />
            <div>
              <h3 className="text-[13px] font-semibold text-gray-900 leading-tight">Set up your team</h3>
              <p className="text-[11px] text-gray-500">Onboarding Flow - UX Project</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-blue-600 font-semibold text-[11px] hover:text-blue-700 transition">
            <LinkIcon size={12} /> Copy link
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-blue-700 transition">Invite</button>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold text-gray-900 mb-3">Who has Access</h4>
          <div className="space-y-3">
            {[
              { name: 'Anjali', color: 'bg-yellow-400', initial: 'A', role: 'can edit' },
              { name: 'Dhruv', color: 'bg-blue-400', initial: 'D', role: 'can view' },
              { name: 'Jia', color: 'bg-green-600', initial: 'J', role: 'can edit' },
              { name: 'Jhon', color: 'bg-[#5c4033]', initial: 'J', role: 'can edit' }
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${user.color} flex items-center justify-center text-white font-semibold text-[11px]`}>{user.initial}</div>
                  <span className="text-[12px] text-gray-700">{user.name}</span>
                </div>
                <button className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 transition">
                  {user.role} <ChevronDown size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
