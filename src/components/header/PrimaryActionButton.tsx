import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle } from 'lucide-react';

export const PrimaryActionButton: React.FC = () => {
  const { currentPersona, setIsPostProjectOpen, setIsPostOfferOpen } = useApp();

  return currentPersona.role === 'buyer' ? (
    <button
      onClick={() => setIsPostProjectOpen(true)}
      className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
    >
      <PlusCircle className="w-4 h-4" />
      <span>Post a Project</span>
    </button>
  ) : (
    <button
      onClick={() => setIsPostOfferOpen(true)}
      className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
    >
      <PlusCircle className="w-4 h-4" />
      <span>Post an Offer</span>
    </button>
  );
};
