import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const {
    currentPersona,
    buyerWallet,
    sellerWallet,
    transactions,
    workstreams,
    depositToEscrow,
  } = useApp();

  const [quickDepositModal, setQuickDepositModal] = useState(false);
  const [quickAmount, setQuickAmount] = useState('500');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Account & Escrow Ledger</h1>
        <p className="text-xs text-slate-500 mt-1">
          Track escrow deposits, milestone releases, and completed invoice payouts.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Funds in Escrow */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Protected in Escrow
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            ${buyerWallet.inEscrow.toFixed(2)}
          </div>
          <p className="text-xs text-slate-500">
            Currently locked across {workstreams.filter((w) => w.escrowBalance > 0).length} active WorkStream milestones.
          </p>
        </div>

        {/* Card 2: Available Account Balance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {currentPersona.role === 'buyer' ? 'Available Buyer Funds' : 'Available Payout Balance'}
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            ${currentPersona.role === 'buyer'
              ? buyerWallet.available.toFixed(2)
              : sellerWallet.available.toFixed(2)}
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">
              {currentPersona.role === 'buyer' ? 'Ready to fund projects' : 'Ready to withdraw'}
            </span>
            {currentPersona.role === 'buyer' ? (
              <button
                onClick={() => setQuickDepositModal(true)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                + Add Funds
              </button>
            ) : (
              <button
                onClick={() => alert('Withdrawal request submitted to your connected bank account.')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                Request Withdrawal →
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Total Transactions / Spending */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lifetime Volume
            </span>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            ${currentPersona.totalEarnedOrSpent.toLocaleString()}.00
          </div>
          <p className="text-xs text-slate-500">
            {currentPersona.role === 'buyer' ? 'Total spent on verified freelance services' : 'Total freelance client earnings'}
          </p>
        </div>
      </div>

      {/* Escrow Milestone Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Active WorkStream Escrow Allocations</h3>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {workstreams.map((ws) => (
            <div key={ws.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{ws.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
                    {ws.category}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Freelancer: <span className="font-semibold text-slate-700">{ws.freelancerName}</span> (CERT {ws.freelancerCert})
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-right">
                <div>
                  <div className="text-slate-400 text-[10px]">Agreed Total</div>
                  <div className="font-bold text-slate-900 font-mono tabular-nums">
                    ${ws.agreedAmount.toFixed(2)}
                  </div>
                </div>

                <div>
                  <div className="text-emerald-700 text-[10px] font-semibold">Held in Escrow</div>
                  <div className="font-bold text-emerald-600 font-mono tabular-nums">
                    ${ws.escrowBalance.toFixed(2)}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[10px]">Released</div>
                  <div className="font-bold text-slate-700 font-mono tabular-nums">
                    ${ws.totalPaid.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Transaction History Log</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    tx.type === 'deposit'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {tx.type === 'deposit' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{tx.description}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tx.timestamp}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {tx.type === 'deposit' ? `-$${tx.amount.toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold uppercase">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Add Funds Modal */}
      {quickDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Deposit Funds to Account</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add funds to your PeoplePerHour account to instantly fund project escrows and Hourlie purchases.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Amount ($ USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setQuickDepositModal(false)}
                className="flex-1 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Added $${quickAmount} to account balance!`);
                  setQuickDepositModal(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
