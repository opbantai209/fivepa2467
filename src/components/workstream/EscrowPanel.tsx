import React from 'react';
import { ShieldCheck, DollarSign, FileCheck, FileText, Star } from 'lucide-react';
import { WorkStream } from '../../types';

interface Props {
  workstream: WorkStream;
  isCurrentBuyer: boolean;
  onOpenDeposit: () => void;
  onReleaseEscrow: () => void;
  onOpenDeliverable: () => void;
  onOpenInvoice: () => void;
  onOpenReview: () => void;
}

export const EscrowPanel: React.FC<Props> = ({
  workstream,
  isCurrentBuyer,
  onOpenDeposit,
  onReleaseEscrow,
  onOpenDeliverable,
  onOpenInvoice,
  onOpenReview,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Escrow Protection</h3>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500">Agreed Project Value:</span>
          <span className="font-bold text-slate-900 font-mono">${workstream.agreedAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500">Secured in Escrow:</span>
          <span className="font-bold text-emerald-600 font-mono">${workstream.escrowBalance.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Released / Paid:</span>
          <span className="font-bold text-slate-700 font-mono">${workstream.totalPaid.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        {isCurrentBuyer ? (
          <>
            <button
              onClick={onOpenDeposit}
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" /> Deposit into Escrow
            </button>
            {workstream.escrowBalance > 0 && (
              <button
                onClick={onReleaseEscrow}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Release Escrow to Freelancer
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={onOpenDeliverable}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" /> Submit Deliverable
            </button>
            <button
              onClick={onOpenInvoice}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Raise Invoice
            </button>
          </>
        )}

        {workstream.status === 'completed' && !workstream.review && (
          <button
            onClick={onOpenReview}
            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Star className="w-3.5 h-3.5 fill-white" /> Leave 5-Star Review
          </button>
        )}
      </div>
    </div>
  );
};
