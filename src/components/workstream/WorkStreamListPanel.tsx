import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const WorkStreamListPanel: React.FC = () => {
  const { workstreams, activeWorkStreamId, setActiveWorkStreamId } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'proposals' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = workstreams.filter((ws) => {
    const matchesSearch =
      ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.freelancerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.buyerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'active') {
      return ws.status === 'in_progress' || ws.status === 'deliverable_submitted' || ws.status === 'invoiced';
    }
    if (filterTab === 'proposals') {
      return ws.status === 'proposal_sent' || ws.status === 'deposit_required';
    }
    if (filterTab === 'completed') {
      return ws.status === 'completed';
    }
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[750px]">
      <div className="p-3.5 border-b border-slate-200 space-y-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          WorkStream Conversations ({workstreams.length})
        </span>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
          {(['all', 'active', 'proposals', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`flex-1 py-1 text-center rounded-md capitalize transition-colors ${
                filterTab === tab ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filtered.map((ws) => {
          const isSelected = ws.id === activeWorkStreamId;
          const otherName = ws.freelancerName;
          const otherAvatar = ws.freelancerAvatar;
          const lastMsg = ws.messages[ws.messages.length - 1];

          return (
            <button
              key={ws.id}
              onClick={() => setActiveWorkStreamId(ws.id)}
              className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 relative ${
                isSelected ? 'bg-orange-50/70 border-l-3 border-orange-500' : 'hover:bg-slate-50'
              }`}
            >
              <img
                src={otherAvatar}
                alt={otherName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-900 truncate">{otherName}</span>
                  <span className="text-[10px] text-slate-400">{ws.lastActivity}</span>
                </div>
                <div className="text-xs font-medium text-slate-700 truncate mb-1">{ws.title}</div>
                <p className="text-[11px] text-slate-500 truncate mb-2">{lastMsg?.content || 'No messages'}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                    {ws.status}
                  </span>
                  <span className="font-mono text-emerald-700 font-semibold tabular-nums">
                    ${ws.escrowBalance} Escrow
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
