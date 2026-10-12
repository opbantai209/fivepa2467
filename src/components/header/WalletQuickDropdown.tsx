import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, ChevronDown } from 'lucide-react';

export const WalletQuickDropdown: React.FC = () => {
  const { currentPersona, buyerWallet, sellerWallet, setActiveTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
        title="Wallet & Escrow Balance"
      >
        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
        <span className="font-mono tabular-nums">
          {currentPersona.role === 'buyer'
            ? `$${buyerWallet.inEscrow.toFixed(0)} Escrow`
            : `$${sellerWallet.available.toLocaleString()} Earned`}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {currentPersona.role === 'buyer' ? 'Buyer Escrow Account' : 'Freelancer Earnings'}
          </div>
          {currentPersona.role === 'buyer' ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Funds in Escrow:</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  ${buyerWallet.inEscrow.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Available Balance:</span>
                <span className="font-semibold text-emerald-600 font-mono tabular-nums">
                  ${buyerWallet.available.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Available Payout:</span>
                <span className="font-semibold text-emerald-600 font-mono tabular-nums">
                  ${sellerWallet.available.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Secured in Escrow:</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  ${sellerWallet.inEscrow.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(false);
              setActiveTab('wallet');
            }}
            className="mt-3 w-full py-1.5 text-center text-xs font-medium text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
          >
            View Financial Ledger →
          </button>
        </div>
      )}
    </div>
  );
};
