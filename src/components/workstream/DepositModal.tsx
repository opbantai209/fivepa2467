import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  freelancerName: string;
  initialAmount: number;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export const DepositModal: React.FC<Props> = ({ freelancerName, initialAmount, onClose, onConfirm }) => {
  const [amount, setAmount] = useState(String(initialAmount));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">Fund PeoplePerHour Escrow</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Depositing funds into escrow guarantees payment to <b>{freelancerName}</b> upon delivery, while safeguarding your money until you approve the work.
        </p>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deposit Amount ($ USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const val = parseFloat(amount);
              if (val > 0) onConfirm(val);
            }}
            className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
          >
            Confirm Deposit
          </button>
        </div>
      </div>
    </div>
  );
};
