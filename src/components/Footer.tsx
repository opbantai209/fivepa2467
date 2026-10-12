import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Discover</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('offers')}
                  className="hover:text-white transition-colors"
                >
                  Search Hourlie Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-white transition-colors"
                >
                  Search Freelance Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('freelancers')}
                  className="hover:text-white transition-colors"
                >
                  Find Top Freelancers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('workstream')}
                  className="hover:text-white transition-colors"
                >
                  WorkStream™ Hub
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">For Buyers</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-white transition-colors"
                >
                  Post a Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('offers')}
                  className="hover:text-white transition-colors"
                >
                  Buy Fixed-Price Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="hover:text-white transition-colors"
                >
                  Escrow Payment Protection
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">For Freelancers</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-white transition-colors"
                >
                  Browse Open Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('offers')}
                  className="hover:text-white transition-colors"
                >
                  Post an Hourlie Offer
                </button>
              </li>
              <li>
                <span className="text-slate-400">CERT™ Algorithm Levels</span>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="hover:text-white transition-colors"
                >
                  Milestone Invoicing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Security & Trust</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  100% Escrow Protection on every milestone deliverable.
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                WorkStream™ provides end-to-end encrypted messaging, verified audit logs, and secure payouts.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">
              people<span className="text-orange-500">per</span>hour
            </span>
            <span className="text-slate-500">© 2026 PeoplePerHour Clone. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-500">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Escrow Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
