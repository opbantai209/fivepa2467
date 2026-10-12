import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Briefcase, Users, MessageSquare } from 'lucide-react';

export const NavigationLinks: React.FC = () => {
  const { activeTab, setActiveTab, workstreams } = useApp();
  const unreadCount = workstreams.reduce((acc, ws) => acc + (ws.unreadCount || 0), 0);

  return (
    <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
      <button
        onClick={() => setActiveTab('offers')}
        className={`hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
          activeTab === 'offers' ? 'text-orange-600 font-semibold' : ''
        }`}
      >
        <Sparkles className="w-4 h-4 text-orange-500" />
        <span>Search Offers</span>
      </button>

      <button
        onClick={() => setActiveTab('projects')}
        className={`hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
          activeTab === 'projects' ? 'text-orange-600 font-semibold' : ''
        }`}
      >
        <Briefcase className="w-4 h-4 text-slate-500" />
        <span>Search Projects</span>
      </button>

      <button
        onClick={() => setActiveTab('freelancers')}
        className={`hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
          activeTab === 'freelancers' ? 'text-orange-600 font-semibold' : ''
        }`}
      >
        <Users className="w-4 h-4 text-slate-500" />
        <span>Freelancers</span>
      </button>

      <button
        onClick={() => setActiveTab('workstream')}
        className={`hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 relative py-1 ${
          activeTab === 'workstream' ? 'text-orange-600 font-semibold' : ''
        }`}
      >
        <MessageSquare className="w-4 h-4 text-orange-500" />
        <span>WorkStream™</span>
        {unreadCount > 0 && (
          <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
            {unreadCount}
          </span>
        )}
      </button>
    </nav>
  );
};
