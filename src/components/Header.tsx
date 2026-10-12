import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './header/BrandLogo';
import { NavigationLinks } from './header/NavigationLinks';
import { WalletQuickDropdown } from './header/WalletQuickDropdown';
import { PersonaSwitcher } from './header/PersonaSwitcher';
import { PrimaryActionButton } from './header/PrimaryActionButton';
import { X } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, notificationMessage, dismissNotification } = useApp();

  return (
    <>
      {notificationMessage && (
        <div className="bg-slate-900 text-white text-xs py-2 px-4 flex items-center justify-between border-b border-slate-800 transition-all">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="font-medium text-slate-100">{notificationMessage}</span>
          </div>
          <button onClick={dismissNotification} className="text-slate-400 hover:text-white p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <BrandLogo />
          <NavigationLinks />

          <div className="flex items-center gap-3 shrink-0">
            <WalletQuickDropdown />
            <PersonaSwitcher />
            <PrimaryActionButton />
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden border-t border-slate-200 px-4 py-2 flex items-center justify-around bg-slate-50 text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('offers')}
            className={`py-1 ${activeTab === 'offers' ? 'text-orange-600 font-semibold' : ''}`}
          >
            Offers
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-1 ${activeTab === 'projects' ? 'text-orange-600 font-semibold' : ''}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('freelancers')}
            className={`py-1 ${activeTab === 'freelancers' ? 'text-orange-600 font-semibold' : ''}`}
          >
            Freelancers
          </button>
          <button
            onClick={() => setActiveTab('workstream')}
            className={`py-1 ${activeTab === 'workstream' ? 'text-orange-600 font-semibold' : ''}`}
          >
            WorkStream™
          </button>
        </div>
      </header>
    </>
  );
};
