import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface Props {
  buyerName: string;
  initialAmount: number;
  initialTitle: string;
  onClose: () => void;
  onConfirm: (amount: number, description: string) => void;
}

export const InvoiceModal: React.FC<Props> = ({ buyerName, initialAmount, initialTitle, onClose, onConfirm }) => {
  const [amount, setAmount] = useState(String(initialAmount));
  const [desc, setDesc] = useState(`Milestone payment for ${initialTitle}`);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">Raise Milestone Invoice</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Issue an official PeoplePerHour invoice to <b>{buyerName}</b> for completed milestones.
        </p>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Amount ($ USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex-1 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              const val = parseFloat(amount);
              if (val > 0) onConfirm(val, desc);
            }}
            className="flex-1 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-2xs"
          >
            Issue Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
