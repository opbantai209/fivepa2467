import React from 'react';
import { RefreshCw, DollarSign, FileText } from 'lucide-react';
import { WorkStream } from '../../types';

interface Props {
  workstream: WorkStream;
  isCurrentBuyer: boolean;
  counterpartyName: string;
  onSimulateReply: () => void;
  onOpenDeposit: () => void;
  onOpenInvoice: () => void;
}

export const WorkStreamActionBar: React.FC<Props> = ({
  workstream,
  isCurrentBuyer,
  counterpartyName,
  onSimulateReply,
  onOpenDeposit,
  onOpenInvoice,
}) => {
  return (
    <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs overflow-x-auto gap-2">
      <span className="text-slate-500 text-[11px] shrink-0 font-medium">Quick WorkStream Actions:</span>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onSimulateReply}
          className="px-2.5 py-1 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 rounded-md font-medium text-[11px] flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-orange-500" />
          <span>Simulate {counterpartyName.split(' ')[0]} Reply</span>
        </button>

        {isCurrentBuyer ? (
          <button
            onClick={onOpenDeposit}
            className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-emerald-700 rounded-md font-medium text-[11px] flex items-center gap-1 transition-colors"
          >
            <DollarSign className="w-3 h-3 text-emerald-600" />
            <span>Deposit Escrow</span>
          </button>
        ) : (
          <button
            onClick={onOpenInvoice}
            className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-amber-700 rounded-md font-medium text-[11px] flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3 h-3 text-amber-600" />
            <span>Raise Invoice</span>
          </button>
        )}
      </div>
    </div>
  );
};
