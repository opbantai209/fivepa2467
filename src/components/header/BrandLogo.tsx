import React from 'react';
import { useApp } from '../../context/AppContext';

export const BrandLogo: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <button
      onClick={() => setActiveTab('home')}
      className="flex items-center gap-1.5 text-left focus:outline-hidden group shrink-0"
    >
      <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-slate-800">
        people<span className="text-orange-500">per</span>hour
      </span>
      <span className="inline-block w-2 h-2 rounded-full bg-orange-500 self-baseline mt-4" />
    </button>
  );
};
