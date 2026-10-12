import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRightLeft, Check } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

export const PersonaSwitcher: React.FC = () => {
  const { currentPersona, switchPersona } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-200 bg-white hover:border-slate-300 transition-colors"
        title="Switch Perspective"
      >
        <img
          src={currentPersona.avatar}
          alt={currentPersona.name}
          referrerPolicy="no-referrer"
          className="w-7 h-7 rounded-full object-cover border border-slate-200"
        />
        <div className="text-left hidden sm:block">
          <div className="text-xs font-semibold text-slate-800 leading-tight">
            {currentPersona.name.split(' ')[0]}
          </div>
          <div className="text-[10px] text-slate-500 leading-none">
            {currentPersona.role === 'buyer' ? 'Buyer' : `CERT ${currentPersona.certLevel}`}
          </div>
        </div>
        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Switch Active Persona
          </div>
          <div className="space-y-1">
            {mockUsers.map((user) => {
              const isSelected = user.id === currentPersona.id;
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    switchPersona(user.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    isSelected ? 'bg-orange-50 text-orange-950' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span>{user.name}</span>
                        {user.role === 'freelancer' && (
                          <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-sm">
                            CERT {user.certLevel}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {user.role === 'buyer' ? 'Tech Startup Buyer' : `$${user.hourlyRate}/hr`}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
